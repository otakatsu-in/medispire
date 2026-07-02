import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { leads } from "@workspace/db/schema";
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

const leadSchema = z.object({
  name:       z.string().max(200).optional().default(""),
  email:      z.string().email("Valid email required").max(300),
  phone:      z.string().max(30).optional().default(""),
  profession: z.string().max(100).optional().default(""),
  subject:    z.string().max(300).optional().nullable(),
  message:    z.string().max(5000).optional().nullable(),
  source:     z.string().max(100).optional().default("Contact Form"),
});

// ── Handler ───────────────────────────────────────────────────────────────────

export async function onRequestPost({ request, env }: any) {
  // 0. CSRF — block requests from unknown origins
  const origin = request.headers.get("Origin");
  if (
    origin && 
    !ALLOWED_ORIGINS.includes(origin) && 
    !origin.endsWith(".pages.dev") &&
    !origin.endsWith(".medispire.pages.dev") &&
    origin !== "https://medispire.pages.dev" &&
    origin !== "http://localhost:8788"
  ) {
    return new Response(JSON.stringify({ success: false, error: "Forbidden", origin }), {
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

    const parsed = leadSchema.safeParse(rawPayload);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ success: false, error: "Validation failed", details: parsed.error.flatten() }),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }

    const { name, email, phone, profession, subject, message, source } = parsed.data;

    // 2. Save to Neon Database
    if (env.DATABASE_URL) {
      try {
        const sql = neon(env.DATABASE_URL);
        const db = drizzle(sql);
        await db.insert(leads).values({
          name,
          email,
          phone:      phone || null,
          profession: profession || null,
          subject:    subject  ?? null,
          message:    message  ?? null,
          source:     source   || "Contact Form",
        });
      } catch (dbErr: any) {
        console.error("[submit-lead] DB insert failed:", dbErr?.message);
        // Non-fatal — still attempt Telegram so founders are notified
      }
    } else {
      console.warn("[submit-lead] DATABASE_URL not set — skipping DB save");
    }

    // 3. Send Telegram Notification
    if (env.TELEGRAM_BOT_TOKEN) {
      const tgMessage = [
        `✉️ <b>New Lead!</b>`,
        ``,
        `<b>Source:</b> ${esc(source)}`,
        `<b>Name:</b> ${esc(name) || "<i>not provided</i>"}`,
        `<b>Email:</b> ${esc(email)}`,
        `<b>Phone:</b> ${esc(phone) || "<i>not provided</i>"}`,
        `<b>Profession:</b> ${esc(profession) || "<i>not provided</i>"}`,
        subject ? `<b>Subject:</b> ${esc(subject)}` : "",
        message ? `<b>Message:</b> ${esc(message)}` : "",
      ].filter(Boolean).join("\n");

      const chatIds: string[] = [];
      if (env.TELEGRAM_CHAT_ID) {
        chatIds.push(...env.TELEGRAM_CHAT_ID.split(",").map((s: string) => s.trim()));
      }
      if (env.TELEGRAM_GROUP_ID) {
        chatIds.push(env.TELEGRAM_GROUP_ID.trim());
      }

      if (chatIds.length === 0) {
        console.warn("[submit-lead] No Telegram chat IDs configured — skipping notification");
      }

      for (const chatId of chatIds) {
        const tgRes = await fetch(
          `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: tgMessage, parse_mode: "HTML" }),
          },
        );
        if (!tgRes.ok) {
          const tgError = await tgRes.text().catch(() => "unknown");
          console.error(`[submit-lead] Telegram send failed for chat ${chatId}:`, tgError);
        }
      }
    } else {
      console.warn("[submit-lead] TELEGRAM_BOT_TOKEN not set — skipping notification");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("[submit-lead] Unhandled error:", error?.message);
    return new Response(JSON.stringify({ success: false, error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
