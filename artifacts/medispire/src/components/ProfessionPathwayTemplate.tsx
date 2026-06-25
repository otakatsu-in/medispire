import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SEO } from "@/components/SEO";

export interface RoadmapStep {
  title: string;
  desc: string;
}

export interface SalaryRow {
  role: string;
  salary: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface ProfessionPathwayProps {
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  roadmapSteps: RoadmapStep[];
  salaries: SalaryRow[];
  faqs: FAQ[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  children?: React.ReactNode;
}

export function ProfessionPathwayTemplate({
  seoTitle,
  seoDescription,
  heroTitle,
  heroSubtitle,
  roadmapSteps,
  salaries,
  faqs,
  ctaTitle = "Ready to Begin?",
  ctaSubtitle = "Join our Free Weekly Webinar on Sunday (12-2 PM) with Dr. Sangeeta to chart out your personalized career roadmap.",
  ctaButtonText = "Join Free Webinar",
  children
}: ProfessionPathwayProps) {
  const { openBooking } = useBooking();

  return (
    <div className="w-full">
      <SEO title={seoTitle} description={seoDescription} />
      
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{heroTitle}</h1>
          <p className="text-xl text-primary-foreground/80">{heroSubtitle}</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {children}

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-primary">The Roadmap</h2>
            <div className="space-y-4">
              {roadmapSteps.map((step, idx) => (
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
                  {salaries.map((s, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{s.role}</TableCell>
                      <TableCell>{s.salary}</TableCell>
                    </TableRow>
                  ))}
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
            <h2 className="text-3xl font-bold mb-4">{ctaTitle}</h2>
            <p className="text-lg mb-8 opacity-90">{ctaSubtitle}</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-14 px-8 text-lg rounded-xl" onClick={openBooking}>
              {ctaButtonText}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
