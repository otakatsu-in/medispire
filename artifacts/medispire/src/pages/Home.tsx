import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Stethoscope, ShieldCheck, HeartPulse, 
  Wallet, Scale, CalendarDays, TrendingUp, Hospital, 
  Plane, BookOpen, FileCheck, ArrowRight,
  Quote, CheckCircle2, MessageCircle, MapPin, GraduationCap, Award,
  Languages, FileBadge, ChevronRight
} from "lucide-react";

const founders = [
  {
    name: "Dr. Sandeep Amin",
    role: "Founder & CEO",
    specialty: "Diagnostic & Interventional Radiologist",
    photo: "/dr-sandeep.png",
    bio: "MBBS from BLD Institute, India. Moved to Germany in 2013. Became the first Indian doctor to receive the European Scholarship from CIRSE Society for Interventional Radiology.",
    credentials: [
      "First Indian — European Scholarship, CIRSE Society",
      "Board Certified — German & European Interventional Radiology Societies",
      "First Indian radiologist to establish a private practice in Germany",
      "Keynote speaker & published researcher",
    ],
  },
  {
    name: "Dr. Sangeeta Pai",
    role: "Co-Founder & COO",
    specialty: "Oral Implantologist & Maxillofacial Surgeon",
    photo: "/dr-sangeeta.png",
    bio: "BDS from SDM University, PG in Maxillofacial Surgery. Moved to Germany in 2013. First doctor of Indian origin to receive board certification in Surgery and Implantology in Germany.",
    credentials: [
      "First Indian board-certified in Surgery & Implantology in Germany",
      "\"Recommended Doctor\" — FOCUS Magazine Germany 2020",
      "Fellow — Royal College of Surgeons of Edinburgh",
      "Senior Consultant, Germany (since 2013)",
    ],
  },
];

const testimonials = [
  { quote: "Speaking to Dr. Amin even before coming to Germany gave me a clear picture of what to expect. His firsthand guidance was invaluable.", name: "Dr. Harish Prabhu", loc: "Now in Germany" },
  { quote: "Dr. Sangeeta Pai has had a great impact in my life. Her mentorship helped me navigate the German healthcare system with confidence.", name: "Dr. Akshaya Krishnamurthy", loc: "Now in Germany" },
  { quote: "She has constantly helped and motivated me throughout my journey from India to Germany. Couldn't have done it without her.", name: "Dr. Shyam", loc: "Now in Germany" },
  { quote: "I would highly recommend a career consultation with her to anyone planning to move to Germany. Absolutely life-changing advice.", name: "Dr. Renu Nain", loc: "Preparing from India" },
];

export default function Home() {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title = "MediSpire | Key to your practice in Germany";
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  };

  return (
    <div className="flex flex-col w-full">
      
      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <section
        className="relative pt-24 pb-28 px-4 overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #1A2E4A 0%, #0f1e33 50%, #1a3555 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Expert Guidance by German-Registered Doctors
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-5 leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Your Gateway to a Healthcare Career in{" "}
              <span className="text-accent relative inline-block">
                Germany
                <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-accent" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-white/75 mb-10 max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              Guidance from real German-registered doctors who've walked the same path. No agents. No hidden fees. No false promises.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-3 rounded-full shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:shadow-[0_0_35px_rgba(234,179,8,0.4)] transition-all"
                onClick={openBooking}
              >
                Book Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white font-bold px-8 py-3 rounded-full backdrop-blur-sm"
                onClick={() => document.getElementById('professions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Pathways
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
            >
              {[
                { val: "10+", label: "Years in Germany" },
                { val: "500+", label: "Professionals Guided" },
                { val: "0", label: "Hidden Fees" },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-extrabold text-white mb-0.5">{s.val}</span>
                  <span className="text-xs font-medium text-white/60 text-center uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px]">
          <svg className="relative block w-full h-[50px] md:h-[70px]" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.83,123.6,192.27,109.81,236.4,99.88,278.4,80.1,321.39,56.44Z" fill="#F4F6F8" />
          </svg>
        </div>
      </section>

      {/* ── 2. MEET THE FOUNDERS (Trust anchor — moved to position #2) ── */}
      <section className="py-14 bg-[#F4F6F8] px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-accent font-bold text-xs tracking-widest uppercase block mb-1">Who You're Speaking To</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary">Meet the Founders</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">Not agents. Not consultants who read about Germany. Indian doctors who moved there, got licensed, and built careers — and now guide you from the inside.</p>
            </div>
            <Link href="/about-us">
              <Button variant="outline" className="shrink-0 rounded-full px-5 py-2 text-sm font-bold border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                Full Story <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {founders.map((founder, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row"
              >
                {/* Photo */}
                <div className="sm:w-40 shrink-0 bg-[#F4F6F8] flex items-center justify-center p-4">
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    className="w-28 h-28 sm:w-full sm:h-auto object-contain rounded-xl"
                  />
                </div>

                {/* Details */}
                <div className="p-5 flex-1">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-primary">{founder.name}</h3>
                    <p className="text-accent text-xs font-bold uppercase tracking-widest">{founder.role}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{founder.specialty}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{founder.bio}</p>
                  <ul className="space-y-1.5">
                    {founder.credentials.map((c, ci) => (
                      <li key={ci} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground font-medium">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHY MEDISPIRE ─────────────────────────────────────────── */}
      <section className="py-14 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <span className="text-accent font-bold text-xs tracking-widest uppercase block mb-1">Why MediSpire</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary">The MediSpire Difference</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Stethoscope, title: "First-Hand Experience", desc: "Guidance from registered German doctors who personally navigated the MBBS → Approbation system and are still practising in Germany today." },
              { icon: MapPin,      title: "End-to-End Support",    desc: "Personalised roadmaps at every step — from language learning to job placement, FSP prep, visa, and settling in Germany." },
              { icon: ShieldCheck, title: "100% Transparent",      desc: "No agents. No hidden fees. No false promises. We earn your trust with honest, direct guidance from doctors, not salespeople." },
            ].map((f, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group bg-[#F8FAFC] p-7 rounded-2xl border border-border hover:border-accent/40 hover:shadow-md transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute -right-3 -top-6 text-[90px] font-black text-primary/[0.03] select-none pointer-events-none">0{i+1}</div>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 shadow-sm border border-border group-hover:bg-primary group-hover:border-primary transition-colors">
                  <f.icon size={22} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-bold mb-2 text-primary">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHO WE HELP ───────────────────────────────────────────── */}
      <section id="professions" className="py-14 px-4 bg-[#F4F6F8]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <span className="text-accent font-bold text-xs tracking-widest uppercase block mb-1">Career Pathways</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary">Who We Help</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl mx-auto">Tailored pathways for every Indian healthcare professional aiming to practice in Germany.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Doctors",      sub: "MBBS / MD / MS",            path: "/for-doctors",      icon: Stethoscope, color: "bg-[#1A2E4A]" },
              { title: "Dentists",     sub: "BDS / MDS",                  path: "/for-dentists",     icon: HeartPulse,  color: "bg-teal-700" },
              { title: "Nurses",       sub: "GNM / BSc / MSc Nursing",    path: "/for-nurses",       icon: Hospital,    color: "bg-blue-700" },
              { title: "Allied Health",sub: "Radiographers, Pharmacists", path: "/for-allied-health",icon: ShieldCheck, color: "bg-green-700" },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.45, delay: i * 0.08 }}>
                <Link href={item.path} className="block h-full">
                  <Card className="group h-full rounded-2xl overflow-hidden border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className={`${item.color} h-24 flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <item.icon size={40} className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardContent className="p-5 text-center bg-white">
                      <h3 className="text-base font-bold mb-1 text-primary">{item.title}</h3>
                      <p className="text-muted-foreground text-xs mb-4">{item.sub}</p>
                      <div className="inline-flex items-center gap-1 text-primary text-sm font-bold group-hover:text-accent transition-colors">
                        View Pathway <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="py-14 bg-primary text-primary-foreground px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-accent font-bold text-xs tracking-widest uppercase block mb-1">Success Stories</span>
              <h2 className="text-2xl md:text-3xl font-extrabold">What Doctors Say About MediSpire</h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm relative"
              >
                <Quote className="absolute top-5 left-5 text-accent/20 w-10 h-10" />
                <div className="relative z-10">
                  <p className="text-sm text-white/85 leading-relaxed italic mb-5">"{t.quote}"</p>
                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm shrink-0">
                      {t.name.charAt(3)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <p className="text-white/50 text-xs">{t.loc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. WHY GERMANY — compact stat strip ──────────────────────── */}
      <section className="py-14 bg-[#F4F6F8] px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-accent font-bold text-xs tracking-widest uppercase block mb-1">Destination</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary">Why Choose Germany?</h2>
              <p className="text-sm text-muted-foreground mt-1">One of the world's best systems — and it urgently needs Indian healthcare professionals.</p>
            </div>
            <Link href="/why-germany">
              <Button variant="outline" className="shrink-0 rounded-full px-5 py-2 text-sm font-bold border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                Learn More <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Wallet,      title: "€5,000–€10,000/mo",   desc: "Starting doctor salary. Regulated by union tariffs — identical for all nationalities." },
              { icon: Scale,       title: "40-Hour Work Week",    desc: "Strict labor laws. Overtime paid or compensated with extra rest days." },
              { icon: CalendarDays,title: "30 Days Paid Leave",   desc: "Legally mandated annual leave plus all public holidays." },
              { icon: TrendingUp,  title: "50,000+ Vacancies",   desc: "Current doctor shortage across Germany. Job security from day one." },
              { icon: FileCheck,   title: "Path to PR",           desc: "Clear, accelerated route to Permanent Residency and German Citizenship." },
              { icon: ShieldCheck, title: "Full Social Security", desc: "Health, unemployment, and pension insurance — all covered from your first day." },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white p-5 rounded-2xl border border-border hover:shadow-md hover:border-primary/30 transition-all duration-200 flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <item.icon size={18} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SERVICES STRIP ────────────────────────────────────────── */}
      <section className="py-16 bg-[#F8FAFC] px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-accent font-bold text-xs tracking-widest uppercase block mb-1">Our Services</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary">Choose Your Pathway</h2>
              <p className="text-sm text-muted-foreground mt-1">We've simplified our services into two specialized areas.</p>
            </div>
            <Link href="/services">
              <Button variant="outline" className="shrink-0 rounded-full px-5 py-2 text-sm font-bold border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                View Pricing & Details
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/services#preparation" className="block group">
              <Card className="h-full border-2 border-transparent hover:border-accent/50 transition-all shadow-sm group-hover:shadow-md bg-white">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                    <FileBadge size={28} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Documentation & Prep</h3>
                  <p className="text-muted-foreground mb-6">
                    From ₹499 document checking to a full ₹25,000 done-for-you concierge service. Get the exact help you need.
                  </p>
                  <span className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore Preparation Services <ChevronRight size={16} />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/services#language" className="block group">
              <Card className="h-full border-2 border-transparent hover:border-accent/50 transition-all shadow-sm group-hover:shadow-md bg-white">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                    <Languages size={28} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Language Learning</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect with authorized German tutors and enroll in our specialized C1 Medical German course for doctors.
                  </p>
                  <span className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore Language Services <ChevronRight size={16} />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. FINAL CTA ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#1A2E4A] text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp}>
            <span className="text-accent font-bold text-xs tracking-widest uppercase block mb-4">Ready to Begin?</span>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4 leading-tight">
              Take the First Step Towards Your German Medical Career
            </h2>
            <p className="text-white/70 text-base mb-10 max-w-xl mx-auto">
              Book a free 1-on-1 consultation with our expert team in India to get a personalised roadmap within 48 hours. Once enrolled, you'll receive direct mentorship from Dr. Sandeep Amin and Dr. Sangeeta Pai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-10 py-3 rounded-full shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:shadow-[0_0_35px_rgba(234,179,8,0.4)] transition-all"
                onClick={openBooking}
              >
                Book Free Consultation
              </Button>
              <a
                href="https://wa.me/918310010112"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                Or message us on <MessageCircle size={16} className="text-[#25D366]" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}