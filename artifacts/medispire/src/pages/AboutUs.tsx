import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Users, FileX } from "lucide-react";

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us | MediSpire";
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-secondary py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl font-bold text-primary mb-6">About MediSpire</h1>
          <p className="text-xl text-muted-foreground leading-relaxed italic">
            "Having gained vast knowledge of the German medical system and guiding healthcare aspirants for over 8 years, we now aspire to inspire all foreign healthcare professionals aiming for a brilliant career in Germany through MediSpire."
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="max-w-md mx-auto rounded-2xl overflow-hidden bg-muted shadow-xl border border-border">
                <img src="/dr-sandeep.png" alt="Dr. Sandeep Amin" className="w-full h-auto" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Dr. Sandeep Amin</h3>
                <p className="text-accent font-medium mb-4">Founder & CEO</p>
                <p className="text-muted-foreground leading-relaxed">
                  Dr. Sandeep Amin completed his MBBS from BLD Institute, India, and his postgraduate in Diagnostic Radiology. He moved to Germany in 2013 on an exchange program and became the first Indian to be awarded the European Scholarship from CIRSE Society for Interventional Radiology. He equalized his degree, passed his specialist exam, and holds board certifications in Interventional Radiology from both German and European Societies. He is a keynote speaker at international conferences, published researcher, and currently works as Senior Consultant Radiologist at an 800-bed state-run multispecialty hospital in Germany.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="max-w-md mx-auto rounded-2xl overflow-hidden bg-muted shadow-xl border border-border">
                <img src="/dr-sangeeta.png" alt="Dr. Sangeeta Pai" className="w-full h-auto" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Dr. Sangeeta Pai</h3>
                <p className="text-accent font-medium mb-4">Co-Founder & COO</p>
                <p className="text-muted-foreground leading-relaxed">
                  Dr. Sangeeta Pai completed her BDS from SDM University and her postgraduate in Maxillofacial Surgery. She moved to Germany in 2013 and became the first doctor of Indian origin to receive board certification in Surgery and Implantology in Germany. She has been working 10+ years in Germany as Senior Consultant in a private multispecialty clinic. She holds: Fellowship from International Congress of Oral Implantologists (USA), Fellow Affiliate at The Royal College of Surgeons of Edinburgh, Certification in Sedation, Certification in PRF and Blood Concentrate procedures. She was named "Recommended Doctor in the Region" by Germany's FOCUS Magazine 2020 and is among the most highly rated oral implantologists in North Germany.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Our Philosophy</h2>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12 text-primary-foreground/80 italic">
            "We don't work like agents. We are doctors guiding doctors. We've been in your shoes — navigating German bureaucracy, language barriers, and medical licensing. We give you real, honest, first-hand guidance at every step."
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Integrity", desc: "Honest, reliable guidance based on real experience." },
              { icon: Eye, title: "Transparency", desc: "Clear processes and zero hidden fees." },
              { icon: Users, title: "Peer Support", desc: "Doctors guiding doctors with empathy and understanding." },
              { icon: FileX, title: "No Agent Policy", desc: "Direct mentorship without commercial agent agendas." }
            ].map((val, i) => (
              <Card key={i} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                <CardContent className="p-6 text-center flex flex-col items-center">
                  <val.icon size={36} className="text-accent mb-4" />
                  <h4 className="text-xl font-bold mb-2">{val.title}</h4>
                  <p className="text-primary-foreground/80 text-sm">{val.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "8+", label: "Years Experience" },
              { num: "500+", label: "Consultations" },
              { num: "100%", label: "Professionals placed across Germany" },
              { num: "0", label: "Hidden Fees" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">{stat.num}</div>
                <div className="font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
