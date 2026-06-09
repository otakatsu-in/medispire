import { useEffect } from "react";
import { Link } from "wouter";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pill, Scan, SmilePlus, MessageCircle, ArrowRight, Stethoscope } from "lucide-react";

const professions = [
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
      { t: "Adaptation or Compensation Measures", d: "If gaps are identified, you may complete a supervised adaptation period in a German dental practice. MediSpire assists with finding placement practices." },
      { t: "Job Application", d: "German dental practices are actively hiring. MediSpire prepares your German CV (Lebenslauf) and helps identify practices in your target region." },
    ],
    salary: [
      { role: "ZFA (Entry Level)", range: "€2,000 – €2,600" },
      { role: "ZFA (Experienced)", range: "€2,600 – €3,200" },
      { role: "Praxismanagerin (Practice Manager)", range: "€3,000 – €4,000" },
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
      { t: "German Language (B2)", d: "B2 German is required for the recognition process and for effective team communication in radiology departments. MediSpire's language coaching is tailored for technical medical vocabulary." },
      { t: "Competent Authority Application", d: "Apply to the state health authority (Landesprüfungsamt) or state-specific body. Your Indian BSc Radiology degree is evaluated against the German MTRA training standard." },
      { t: "Document Apostille & Translation", d: "Radiology degree, transcripts, clinical experience certificates, and proof of licensure — all must be certified by authorised translators." },
      { t: "Practical Adaptation Period", d: "If your qualification is deemed partially equivalent, you will complete a supervised clinical adaptation period in a German radiology department." },
      { t: "Recognition & Employment", d: "Once recognised, you can work in CT, MRI, X-Ray, Nuclear Medicine, and Radiation Therapy. High demand exists in both public hospitals and private imaging centres." },
    ],
    salary: [
      { role: "MTRA (Entry Level)", range: "€2,600 – €3,200" },
      { role: "MTRA (Experienced)", range: "€3,200 – €3,900" },
      { role: "Leitende MTRA (Senior/Lead)", range: "€4,000 – €5,200" },
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
      { t: "German Language (C1)", d: "Pharmacists need C1 German — the requirements are strict given patient counselling responsibilities. This typically requires 18–24 months of dedicated study." },
      { t: "Application to State Authority", d: "Apply to the relevant state's Approbationsbehörde (licensing authority). Your B.Pharm/M.Pharm is evaluated against the German Approbationsordnung für Apotheker." },
      { t: "Document Preparation", d: "Pharmacy degree, transcripts, Pharmacy Council registration, good standing certificate, work experience. All must be apostilled and certified-translated." },
      { t: "Equivalence Exam (Kenntnisprüfung)", d: "If your degree is assessed as not fully equivalent, you must pass the Kenntnisprüfung (knowledge exam) covering pharmacology, chemistry, and pharmacy law. MediSpire guides preparation." },
      { t: "Approbation & Registration", d: "Once approved, you register with the State Chamber of Pharmacists (Landesapothekerkammer) and can work in community or hospital pharmacy." },
    ],
    salary: [
      { role: "Apotheker/in (Community Pharmacy)", range: "€3,500 – €4,500" },
      { role: "Apotheker/in (Hospital Pharmacy)", range: "€4,000 – €5,200" },
      { role: "Filialleiter/in (Branch Manager)", range: "€5,000 – €6,500" },
      { role: "Leitende/r Apotheker/in (Head Pharmacist)", range: "€6,000 – €9,000" },
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

  useEffect(() => {
    document.title = "For Allied Health Professionals | MediSpire";
  }, []);

  return (
    <div className="w-full">
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Allied Health Professionals in Germany</h1>
          <p className="text-xl text-primary-foreground/80">Recognition pathways for Dental Assistants, Radiographers, and Pharmacists from India.</p>
        </div>
      </section>

      <section className="py-14 px-4 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Nurses card — links to dedicated page */}
            <Link href="/for-nurses">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
                <Stethoscope size={28} className="text-blue-700 mx-auto mb-2" />
                <p className="font-bold text-sm text-blue-700">Nurses</p>
                <p className="text-[11px] text-blue-500 mt-1">See full guide</p>
              </div>
            </Link>

            {professions.map((p) => (
              <a key={p.id} href={`#${p.id}`} className={`${p.color} border rounded-xl p-4 text-center hover:-translate-y-1 transition-transform duration-200 cursor-pointer`}>
                <p.icon size={28} className={`${p.accent} mx-auto mb-2`} />
                <p className={`font-bold text-sm ${p.accent}`}>{p.title}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl space-y-24">

          {/* Nurses referral card */}
          <div id="nurses" className="bg-blue-50 border border-blue-200 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
              <Stethoscope size={32} className="text-blue-700" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-primary mb-1">Nurses & Care Professionals</h2>
              <p className="text-sm font-medium text-blue-700 mb-2">Pflegefachkraft / Gesundheits- und Krankenpfleger/in</p>
              <p className="text-muted-foreground text-sm">MediSpire has a dedicated, in-depth guide for Indian nursing professionals — covering BSc Nursing recognition, the Anerkennungsberatung process, the Recognition Partnership Visa, salary expectations, and more.</p>
            </div>
            <Link href="/for-nurses" className="shrink-0">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6 py-3 rounded-full flex items-center gap-2 whitespace-nowrap">
                Full Nursing Guide <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          {professions.map((p) => (
            <div key={p.id} id={p.id}>
              <div className={`${p.color} border rounded-2xl p-6 mb-8 flex items-start gap-4`}>
                <p.icon size={36} className={`${p.accent} shrink-0 mt-1`} />
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-1">{p.title}</h2>
                  <p className={`text-sm font-medium ${p.accent} mb-3`}>{p.german}</p>
                  <p className="text-muted-foreground">{p.intro}</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-5 text-primary">Recognition Pathway</h3>
              <div className="space-y-3 mb-10">
                {p.steps.map((step, idx) => (
                  <div key={idx} className="bg-white border border-border p-5 rounded-xl flex gap-4">
                    <div className="hidden sm:flex w-8 h-8 rounded-full bg-primary text-primary-foreground items-center justify-center font-bold shrink-0 text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{step.t}</h4>
                      <p className="text-muted-foreground text-sm">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-5 text-primary">Salary Expectations</h3>
              <div className="bg-card rounded-xl border border-border overflow-hidden mb-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead className="font-bold">Role</TableHead>
                      <TableHead className="font-bold">Gross Monthly Salary</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {p.salary.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{row.role}</TableCell>
                        <TableCell>{row.range}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}

          <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg">
              <MessageCircle size={32} className="text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-primary mb-1">Have a quick question?</h3>
              <p className="text-muted-foreground">Chat directly with our team on WhatsApp. We respond within a few hours.</p>
            </div>
            <a
              href="https://wa.me/918310010112?text=Hi%20MediSpire!%20I%20am%20an%20allied%20health%20professional%20and%20need%20guidance%20about%20moving%20to%20Germany."
              target="_blank"
              rel="noreferrer"
              className="shrink-0 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-7 py-3 rounded-full transition-colors shadow-md"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8 text-primary">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full bg-card border border-border rounded-xl px-6">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-medium text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
            <p className="text-lg mb-8 opacity-90">Book a 1-on-1 Consultation with Dr. Sangeeta Pai or Dr. Sandeep Amin to get a personalised recognition roadmap for your profession.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8 text-lg" onClick={openBooking}>
              Book a Free Consultation
            </Button>
          </div>

        </div>
      </section>
    </div>
  );
}
