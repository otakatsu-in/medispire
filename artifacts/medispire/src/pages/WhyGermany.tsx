import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/BookingContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { HeartPulse, Scale, Palmtree, TrendingUp, Stethoscope, ShieldCheck, Plane, Landmark, BookOpen, CheckCircle2, XCircle } from "lucide-react";

export default function WhyGermany() {
  const { openBooking } = useBooking();

  const reasons = [
    { 
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: "Attractive Salary", 
      desc: "Healthcare professionals in Germany enjoy highly competitive salaries. Doctors earn between €5,000 and €10,000 per month, with significant increases for senior roles.",
      className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-card to-card/50"
    },
    { 
      icon: <Scale className="w-8 h-8 text-blue-400" />,
      title: "Work-Life Balance", 
      desc: "A standard workweek is 40 hours. Overwork is strictly regulated, and on-call duties are well-compensated or offset with mandatory rest days.",
      className: "md:col-span-2 bg-card"
    },
    { 
      icon: <Palmtree className="w-8 h-8 text-green-400" />,
      title: "30 Days Paid Holidays", 
      desc: "Employees are legally entitled to ample vacation. Enjoy ~30 days of paid annual leave.",
      className: "md:col-span-2 bg-card"
    },
    { 
      icon: <Stethoscope className="w-8 h-8 text-red-400" />,
      title: "High Demand", 
      desc: "With an estimated deficit of over 50,000 doctors, you have excellent job security and choice of specialty.",
      className: "md:col-span-2 md:row-span-2 bg-gradient-to-b from-card to-card/50"
    },
    { 
      icon: <HeartPulse className="w-8 h-8 text-pink-400" />,
      title: "World-Class Healthcare", 
      desc: "Practice medicine in one of the most advanced healthcare systems globally, equipped with state-of-the-art tech.",
      className: "md:col-span-2 bg-card"
    },
    { 
      icon: <ShieldCheck className="w-8 h-8 text-indigo-400" />,
      title: "Social Security", 
      desc: "Robust social safety net covering health, unemployment, and strong pensions.",
      className: "md:col-span-2 bg-card"
    },
    { 
      icon: <Plane className="w-8 h-8 text-cyan-400" />,
      title: "Freedom to Travel", 
      desc: "A German residence permit gives you visa-free access to the entire Schengen Area (27 countries).",
      className: "md:col-span-2 bg-card"
    },
    { 
      icon: <Landmark className="w-8 h-8 text-yellow-500" />,
      title: "Pathway to Citizenship", 
      desc: "Accelerated pathways to Permanent Residency (21-33 months via EU Blue Card) and quick citizenship.",
      className: "md:col-span-2 md:row-span-2 bg-card"
    },
    { 
      icon: <BookOpen className="w-8 h-8 text-purple-400" />,
      title: "Continuous Education", 
      desc: "Hospitals actively support professional growth, often covering CME costs and providing extra leave.",
      className: "md:col-span-2 bg-card"
    }
  ];

  return (
    <div className="w-full">
      <SEO 
        title="Why Germany for Medical Professionals? | MediSpire"
        description="Discover why Germany is the top destination for Indian doctors, dentists, and nurses. Enjoy attractive salaries, 30 days paid leave, and world-class healthcare."
        canonical="/why-germany"
      />

      <PageHero
        badge="Why Indian Professionals Choose Germany"
        badgeIcon={<Landmark size={14} />}
        title="Why Choose Germany?"
        titleAccent="Germany?"
        subtitle="A world-class healthcare system offering unparalleled career growth, excellent salaries, 30 days paid leave, and the ultimate work-life balance for Indian professionals."
      />

      {/* Bento Grid Reasons */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">9 Reasons to Make the Move</h2>
            <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
          </div>
          
          {/* Changed to a masonry-like grid with responsive columns and NO fixed row heights on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:auto-rows-[220px] grid-flow-row-dense">
            {reasons.map((reason, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative border border-border p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-start group overflow-hidden ${reason.className}`}
              >
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="mb-6 bg-background w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner border border-border/50 relative z-10 group-hover:scale-110 transition-transform duration-300 shrink-0">
                  {reason.icon}
                </div>
                <div className="relative z-10 flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 bg-secondary/30 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Germany vs. The Rest</h2>
            <p className="text-muted-foreground text-lg">Why standard English-speaking destinations are losing their appeal.</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-3xl border border-border overflow-x-auto shadow-2xl"
          >
            <Table className="min-w-[600px]">
              <TableHeader className="bg-primary text-primary-foreground">
                <TableRow className="hover:bg-primary border-b-0">
                  <TableHead className="w-[250px] font-bold text-white text-lg py-6 px-6">Career Factor</TableHead>
                  <TableHead className="font-bold text-accent text-lg py-6 px-6 bg-white/5 whitespace-nowrap">🇩🇪 Germany</TableHead>
                  <TableHead className="font-bold text-white/70 text-lg py-6 px-6 whitespace-nowrap">🇬🇧 UK / 🇺🇸 USA / 🇦🇺 Aus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { factor: "Demand for Doctors", de: "Extremely High (50,000+ shortage)", other: "High, but highly competitive entry" },
                  { factor: "Work-Life Balance", de: "Excellent (Strict 40h weeks, paid overtime)", other: "Often poor, high burnout rates" },
                  { factor: "Specialty Training", de: "Apply directly to hospital, earn full salary", other: "Highly competitive national matching" },
                  { factor: "PR / Citizenship", de: "Fast-track via EU Blue Card (21 months)", other: "Often slow, complex visa lotteries" },
                  { factor: "Paid Annual Leave", de: "~30 Days standard", other: "Variable, often 14-20 days" },
                ].map((row, i) => (
                  <TableRow key={i} className="group hover:bg-muted/50 transition-colors">
                    <TableCell className="font-bold text-foreground px-6 py-5">{row.factor}</TableCell>
                    <TableCell className="font-medium px-6 py-5 bg-accent/5">
                      <div className="flex items-start gap-2 text-foreground">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{row.de}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground px-6 py-5">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-400/50 shrink-0 mt-0.5" />
                        <span>{row.other}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250px_250px] animate-[shimmer_3s_linear_infinite]"></div>
        <div className="container mx-auto max-w-2xl relative z-10">
          <h2 className="text-4xl font-extrabold mb-6 text-white">Start Your Journey Today</h2>
          <p className="text-primary-foreground/80 mb-10 text-xl font-light">Let our experienced doctors guide you through the exact process of moving your career to Germany.</p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg font-bold rounded-full shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] transition-all hover:-translate-y-1" onClick={openBooking}>
            Join Free Webinar
          </Button>
        </div>
      </section>
    </div>
  );
}
