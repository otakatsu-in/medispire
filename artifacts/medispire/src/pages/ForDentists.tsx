import { useEffect } from "react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2 } from "lucide-react";

export default function ForDentists() {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title = "For Dentists | MediSpire";
  }, []);

  const steps = [
    { title: "Step 1: Learn German (A1 → B2/C1)", desc: "Timeline: 12–18 months. German B2 minimum required, C1 preferred." },
    { title: "Step 2: Document Preparation", desc: "BDS/MDS degree certificates, transcripts, dental council registration, good standing certificate." },
    { title: "Step 3: Get Documents Translated & Apostilled", desc: "Only certified translators accepted. MediSpire connects you with authorized translators." },
    { title: "Step 4: Apply for Berufserlaubnis (Temporary License)", desc: "Issued by State Dental Chamber (Zahnärztekammer)." },
    { title: "Step 5: Defizitbescheid (Deficiency Notice)", desc: "Zahnärztekammer assesses your qualification gaps against German dental standards." },
    { title: "Step 6: Fachsprachprüfung (FSP)", desc: "Dental-specific Medical Language Exam. Tests your ability to communicate in a dental practice setting." },
    { title: "Step 7: Hospitation / Observership", desc: "Observership in German dental clinics. Crucial for understanding the German dental system." },
    { title: "Step 8: Job Application", desc: "CV and Motivation Letter prepared according to German dental practice standards." },
    { title: "Step 9: Interview Preparation", desc: "Preparation for interviews with Clinic Owners or Head Dentists." },
    { title: "Step 10: Visa Application", desc: "Job Seeker or Work Visa application with full documentation support." },
    { title: "Step 11: Approbation (Permanent License)", desc: "Final full license issued after dental equivalence exam (Kenntnisprüfung)." },
    { title: "Step 12: Arrive, Settle & Thrive", desc: "Integration into the German dental system and setting up your life in Germany." },
  ];

  const faqs = [
    { q: "Is BDS recognized in Germany?", a: "Yes, Indian BDS degrees can be recognized, but they must undergo a thorough equivalence check by the Zahnärztekammer. Most non-EU dentists will need to take an equivalency exam (Kenntnisprüfung) to get full Approbation." },
    { q: "What is the dental FSP exam?", a: "Similar to the medical FSP, it is a language exam focused entirely on dental terminology, dentist-patient communication, and documentation within a dental practice setting." },
    { q: "Do I apply to the Ärztekammer or Zahnärztekammer?", a: "Dentists are regulated by the Zahnärztekammer (State Dental Chamber), completely separate from the Ärztekammer which regulates medical doctors." },
    { q: "Can MDS specialists work directly as specialists in Germany?", a: "Foreign specializations (like MDS) undergo a separate recognition process AFTER you receive your basic Approbation. You must first be recognized as a general dentist in Germany." },
    { q: "Are there opportunities for Oral & Maxillofacial Surgeons?", a: "Yes, OMFS is highly sought after, but note that in Germany, OMFS is a dual-degree specialty (requiring both medical and dental degrees). Those with only a dental degree can work as Oral Surgeons (Oralchirurg)." },
    { q: "Can I open my own clinic in Germany?", a: "Yes, after obtaining your Approbation and working as an employed dentist (usually for at least 2 years to gain 'Kassenzulassung' eligibility), you can open or buy your own private practice." },
    { q: "How much does a dentist earn in Germany?", a: "Employed associate dentists start around €4,000–€6,000. Specialists earn €6,500–€10,000. Clinic owners can earn significantly more, often exceeding €15,000+ per month." },
    { q: "Is Hospitation necessary for dentists?", a: "While not legally mandatory, shadowing in a German dental clinic is highly recommended to understand local protocols, materials used, and insurance billing." },
    { q: "How long does the dental Approbation process take?", a: "The entire process from starting language learning to gaining full Approbation takes roughly 2-3 years, depending on how quickly you pass the FSP and Kenntnisprüfung." },
    { q: "What visa do dentists usually apply for?", a: "Most apply for a Job Seeker Visa initially or a standard Work Visa once they secure a job offer. The EU Blue Card is also an option if salary thresholds are met." }
  ];

  return (
    <div className="w-full">
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Path to Practising Dentistry in Germany</h1>
          <p className="text-xl text-primary-foreground/80">A complete roadmap for BDS and MDS graduates from India.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          
          <div className="bg-accent/10 border border-accent rounded-2xl p-8 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-bl-full -z-10" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Dr. Sangeeta Pai's Personal Story</h3>
            <p className="text-lg text-foreground/80 leading-relaxed italic">
              "From BDS in India to Germany's First Indian Board-Certified Implantologist — Dr. Sangeeta Pai moved to Germany in 2013 and became the first doctor of Indian origin to receive board certification in Surgery and Implantology in Germany. She has been awarded 'Recommended Doctor in the Region' by Germany's FOCUS Magazine 2020."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Eligibility & Requirements</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent shrink-0 mt-1" />
                  <span><strong>Degree:</strong> BDS / MDS from recognized Indian university</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent shrink-0 mt-1" />
                  <span><strong>Language:</strong> German B2 minimum (C1 strongly preferred)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent shrink-0 mt-1" />
                  <span><strong>Authority:</strong> Regulated by Zahnärztekammer (Dental Chamber)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent shrink-0 mt-1" />
                  <span><strong>Exam:</strong> FSP required (dental terminology focused)</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Specializations in Demand</h2>
              <div className="flex flex-wrap gap-2">
                {["Oral Implantology", "Orthodontics", "Oral & Maxillofacial Surgery", "Endodontics", "Periodontology", "Pediatric Dentistry"].map(spec => (
                  <span key={spec} className="bg-secondary px-4 py-2 rounded-full text-sm font-medium border border-border">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-primary">The 12-Step Roadmap for Dentists</h2>
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-secondary p-6 rounded-xl border border-border flex gap-4">
                  <div className="hidden sm:flex w-10 h-10 rounded-full bg-primary text-primary-foreground items-center justify-center font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-primary">Salary Expectations</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted">
                    <TableHead className="font-bold">Role</TableHead>
                    <TableHead className="font-bold">Gross Monthly Salary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Associate Dentist</TableCell>
                    <TableCell>€4,000 – €6,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Specialist (Fachzahnarzt)</TableCell>
                    <TableCell>€6,500 – €10,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Clinic Owner (long-term)</TableCell>
                    <TableCell>€12,000 – €25,000+</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-primary">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full bg-card border border-border rounded-xl px-6">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-medium text-lg">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Dental Career in Germany</h2>
            <p className="text-lg mb-8 opacity-90">Get expert guidance tailored for dental professionals.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8 text-lg" onClick={openBooking}>
              Book a 1-on-1 Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
