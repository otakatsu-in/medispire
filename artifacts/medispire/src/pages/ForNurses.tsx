import { SEO } from "@/components/SEO";
import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { WEBINAR_DATE } from "@/config/webinar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HeartPulse, FileCheck, Globe2, Building2, Stethoscope, CheckCircle2, ChevronRight, Calculator, TrendingUp, AlertCircle } from "lucide-react";

const pathwaySteps = [
  { icon: Globe2,       title: "Learn German (B1 or B2)",       badge: "Start in India", desc: "Only B1 or B2 required — lower than doctors. We recommend B2 for smoother patient communication during your adaptation phase." },
  { icon: FileCheck,    title: "Anerkennung Application",         badge: "Defizitbescheid", desc: "We submit your GNM or BSc Nursing documents to German state authorities. They compare your syllabus and issue a Defizitbescheid (Deficiency Notice)." },
  { icon: Building2,    title: "Employer Interview",              badge: "Sponsored from India", desc: "We connect you with German hospitals or care homes. They interview you, offer a contract, and agree to sponsor your adaptation training." },
  { icon: Globe2,       title: "Visa & Relocation",               badge: "Move to Germany", desc: "With your Defizitbescheid and job contract, apply for the Recognition Partnership Visa. Fly to Germany and start earning immediately as a Nursing Assistant." },
  { icon: HeartPulse,   title: "Adaptation Course",               badge: "Earn While You Learn", desc: "Work in the hospital for 6–12 months, attend classes, and be assessed on the job. No massive final exam. Your employer pays for everything and you earn a monthly salary." },
  { icon: CheckCircle2, title: "Urkunde (Full Registration)",     badge: "Registered Nurse Status", desc: "Once adaptation is complete you receive your Urkunde (Pflegefachkraft license). Your salary increases significantly to full RN level." },
];

const salaries = [
  { role: "Pflegehilfskraft",  sub: "During adaptation (6–12 mo)", amount: "€2,200 – €2,600", desc: "Employer-paid training + salary" },
  { role: "Pflegefachkraft",   sub: "After Urkunde",              amount: "€3,000 – €4,500", desc: "Full RN rate + shift allowances" },
  { role: "ICU / OR Nurse",    sub: "After specialisation",       amount: "€4,000 – €5,500", desc: "Fachweiterbildung in ICU or Anesthesia" },
  { role: "Stationsleitung",   sub: "Head Nurse",                 amount: "€4,500 – €6,500+", desc: "Ward or facility management" },
];

const faqs = [
  { q: "Is GNM accepted or do I need a BSc?", a: "Both GNM and BSc Nursing are fully accepted. BSc nurses may have a slightly shorter adaptation period (e.g. 6 months instead of 10) because their syllabus has more theoretical hours, but both lead to the exact same 'Pflegefachkraft' registration." },
  { q: "Do I have to pay for the Adaptation Course?", a: "No. Your German employer (hospital or care home) sponsors the entire cost of the adaptation course AND pays you a monthly salary while you do it. This is the best part of the German system." },
  { q: "Adaptation Course vs Knowledge Exam — which is better?", a: "Over 90% of Indian nurses choose the Adaptation Course. It is a 6–12 month practical work period with no high-pressure final exam, and your employer pays for it. The Knowledge Exam (Kenntnisprüfung) is faster but involves a single oral-practical test that you can only repeat a limited number of times." },
  { q: "Can I bring my family to Germany?", a: "Yes. Once you receive your Urkunde and are earning a full RN salary, you can apply for family reunification visas. Your spouse is also legally allowed to work full-time in Germany." },
  { q: "What are working hours like compared to India?", a: "Significantly better. German law strictly enforces a 38.5–40 hour work week. Any overtime is either paid extra or compensated as time off. You get a minimum of 25–30 days paid vacation per year, plus extra pay for night, Sunday, and public holiday shifts." },
];

export default function ForNurses() {
  const { openBooking } = useBooking();

  

  return (
    <div className="w-full bg-[#F8FAFC]">
      <SEO title="For Nurses | GNM & BSc Pathway to Germany | MediSpire" description="Premium guidance and placement portal for healthcare professionals moving to Germany." />
      <SEO
        title="For Nurses | GNM & BSc Pathway to Germany | MediSpire"
        description="Germany has 200,000+ nursing vacancies. Learn the exact Anerkennung pathway for Indian GNM and BSc nurses to work, earn, and settle in Germany."
        canonical="/for-nurses"
      />

      <PageHero
        badge="Germany urgently needs 200,000+ Nurses"
        badgeIcon={<AlertCircle size={14} />}
        title="The Complete Pathway for Indian Nurses"
        titleAccent="Indian Nurses"
        subtitle="Whether you have a GNM or BSc Nursing degree, Germany offers a no-exam adaptation course, free training, a monthly salary during training, and full family visas."
      >
        <Button
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-3 rounded-full shadow-md transition-all hover:-translate-y-0.5"
          onClick={openBooking}
        >
          Book Free Assessment
        </Button>
      </PageHero>

      {/* Two Paths highlight */}
      <section className="py-10 px-4 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-primary">How do you clear your "Deficiencies"?</h2>
            <p className="text-sm text-muted-foreground mt-1">Germany gives you two choices. We strongly recommend Path A.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Path A — Recommended */}
            <div className="bg-white border-2 border-accent rounded-2xl p-6 relative shadow-sm">
              <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-widest">Recommended</div>
              <h3 className="text-lg font-bold text-primary mb-1">Path A: Adaptation Course</h3>
              <p className="text-xs text-accent font-bold mb-4">Anpassungslehrgang • 6–12 months</p>
              <ul className="space-y-2.5 text-sm">
                {["Work in a hospital for 6–12 months", "Earn a trainee salary (€2,200+/mo)", "No massive final exam — practical assessment only", "Employer pays for all training"].map(item => (
                  <li key={item} className="flex gap-2 items-start">
                    <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={15} />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 bg-accent/10 text-primary text-xs font-semibold px-4 py-2 rounded-xl">
                Over 90% of Indian nurses choose this stress-free path.
              </div>
            </div>

            {/* Path B */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-1">Path B: Knowledge Exam</h3>
              <p className="text-xs text-muted-foreground font-bold mb-4">Kenntnisprüfung • One-time oral & practical exam</p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {["Single high-pressure oral & practical test", "Requires intense self-study of German nursing law", "Can only be repeated a limited number of times", "Faster but significantly riskier"].map(item => (
                  <li key={item} className="flex gap-2 items-start">
                    <CheckCircle2 className="shrink-0 mt-0.5" size={15} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pathway Steps — compact grid */}
      <section className="py-10 px-4 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">The Anerkennung Roadmap</h2>
              <p className="text-sm text-muted-foreground mt-1">From learning German in India to receiving your Registered Nurse license in Germany.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pathwaySteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:border-accent/30 transition-all duration-200 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-yellow-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full">{step.badge}</span>
                </div>
                <h4 className="font-bold text-primary text-base mb-1.5">{step.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.36 }}
              className="bg-primary rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <TrendingUp className="text-accent mb-3" size={24} />
                <h4 className="font-bold text-white text-base mb-2">Ready to start your journey?</h4>
                <p className="text-white/70 text-sm leading-relaxed">We'll review your nursing degree and explain exactly how fast you can be working in a German hospital.</p>
              </div>
              <Button onClick={openBooking} className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl w-full text-sm">
                Join Free Webinar
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Salaries */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Nurse Salaries in Germany</h2>
              <p className="text-sm text-muted-foreground mt-1">Extra pay for nights, Sundays, and public holidays is legally mandated.</p>
            </div>
            <Link href="/tools/salary-calculator">
              <Button variant="outline" className="shrink-0 rounded-full px-5 py-2 text-sm font-bold border-accent text-primary hover:bg-accent hover:text-accent-foreground transition-all">
                <Calculator className="mr-2 h-4 w-4" /> Calculate Net Pay
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {salaries.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#F8FAFC] rounded-2xl p-5 border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
              >
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">{s.sub}</p>
                <h4 className="font-bold text-primary text-base mb-2">{s.role}</h4>
                <div className="text-base font-black text-accent mb-2 group-hover:bg-accent group-hover:text-white px-3 py-1 rounded-lg bg-white border border-border/50 inline-block transition-colors">
                  {s.amount}
                </div>
                <p className="text-muted-foreground text-xs mt-2">{s.desc}</p>
                <p className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-widest border-t border-border/50 pt-3 mt-3">Gross / month</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-[#1A2E4A] text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Critical Questions Answered</h2>
            <p className="text-sm text-white/60 mt-1">The most common doubts from Indian GNM & BSc Nurses.</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b-0 bg-white/5 rounded-xl px-5 data-[state=open]:bg-white/10 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-sm hover:text-accent py-4 hover:no-underline">
                  <span className="flex gap-3 items-start">
                    <span className="text-accent shrink-0 font-bold">Q.</span> {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-white/75 text-sm leading-relaxed pb-5 pl-7">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-white text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">Ready to start your journey?</h2>
          <p className="text-sm text-muted-foreground mb-8">Join our Free Weekly Webinar on {WEBINAR_DATE} to ask your questions directly to Dr. Sangeeta and get a realistic roadmap.</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-full shadow-lg transition-all hover:-translate-y-0.5" onClick={openBooking}>
            Join Free Webinar <ChevronRight className="ml-1 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
