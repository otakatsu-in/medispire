import { SEO } from "@/components/SEO";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { PageHero } from "@/components/PageHero";
import { FileText, Download, BookOpen, HelpCircle } from "lucide-react";

const leadMagnets = [
  {
    title: "Complete Document Checklist",
    sub: "For Doctors Moving to Germany",
    desc: "Every document you need, which body issues it, whether it needs Apostille, and the rough processing time.",
    tag: "Most Downloaded",
  },
  {
    title: "German Language Roadmap",
    sub: "A1 → C1 Medical German",
    desc: "A week-by-week timeline and recommended resources for reaching C1 Medical German from absolute zero.",
    tag: "For All Professions",
  },
  {
    title: "FSP 30-Day Study Plan",
    sub: "Fachsprachenprüfung Prep Guide",
    desc: "Structured daily plan, sample consultation scripts, and common mistakes to avoid before your FSP exam.",
    tag: "For Doctors & Dentists",
  },
  {
    title: "Salary Guide 2026",
    sub: "What Indian Healthcare Professionals Earn in Germany",
    desc: "Gross and estimated net salaries for doctors, dentists, nurses, and allied health — by state and specialty.",
    tag: "Free Download",
  },
];

const glossary = [
  { term: "Approbation",              desc: "Full permanent medical license to practice in Germany without restrictions." },
  { term: "Berufserlaubnis",          desc: "Temporary supervised license (up to 2 years) — lets you work while preparing for the KP." },
  { term: "Fachsprachenprüfung (FSP)",desc: "Medical language exam: simulate a doctor-patient consultation in German. Passing it grants the Berufserlaubnis." },
  { term: "Kenntnisprüfung (KP)",     desc: "Medical equivalence exam that proves your knowledge matches a German university graduate's standard." },
  { term: "Defizitbescheid",          desc: "Deficiency notice from the Ärztekammer that lists gaps between your Indian degree and the German standard." },
  { term: "Ärztekammer",              desc: "State Medical Chamber — the authority that regulates doctors and issues the Approbation." },
  { term: "Zahnärztekammer",          desc: "State Dental Chamber — equivalent of the Ärztekammer specifically for dentists." },
  { term: "Hospitation",              desc: "Unpaid observership/shadowing in a German hospital to acclimatize before your exams." },
  { term: "Assistenzarzt",            desc: "Junior doctor / resident. The role you work in once you receive your Berufserlaubnis." },
  { term: "Facharzt",                 desc: "Specialist doctor. Achieved after 5–6 years of structured specialty training (Weiterbildung)." },
  { term: "Weiterbildung",            desc: "Postgraduate specialty training programme, typically 5–6 years for a Facharzt." },
  { term: "Anmeldung",                desc: "Official registration of your address with the local Einwohnermeldeamt — first admin task after arriving." },
  { term: "Niederlassungserlaubnis",  desc: "Permanent residence permit — typically granted after 5 years of legal residence." },
  { term: "Pflegefachkraft",          desc: "Registered Nurse (full license) — what Indian GNM/BSc nurses become after completing Anerkennung." },
  { term: "Anpassungslehrgang",       desc: "Adaptation course for nurses: 6–12 months of supervised hospital work, employer-paid, replaces the KP exam." },
  { term: "Kassenzulassung",          desc: "Authorisation to treat publicly insured patients — required before opening your own dental/medical clinic." },
];

const faqCategories = [
  {
    category: "Timeline & Process",
    faqs: [
      { q: "How long does the process take from India to working in Germany?", a: "Typically 2–4 years, depending on your language learning speed and the processing times at the state Ärztekammer. Language learning alone takes 1.5–2 years for most people." },
      { q: "Can I do the process while still working in India?", a: "Yes. You can learn German and prepare documents while employed in India. You only need to travel to Germany for Hospitation, exams, or your job start date." },
      { q: "What happens after I receive my Defizitbescheid?", a: "You apply for a Recognition Partnership Visa, find a German hospital willing to host your Hospitation, and begin preparing for the FSP exam. We guide each of these steps." },
    ],
  },
  {
    category: "Language & Exams",
    faqs: [
      { q: "Is German language truly mandatory?", a: "Yes. You cannot work as a medical professional in Germany without at least B2 general German and the C1 medical language exam (FSP/Fachsprachenprüfung). There is no English-language pathway." },
      { q: "What is the FSP exam and how do I prepare?", a: "The FSP tests your ability to talk with patients, write a medical report, and discuss cases with senior doctors — all in German. Preparation involves specialised coaching, mock consultations, and learning clinical terminology. We provide a 30-day study plan you can download above." },
      { q: "How is the FSP different from the Kenntnisprüfung (KP)?", a: "The FSP is purely a language exam — it tests communication, not medical knowledge. The KP is a medical equivalence exam that tests your clinical knowledge against German university standards. You need to pass the FSP first to get the Berufserlaubnis, then work and prepare for the KP." },
    ],
  },
  {
    category: "Documents & Visa",
    faqs: [
      { q: "What documents do I need to start the Approbation process?", a: "Core documents: degree certificate, transcripts, medical registration (good standing certificate), passport, and birth certificate — all translated by a certified translator and either Apostilled or Embassy-verified (for Indian degrees, Embassy verification is required, not just Apostille)." },
      { q: "What visa do I need to come to Germany as a healthcare professional?", a: "If you have a job offer: EU Blue Card or Work Visa. If you are coming for a Hospitation or job search: a Job Seeker Visa (up to 6 months). For recognition: the Recognition Partnership Visa (§16d AufenthG)." },
      { q: "Are specific German states easier for foreign doctors?", a: "Yes. Processing times vary significantly. States like NRW, Bavaria, and Baden-Württemberg generally have more experience with international applicants. State selection can affect your waiting time by 6–12 months." },
    ],
  },
  {
    category: "Family & Life in Germany",
    faqs: [
      { q: "Can I bring my family to Germany?", a: "Yes. Once you have an appropriate work visa or Blue Card and sufficient income, your spouse and dependent children can join on family reunification visas. Your spouse is legally allowed to work full-time in Germany." },
      { q: "What is the cost of living compared to India?", a: "Rent, health insurance, and food costs are significantly higher. However, German salaries are 5–10× higher than Indian equivalents, and social benefits (free schooling, subsidised childcare, strong pension) make the net quality of life significantly better." },
      { q: "Is Germany better than UK, Australia, or Canada for Indian doctors?", a: "Germany offers a faster, clearer path to specialisation with no PLAB/AMC-style single big exam bottleneck. There is no lottery for residency spots. Work-life balance is stronger (40-hour weeks, 30 days leave). The EU Blue Card gives Schengen-wide travel freedom. Pathway to PR is also faster (21 months with Blue Card)." },
    ],
  },
  {
    category: "Nurses & Allied Health",
    faqs: [
      { q: "Can nurses also move to Germany from India?", a: "Yes. Germany has over 200,000 nursing vacancies. Both GNM and BSc Nursing degrees are accepted. The process (called Anerkennung) is simpler than for doctors — most nurses do a 6–12 month adaptation course (Anpassungslehrgang) where their employer pays for the training and a monthly salary." },
      { q: "What is the recognition process for Indian nursing degrees?", a: "Your curriculum is compared to the German standard. Gaps are listed in a Defizitbescheid. You then complete either an adaptation course (Anpassungslehrgang — recommended) or a knowledge exam (Kenntnisprüfung) in Germany. The adaptation course is fully employer-paid." },
      { q: "Can allied health professionals (pharmacists, radiographers) also move?", a: "Yes. Pharmacists follow a similar Approbation pathway to doctors. Radiographers, physiotherapists, and others undergo degree recognition (Anerkennung). Processing varies significantly by profession and state — contact us for a profession-specific assessment." },
    ],
  },
];

export default function Resources() {
  const { toast } = useToast();
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState("");

  // Title handled by SEO component

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap(cat => cat.faqs).map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    
    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          email,
          phone: "",
          profession: "",
          subject: "Resource Download",
          message: `Requested resource: ${selectedResource}`,
          source: "Resources Page Download",
        }),
      });

      if (!response.ok) throw new Error("Failed");
      
      toast({ title: "Guide sent!", description: `Check your inbox at ${email}` });
      setDownloadModalOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to process request. Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC]">
      <SEO
        title="Resources & FAQ | MediSpire"
        description="Free guides, glossary of German medical terms, and comprehensive FAQ for Indian doctors, dentists, and nurses planning to move to Germany."
        canonical="/resources"
        schema={faqSchema}
      />

      <PageHero
        badge="Free Resources & Guides"
        badgeIcon={<BookOpen size={14} />}
        title="Resources & FAQ"
        titleAccent="FAQ"
        subtitle="Downloadable guides, a glossary of German medical terms, and answers to the most common questions from Indian healthcare professionals."
      />

      {/* ── Downloadable Guides ─────────────────────────────────── */}
      <section className="py-14 px-4 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Free Downloadable Guides</h2>
            <p className="text-sm text-muted-foreground mt-1">Enter your email to receive any guide instantly in your inbox.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {leadMagnets.map((res, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-border p-6 flex flex-col hover:shadow-md hover:border-accent/30 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <FileText size={18} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full">
                    {res.tag}
                  </span>
                </div>
                <h4 className="font-bold text-primary text-sm mb-1">{res.title}</h4>
                <p className="text-xs text-accent font-semibold mb-3">{res.sub}</p>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-5">{res.desc}</p>
                <Button
                  size="sm"
                  onClick={() => { setSelectedResource(res.title); setDownloadModalOpen(true); }}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Download size={13} /> Download Free
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Glossary ────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Glossary of German Medical & Legal Terms</h2>
            <p className="text-sm text-muted-foreground mt-1">Every confusing word explained simply — bookmark this page.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {glossary.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="bg-[#F8FAFC] rounded-xl border border-border px-5 py-4 hover:border-accent/40 hover:bg-accent/5 transition-all duration-150 group"
              >
                <div className="flex items-start gap-3">
                  <BookOpen size={14} className="text-accent shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-primary text-sm block mb-1">{item.term}</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-[#1A2E4A] text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-10">
            <span className="text-accent font-bold text-xs uppercase tracking-widest block mb-2">Comprehensive FAQ</span>
            <h2 className="text-2xl md:text-3xl font-bold">Every Question Answered</h2>
            <p className="text-white/60 text-sm mt-1">Grouped by topic so you can find exactly what you need.</p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((cat, ci) => (
              <div key={ci}>
                <div className="flex items-center gap-3 mb-4">
                  <HelpCircle size={16} className="text-accent shrink-0" />
                  <h3 className="text-sm font-bold text-accent uppercase tracking-widest">{cat.category}</h3>
                </div>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {cat.faqs.map((faq, fi) => (
                    <AccordionItem
                      key={fi}
                      value={`${ci}-${fi}`}
                      className="border-b-0 bg-white/5 rounded-xl px-5 data-[state=open]:bg-white/10 transition-colors"
                    >
                      <AccordionTrigger className="text-left font-semibold text-sm hover:text-accent py-4 hover:no-underline">
                        <span className="flex gap-3 items-start">
                          <span className="text-accent shrink-0 font-bold">Q.</span>
                          {faq.q}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-white/75 text-sm leading-relaxed pb-5 pl-7">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Download Modal ──────────────────────────────────────── */}
      <Dialog open={downloadModalOpen} onOpenChange={setDownloadModalOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-2xl p-0 overflow-hidden border-0">
          <div className="bg-primary p-6 text-center text-primary-foreground">
            <div className="w-12 h-12 mx-auto bg-accent text-accent-foreground rounded-full flex items-center justify-center mb-3">
              <Download size={22} />
            </div>
            <DialogTitle className="text-xl font-bold text-white">Free Guide</DialogTitle>
            <DialogDescription className="text-white/70 text-sm mt-1">
              {selectedResource}
            </DialogDescription>
          </div>
          <div className="p-6 bg-white">
            <form onSubmit={handleDownloadSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="dl-name" className="text-sm font-bold">Full Name</Label>
                <Input id="dl-name" name="name" required placeholder="Dr. Priya Sharma" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dl-email" className="text-sm font-bold">Email Address</Label>
                <Input id="dl-email" name="email" type="email" required placeholder="priya@example.com" className="h-11 rounded-xl" />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-11 rounded-xl text-sm">
                Send Me the Guide
              </Button>
              <p className="text-[11px] text-center text-muted-foreground">We respect your privacy. No spam, ever.</p>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
