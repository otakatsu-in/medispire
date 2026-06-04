import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/BookingContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function WhyGermany() {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title = "Why Germany? | MediSpire";
  }, []);

  const reasons = [
    { title: "Attractive Salary", desc: "Healthcare professionals in Germany enjoy highly competitive salaries. Depending on your specialty and experience, doctors can earn between €5,000 and €10,000 per month, with significant increases as you advance to senior roles or open a private practice." },
    { title: "Work-Life Balance", desc: "Unlike many other countries, Germany enforces strict labor laws. A standard workweek is around 40 hours, and overwork is highly discouraged. On-call duties are well-compensated or offset with mandatory rest days, ensuring you don't burn out." },
    { title: "~30 Days Paid Holidays", desc: "Employees in Germany are legally entitled to ample vacation time. Most hospital contracts offer around 30 days of paid annual leave, giving you the time to rest, visit family back home, or explore Europe." },
    { title: "High Demand", desc: "Germany is facing a severe shortage of medical professionals, with an estimated deficit of over 50,000 doctors. This high demand means excellent job security and numerous opportunities across various specialties and regions." },
    { title: "World-Class Healthcare System", desc: "Practice medicine in one of the most advanced healthcare systems globally. German hospitals are equipped with state-of-the-art technology, and the focus is always on delivering high-quality, evidence-based patient care." },
    { title: "Social Security & Health Insurance", desc: "Germany offers a robust social safety net. A portion of your salary contributes to comprehensive health insurance, unemployment insurance, and a strong pension system, providing immense security for you and your family." },
    { title: "Freedom to Travel Across Europe", desc: "A German residence permit gives you visa-free access to the entire Schengen Area. You can easily travel across 27 European countries for leisure or professional networking." },
    { title: "Pathway to PR & German Citizenship", desc: "Germany offers clear, accelerated pathways to Permanent Residency (often within 21-33 months via the EU Blue Card) and eventual citizenship, making it an excellent long-term base for you and your family." },
    { title: "Continuous Medical Education (CME)", desc: "German hospitals actively support your professional growth. You are encouraged to attend conferences, workshops, and training programs, with many employers covering the costs and providing extra leave for CME activities." }
  ];

  return (
    <div className="w-full">
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Germany?</h1>
          <p className="text-xl text-primary-foreground/90">
            A world-class healthcare system offering unparalleled career growth, security, and quality of life.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl space-y-12">
          {reasons.map((reason, i) => (
            <div key={i} className="bg-card border border-border p-6 md:p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-primary mb-4">{reason.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">Germany vs. Other Countries</h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-[200px] font-bold text-foreground">Factor</TableHead>
                  <TableHead className="font-bold text-primary">Germany</TableHead>
                  <TableHead className="font-bold text-foreground">UK / USA / Aus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Demand for Doctors</TableCell>
                  <TableCell className="text-green-600 font-medium">Extremely High (50,000+ shortage)</TableCell>
                  <TableCell>High, but highly competitive entry</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Work-Life Balance</TableCell>
                  <TableCell className="text-green-600 font-medium">Excellent (Strict 40h weeks, paid overtime)</TableCell>
                  <TableCell>Often poor, high burnout rates</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Specialty Training</TableCell>
                  <TableCell className="text-green-600 font-medium">Apply directly to hospital, earn full salary immediately</TableCell>
                  <TableCell>Highly competitive national matching systems</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">PR / Citizenship</TableCell>
                  <TableCell className="text-green-600 font-medium">Fast-track via EU Blue Card (21 months)</TableCell>
                  <TableCell>Often slow, complex visa lotteries</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Paid Leave</TableCell>
                  <TableCell className="text-green-600 font-medium">~30 Days standard</TableCell>
                  <TableCell>Often less, variable</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Start Your Journey Today</h2>
          <p className="text-muted-foreground mb-8 text-lg">Let our experienced doctors guide you through the process of moving your career to Germany.</p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8" onClick={openBooking}>
            Book a Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}
