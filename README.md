# MediSpire

MediSpire is a specialized web application designed to help Indian healthcare professionals (Doctors, Dentists, Nurses, Radiographers, etc.) relocate to and build careers in Germany. 

The platform serves as an informational hub, lead generation tool, and landing page for the "Germany Ready Blueprint" course and Authorized Tutor Matching services offered by Dr. Sangeeta Pai and Dr. Sandeep.

## 🏗 Architecture & Tech Stack

This project is a **pnpm monorepo** structured with Vite, React, and a serverless backend powered by **Cloudflare Pages Functions**.

### Core Technologies
- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, `tailwindcss-animate`
- **UI Components**: shadcn/ui (Radix UI primitives + Tailwind), Lucide React (Icons), Framer Motion (Animations)
- **Routing**: `wouter` (lightweight hook-based router)
- **Backend**: Cloudflare Pages Functions (located in `artifacts/medispire/functions/api/`)
- **Database**: Neon Serverless PostgreSQL (`@workspace/db`)
- **ORM**: Drizzle ORM
- **Email Service**: Brevo API
- **Notifications**: Telegram Bot API
- **Package Manager**: `pnpm` (Workspace configured)

---

## 🚀 Key Features & Backend Logic

### 1. Cloudflare Pages Functions (Serverless API)
The application uses Cloudflare Pages Functions for its backend, intercepting calls to `/api/*`. 
- **`submit-webinar.ts`**: Handles webinar registrations. Validates data with Zod, checks CSRF, saves to the Neon Database, sends a formatted HTML confirmation email via Brevo, and sends a notification to Telegram.
- **`submit-lead.ts`**: Handles generic form submissions (Contact Us, Booking Consultations, Newsletters). Validates with Zod, checks CSRF, saves to Neon DB, and alerts founders via Telegram.

### 2. Neon Database Integration
The system uses a Neon Serverless PostgreSQL database. The schema is defined in `lib/db/src/schema/index.ts`.
- **`leads` table**: Stores general inquiries, newsletters, and consultation requests.
- **`webinar_registrations` table**: Stores signups specifically for the free Sunday webinars.

### 3. Telegram & Brevo Notifications
- **Telegram**: Instantly alerts founders of any new leads or webinar signups. The logic is strictly handled in the backend to keep bot tokens secure.
- **Brevo**: Sends a branded HTML confirmation email to users who sign up for the webinar, dynamically inserting the webinar date and the user's name.

### 4. Global Webinar Configuration
The date for the upcoming webinar is centrally managed.
- **File**: `artifacts/medispire/src/config/webinar.ts` (`WEBINAR_DATE`)
- Updating this single variable automatically updates all frontend CTAs, popup forms, and the backend email confirmation templates.

### 5. CSRF Protection
Both backend endpoints include strict Cross-Site Request Forgery (CSRF) protection, ensuring they only accept requests from `https://medispire.in` and `*.pages.dev` preview links.

---

## 🔐 Environment Variables

To deploy or run the backend locally, the following environment variables must be defined (in the Cloudflare Dashboard -> Variables and Secrets, or in a local `artifacts/medispire/.dev.vars` file):

- `DATABASE_URL`: Connection string for the Neon PostgreSQL database.
- `TELEGRAM_BOT_TOKEN`: The bot token provided by BotFather.
- `TELEGRAM_CHAT_ID`: The ID of the Telegram user(s) to notify.
- `TELEGRAM_GROUP_ID`: The ID of the Telegram group to notify (e.g., `-100...`).
- `BREVO_API_KEY`: API key for Brevo transactional emails.

---

## 🗄️ Database Initialization

If you are setting up a **new Neon Database**, it will be empty by default. You MUST push the Drizzle schema to create the tables before the backend can save data.

1. CD into the database library:
   ```bash
   cd lib/db
   ```
2. Export your connection string and push the schema:
   ```bash
   export DATABASE_URL="postgresql://neondb_owner:..."
   npm run push
   ```

---

## ☁️ Cloudflare Pages Deployment

Because this project uses a monorepo structure, Cloudflare Pages must be configured correctly in the Dashboard to detect the frontend and the `functions/` directory.

In your Cloudflare Dashboard **Settings -> Builds & deployments**, ensure your settings exactly match:
- **Framework preset**: `None`
- **Build command**: `npm run build`
- **Build output directory**: `dist/public`
- **Root directory**: `artifacts/medispire`

*Note on Backend Dependencies*: Cloudflare's `wrangler` compiles the `functions/` directory from the root of the repository. Therefore, all backend dependencies (like `@neondatabase/serverless`, `drizzle-orm`, `zod`, and `@workspace/db`) **must be listed in the root `package.json`**, otherwise the Cloudflare build will fail to resolve them.

---

## 🛠 Local Development

### Prerequisites
- Node.js (v18+)
- `pnpm` (v9+)
- Cloudflare Wrangler CLI (installed automatically via packages)

### Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start the Frontend ONLY (No Backend API)**
   ```bash
   npm run dev
   # OR
   npx pnpm dev
   ```
   This starts the fast Vite server on `http://localhost:5173`. *Note: API calls to `/api/*` will fail because the Cloudflare backend is not running.*

3. **Start the Full-Stack Environment (Frontend + Backend)**
   ```bash
   cd artifacts/medispire
   npm run dev:fullstack
   ```
   This builds the frontend to the `dist` folder and uses Cloudflare Wrangler to serve both your static assets and the `functions/api/` locally on `http://localhost:8788`. This is the **recommended way to test forms and database logic locally**.

4. **Build for Production**
   ```bash
   npm run build
   ```
   Outputs the static frontend files to `artifacts/medispire/dist/public/`.

---

## 🤖 AI Context & Future Development

**For Future AIs modifying this codebase, be aware of the following:**

1. **Backend Exists**: The backend is powered by Cloudflare Pages Functions (`artifacts/medispire/functions/api/`). Do NOT create a separate Express server or Node backend.
2. **Database Integration**: We use Neon DB + Drizzle ORM (`@workspace/db`). When creating new forms, ensure the data is validated via Zod and inserted into the correct database table before sending Telegram alerts.
3. **Security & CSRF**: Never expose API keys in the React frontend. Both backend endpoints have strict CSRF protection (checking for `.pages.dev` or `medispire.in`). If testing locally on Wrangler, ensure `http://localhost:8788` is permitted.
4. **Routing**: The app uses `wouter`, not `react-router-dom`. Use `<Link href="...">` and `useLocation()`.
5. **Centralized Variables**: The webinar date must be updated via `src/config/webinar.ts`, NEVER hardcoded in UI components.
6. **Cloudflare Monorepo Quirks**: Any new backend library used in `functions/` MUST be added to the root `package.json` for Cloudflare to build successfully.

## 📝 License & Ownership
Property of Medispire UG (Germany) and otakatsu-in. All rights reserved.
