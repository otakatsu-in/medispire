import { SEO } from "@/components/SEO";
import { CheckCircle2, ArrowRight, Video, FileText, Compass, Clock, GraduationCap } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { Button } from "@/components/ui/button";

export default function Consultation() {
  return (
    <div className="w-full bg-white">
      <SEO title="1-on-1 Consultation | MediSpire" description="Book a personalized 60-minute strategy call with Dr. Sangeeta Pai or Dr. Sandeep to discuss your medical career in Germany." canonical="/consultation" />

      {/* HERO SECTION */}
      <section className="relative bg-primary overflow-hidden pt-28 pb-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(234,179,8,0.12),_transparent_60%)]" />
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Expert 1-on-1 Strategy Call
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop guessing. Get a personalized roadmap tailored to your specific qualifications, state preferences, and career goals in Germany.
            </p>
            <CheckoutDialog 
              product="consultation"
              amountLabel="₹8,999"
              buttonText="Book Your Call Now →"
              buttonClassName="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-10 py-4 text-base rounded-full shadow-[0_0_30px_rgba(234,179,8,0.4)]"
            />
          </motion.div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">What's Included in the 60-Minute Session?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              This isn't generic advice. We sit down with you over a video call, analyze your exact profile, and plot the fastest, most cost-effective path to your German medical license.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { icon: FileText, title: "Document Review & Gap Analysis", desc: "We review your current degrees, transcripts, and experience to tell you exactly what documents you're missing before you apply to the authorities." },
              { icon: Compass, title: "State Selection Strategy", desc: "Different German states have wildly different waiting times and exam formats. We help you choose the best state for your specific profession and language level." },
              { icon: Clock, title: "Timeline & Budget Planning", desc: "We break down how many months it will realistically take and exactly how much money you need to budget for the entire relocation process." },
              { icon: GraduationCap, title: "Exam Preparation Plan", desc: "Get insider tips on how to prepare for the FSP (Fachsprachenprüfung) or Anerkennung, depending on your healthcare profession." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-border shadow-sm flex gap-5 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING & BOOKING */}
      <section className="py-24 px-4 bg-white border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-primary text-white p-10 md:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to Fast-Track Your Journey?</h2>
            <div className="text-5xl font-black text-accent mb-2 relative z-10">₹8,999 <span className="text-xl text-white/70 font-medium">/ 60 minutes</span></div>
            <p className="text-white/80 mb-10 relative z-10">One-time flat fee. No hidden charges.</p>
            
            <CheckoutDialog 
              product="consultation"
              amountLabel="₹8,999"
              buttonText="Proceed to Payment"
              buttonClassName="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-12 py-6 text-lg rounded-full w-full sm:w-auto relative z-10"
            />
            
            <div className="mt-10 pt-8 border-t border-white/20 text-white/90 text-sm md:text-base max-w-xl mx-auto relative z-10 text-left space-y-4">
              <p className="flex items-start gap-3">
                <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={18}/>
                <span><strong>1-on-1 with Dr. Sangeeta Pai</strong> for exactly 1 hour.</span>
              </p>
              <p className="flex items-start gap-3">
                <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={18}/>
                <span><strong>After payment</strong>, our team will personally contact you to finalize the timings.</span>
              </p>
              <p className="flex items-start gap-3">
                <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={18}/>
                <span><strong>Available Slots:</strong> 12:00 PM – 1:00 PM IST or 1:00 PM – 2:00 PM IST on weekends (Saturday & Sunday). You will be allocated one of these 4 slots.</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
