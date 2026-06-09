import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
  badge?: string;
  badgeIcon?: ReactNode;
  title: string;
  titleAccent?: string; // The part of the title to highlight in gold
  subtitle: string;
  accentColor?: string; // Tailwind color key e.g. "teal" | "blue" | "primary"
  children?: ReactNode; // Optional CTA or extra buttons
}

/**
 * A shared, consistent hero section for all inner pages.
 * Keeps font sizes, spacing, and style uniform across Doctors, Dentists, Nurses, etc.
 */
export function PageHero({
  badge,
  badgeIcon,
  title,
  titleAccent,
  subtitle,
  accentColor = "primary",
  children,
}: PageHeroProps) {
  // Map accent color to Tailwind classes
  const glowMap: Record<string, string> = {
    primary: "bg-primary/30 blur-[100px]",
    teal: "bg-teal-500/30 blur-[100px]",
    blue: "bg-blue-500/30 blur-[100px]",
  };

  return (
    <section className="relative bg-primary text-primary-foreground pt-24 pb-16 px-4 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-1/2 -left-1/4 w-3/4 h-full rounded-full ${glowMap[accentColor] ?? glowMap.primary} opacity-30`} />
        <div className="absolute -bottom-1/2 -right-1/4 w-2/3 h-full rounded-full bg-accent/20 blur-[120px] opacity-20" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-6 text-primary-foreground/80 backdrop-blur-sm"
          >
            {badgeIcon}
            {badge}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4"
        >
          {titleAccent ? (
            <>
              {title.split(titleAccent)[0]}
              <span className="text-accent">{titleAccent}</span>
              {title.split(titleAccent)[1]}
            </>
          ) : (
            title
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="text-base md:text-lg text-primary-foreground/75 max-w-2xl mx-auto leading-relaxed mb-8 font-normal"
        >
          {subtitle}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px] pointer-events-none">
        <svg
          className="relative block w-full h-[40px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M1200 120L0 120 0 0 1200 120z" fill="#F8FAFC" />
        </svg>
      </div>
    </section>
  );
}
