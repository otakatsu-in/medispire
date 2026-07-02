import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { webinarRegistrations } from "@workspace/db/schema";
import { z } from "zod";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Escape HTML special chars so user-controlled text can't break Telegram HTML messages */
function esc(s: string | null | undefined): string {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Allowed origins — prevents cross-site abuse of this endpoint */
const ALLOWED_ORIGINS = [
  "https://medispire.in",
  "https://www.medispire.in",
  "http://localhost:5173",
  "http://localhost:5174",
];

// ── Validation schema ─────────────────────────────────────────────────────────

const webinarSchema = z.object({
  name:        z.string().min(1, "Name is required").max(200),
  email:       z.string().email("Valid email required").max(300),
  phone:       z.string().min(5, "Phone is required").max(30),
  profession:  z.string().min(1, "Profession is required").max(100),
  question:    z.string().max(2000).optional().nullable(),
  webinarDate: z.string().max(100).optional(),
  source:      z.string().max(100).optional(),
});

// ── Handler ───────────────────────────────────────────────────────────────────

export async function onRequestPost({ request, env }: any) {
  // 0. CSRF — block requests from unknown origins
  const origin = request.headers.get("Origin");
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return new Response(JSON.stringify({ success: false, error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // 1. Parse & validate input
    let rawPayload: unknown;
    try {
      rawPayload = await request.json();
    } catch {
      return new Response(JSON.stringify({ success: false, error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const parsed = webinarSchema.safeParse(rawPayload);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ success: false, error: "Validation failed", details: parsed.error.flatten() }),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }

    const { name, email, phone, profession, question, webinarDate, source } = parsed.data;
    const currentWebinarDate = webinarDate ?? "Sunday 12-2 PM";

    // 2. Save to Neon Database
    if (env.DATABASE_URL) {
      try {
        const sql = neon(env.DATABASE_URL);
        const db = drizzle(sql);
        await db.insert(webinarRegistrations).values({
          name,
          email,
          phone,
          profession,
          question: question ?? null,
          webinarDate: currentWebinarDate,
        });
      } catch (dbErr: any) {
        console.error("[submit-webinar] DB insert failed:", dbErr?.message);
        // Non-fatal — still attempt Telegram so founders are notified
      }
    } else {
      console.warn("[submit-webinar] DATABASE_URL not set — skipping DB save");
    }

    // 3. Send Telegram Notification
    if (env.TELEGRAM_BOT_TOKEN) {
      const message = [
        `🚨 <b>New Webinar Registration!</b>`,
        ``,
        `<b>Name:</b> ${esc(name)}`,
        `<b>Email:</b> ${esc(email)}`,
        `<b>Phone:</b> ${esc(phone)}`,
        `<b>Profession:</b> ${esc(profession)}`,
        `<b>Webinar Date:</b> ${esc(currentWebinarDate)}`,
        `<b>Question:</b> ${esc(question) || "None"}`,
        source ? `<b>Source:</b> ${esc(source)}` : "",
      ].filter(Boolean).join("\n");

      const chatIds: string[] = [];
      if (env.TELEGRAM_CHAT_ID) {
        chatIds.push(...env.TELEGRAM_CHAT_ID.split(",").map((s: string) => s.trim()));
      }
      if (env.TELEGRAM_GROUP_ID) {
        chatIds.push(env.TELEGRAM_GROUP_ID.trim());
      }

      if (chatIds.length === 0) {
        console.warn("[submit-webinar] No Telegram chat IDs configured — skipping notification");
      }

      for (const chatId of chatIds) {
        const tgRes = await fetch(
          `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
          },
        );
        if (!tgRes.ok) {
          const tgError = await tgRes.text().catch(() => "unknown");
          console.error(`[submit-webinar] Telegram send failed for chat ${chatId}:`, tgError);
        }
      }
    } else {
      console.warn("[submit-webinar] TELEGRAM_BOT_TOKEN not set — skipping notification");
    }

    // 4. Send confirmation email via Brevo
    if (env.BREVO_API_KEY) {
      const emailPayload = {
        sender: { name: "MediSpire", email: "medispire.de@gmail.com" },
        to: [{ email, name }],
        subject: "Your Webinar Registration is Confirmed! ✅",
        htmlContent: `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;font-family:Inter,Arial,sans-serif;background:#f4f6f8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;">
    <tr><td style="background:#1A2E4A;padding:28px 36px;">
      <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">MediSpire</p>
      <p style="margin:4px 0 0;color:rgba(255,255,255,0.6);font-size:12px;">Your Gateway to a Medical Career in Germany</p>
    </td></tr>
    <tr><td style="padding:36px;">
      <h2 style="margin:0 0 16px;color:#1A2E4A;font-size:22px;">Hi ${esc(name)},</h2>
      <p style="color:#4a5568;line-height:1.7;">You're registered for the <strong>Free Webinar with Dr. Sangeeta Pai</strong>.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;margin:20px 0;">
        <tr><td style="padding:20px;">
          <p style="margin:0;color:#1A2E4A;font-size:15px;"><strong>📅 When:</strong> ${esc(currentWebinarDate)}</p>
          <p style="margin:12px 0 0;color:#4a5568;font-size:14px;">We will send you the joining link shortly before the webinar starts. Keep an eye on WhatsApp and your inbox.</p>
        </td></tr>
      </table>
      <p style="color:#4a5568;line-height:1.7;">Have questions in the meantime? WhatsApp us at <a href="https://wa.me/918310010112" style="color:#B7860C;">+91 83100 10112</a>.</p>
      <p style="color:#6b7280;margin-top:32px;font-size:13px;">Best regards,<br><strong>The MediSpire Team</strong></p>
    </td></tr>
    <tr><td style="background:#f8fafc;padding:16px 36px;border-top:1px solid #e2e8f0;">
      <p style="margin:0;color:#9ca3af;font-size:12px;">© ${new Date().getFullYear()} MediSpire UG · Emsdettener Str. 10, 48268 Greven, Germany</p>
    </td></tr>
  </table>
</body>
</html>`,
      };

      const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "api-key": env.BREVO_API_KEY,
        },
        body: JSON.stringify(emailPayload),
      });

      if (!brevoRes.ok) {
        const brevoError = await brevoRes.text().catch(() => "unknown");
        console.error("[submit-webinar] Brevo email failed:", brevoError);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("[submit-webinar] Unhandled error:", error?.message);
    return new Response(JSON.stringify({ success: false, error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
