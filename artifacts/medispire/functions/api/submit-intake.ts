import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { consultationIntake, orders } from "../../../lib/db/src/schema";
import { eq } from "drizzle-orm";

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { orderId, formData } = body;

    if (!orderId || !formData) {
      return new Response(JSON.stringify({ error: "Missing orderId or formData" }), { status: 400 });
    }

    let customerInfo = "Unknown Customer";

    // 1. Save to DB
    if (env.DATABASE_URL) {
      try {
        const sql = neon(env.DATABASE_URL);
        const db = drizzle(sql);

        // Update order status to SUCCESS since they reached the intake form
        await db.update(orders)
          .set({ status: "SUCCESS" })
          .where(eq(orders.orderId, orderId));

        // Insert intake form data
        await db.insert(consultationIntake).values({
          orderId: orderId,
          formData: JSON.stringify(formData)
        });

        // Try to get customer info for telegram
        const orderRecord = await db.select().from(orders).where(eq(orders.orderId, orderId)).limit(1);
        if (orderRecord && orderRecord.length > 0) {
          const o = orderRecord[0];
          customerInfo = `${o.customerName} (${o.customerPhone}, ${o.customerEmail})`;
        }
      } catch (dbError) {
        console.error("DB Save Error in Intake:", dbError);
        // Continue even if DB fails, to send telegram alert
      }
    }

    // 2. Send Telegram Alert
    if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
      try {
        // Build a nice message
        const message = `
🎉 *NEW CONSULTATION BOOKING* 🎉
*Order ID*: ${orderId}
*Customer*: ${customerInfo}

*Intake Form Responses*:
- *Profession*: ${formData.profession || "N/A"}
- *Target Timeline*: ${formData.timeline || "N/A"}
- *Goal*: ${formData.goal || "N/A"}
- *Language Level*: ${formData.languageLevel || "N/A"}

(View full details in the database or Cashfree Dashboard)
        `;

        await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "Markdown"
          })
        });
      } catch (tgError) {
        console.error("Telegram Alert Error:", tgError);
      }
    } else {
      console.warn("Skipping Telegram alert — TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing in env variables.");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Submit Intake Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
