import { SEO } from "@/components/SEO";
import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WEBINAR_DATE } from "@/config/webinar";
import { 
  Stethoscope, GraduationCap, FileCheck, 
  Globe2, Building2, BookOpen,
  Landmark, Briefcase, ChevronRight, Calculator, TrendingUp
} from "lucide-react";

const pathwaySteps = [
  { icon: Globe2,        title: "Language Mastery", badge: "B2 + C1 Medical", desc: "Pass Goethe/TELC B2, then master C1 Medical German. This is the foundation for your visa, FSP exam, and day-to-day clinical communication." },
  { icon: FileCheck,     title: "Document Verification", badge: "Embassy Apostille", desc: "Indian degrees require Embassy Verification (Urkundenüberprüfung) — not a standard Apostille. Submit to the State Ärztekammer to receive your Defizitbescheid." },
  { icon: Building2,     title: "Relocation & Hospitation", badge: "§16d Visa", desc: "Enter Germany on the Recognition Partnership Visa. Complete an observership (Hospitation) in a German hospital to acclimatize before the FSP exam." },
  { icon: BookOpen,      title: "Fachsprachenprüfung (FSP)", badge: "Medical Language Exam", desc: "Simulate a doctor-patient consultation in German, write a medical report, and discuss the case. Passing this grants you the Berufserlaubnis (Temporary License)." },
  { icon: Briefcase,     title: "Work as Assistenzarzt", badge: "Earn ~€5,000/mo", desc: "With your Berufserlaubnis, legally work full-time under supervision in a German hospital while you prepare for the Kenntnisprüfung." },
  { icon: GraduationCap, title: "Kenntnisprüfung (KP)", badge: "Medical Equivalence Exam", desc: "Oral-practical exam covering Internal Medicine, Surgery, and Pharmacology to prove your knowledge meets German university standards." },
  { icon: Landmark,      title: "Approbation & Facharzt", badge: "Permanent License", desc: "Full Approbation granted. Now enter the 5–6 year specialty training (Facharzt) of your choice — no entrance exam like NEET-PG." },
];

const salaries = [
  { role: "Assistenzarzt", sub: "Resident, Year 1", amount: "€5,100 – €5,600", desc: "From day 1 with Berufserlaubnis" },
  { role: "Facharzt",      sub: "After specialisation", amount: "€6,800 – €8,800", desc: "5–6 year specialty training" },
  { role: "Oberarzt",      sub: "Senior Consultant", amount: "€8,600 – €11,000", desc: "Leading a department" },
  { role: "Chefarzt",      sub: "Head of Department", amount: "€10,000 – €25,000+", desc: "Incl. private patient billing" },
];

const faqs = [
  { q: "Is my Indian MBBS/MD/MS degree automatically recognized?", a: "No. India is a non-EU country, so your curriculum must be assessed for equivalence. Almost all Indian doctors receive a Defizitbescheid and must pass the Kenntnisprüfung (KP) to prove their medical knowledge meets German standards." },
  { q: "Do I have to repeat my MD/MS in Germany?", a: "Germany does not recognize an Indian MDS/MS as a Facharzt. However, your Indian clinical experience is often credited towards the 5–6 year German specialty training, shortening your overall path significantly." },
  { q: "What is the difference between Berufserlaubnis and Approbation?", a: "Berufserlaubnis is a temporary, supervised license (up to 2 years) allowing you to work and earn a salary while preparing for exams. Approbation is the permanent, unrestricted medical license granted after passing the KP." },
  { q: "Can I choose my medical specialty?", a: "Yes! Unlike NEET-PG, in Germany you apply directly to hospitals for a residency in your desired specialty. Internal Medicine, Surgery, and Anaesthesia have very high vacancy rates." },
  { q: "How much does the entire process cost?", a: "Expect to invest €8,000–€12,000 over 1.5–2 years (language courses, translations, embassy fees, exam fees, flights, initial living expenses). We can help you budget this in our free webinar." },
];

export default function ForDoctors() {
  const { openBooking } = useBooking();

  

  return (
    <div className="w-full bg-[#F8FAFC]">
      <SEO title="For Doctors | MBBS/MD/MS Pathway to Germany | MediSpire" description="Premium guidance and placement portal for healthcare professionals moving to Germany." />
      <SEO 
        title="For Doctors | MBBS & MD/MS Pathway to Germany | MediSpire"
        description="The ultimate guide for Indian doctors. Learn the exact steps to get your German Approbation, pass the FSP & KP exams, and secure a high-paying residency."
        canonical="/for-doctors"
      />

      <PageHero
        badge="Exclusive Pathway for MBBS/MD/MS Graduates"
        badgeIcon={<Stethoscope size={14} />}
        title="The Complete Guide to German Approbation"
        titleAccent="German Approbation"
        subtitle="Navigate the FSP, Berufserlaubnis, and Kenntnisprüfung with guidance from Indian doctors already practising in Germany."
      >
        <Button
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-3 rounded-full shadow-md transition-all hover:-translate-y-0.5"
          onClick={openBooking}
        >
          Book Free Assessment
        </Button>
      </PageHero>

      {/* Pathway Steps — compact grid */}
      <section className="py-14 px-4 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">The Medical Recognition Pathway</h2>
              <p className="text-sm text-muted-foreground mt-1">7 steps from your Indian degree to a German Approbation.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium shrink-0">
              <span className="w-3 h-3 rounded-full bg-accent inline-block"></span> Key milestone
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
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full">
                    {step.badge}
                  </span>
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
                <h4 className="font-bold text-white text-base mb-2">Ready to start your journey?</h4>
                <p className="text-white/70 text-sm leading-relaxed">Get a personalised roadmap from a doctor who has lived this process.</p>
              </div>
              <Button
                onClick={openBooking}
                className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl w-full text-sm"
              >
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
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Salaries in Germany</h2>
              <p className="text-sm text-muted-foreground mt-1">Regulated by union tariffs — identical pay regardless of nationality.</p>
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
                <div className="text-lg font-black text-accent mb-2 group-hover:bg-accent group-hover:text-white px-3 py-1 rounded-lg bg-white border border-border/50 inline-block transition-colors text-sm">
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
            <p className="text-sm text-white/60 mt-1">Everything Indian doctors ask before making the move.</p>
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
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">Stop reading generic advice.<br />Speak to a Doctor who did it.</h2>
          <p className="text-sm text-muted-foreground mb-8">Join our Free Weekly Webinar on {WEBINAR_DATE} to ask your questions directly to Dr. Sangeeta and get a personalized roadmap.</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-full shadow-lg transition-all hover:-translate-y-0.5" onClick={openBooking}>
            Join Free Webinar <ChevronRight className="ml-1 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
