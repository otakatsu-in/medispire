import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SmilePlus, FileCheck, Globe2, Building2, BookOpen, CheckCircle2, Landmark, Briefcase, ChevronRight, Calculator, TrendingUp, Quote } from "lucide-react";

const pathwaySteps = [
  { icon: Globe2,        title: "Language Mastery",          badge: "B2 + C1 Dental", desc: "Pass Goethe/TELC B2, then master C1 Dental German for patient consultations, treatment planning, and clinical documentation." },
  { icon: FileCheck,     title: "Document Verification",     badge: "Embassy Apostille", desc: "BDS/MDS degrees require Embassy Verification (not a standard Apostille). Submit to the Zahnärztekammer to receive your Defizitbescheid." },
  { icon: Building2,     title: "Relocation & Hospitation",  badge: "§16d Visa", desc: "Enter Germany on the Recognition Partnership Visa. Complete an observership in a German dental clinic to understand materials, protocols, and billing." },
  { icon: BookOpen,      title: "Fachsprachenprüfung (FSP)", badge: "Dental Language Exam", desc: "Simulate a dentist-patient consultation, write a treatment plan, and discuss it with a senior dentist. Passing grants your Berufserlaubnis." },
  { icon: Briefcase,     title: "Vorbereitungsassistent",    badge: "Earn from Day 1", desc: "With your Berufserlaubnis, work full-time as an Assistant Dentist under supervision, treating patients, while preparing for your final exam." },
  { icon: CheckCircle2,  title: "Kenntnisprüfung (KP)",      badge: "Equivalence Exam", desc: "Oral, practical and theoretical dental exam proving your knowledge meets German university standards. Required for full Approbation." },
  { icon: Landmark,      title: "Approbation, Fachzahnarzt, & Own Clinic",  badge: "Permanent License", desc: "Full Approbation granted. After 2 years as employed dentist you gain Kassenzulassung — the right to open or buy your own private practice." },
];

const salaries = [
  { role: "Vorbereitungsassistent", sub: "Assistant dentist", amount: "€3,000 – €4,500", desc: "From day 1 with Berufserlaubnis" },
  { role: "Angestellter Zahnarzt", sub: "Associate dentist", amount: "€5,000 – €8,000", desc: "After full Approbation" },
  { role: "Fachzahnarzt", sub: "Specialist", amount: "€7,000 – €12,000", desc: "Oral surgery, orthodontics etc." },
  { role: "Praxisinhaber", sub: "Clinic owner", amount: "€15,000 – €30,000+", desc: "After Kassenzulassung (2 yrs)" },
];

const faqs = [
  { q: "What happens to my Indian MDS degree in Germany?", a: "Germany does not automatically recognize an Indian MDS as a Fachzahnarzt. You must first gain your basic Approbation as a general dentist. Your MDS experience can then shorten your German specialization training significantly — without a brutal entrance exam like NEET-MDS." },
  { q: "Is the competition as fierce as in India?", a: "No! Germany is facing a massive wave of retiring clinic owners, creating very high demand for young, skilled dentists. There are no cut-throat entrance exams for specialty training." },
  { q: "What is the Zahnärztekammer?", a: "Unlike some countries where dentistry is under medicine, in Germany dentistry is fully independent. The Zahnärztekammer (State Dental Chamber) governs all dentists separately from the Ärztekammer that covers medical doctors." },
  { q: "Can I open my own clinic after passing the exams?", a: "After gaining Approbation, you must work as an employed dentist for at least 2 years (Assistenzzeit). This qualifies you for Kassenzulassung — the right to treat publicly insured patients and open or buy your own practice." },
  { q: "How much does the entire process cost?", a: "Expect to invest €8,000–€12,000 over 1.5–2 years. This includes language courses, translations, embassy fees, exam fees, flights, and initial living expenses. We can help you plan a detailed budget in your consultation." },
];

export default function ForDentists() {
  const { openBooking } = useBooking();

  // Title handled by SEO component

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  });

  return (
    <div className="w-full bg-[#F8FAFC]">
      <SEO
        title="For Dentists | BDS & MDS Pathway to Germany | MediSpire"
        description="Escape the high competition in India. Learn the exact steps to get your German Dental Approbation, open your own clinic, and secure your future."
        canonical="https://medispire.in/for-dentists"
        schema={faqSchema}
      />

      <PageHero
        badge="Exclusive Pathway for BDS/MDS Graduates"
        badgeIcon={<SmilePlus size={14} />}
        title="Leave the Competition Behind. Practice Dentistry in Germany."
        titleAccent="Practice Dentistry in Germany."
        subtitle="Escape the intense saturation and low starting salaries in India. Germany offers a clear pathway to Approbation — and ultimately, your own private clinic."
      >
        <Button
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-3 rounded-full shadow-md transition-all hover:-translate-y-0.5"
          onClick={openBooking}
        >
          Book Free Assessment
        </Button>
      </PageHero>

      {/* Sangeeta Pai Story */}
      <section className="py-10 px-4 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start shadow-sm">
            <Quote className="text-accent/30 shrink-0 w-10 h-10" />
            <div>
              <p className="text-base text-muted-foreground leading-relaxed italic mb-3">
                "Dr. Sangeeta Pai moved from India to Germany in 2013 and became the first doctor of Indian origin to receive board certification in Surgery and Implantology in Germany. Awarded 'Recommended Doctor in the Region' by Germany's FOCUS Magazine 2020."
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                <CheckCircle2 size={14} /> Direct mentorship from Dr. Sangeeta Pai available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pathway Steps — compact grid */}
      <section className="py-10 px-4 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">The Dental Approbation Roadmap</h2>
              <p className="text-sm text-muted-foreground mt-1">7 steps from your Indian BDS/MDS to German Approbation and clinic ownership.</p>
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
              transition={{ duration: 0.4, delay: 0.42 }}
              className="bg-primary rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <TrendingUp className="text-accent mb-3" size={24} />
                <h4 className="font-bold text-white text-base mb-2">Ready to start?</h4>
                <p className="text-white/70 text-sm leading-relaxed">Get a personalised plan from Dr. Sangeeta Pai who went through this exact process.</p>
              </div>
              <Button onClick={openBooking} className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl w-full text-sm">
                Free Consultation
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
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Dentist Salaries in Germany</h2>
              <p className="text-sm text-muted-foreground mt-1">High pay from day one — clinic owners sit at the top of German income brackets.</p>
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
            <p className="text-sm text-white/60 mt-1">Demystifying the German dental system for Indian BDS/MDS graduates.</p>
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
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">Your Dental Career Deserves Better.</h2>
          <p className="text-sm text-muted-foreground mb-8">Book a free consultation with our expert team in India to assess your BDS/MDS and get a realistic roadmap. Once enrolled, you'll receive direct mentorship from Dr. Sangeeta Pai.</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-full shadow-lg transition-all hover:-translate-y-0.5" onClick={openBooking}>
            Book Your Free Consultation <ChevronRight className="ml-1 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
