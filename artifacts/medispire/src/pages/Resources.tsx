import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, BookOpen } from "lucide-react";

export default function Resources() {
  const { toast } = useToast();
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState("");

  useEffect(() => {
    document.title = "Resources & FAQ | MediSpire";
  }, []);

  const leadMagnets = [
    "Complete Checklist: Documents Needed to Move to Germany as a Doctor",
    "German Language Learning Roadmap for Healthcare Professionals",
    "FSP Preparation Guide: 30-Day Study Plan",
    "Salary Guide: What Indian Healthcare Professionals Earn in Germany 2024"
  ];

  const glossary = [
    { term: "Approbation", desc: "Full permanent medical license to practice in Germany" },
    { term: "Berufserlaubnis", desc: "Temporary supervised medical license" },
    { term: "Fachsprachprüfung (FSP)", desc: "Medical language proficiency exam" },
    { term: "Defizitbescheid", desc: "Deficiency notice from the Ärztekammer listing qualification gaps" },
    { term: "Ärztekammer", desc: "State Medical Chamber (regulates doctors)" },
    { term: "Zahnärztekammer", desc: "State Dental Chamber (regulates dentists)" },
    { term: "Hospitation", desc: "Observership/shadowing period in a German hospital" },
    { term: "Gleichwertigkeitsprüfung", desc: "Equivalence examination for foreign medical degrees" },
    { term: "Assistenzarzt", desc: "Junior doctor (resident)" },
    { term: "Facharzt", desc: "Specialist doctor" },
    { term: "Weiterbildung", desc: "Postgraduate specialist training" },
    { term: "Anmeldung", desc: "Official registration of residence in Germany" },
    { term: "Niederlassungserlaubnis", desc: "Permanent residence permit" },
    { term: "Aufenthaltstitel", desc: "Residence permit (general)" }
  ];

  const faqs = [
    { q: "How long does the process take from India to working in Germany?", a: "Typically 2 to 4 years, depending on your language learning speed and processing times at the state authorities." },
    { q: "Is the German language truly mandatory?", a: "Yes. You cannot work as a medical professional in Germany without at least B2 general German and passing the C1 medical language exam (FSP)." },
    { q: "Can I bring my family to Germany?", a: "Yes. Spouses and children can join you on family reunification visas once you secure a job and the appropriate work visa or Blue Card." },
    { q: "What is the cost of living in Germany compared to India?", a: "Living costs are significantly higher (rent, insurance), but this is offset by much higher salaries and comprehensive social benefits (free education, nearly free healthcare)." },
    { q: "Is Germany better than UK, Australia, or Canada for Indian doctors?", a: "Germany offers a clearer, faster pathway to specialization, excellent work-life balance, and very high demand for doctors, with fewer bottlenecks for residency spots compared to the UK or Australia." },
    { q: "What is the FSP exam and how do I prepare for it?", a: "The Fachsprachprüfung tests your ability to communicate with patients and colleagues. Preparation involves specialized coaching, mock exams, and mastering both laymen and clinical terminology." },
    { q: "What documents do I need to start the Approbation process?", a: "Key documents include your degree, transcripts, medical registration, good standing certificate, passport, and birth certificate—all translated and apostilled." },
    { q: "Can nurses also move to Germany from India?", a: "Absolutely. Germany has over 200,000 nursing vacancies. The process involves language learning and having your Indian degree recognized (Anerkennungsverfahren)." },
    { q: "What is the recognition process for Indian nursing degrees?", a: "Your curriculum is compared to the German standard. Differences are listed in a Defizitbescheid. You then complete an adaptation course or exam in Germany." },
    { q: "How much does the whole process cost (language + applications)?", a: "Budget around €3,000 to €5,000 for language exams, document translations, apostilles, and authority fees, plus living expenses for your first months in Germany." },
    { q: "Can I do the process while still working in India?", a: "Yes, you can learn the language and prepare your documents while working. You only need to travel to Germany for exams or Hospitation." },
    { q: "What happens after I receive my Defizitbescheid?", a: "You prepare for the Kenntnisprüfung (knowledge exam) to prove your medical knowledge is equivalent to a German graduate." },
    { q: "What visa do I need to come to Germany as a healthcare professional?", a: "Usually a Job Seeker Visa (to find a job/do a Hospitation) or an EU Blue Card/Work Visa if you already have a job contract." },
    { q: "How long can I stay in Germany on a Job Seeker Visa?", a: "Typically up to 6 months." },
    { q: "What is a Hospitation and how do I arrange one?", a: "It's an unpaid observership in a hospital. You arrange it by directly applying to hospital departments with your German CV and cover letter." },
    { q: "Are there specific German states that are easier for foreign doctors?", a: "Yes. Processing times and exam difficulty vary by state (Bundesland). States like NRW or Bavaria often have more straightforward processes." },
    { q: "What support does MediSpire provide after I arrive in Germany?", a: "We help with integration, Anmeldung (city registration), finding accommodation, setting up bank accounts, and health insurance." },
    { q: "Can allied health professionals (pharmacists, radiographers) also move to Germany?", a: "Yes. Pharmacists follow a similar path to doctors (Approbation), while radiographers undergo degree recognition." },
    { q: "What is the difference between Statutory and Private health insurance in Germany?", a: "Statutory (public) insurance is income-based and covers family members for free. Private insurance is age/health-based and often chosen by high earners." },
    { q: "How do I open a bank account in Germany as a new arrival?", a: "You need your passport, your Anmeldung (registration certificate), and sometimes your work contract. We guide you to expat-friendly banks." }
  ];

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    toast({
      title: "Success!",
      description: `Check your email! The guide has been sent to ${email}`,
    });
    setDownloadModalOpen(false);
  };

  return (
    <div className="w-full">
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources & FAQ</h1>
          <p className="text-xl text-primary-foreground/80">Helpful materials, guides, and answers to common questions.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          
          <h2 className="text-3xl font-bold mb-8 text-primary">Downloadable Resources</h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-20">
            {leadMagnets.map((res, i) => (
              <Card key={i} className="bg-secondary border-border">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <FileText className="text-accent h-10 w-10" />
                  </div>
                  <h4 className="font-bold text-lg leading-snug mb-6 flex-1">{res}</h4>
                  <Button 
                    onClick={() => {
                      setSelectedResource(res);
                      setDownloadModalOpen(true);
                    }}
                    className="w-full flex gap-2 items-center"
                  >
                    <Download size={18} />
                    Download Free Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-8 text-primary">Glossary of German Medical & Legal Terms</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-20">
            {glossary.map((item, i) => (
              <div key={i} className="bg-card p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen size={16} className="text-primary" />
                  <span className="font-bold text-foreground">{item.term}</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-8 text-primary">Comprehensive FAQ</h2>
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-lg font-medium hover:text-primary">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Download Lead Magnet Modal */}
      <Dialog open={downloadModalOpen} onOpenChange={setDownloadModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Download Resource</DialogTitle>
            <DialogDescription>
              Enter your details to receive "{selectedResource}" directly in your inbox.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDownloadSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Send Me the Guide
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
