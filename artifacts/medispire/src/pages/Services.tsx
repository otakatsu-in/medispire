import { useEffect } from "react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, FileBadge, Languages, MessageCircle, 
  CheckCircle2, GraduationCap, Stethoscope, Video
} from "lucide-react";

export default function Services() {
  const { openBooking } = useBooking();

  const handleWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918310010112?text=${encoded}`, '_blank');
  };

  return (
    <div className="w-full">
      <SEO 
        title="Our Services & Pricing | MediSpire"
        description="Explore our two tracks for Indian healthcare professionals moving to Germany: Language Learning and Documentation Preparation."
        canonical="https://medispire.in/services"
      />

      <section className="bg-primary text-primary-foreground pt-24 pb-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <Badge className="bg-accent text-accent-foreground mb-4 border-none hover:bg-accent/90">Our Services</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Pathway</h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            We've simplified our services into two specialized areas to give you exactly what you need: Documentation & Preparation, and Language Learning.
          </p>
        </div>
      </section>

      {/* TRACK 1: DOCUMENTATION & PREP */}
      <section id="preparation" className="py-20 px-4 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary flex items-center justify-center gap-3">
              <FileBadge className="text-accent" size={32} />
              Documentation & Preparation
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
              Navigating German bureaucracy is complex. From basic document checks to full-service representation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Free Consultation */}
            <Card className="border-2 border-border hover:border-primary/20 transition-all flex flex-col h-full shadow-sm bg-white">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">Free Consultation</CardTitle>
                <CardDescription className="text-sm mt-2">
                  Initial profile evaluation and roadmap planning.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-center mt-2 mb-6">
                  <div className="text-3xl font-bold text-foreground">Free</div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={16}/> 15-minute 1-on-1 profile evaluation call</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={16}/> Eligibility assessment for Approbation vs Berufserlaubnis</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={16}/> High-level timeline and cost estimation roadmap</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={16}/> Direct answers to your most pressing questions</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline"
                  className="w-full text-base h-11 border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={openBooking}
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>

            {/* Document Checking */}
            <Card className="border-2 border-accent relative flex flex-col h-full shadow-md transform md:-translate-y-2 bg-white">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-4 pt-8">
                <CardTitle className="text-xl">Document Checking</CardTitle>
                <CardDescription className="text-sm mt-2">
                  Verification of your credentials before you send them to Germany.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-center mt-2 mb-6">
                  <div className="text-3xl font-bold text-foreground">₹499</div>
                  <div className="text-xs text-muted-foreground mt-1">One-time fee</div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={16}/> Line-by-line review of your German CV format</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={16}/> Verification of translated documents & Apostille stamps</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={16}/> Defizitbescheid (Deficiency Notice) guidance strategy</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={16}/> Catch critical missing paperwork before submission</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={16}/> Avoid months of delays from the authorities</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full text-base h-11 bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm"
                  onClick={() => handleWhatsApp("Hi! I'd like to sign up for the ₹499 Document Checking service.")}
                >
                  Buy Now
                </Button>
              </CardFooter>
            </Card>

            {/* Detailed Course */}
            <Card className="border-2 border-border/50 bg-white/50 relative overflow-hidden flex flex-col h-full opacity-90">
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="text-[10px]">Soon</Badge>
              </div>
              <CardHeader className="text-center pb-4 opacity-75">
                <CardTitle className="text-xl">Detailed Course</CardTitle>
                <CardDescription className="text-sm mt-2">
                  Comprehensive A-Z video guide by Dr. Sangeeta.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 opacity-75">
                <div className="text-center mt-2 mb-6">
                  <div className="text-3xl font-bold text-foreground">₹2,499</div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> Step-by-step video tutorials on the German medical system</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> How to apply for Approbation independently without agencies</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> Deep dive into finding Hospitation (Observership) spots</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> Interview preparation tips for German hospitals</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> Downloadable templates for Motivation Letters and emails</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button disabled className="w-full text-base h-11 bg-muted text-muted-foreground border border-border">
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>

            {/* Done For You */}
            <Card className="border-2 border-border/50 bg-white/50 relative overflow-hidden flex flex-col h-full opacity-90">
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="text-[10px]">Soon</Badge>
              </div>
              <CardHeader className="text-center pb-4 opacity-75">
                <CardTitle className="text-xl">Done For You</CardTitle>
                <CardDescription className="text-sm mt-2">
                  Full concierge service taking care of all bureaucracy.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 opacity-75">
                <div className="text-center mt-2 mb-6">
                  <div className="text-3xl font-bold text-foreground">₹25,000</div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> Full concierge service: we handle the entire bureaucracy</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> Direct communication with German health authorities (Bezirksregierung)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> Management of all certified translations and legalizations</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> Priority visa application assistance and interview prep</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> Dedicated personal case manager from start to finish</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button disabled className="w-full text-base h-11 bg-muted text-muted-foreground border border-border">
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>

          </div>
        </div>
      </section>

      {/* TRACK 2: LANGUAGE LEARNING */}
      <section id="language" className="py-20 px-4 bg-white border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary flex items-center justify-center gap-3">
              <Languages className="text-accent" size={32} />
              Language Learning
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
              Mastering German is your biggest hurdle. We connect you with verified tutors and provide specialized medical language training.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Tutor Matching */}
            <Card className="border-2 border-border hover:border-primary/20 transition-all flex flex-col h-full shadow-sm bg-[#F8FAFC]">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4">
                  <Video className="text-primary" size={28} />
                </div>
                <CardTitle className="text-2xl">Authorized Tutor Matching</CardTitle>
                <CardDescription className="text-base mt-2">
                  Get paired with a verified, experienced German language tutor suited to your current level.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={18}/> Access to our hand-picked, verified network of tutors</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={18}/> From A1 absolute beginner to B2 advanced</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={18}/> Flexible scheduling: 1-on-1 intensive or group online classes</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-accent shrink-0 mt-0.5" size={18}/> Tutors highly experienced with medical professionals</li>
                </ul>
                <div className="text-center mt-6">
                  <div className="text-3xl font-bold text-foreground">Custom</div>
                  <div className="text-sm text-muted-foreground mt-1">Pricing based on tutor</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full text-lg h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => handleWhatsApp("Hi, I'm looking for an authorized German tutor. Can you help me get matched?")}
                >
                  <MessageCircle className="mr-2" size={20} />
                  Find a Tutor
                </Button>
              </CardFooter>
            </Card>

            {/* German for Doctors */}
            <Card className="border-2 border-border/50 bg-[#F8FAFC]/50 relative overflow-hidden flex flex-col h-full shadow-sm opacity-90">
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-muted text-muted-foreground font-bold">Coming Soon</Badge>
              </div>
              <CardHeader className="text-center pb-4 opacity-75">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="text-accent" size={28} />
                </div>
                <CardTitle className="text-2xl">German for Doctors</CardTitle>
                <CardDescription className="text-base mt-2">
                  Specialized C1 level medical German to help you crack the Fachsprachenprüfung (FSP).
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 opacity-75">
                <ul className="space-y-3 mb-6 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> Specialized C1 Medical German for the FSP</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> Intensive doctor-patient roleplay (Anamnesegespräch)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> Medical documentation (Arztbrief) writing training</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-muted-foreground shrink-0 mt-0.5" size={16}/> Pre-recorded modules + live interactive speaking sessions</li>
                </ul>
                <div className="text-center mt-6">
                  <div className="text-3xl font-bold text-foreground">₹5,999</div>
                  <div className="text-sm text-muted-foreground mt-1">One-time payment</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled className="w-full text-lg h-12 bg-muted text-muted-foreground border border-border">
                  Enrollment Opening Soon
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
