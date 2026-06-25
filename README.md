# MediSpire

MediSpire is a specialized web application designed to help Indian healthcare professionals (Doctors, Dentists, Nurses, Radiographers, etc.) relocate to and build careers in Germany. 

The platform serves as an informational hub, lead generation tool, and landing page for the "Germany Ready Blueprint" course and Authorized Tutor Matching services offered by Dr. Sangeeta Pai and Dr. Sandeep.

## 🏗 Architecture & Tech Stack

This project is a **pnpm monorepo** structured with Vite, React, and an Express-based Node.js API server (currently unused for production traffic).

### Core Technologies
- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, `tailwindcss-animate`
- **UI Components**: shadcn/ui (Radix UI primitives + Tailwind), Lucide React (Icons), Framer Motion (Animations)
- **Routing**: `wouter` (lightweight hook-based router)
- **Backend (API)**: Express, Node.js (located in `artifacts/api-server`)
- **Database (Inactive)**: PostgreSQL via Drizzle ORM (`lib/db/`)
- **Package Manager**: `pnpm` (Workspace configured)

### Project Structure
```text
/
├── artifacts/
│   ├── medispire/           # The main React frontend application
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI components (shadcn/ui + custom)
│   │   │   ├── data/        # Static data (e.g., blogs.ts)
│   │   │   ├── hooks/       # Custom React hooks (e.g., use-mobile.tsx)
│   │   │   ├── lib/         # Utility functions (Tailwind merge, etc.)
│   │   │   ├── pages/       # Route-level page components
│   │   │   ├── App.tsx      # Main application router
│   │   │   └── main.tsx     # React DOM entry point
│   │   └── index.html       # Vite HTML entry
│   └── api-server/          # Node.js/Express backend (currently unused)
│       └── src/             # Express routes and logic
├── lib/
│   ├── db/                  # Drizzle ORM configuration and schemas (currently empty schema)
│   ├── api-spec/            # Shared OpenAPI specifications
│   └── api-zod/             # Shared Zod validation schemas
├── scripts/                 # Build and git-hook scripts (post-merge.sh)
└── pnpm-workspace.yaml      # Monorepo workspace configuration
```

## 🚀 Key Features & Logic

### 1. Lead Generation via Telegram (No Backend)
All form submissions (Contact Us, Webinar Registration, Newsletter, Resource Downloads) bypass the Node.js API server entirely. Instead, they make **direct client-side fetch requests to the Telegram Bot API**.
- **Bot Token & Chat IDs**: Hardcoded in the React components (`BookAppointment.tsx`, `ContactUs.tsx`, `BookingContext.tsx`, etc.).
- **Mechanism**: The React app sends a `sendMessage` payload to the Telegram bot, which instantly alerts the founders in a designated Telegram group.

### 2. Global Webinar Registration (BookingContext)
Instead of a standard contact form, the primary CTA across the site is the **Free Sunday Webinar (12-2 PM)**.
- **State Management**: Managed via `BookingContext.tsx`.
- **Trigger**: The `openBooking()` function opens a global Dialog modal from anywhere in the app.
- **Submission**: Sends user details directly to Telegram.

### 3. Service Offerings
The platform focuses on two primary revenue drivers, detailed on the `/course` (Services) page:
1. **Germany Ready Blueprint Course**: A 10-module, 12-hour video course with 3 pricing tiers (Basic, Standard, Premium).
2. **Authorized Tutor Matching**: Custom-priced matchmaking with verified German language tutors.
*Note: Purchasing/Enrolling triggers a WhatsApp redirect (`wa.me`) with a pre-filled message, rather than using a built-in checkout cart.*

### 4. Blog & Content Generation
The blog system (`/blog` and `/blog/:slug`) is driven by a static dataset located at `artifacts/medispire/src/data/blogs.ts`.
- Content includes SEO-optimized articles about moving to Germany, the Approbation process, FSP exams, and life as a doctor in Germany.
- Markdown rendering is handled via `markdown-it`.

## 🛠 Local Development

### Prerequisites
- Node.js (v18+)
- `pnpm` (v9+)

### Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   # OR
   npx pnpm dev
   ```
   This will start the Vite development server (usually on `http://localhost:5173`).

3. **Build for Production**
   ```bash
   npm run build
   # OR
   npx pnpm build
   ```
   Outputs the static frontend files to `artifacts/medispire/dist/public/`.

## 🤖 AI Context & Future Development

**For Future AIs modifying this codebase, be aware of the following:**

1. **No Database State**: Do not attempt to read from or write to the database (`lib/db/`) for core application features. The schema is currently empty, and there is no active PostgreSQL connection. All lead capture is routed to Telegram.
2. **Form Handling**: If you are asked to add a new form or modify an existing one, you must implement the `fetch` call to the Telegram Bot API (or refactor to a backend proxy if instructed by the user).
3. **Routing**: The app uses `wouter`, not `react-router-dom`. Use `<Link href="...">` and `useLocation()`.
4. **Styling Constraints**: The app relies heavily on `shadcn/ui` components located in `src/components/ui/`. Use Tailwind CSS utility classes for styling. Avoid writing custom `.css` files unless modifying global variables in `index.css`. The primary color scheme relies on Tailwind variables (e.g., `bg-primary`, `text-accent`).
5. **Component Libraries**: We use `lucide-react` for all iconography and `framer-motion` for complex animations.

## 📝 License & Ownership
Property of Medispire UG (Germany) and otakatsu-in. All rights reserved.
