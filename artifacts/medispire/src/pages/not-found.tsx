import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowRight, Stethoscope } from "lucide-react";

export default function NotFound() {
  const quickLinks = [
    { label: "For Doctors", href: "/for-doctors" },
    { label: "For Dentists", href: "/for-dentists" },
    { label: "For Nurses", href: "/for-nurses" },
    { label: "Free Tools", href: "/eligibility-checker" },
    { label: "The Course", href: "/services" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-[#F4F6F8] px-4">
      <SEO
        title="Page Not Found | MediSpire"
        description="The page you are looking for could not be found. Explore MediSpire's resources for Indian healthcare professionals moving to Germany."
        noIndex={true}
      />

      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Stethoscope className="w-12 h-12 text-primary opacity-60" />
          </div>
        </div>

        {/* Heading */}
        <p className="text-accent font-bold text-xs tracking-widest uppercase mb-3">404 — Page Not Found</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
          Looks like this page took<br className="hidden sm:block" /> a wrong turn in Germany.
        </h1>
        <p className="text-muted-foreground text-base mb-10 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or may have been moved. Let us point you in the right direction.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-full px-8">
              <Home size={18} />
              Go to Homepage
            </Button>
          </Link>
          <Link href="/blog">
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white">
              <Search size={18} />
              Browse Blog
            </Button>
          </Link>
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
          <p className="text-sm font-semibold text-muted-foreground mb-4">Popular Pages</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="flex items-center gap-1 text-sm text-foreground hover:text-accent font-medium transition-colors cursor-pointer group">
                  <ArrowRight size={14} className="shrink-0 text-accent group-hover:translate-x-0.5 transition-transform" />
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
