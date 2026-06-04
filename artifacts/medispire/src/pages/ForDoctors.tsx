import { useEffect } from "react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2 } from "lucide-react";

export default function ForDoctors() {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title = "For Doctors | MediSpire";
  }, []);

  const steps = [
    { title: "Step 1: Learn German (A1 → B2/C1)", desc: "Timeline: 12–18 months. Goethe Institut, online platforms, MediSpire's partnered language coaches." },
    { title: "Step 2: Document Preparation", desc: "Degree certificates, transcripts, medical council registration, good standing certificate, work experience letters, passport, police clearance." },
    { title: "Step 3: Get Documents Translated & Apostilled", desc: "Only certified translators accepted. MediSpire connects you with authorized translators." },
    { title: "Step 4: Apply for Berufserlaubnis (Temporary License)", desc: "Issued by State Medical Chamber (Ärztekammer). Allows you to practice under supervision while pursuing Approbation." },
    { title: "Step 5: Defizitbescheid (Deficiency Notice)", desc: "Ärztekammer assesses your qualification gaps. MediSpire helps you understand and respond to this document." },
    { title: "Step 6: Fachsprachprüfung (FSP)", desc: "Medical Language Exam — B2/C1 level German proficiency specifically in medical context. MediSpire offers dedicated FSP preparation coaching." },
    { title: "Step 7: Hospitation / Observership", desc: "4–12 week observership in German hospitals. Builds network and improves German medical vocabulary. MediSpire assists with placements." },
    { title: "Step 8: Job Application", desc: "CV in German format (Lebenslauf), cover letter (Motivationsschreiben), references. MediSpire reviews and prepares your complete application package." },
    { title: "Step 9: Interview Preparation", desc: "Mock interviews, common German hospital HR questions, salary negotiation guidance." },
    { title: "Step 10: Visa Application (Job Seeker / Work Visa)", desc: "Required documents: Berufserlaubnis, job offer, accommodation proof, health insurance. MediSpire provides visa checklist and support." },
    { title: "Step 11: Approbation (Permanent Medical License)", desc: "Final full license issued after Gleichwertigkeitsprüfung (equivalence exam) or equivalence assessment." },
    { title: "Step 12: Arrive, Settle & Thrive", desc: "Accommodation, Anmeldung (registration), bank account, tax number, integration." },
  ];

  const faqs = [
    { q: "How long does the entire process take from India to working in Germany?", a: "The full process typically takes 2–4 years from starting German language learning to receiving your Approbation and starting work. However, with Berufserlaubnis you can begin working under supervision within 1.5–2 years." },
    { q: "Do I need B2 or C1 German for the FSP exam?", a: "B2 is the minimum requirement for the FSP exam. However, C1 is strongly recommended for specialist roles and significantly improves your communication in clinical settings and with patients." },
    { q: "What is the FSP (Fachsprachprüfung) exam?", a: "The FSP is a medical language proficiency exam conducted by the Ärztekammer (State Medical Chamber). It tests your ability to take patient histories, document findings, and present cases in German. It is mandatory for all foreign doctors." },
    { q: "What is Defizitbescheid and how do I handle it?", a: "A Defizitbescheid is a deficiency notice from the Ärztekammer listing areas where your Indian qualification differs from the German standard. MediSpire provides expert guidance to respond to it effectively and plan your path forward." },
    { q: "Can I work in Germany while my Approbation is being processed?", a: "Yes. You can apply for a Berufserlaubnis (temporary medical license), which allows you to practice under supervision while your full Approbation application is processed." },
    { q: "Is my Indian MBBS/MD degree recognized in Germany?", a: "Indian degrees are not automatically recognized. You must go through an equivalence assessment by the Ärztekammer. MediSpire guides you through this entire process step by step." },
    { q: "What is the difference between Approbation and Berufserlaubnis?", a: "Berufserlaubnis is a temporary, supervised medical license valid for a limited period, granted while your full Approbation is processed. Approbation is the permanent, unrestricted medical license to practice in Germany." },
    { q: "Which German state is best to apply in as an Indian doctor?", a: "States vary significantly in processing times and requirements. Some states like Baden-Württemberg, Bavaria, and North Rhine-Westphalia have streamlined processes for foreign doctors. MediSpire advises on state-specific strategies." },
    { q: "Do I need to do a Hospitation (observership) in Germany?", a: "A Hospitation is not legally mandatory but is strongly recommended. It provides hands-on exposure to German clinical practice, helps build your professional network, and significantly strengthens your job application." },
    { q: "What visa do I need to move to Germany as a doctor?", a: "Most Indian doctors use either a Job Seeker Visa (to search for jobs in Germany) or apply directly for a Work Visa once they have a job offer. MediSpire provides full visa documentation support." }
  ];

  return (
    <div className="w-full">
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Path to Practising Medicine in Germany</h1>
          <p className="text-xl text-primary-foreground/80">A complete roadmap for MBBS, MD, and MS graduates from India.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-primary">The 12-Step Roadmap</h2>
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
                    <TableCell className="font-medium">Assistenzarzt (Junior)</TableCell>
                    <TableCell>€4,500 – €6,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Facharzt (Specialist)</TableCell>
                    <TableCell>€7,000 – €12,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Oberarzt (Consultant)</TableCell>
                    <TableCell>€9,000 – €14,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Chefarzt (Head of Department)</TableCell>
                    <TableCell>€15,000 – €30,000+</TableCell>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
            <p className="text-lg mb-8 opacity-90">Book a 1-on-1 Consultation with Dr. Sandeep Amin to chart out your personalized career roadmap.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8 text-lg" onClick={openBooking}>
              Book a 1-on-1 Consultation with Dr. Sandeep Amin
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
