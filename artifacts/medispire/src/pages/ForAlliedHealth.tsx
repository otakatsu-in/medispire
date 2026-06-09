import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pill, Scan, SmilePlus, MessageCircle, ArrowRight, Stethoscope, ChevronRight, Euro } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";

const professions = [
  {
    id: "nurses",
    icon: Stethoscope,
    title: "Nurses",
    german: "Gesundheits- und Krankenpfleger/in",
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-700",
    intro: "Nursing in Germany offers incredible security and growth. Because the pathway is highly structured and complex, we have created a dedicated, in-depth guide specifically for Indian nursing professionals.",
    isLink: true,
    linkPath: "/for-nurses"
  },
  {
    id: "dental",
    icon: SmilePlus,
    title: "Dental Assistants",
    german: "Zahnmedizinische Fachangestellte (ZFA)",
    color: "bg-teal-50 border-teal-200",
    accent: "text-teal-700",
    intro: "The ZFA (Dental Medical Assistant) is a recognised German training profession. Indian dental assistants and staff from dental clinics can apply for equivalence recognition and find strong opportunities in Germany's booming private dental sector.",
    steps: [
      { t: "German Language (B2)", d: "Strong German is essential for chair-side assistance, patient communication, and dental documentation. B2 minimum; C1 preferred." },
      { t: "Apply for Equivalence Assessment", d: "Apply to the relevant regional Dental Chamber (Zahnärztekammer). Your Indian qualifications and work experience will be assessed." },
      { t: "Document Preparation", d: "Degree certificates, proof of training, work experience letters, and employer references — all apostilled and translated." },
      { t: "Adaptation Measures", d: "If gaps are identified, you may complete a supervised adaptation period in a German dental practice." },
      { t: "Job Application", d: "German dental practices are actively hiring. We prepare your German CV (Lebenslauf) and help identify practices." },
    ],
    salary: [
      { role: "ZFA (Entry Level)", range: "€2,000 – €2,600" },
      { role: "ZFA (Experienced)", range: "€2,600 – €3,200" },
      { role: "Praxismanagerin (Manager)", range: "€3,000 – €4,000" },
    ],
  },
  {
    id: "radiographers",
    icon: Scan,
    title: "Radiographers",
    german: "Medizinisch-technische Radiologieassistenten (MTRA)",
    color: "bg-purple-50 border-purple-200",
    accent: "text-purple-700",
    intro: "Germany has a significant shortage of MTRAs. Indian radiographers with BSc in Radiology or Medical Imaging Technology have a strong pathway to recognition and employment in German hospitals and imaging centres.",
    steps: [
      { t: "German Language (B2)", d: "B2 German is required for the recognition process and for effective team communication in radiology departments." },
      { t: "State Authority Application", d: "Apply to the state health authority. Your Indian BSc Radiology degree is evaluated against the German MTRA training standard." },
      { t: "Document Translation", d: "Radiology degree, transcripts, clinical experience certificates, and proof of licensure — all certified by authorised translators." },
      { t: "Practical Adaptation", d: "If your qualification is deemed partially equivalent, you will complete a supervised clinical adaptation period." },
      { t: "Recognition & Employment", d: "Work in CT, MRI, X-Ray, Nuclear Medicine, and Radiation Therapy in public hospitals or private clinics." },
    ],
    salary: [
      { role: "MTRA (Entry Level)", range: "€2,600 – €3,200" },
      { role: "MTRA (Experienced)", range: "€3,200 – €3,900" },
      { role: "Leitende MTRA (Senior)", range: "€4,000 – €5,200" },
    ],
  },
  {
    id: "pharmacists",
    icon: Pill,
    title: "Pharmacists",
    german: "Apotheker/in",
    color: "bg-green-50 border-green-200",
    accent: "text-green-700",
    intro: "Indian B.Pharm and M.Pharm graduates can seek Approbation as Apotheker/in in Germany. The German pharmacy profession is well regulated, well paid, and offers hospital and community pharmacy pathways.",
    steps: [
      { t: "German Language (C1)", d: "Pharmacists need C1 German — requirements are strict given patient counselling responsibilities. Typically 18–24 months of study." },
      { t: "Application for Approbation", d: "Apply to the relevant state's licensing authority. Your degree is evaluated against the German Approbationsordnung." },
      { t: "Document Preparation", d: "Pharmacy degree, Pharmacy Council registration, good standing certificate, work experience. All apostilled and translated." },
      { t: "Equivalence Exam", d: "Pass the Kenntnisprüfung (knowledge exam) covering pharmacology, chemistry, and pharmacy law." },
      { t: "Approbation & Registration", d: "Register with the State Chamber of Pharmacists (Landesapothekerkammer) and work in community or hospital pharmacy." },
    ],
    salary: [
      { role: "Apotheker/in (Community)", range: "€3,500 – €4,500" },
      { role: "Apotheker/in (Hospital)", range: "€4,000 – €5,200" },
      { role: "Filialleiter/in (Manager)", range: "€5,000 – €6,500" },
      { role: "Leitende/r Apotheker/in", range: "€6,000 – €9,000" },
    ],
  },
];

const faqs = [
  { q: "What German language level do I need as an allied health professional?", a: "B2 is the minimum for most allied health roles (ZFA, MTRA). Pharmacists require C1. MediSpire recommends aiming for C1 for better clinical integration and faster career progression." },
  { q: "Can I work in Germany while my recognition is being processed?", a: "Yes, Germany's Recognition Partnership Visa (§16d AufenthG) allows allied health professionals to enter Germany and work while completing their recognition process. Some states have fast-track programmes. MediSpire advises on state-specific strategies." },
  { q: "How long does the recognition process take?", a: "Recognition typically takes 3–12 months from submitting a complete application. Delays usually come from incomplete documentation. MediSpire helps you prepare a complete, correct application package from the start." },
  { q: "Is my work experience from India considered?", a: "Yes. Clinical work experience counts toward the equivalence assessment and can sometimes compensate for minor qualification gaps. The more documented your experience, the stronger your application." },
  { q: "Which German state is best for allied health recognition?", a: "Processing times and requirements vary by state. Some states like Bavaria, Baden-Württemberg, and Berlin have more streamlined processes. MediSpire advises on optimal state selection based on your profession and target employer location." },
];

export default function ForAlliedHealth() {
  const { openBooking } = useBooking();
  const [activeTab, setActiveTab] = useState<string>("dental");

  const activeProfession = professions.find(p => p.id === activeTab);

  return (
    <div className="w-full bg-[#F8FAFC]">
      <SEO 
        title="For Allied Health Professionals | MediSpire"
        description="Recognition pathways for Dental Assistants, Radiographers, and Pharmacists moving from India to Germany."
        canonicalUrl="/for-allied-health"
      />

      <PageHero
        badge="Allied Health Recognition Pathways"
        badgeIcon={<Stethoscope size={14} />}
        title="Allied Health Professionals in Germany"
        titleAccent="in Germany"
        subtitle="Clear, accurate recognition pathways for Dental Assistants, Radiographers, Pharmacists, and Nurses moving from India to Germany."
      />

      {/* Interactive Tabs Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Tab Selector */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {professions.map((p) => {
              const isActive = activeTab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`relative overflow-hidden group flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 ${isActive ? 'bg-white border-accent shadow-xl scale-105' : 'bg-white/60 border-transparent shadow-sm hover:bg-white hover:border-primary/20 hover:shadow-md'}`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${isActive ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/5'}`}>
                    <p.icon size={28} />
                  </div>
                  <h3 className={`font-bold text-lg text-center ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>
                    {p.title}
                  </h3>
                  {isActive && (
                    <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-1.5 bg-accent" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Dynamic Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border"
            >
              {activeProfession?.isLink ? (
                // Nurses Special View
                <div className="text-center py-12 max-w-2xl mx-auto">
                  <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Stethoscope size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-2">Nursing has a Dedicated Pathway</h2>
                  <p className="text-blue-600 font-bold mb-6">Pflegefachkraft / Gesundheits- und Krankenpfleger/in</p>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {activeProfession.intro} We cover BSc Nursing recognition, the Anerkennungsberatung process, visa strategies, and exact salary expectations.
                  </p>
                  <Link href={activeProfession.linkPath || "/for-nurses"}>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                      Read the Full Nursing Guide <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </div>
              ) : (
                // Standard Allied Health View
                <div className="grid lg:grid-cols-12 gap-12">
                  
                  {/* Left Column: Intro & Salary */}
                  <div className="lg:col-span-5 space-y-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-bold mb-4">
                        {activeProfession?.icon && <activeProfession.icon size={16} />} German Equivalent
                      </div>
                      <h2 className="text-3xl font-extrabold text-primary mb-2">{activeProfession?.title}</h2>
                      <p className={`font-bold text-lg mb-4 ${activeProfession?.accent}`}>{activeProfession?.german}</p>
                      <p className="text-muted-foreground text-lg leading-relaxed">{activeProfession?.intro}</p>
                    </div>

                    <div className="bg-[#F8FAFC] border border-border rounded-2xl p-6">
                      <h3 className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
                        <Euro className="text-accent" /> Salary Expectations
                      </h3>
                      <div className="space-y-3">
                        {activeProfession?.salary?.map((row, i) => (
                          <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0 last:pb-0">
                            <span className="font-medium text-foreground">{row.role}</span>
                            <span className="font-bold text-primary bg-white px-3 py-1 rounded-md shadow-sm border border-border/50">{row.range}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button onClick={openBooking} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 text-lg rounded-xl shadow-lg transition-all hover:-translate-y-1">
                      Discuss My Recognition Chances
                    </Button>
                  </div>

                  {/* Right Column: Pathway Steps */}
                  <div className="lg:col-span-7">
                    <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                      Your Pathway to Germany
                    </h3>
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                      {activeProfession?.steps?.map((step, idx) => (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-primary text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                            {idx + 1}
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white border border-border p-5 rounded-2xl shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300">
                            <h4 className="font-bold text-primary mb-2 text-lg">{step.t}</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">{step.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-lg">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl shadow-[#25D366]/20">
              <MessageCircle size={40} className="text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-primary mb-2">Not sure where your degree fits?</h3>
              <p className="text-muted-foreground text-lg">Chat directly with our doctors on WhatsApp. We can quickly assess your Indian qualifications and tell you your options in Germany.</p>
            </div>
            <a
              href="https://wa.me/918310010112?text=Hi%20MediSpire!%20I%20am%20an%20allied%20health%20professional%20and%20need%20guidance%20about%20moving%20to%20Germany."
              target="_blank"
              rel="noreferrer"
              className="shrink-0 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
          </div>
          <Accordion type="single" collapsible className="w-full bg-[#F8FAFC] border border-border rounded-2xl px-6 shadow-sm">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b-border/50 last:border-0">
                <AccordionTrigger className="text-left font-bold text-primary hover:text-accent py-5">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
