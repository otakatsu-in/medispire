# AI Developer Context & Rules

This file serves as a strict context guide for any future AI assistants or developers working on the MediSpire codebase.

## 1. System Architecture
- **Monorepo**: This is a `pnpm` workspace. The frontend is in `artifacts/medispire` and the backend is in `artifacts/api-server`.
- **Frontend**: React, Vite, Tailwind CSS, `wouter` for routing, `shadcn/ui` for components.
- **Backend (Dormant)**: The Express backend and Drizzle ORM database (`lib/db`) are currently **NOT USED** in production. Do not attempt to route traffic through the backend unless explicitly requested to build out the backend infrastructure.

## 2. Lead Capture & Notifications
- **NO EMAIL SYSTEM**: There is no Nodemailer, SendGrid, or SMTP configured.
- **TELEGRAM BOT**: All forms (Webinar, Contact Us, Resources) send data directly to Telegram via a client-side `fetch` request to `api.telegram.org`.
- **WHATSAPP REDIRECTS**: All "Enroll" or "Purchase" buttons redirect the user to WhatsApp (`https://wa.me/...`) with a pre-encoded message text. There is no Stripe or payment gateway integration.

## 3. Core Terminology & Branding
- **Primary CTA**: "Join Free Webinar" (Sunday 12-2 PM with Dr. Sangeeta). Do NOT use the term "Free Consultation" as that service was deprecated.
- **Core Products**: "Germany Ready Blueprint Course" and "Authorized Tutor Matching".
- **Target Audience**: Indian healthcare professionals (MBBS, BDS, Nurses, Radiographers, Physiotherapists).
- **Contact Email**: `medispire.de@gmail.com` (Do NOT use `info.medispire@gmail.com`).

## 4. UI/UX Rules
- **Components**: Always reuse existing `shadcn/ui` components from `artifacts/medispire/src/components/ui/`.
- **Icons**: Always use `lucide-react`.
- **Styling**: Strictly use Tailwind CSS utility classes. The color palette relies heavily on semantic variables (`bg-primary`, `text-accent`, etc.) defined in `index.css`.
- **Animations**: Use `framer-motion` for complex interactions (accordions, scroll reveals).

## 5. Deployment
- The site is hosted on Cloudflare (with Hostinger as redundancy).
- The deployment process typically involves pushing to the `main` branch on GitHub, which triggers the build pipeline.
