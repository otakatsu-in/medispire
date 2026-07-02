import { useEffect, useState } from "react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Clock, Phone, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactUs() {
  const { openBooking } = useBooking();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Contact Us | MediSpire";
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.target as HTMLFormElement;
      const name = (form.elements.namedItem("name") as HTMLInputElement).value;
      const email = (form.elements.namedItem("email") as HTMLInputElement).value;
      const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value || "N/A";
      const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
      const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
      
      const formData = new FormData(form);
      const profession = formData.get("profession") || "N/A"; // Shadcn Select adds a hidden input with the name

      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          profession,
          subject,
          message,
          source: "Contact Us Page",
        }),
      });

      if (!response.ok) throw new Error("Failed");

      toast({
        title: "Message Sent",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try WhatsApp instead.",
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-primary-foreground/80">Get in touch with our team of medical professionals.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">Get In Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Whether you have a quick question or are ready to start your journey, we are here to help.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6 flex items-start gap-4">
                    <Mail className="text-primary mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Email</h4>
                      <a href="mailto:medispire.de@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                        medispire.de@gmail.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardContent className="p-6 flex items-start gap-4">
                    <MessageCircle className="text-primary mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Phone / WhatsApp</h4>
                      <a href="tel:+491626498523" className="text-muted-foreground hover:text-primary transition-colors block">
                        +49 162 649 8523 (DE)
                      </a>
                      <a href="tel:+918310010112" className="text-muted-foreground hover:text-primary transition-colors block mt-1">
                        +91 83100 10112 (IN)
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardContent className="p-6 flex items-start gap-4">
                    <MapPin className="text-primary mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Address</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Medispire UG<br />
                        c/o Postflex #3187<br />
                        Emsdettener Str. 10<br />
                        48268 Greven, Germany
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6 flex items-start gap-4">
                    <Clock className="text-primary mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Office Hours (IST friendly)</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Mon–Sat: 9:00–17:00<br />
                        Sun: 9:00–14:00
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-6">
                <h4 className="font-bold mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/profile.php?id=61589388965018" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all shadow-sm">
                    <Facebook size={20} />
                  </a>
                  <a href="https://www.instagram.com/docs.in.de/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all shadow-sm">
                    <Instagram size={20} />
                  </a>
                  <a href="https://www.youtube.com/@DocsinDE" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all shadow-sm">
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl shadow-sm border border-border p-8 md:p-10 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" required placeholder="Dr. John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profession">Profession</Label>
                      <Select name="profession" required>
                        <SelectTrigger id="profession">
                          <SelectValue placeholder="Select your profession" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="doctor">Doctor (MBBS/MD/MS)</SelectItem>
                          <SelectItem value="dentist">Dentist (BDS/MDS)</SelectItem>
                          <SelectItem value="nurse">Nurse (GNM/BSc/MSc)</SelectItem>
                          <SelectItem value="allied">Allied Health Professional</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" required placeholder="How can we help?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" rows={5} required placeholder="Write your message here..." />
                  </div>
                  
                  <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    {isSubmitting ? "Sending..." : "Submit Message"}
                  </Button>
                </form>
              </div>

              <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold mb-2">Want a faster reply?</h3>
                <p className="text-muted-foreground mb-6">Our team is active on WhatsApp and usually replies within hours.</p>
                <a 
                  href="https://wa.me/918310010112" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block w-full"
                >
                  <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white gap-2 h-14 text-lg rounded-xl shadow-md hover:shadow-lg transition-all">
                    <MessageCircle size={24} />
                    Message us on WhatsApp
                  </Button>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
