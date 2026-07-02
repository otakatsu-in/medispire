import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MessageCircle } from "lucide-react";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  whatsapp: z.string().min(8, "Valid phone number required"),
  profession: z.string().min(1, "Please select a profession"),
  qualification: z.string().min(2, "Current qualification is required"),
  experience: z.coerce.number().optional(),
  languageLevel: z.string().min(1, "Please select a language level"),
  consultationType: z.string().min(1, "Please select a consultation type"),
  message: z.string().optional(),
  source: z.string().optional(),
});

export default function BookAppointment() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Book an Appointment | MediSpire";
  }, []);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      whatsapp: "+91 ",
      profession: "",
      qualification: "",
      experience: undefined,
      languageLevel: "",
      consultationType: "",
      message: "",
      source: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.whatsapp,
          profession: data.profession,
          subject: `Consultation: ${data.consultationType} (Qual: ${data.qualification})`,
          message: data.message,
          source: data.source,
        }),
      });

      if (response.ok) {
        toast({
          title: "Booking Confirmed!",
          description: "We'll contact you within 24 hours to confirm your appointment.",
        });
        form.reset();
      } else {
        throw new Error("Failed to submit form to all destinations");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again or contact us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Consultation</h1>
          <p className="text-xl text-primary-foreground/80">Take the first step towards your career in Germany.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-10 mb-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Dr. John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Number *</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select profession" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="doctor">MBBS Doctor</SelectItem>
                            <SelectItem value="dentist">Dentist (BDS/MDS)</SelectItem>
                            <SelectItem value="nurse">Nurse</SelectItem>
                            <SelectItem value="radiographer">Radiographer</SelectItem>
                            <SelectItem value="pharmacist">Pharmacist</SelectItem>
                            <SelectItem value="dental_assistant">Dental Assistant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="qualification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Qualification *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. MBBS, MD Medicine" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" placeholder="e.g. 3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="languageLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current German Language Level *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="a1">A1</SelectItem>
                            <SelectItem value="a2">A2</SelectItem>
                            <SelectItem value="b1">B1</SelectItem>
                            <SelectItem value="b2">B2</SelectItem>
                            <SelectItem value="c1">C1</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="consultationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Consultation Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select consultation type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="free_webinar">Join Free Webinar (Sunday 12-2 PM)</SelectItem>
                            <SelectItem value="paid_60">Paid 60-min Detailed Consultation (€50)</SelectItem>
                            <SelectItem value="document_review">Document Review Package</SelectItem>
                            <SelectItem value="fsp_training">FSP Training Package</SelectItem>
                            <SelectItem value="job_application">Job Application Help</SelectItem>
                            <SelectItem value="visa_assistance">Visa Assistance</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message / Specific Questions</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us more about your specific needs..." rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How did you hear about us?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="google">Google Search</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="referral">Friend/Colleague Referral</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg h-14">
                  {isSubmitting ? "Submitting..." : "Book Appointment"}
                </Button>
              </form>
            </Form>

            <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-lg mb-1">Need a faster response?</h4>
                <p className="text-muted-foreground text-sm">Message us directly on WhatsApp</p>
              </div>
              <a 
                href="https://wa.me/918310010112?text=Hi%20MediSpire!%20I%20would%20like%20to%20book%20a%20consultation."
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <Button className="bg-[#25D366] hover:bg-[#20bd5a] text-white gap-2 h-12 px-6 rounded-full">
                  <MessageCircle size={20} />
                  Message on WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Our Consultation Types Explained</h2>
            <Accordion type="single" collapsible className="w-full bg-card border border-border rounded-xl px-6">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-medium">Free Weekly Webinar (Sunday 12-2 PM)</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Join Dr. Sangeeta Pai live every Sunday. Learn about the complete roadmap and ask your questions directly during the Q&A session. 100% Free.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-medium">Paid 60-min Detailed Consultation (€50)</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  An in-depth session with Dr. Amin or Dr. Pai covering your specific situation, document requirements, timeline planning, and personalized action plan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-medium">Document Review Package</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We review all your existing documents (degree, transcripts, certificates) and provide a detailed gap analysis and checklist before you apply for your license.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-medium">FSP Training Package</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Ongoing, structured preparation for the Fachsprachprüfung with one-on-one coaching, mock exams, and case-based practice.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
