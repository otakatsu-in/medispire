import { useEffect } from "react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, HeartPulse, GraduationCap, FileCheck } from "lucide-react";

export default function ForNurses() {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title = "For Nurses & Allied Health | MediSpire";
  }, []);

  return (
    <div className="w-full">
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Path to a Healthcare Career in Germany</h1>
          <p className="text-xl text-primary-foreground/80">Tailored pathways for Nurses, Midwives, Radiographers, Pharmacists, and Dental Assistants.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          
          <div className="bg-accent/10 border border-accent text-center rounded-2xl p-6 mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              Germany has 200,000+ nursing vacancies. India-trained nurses are highly sought after.
            </h3>
          </div>

          <Tabs defaultValue="nurses" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 mb-8">
              <TabsTrigger value="nurses" className="py-3 font-medium">Nurses</TabsTrigger>
              <TabsTrigger value="dental_assistants" className="py-3 font-medium">Dental Assistants</TabsTrigger>
              <TabsTrigger value="radiographers" className="py-3 font-medium">Radiographers</TabsTrigger>
              <TabsTrigger value="pharmacists" className="py-3 font-medium">Pharmacists</TabsTrigger>
            </TabsList>

            <TabsContent value="nurses" className="space-y-8 animate-in fade-in-50">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-primary">Nurses (GNM / BSc / MSc)</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Germany has a critical shortage of nursing staff and heavily recruits internationally. Your pathway involves recognizing your qualifications (Anerkennungsverfahren) and achieving German language proficiency.
                  </p>
                  <ul className="space-y-4 text-foreground/90">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" />
                      <span><strong>Eligibility:</strong> GNM, BSc Nursing, or MSc Nursing from a recognized institution.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" />
                      <span><strong>Language:</strong> B1 or B2 German required. B2 is strongly recommended for full recognition.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" />
                      <span><strong>Recognition Process:</strong> Your degree undergoes Anerkennungsverfahren. You'll likely need an adaptation course (Anpassungslehrgang) or exam (Kenntnisprüfung).</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6">Salary Range</h3>
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
                          <TableCell className="font-medium">Registered Nurse (Pflegefachkraft)</TableCell>
                          <TableCell>€3,000 – €4,500</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Specialized Nurse (ICU, OR)</TableCell>
                          <TableCell>€3,800 – €5,500</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Head Nurse (Stationsleitung)</TableCell>
                          <TableCell>€4,500 – €6,500</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              <div className="bg-secondary p-8 rounded-2xl border border-border">
                <h3 className="text-2xl font-bold mb-6">The 8-Step Process</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "1. Learn German to B1/B2 Level",
                    "2. Compile and Translate Documents",
                    "3. Apply for Recognition (Anerkennung)",
                    "4. Receive Defizitbescheid",
                    "5. Secure a Job / Training Contract",
                    "6. Apply for Visa",
                    "7. Complete Adaptation Course / Exam in Germany",
                    "8. Receive Full Registration as Pflegefachkraft"
                  ].map((step, i) => (
                    <div key={i} className="bg-card p-4 rounded-lg shadow-sm border border-border font-medium">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dental_assistants" className="space-y-8 animate-in fade-in-50">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-primary">Dental Assistants (ZFA)</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Zahnmedizinische Fachangestellte (ZFA) play a crucial role in German dental clinics. They assist in treatments, manage hygiene, and handle clinic administration.
                  </p>
                  <ul className="space-y-4 text-foreground/90">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" />
                      <span><strong>Eligibility:</strong> Diploma or Degree in Dental Assistance / Hygiene.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" />
                      <span><strong>Language:</strong> B1 or B2 German. Good communication is vital for patient interaction.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" />
                      <span><strong>Recognition Process:</strong> Handled by the regional Zahnärztekammer. Bridging courses are often necessary.</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6">Career Insights</h3>
                  <div className="space-y-4 bg-secondary p-6 rounded-xl border border-border">
                    <p><strong>Salary Range:</strong> €2,200 – €3,500/month</p>
                    <p><strong>Demand:</strong> Extremely high demand in both rural and urban dental clinics.</p>
                    <p><strong>Growth:</strong> Further training available to become ZMP (Prophylaxis Assistant) or DH (Dental Hygienist), which significantly increases salary.</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="radiographers" className="space-y-8 animate-in fade-in-50">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-primary">Medical Radiographers (MTRA)</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Medizinisch-technische Radiologieassistenten (MTRA) operate X-ray, MRI, and CT machines. Germany's advanced medical infrastructure relies heavily on skilled MTRAs.
                  </p>
                  <ul className="space-y-4 text-foreground/90">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" />
                      <span><strong>Eligibility:</strong> BSc in Radiology or Medical Imaging Technology.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" />
                      <span><strong>Language:</strong> B2 German required.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" />
                      <span><strong>Recognition Process:</strong> Anerkennungsverfahren usually requires bridging courses to align with German radiation protection laws.</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6">Career Insights</h3>
                  <div className="space-y-4 bg-secondary p-6 rounded-xl border border-border">
                    <p><strong>Salary Range:</strong> €2,800 – €4,200/month</p>
                    <p><strong>Demand:</strong> High demand across state hospitals and private radiology centers.</p>
                    <p><strong>Perks:</strong> Regulated shifts, extra pay for on-call and night shifts.</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pharmacists" className="space-y-8 animate-in fade-in-50">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-primary">Pharmacists (Apotheker)</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Pharmacists in Germany are highly respected. The pathway to working as an Apotheker is rigorous and similar to that of medical doctors.
                  </p>
                  <ul className="space-y-4 text-foreground/90">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" />
                      <span><strong>Eligibility:</strong> B.Pharm / M.Pharm / Pharm.D.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" />
                      <span><strong>Language:</strong> B2 general German, plus C1 Fachsprachprüfung (FSP) specifically for pharmacists.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-accent shrink-0 mt-1" />
                      <span><strong>Recognition Process:</strong> Requires obtaining the Approbation via a Kenntnisprüfung (knowledge exam).</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6">Career Insights</h3>
                  <div className="space-y-4 bg-secondary p-6 rounded-xl border border-border">
                    <p><strong>Salary Range:</strong> €3,800 – €5,500/month (employed). Pharmacy owners earn significantly more.</p>
                    <p><strong>Work Environment:</strong> Public pharmacies (Apotheken) or hospital pharmacies.</p>
                    <p><strong>Note:</strong> Until full Approbation is granted, you may work as an under-supervision pharmacist (Pharmaziepraktikant) or PTA (Pharmacy Technical Assistant).</p>
                  </div>
                </div>
              </div>
            </TabsContent>

          </Tabs>

          <div className="mt-16 bg-primary text-primary-foreground p-8 md:p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Let's Discuss Your Career Path</h2>
            <p className="text-lg mb-8 opacity-90">Find out exactly what steps you need to take to move your career to Germany.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8 text-lg" onClick={openBooking}>
              Book a Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
