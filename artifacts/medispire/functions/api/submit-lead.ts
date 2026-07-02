import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { leads } from "@workspace/db/schema";

export async function onRequestPost({ request, env }: any) {
  try {
    const payload = await request.json();
    const { name, email, phone, profession, subject, message, source } = payload;

    // 1. Save to Neon Database
    if (env.DATABASE_URL) {
      const sql = neon(env.DATABASE_URL);
      const db = drizzle(sql);
      
      await db.insert(leads).values({
        name,
        email,
        phone: phone || "",
        profession: profession || "",
        subject,
        message,
        source: source || "Contact Form",
      });
    }

    // 2. Send Telegram Notification
    if (env.TELEGRAM_BOT_TOKEN) {
      const tgMessage = `✉️ *New Lead / Contact!*\n\n*Source:* ${source || "Contact Form"}\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || "N/A"}\n*Profession:* ${profession || "N/A"}\n*Subject:* ${subject || "N/A"}\n*Message:* ${message || "N/A"}`;
      
      const chatIds = env.TELEGRAM_CHAT_ID ? env.TELEGRAM_CHAT_ID.split(",") : [];
      if (env.TELEGRAM_GROUP_ID) chatIds.push(env.TELEGRAM_GROUP_ID);

      const finalChatIds = chatIds.length > 0 ? chatIds : ["-1004295292660", "417335028"];
      const botToken = env.TELEGRAM_BOT_TOKEN || "8077312072:AAEx94EiWIV4D0KaND_9UciGeANqRVUrkiY";

      for (const chatId of finalChatIds) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId.trim(),
            text: tgMessage,
            parse_mode: "Markdown",
          }),
        });
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("Error processing lead submission:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
