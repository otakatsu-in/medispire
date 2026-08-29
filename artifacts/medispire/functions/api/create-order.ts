import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { orders } from "@workspace/db/schema";

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { product, customer_name, customer_email, customer_phone } = body;

    let amount = 0;
    if (product === "consultation") {
      amount = 8999;
    } else if (product === "course") {
      amount = 14999;
    } else if (product === "course_9999") {
      amount = 9999;
    } else if (product === "prebook") {
      amount = 500;
    } else {
      return new Response(JSON.stringify({ error: "Invalid product" }), { status: 400 });
    }

    const orderId = `order_${Date.now()}`;
    // Cashfree expects customer_id to not have spaces/special chars (usually max 50 chars)
    const cleanPhone = customer_phone ? customer_phone.replace(/\D/g, '').substring(0, 14) : "9999999999";
    const customerId = `cust_${cleanPhone || Date.now()}`.substring(0, 50);

    const isProd = env.CASHFREE_ENVIRONMENT === "PRODUCTION";
    const baseUrl = isProd ? "https://api.cashfree.com/pg/orders" : "https://sandbox.cashfree.com/pg/orders";

    const cashfreePayload = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId,
        customer_name: customer_name || "Unknown",
        customer_email: customer_email || "test@example.com",
        customer_phone: cleanPhone
      },
      order_meta: {
        return_url: `${new URL(request.url).origin}/?payment_status={order_id}`
      }
    };

    const cfResponse = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "x-client-id": env.CASHFREE_APP_ID,
        "x-client-secret": env.CASHFREE_SECRET_KEY,
        "x-api-version": "2023-08-01",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(cashfreePayload)
    });

    const cfData = await cfResponse.json();

    if (!cfResponse.ok) {
      console.error("Cashfree API Error:", cfData);
      return new Response(JSON.stringify({ error: "Failed to create order", details: cfData }), { status: 500 });
    }

    // Save order to Neon DB if available
    if (env.DATABASE_URL) {
      try {
        const sql = neon(env.DATABASE_URL);
        const db = drizzle(sql);
        await db.insert(orders).values({
          orderId: cfData.order_id,
          product: product,
          amount: String(amount),
          customerName: customer_name || "Unknown",
          customerEmail: customer_email || "Unknown",
          customerPhone: customer_phone || "Unknown",
          status: "INITIATED"
        });
      } catch (dbError) {
        console.error("DB Save Error:", dbError);
      }
    }

    return new Response(JSON.stringify({
      payment_session_id: cfData.payment_session_id,
      order_id: cfData.order_id
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
