import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { webinarRegistrations } from "@workspace/db/schema";

export async function onRequestPost({ request, env }: any) {
  try {
    const payload = await request.json();
    const { name, email, phone, profession, question } = payload;

    // 1. Save to Neon Database
    if (env.DATABASE_URL) {
      const sql = neon(env.DATABASE_URL);
      const db = drizzle(sql);
      
      await db.insert(webinarRegistrations).values({
        name,
        email,
        phone,
        profession,
        question,
      });
    }

    // 2. Send Telegram Notification
    if (env.TELEGRAM_BOT_TOKEN) {
      const message = `🚨 *New Webinar Registration!*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Profession:* ${profession}\n*Question:* ${question || "None"}`;
      
      const chatIds = env.TELEGRAM_CHAT_ID ? env.TELEGRAM_CHAT_ID.split(",") : [];
      if (env.TELEGRAM_GROUP_ID) chatIds.push(env.TELEGRAM_GROUP_ID);

      // Fallback to hardcoded IDs if env vars are missing (for smooth transition)
      const finalChatIds = chatIds.length > 0 ? chatIds : ["-1004295292660", "417335028"];
      const botToken = env.TELEGRAM_BOT_TOKEN || "8077312072:AAEx94EiWIV4D0KaND_9UciGeANqRVUrkiY";

      for (const chatId of finalChatIds) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId.trim(),
            text: message,
            parse_mode: "Markdown",
          }),
        });
      }
    }

    // 3. Send Brevo Email
    if (env.BREVO_API_KEY) {
      // Add user to Brevo contact list (e.g. ID 2, or you can create one in Brevo)
      // Or just send a transactional email
      const emailPayload = {
        sender: { name: "MediSpire", email: "medispire.de@gmail.com" },
        to: [{ email: email, name: name }],
        subject: "Your Webinar Registration is Confirmed!",
        htmlContent: `<html><body>
          <h2>Hi ${name},</h2>
          <p>Your registration for the Free Sunday Webinar with Dr. Sangeeta is confirmed.</p>
          <p><strong>When:</strong> Sunday, 12:00 PM - 2:00 PM (IST)</p>
          <p>We will send you the joining link shortly before the webinar begins.</p>
          <br/>
          <p>Best regards,<br/>The MediSpire Team</p>
        </body></html>`
      };

      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "api-key": env.BREVO_API_KEY
        },
        body: JSON.stringify(emailPayload)
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("Error processing webinar submission:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
