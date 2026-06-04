import { useEffect } from "react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, FileBadge, Briefcase, GraduationCap, 
  Languages, SearchCode, PenTool, Hospital, 
  Plane, AlertCircle, Home, Layers, Network
} from "lucide-react";

export default function Services() {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title = "Our Services | MediSpire";
  }, []);

  const services = [
    { icon: Languages, title: "Online German Language", desc: "Structured German language coaching from B1 to C1, tailored specifically for medical professionals." },
    { icon: FileBadge, title: "Medical/Dental License", desc: "End-to-end guidance on obtaining your German medical or dental license (Approbation/Berufserlaubnis)." },
    { icon: Briefcase, title: "Job Application Support", desc: "CV and cover letter help, interview preparation, and job market navigation." },
    { icon: GraduationCap, title: "FSP Training", desc: "Intensive preparation for the professional language exam (Fachsprachprüfung) required for doctors and dentists." },
    { icon: BookOpen, title: "Translation of Documents", desc: "Certified translation of medical degrees, transcripts, and personal documents." },
    { icon: SearchCode, title: "Document Analysis", desc: "Review of your qualification documents to identify gaps before submission to authorities." },
    { icon: PenTool, title: "Motivation Letter Writing", desc: "Professional motivation letter tailored to German employer expectations." },
    { icon: Hospital, title: "Hospitation Arrangement", desc: "Help finding and arranging observership/shadowing placements in German hospitals." },
    { icon: Plane, title: "Visa Assistance", desc: "Guidance on the right visa category (Job Seeker, Blue Card, Work Visa)." },
    { icon: AlertCircle, title: "Defizitbescheid Guidance", desc: "Support for navigating the deficiency notice process for partial credential recognition." },
    { icon: Home, title: "Accommodation Assistance", desc: "Advice on finding temporary and permanent housing in Germany." },
    { icon: Layers, title: "Bridging Courses", desc: "Information and guidance on bridging/adaptation courses for partial recognition." },
    { icon: Network, title: "Job Opportunities", desc: "Access to MediSpire's network of German hospital and clinic job openings." }
  ];

  return (
    <div className="w-full">
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-primary-foreground/80">Comprehensive, end-to-end support for your relocation to Germany.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <service.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Need a Customized Plan?</h2>
          <p className="text-muted-foreground mb-8 text-lg">Every professional's background is unique. Let us evaluate your profile and create a tailored roadmap.</p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8" onClick={openBooking}>
            Book a Free Profile Evaluation
          </Button>
        </div>
      </section>
    </div>
  );
}
