import { SEO } from "@/components/SEO";
import { useState } from "react";
import { useBooking } from "@/components/BookingContext";
import { CheckoutDialog } from "@/components/CheckoutDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Languages, MessageCircle,
  CheckCircle2, Video, PlayCircle, Clock, Star,
  FileText, Calendar, Users, ArrowRight, ChevronDown,
  GraduationCap, Stethoscope, Globe2, Banknote,
  Award, Zap, Shield
} from "lucide-react";

const courseModules = [
  { title: "Module 1: Why Germany?", duration: "1 hr", icon: "globe", lessons: ["Universal: Why Germany needs Indian healthcare professionals", "Universal: Healthcare system overview", "Universal: Realistic salary expectations", "Universal: Dr. Sangeeta's and Dr. Sandeep's personal stories"] },
  { title: "Module 2: Are You Eligible?", duration: "1 hr", icon: "check", lessons: ["Universal: How eligibility assessment works", "For Doctors (MBBS)", "For Dentists (BDS)", "For Nurses (GNM / B.Sc / M.Sc Nursing)", "For Radiographers / MTRA", "For Physiotherapists & Allied Health", "Universal: Self-assessment checklist walkthrough"] },
  { title: "Module 3: The German Language Roadmap", duration: "1.5 hrs", icon: "languages", lessons: ["Universal: A1–C1 levels explained", "Universal: Realistic timelines and how to learn", "Universal: Medical German vs General German", "Doctor/Dentist-specific language needs (FSP-oriented)", "Nurse/Radiographer/Physio-specific language needs"] },
  { title: "Module 4: Clinical & Language Exams", duration: "1.5 hrs", icon: "stethoscope", lessons: ["Universal: Why every profession has a language/knowledge checkpoint", "For Doctors: FSP — structure, prep, booking, state timelines", "For Dentists: FSP for dentistry", "For Nurses: Anerkennung exam / adaptation period", "For Radiographers & Physios: Profession-specific exams"] },
  { title: "Module 5: Documents — The Make-or-Break Stage", duration: "1.5 hrs", icon: "file", lessons: ["Universal: Apostille, translation, general document rules", "For Doctors: MCI/NMC documents, internship, Good Standing", "For Dentists: DCI-specific documents", "For Nurses: INC/state nursing council documents", "For Radiographers & Allied Health: Council-specific documents", "Universal: The \"complete application\" checklist method"] },
  { title: "Module 6: Choosing the Right German State", duration: "1 hr", icon: "shield", lessons: ["Universal: Why state selection matters, Landesprüfungsamt differences", "Doctor/Dentist-specific: State-wise FSP/KP waiting times", "Nurse/Allied-specific: State-wise Anerkennung processing speed"] },
  { title: "Module 7: Licensing Pathways", duration: "1.5 hrs", icon: "award", lessons: ["Universal: Temporary vs permanent licenses explained", "For Doctors: Approbation, Defizitbescheid, Kenntnisprüfung, Berufserlaubnis", "For Dentists: Approbation pathway", "For Nurses: Anerkennung, Full vs Partial Recognition, §16d Visa", "For Radiographers & Physios: Recognition notice (Anerkennungsbescheid)"] },
  { title: "Module 8: Securing a Job in Germany", duration: "1.5 hrs", icon: "banknote", lessons: ["Universal: German-style CV and cover letter", "Universal: Where to find jobs", "For Doctors: Assistenzarzt pathway, interviews", "For Dentists: Zahnarztpraxis applications", "For Nurses: Ward nurse roles, ICU/surgical, working during Anerkennungsphase", "For Radiographers & Physios: MTRA and rehab clinic applications"] },
  { title: "Module 9: Visa & Work Authorization", duration: "1 hr", icon: "zap", lessons: ["Universal: Employment visa checklist, EU Blue Card", "Universal: Blocked account, health insurance basics", "Doctor/Dentist-specific visa nuances", "Nurse-specific: §16d Recognition Visa details"] },
  { title: "Module 10: Before You Pack Your Bags", duration: "45 mins", icon: "star", lessons: ["What to bring vs buy locally", "Documents to carry physically", "Packing checklist", "Money to carry"] },
  { title: "Module 11: Apartment Hunting in Germany", duration: "45 mins", icon: "globe", lessons: ["WG-Gesucht, ImmobilienScout24", "Kaltmiete vs Warmmiete, Kaution", "Schufa score", "Viewing etiquette, scams to avoid"] },
  { title: "Module 12: German Bureaucracy 101", duration: "45 mins", icon: "fileText", lessons: ["Anmeldung", "Bürgeramt", "Ausländerbehörde", "Steuer-ID", "Appointment culture (Terminvereinbarung)"] },
  { title: "Module 13: Banking, Money & Taxes", duration: "45 mins", icon: "banknote", lessons: ["N26/DKB vs traditional banks", "Tax basics", "Church tax", "Sending money home"] },
  { title: "Module 14: The German Healthcare System", duration: "45 mins", icon: "stethoscope", lessons: ["Public vs private insurance", "Finding a Hausarzt", "Apotheke culture", "Emergency numbers"] },
  { title: "Module 15: Police, Safety & Legal Basics", duration: "30 mins", icon: "shield", lessons: ["Address registration", "Safety norms", "Legal differences from India", "Emergency contacts"] },
  { title: "Module 16: German Culture & Etiquette", duration: "45 mins", icon: "users", lessons: ["Punctuality", "Directness", "Mülltrennung (Waste sorting)", "Ruhezeit (Quiet hours)", "Small talk, tipping"] },
  { title: "Module 17: Daily Life & Practical Living", duration: "45 mins", icon: "calendar", lessons: ["Grocery shopping", "Sunday closing laws", "Transport, SIM/internet", "Seasonal clothing", "Cost of living by city"] },
  { title: "Module 18: Life After You Move", duration: "45 mins", icon: "star", lessons: ["Homesickness", "Social circle", "Indian community", "Mental health", "Family relocation"] },
];

  const freebies = [
  { title: "German-style CV Template", desc: "Profession-specific, hospital-ready" },
  { title: "Cover Letter Template", desc: "Written in professional German" },
  { title: "Master Document Checklist", desc: "Sorted by profession, nothing missed" },
  { title: "12-Month Roadmap Planner", desc: "Month-by-month action plan" },
  { title: "FSP Practice Case Pack", desc: "5–10 real patient cases with vocab" },
  { title: "Medical German Glossary", desc: "Top 300 clinical terms for the FSP" },
];

const pricingTiers = [
  { 
    name: "Healthcare German Plan", 
    price: "₹4,999", 
    euro: "~€47", 
    features: [
      { text: "Medical Pathway (Modules 1-9)", included: true, bold: true },
      ...courseModules.slice(0, 9).map(m => ({ text: m.title.replace(/Module \d+: /, ''), included: true })),
      { text: "Standard PDF downloads", included: true, bold: true },
      { text: "The Lifestyle Pathway", included: false, bold: true },
      { text: "All 6 Freebie Templates", included: false, bold: true },
      { text: "Exclusive Community Access", included: false, bold: true },
      { text: "1-on-1 Strategy Call", included: false, bold: true }
    ], 
    cta: "Pre-Book for ₹500", 
    highlighted: false,
    checkoutProduct: "prebook" as const
  },
  { 
    name: "Complete Guide", 
    price: "₹9,999", 
    euro: "~€110",
    badge: "Most Popular",
    features: [
      { text: "Everything in Healthcare German Plan", included: true, bold: true },
      { text: "Lifestyle Pathway (Modules 10-18)", included: true, bold: true },
      ...courseModules.slice(9).map(m => ({ text: m.title.replace(/Module \d+: /, ''), included: true })),
      { text: "All 6 Freebie Templates & Checklists", included: true, bold: true },
      { text: "Exclusive Community Access & Q&A", included: true, bold: true },
      { text: "30-min Strategy Call with Dr. Sangeeta", included: false, bold: true }
    ], 
    cta: "Pre-Book for ₹500", 
    highlighted: true,
    checkoutProduct: "prebook" as const
  },
  { 
    name: "Complete Guide + 1-on-1", 
    price: "₹14,999", 
    euro: "~€140", 
    badge: "Premium Experience",
    features: [
      { text: "Everything in Complete Guide", included: true, bold: true },
      { text: "Lifestyle Pathway (Modules 10-18)", included: true, bold: true },
      ...courseModules.slice(9).map(m => ({ text: m.title.replace(/Module \d+: /, ''), included: true })),
      { text: "All 6 Freebie Templates & Checklists", included: true, bold: true },
      { text: "Exclusive Community Access & Q&A", included: true, bold: true },
      { text: "30-min Strategy Call with Dr. Sangeeta", included: true, bold: true }
    ], 
    cta: "Pre-Book for ₹500", 
    highlighted: false,
    checkoutProduct: "prebook" as const
  },
];

export default function CoursePage() {
  const { openBooking } = useBooking();

  const handleWhatsApp = (msg: string) => window.open(`https://wa.me/918310010112?text=${encodeURIComponent(msg)}`, "_blank");
  const handleEnroll = () => window.open("https://superprofile.bio/course/Medispire-early-access", "_blank");

  return (
    <div className="w-full bg-white">
      <SEO title="The Germany Ready Course | MediSpire" description="The complete A-Z career relocation blueprint for Indian healthcare professionals, taught by Dr. Sangeeta Pai & Dr. Sandeep — practicing doctors in Germany." canonical="/services"/>

      {/* HERO */}
      <section className="relative bg-primary overflow-hidden pt-28 pb-24 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(234,179,8,0.12),_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/3 rounded-full blur-3xl -translate-x-1/3 translate-y-1/2 pointer-events-none" />
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-accent/20 text-accent border border-accent/30 px-4 py-1.5 text-sm font-semibold mb-6">🎓 The Definitive Course for Indian Healthcare Professionals</Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
              Germany Ready<br/><span className="text-accent">Career Relocation Blueprint</span>
            </h1>
            <p className="text-xl text-primary-foreground/75 max-w-2xl mx-auto mb-10 leading-relaxed">
              From Indian clinic to German hospital — every step, explained by doctors who've done it.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[["🎬","12–13 Hours of Video"],["📚","10 In-Depth Modules"],["👩‍⚕️","Taught by Practicing Doctors"],["📄","6 Downloadable Resources"]].map(([emoji, text]) => (
                <div key={text} className="flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full backdrop-blur-sm">
                  <span>{emoji}</span><span className="text-sm font-medium text-white">{text}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CheckoutDialog
                product="prebook"
                amountLabel="₹500 Deposit"
                buttonText="Pre-Book Course (₹500)"
                buttonClassName="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-10 py-4 text-base rounded-full shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_45px_rgba(234,179,8,0.6)] transition-all h-auto"
              />
              <Button size="lg" variant="outline" className="border-white/25 text-white bg-white/8 hover:bg-white/15 font-semibold px-10 py-4 text-base rounded-full backdrop-blur-sm" onClick={openBooking}>
                Join Free Webinar First
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INSTRUCTORS */}
      <section className="py-14 px-4 bg-white border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">Your Instructors — Real Doctors. Real Experience.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { initials: "SP", name: "Dr. Sangeeta Pai", role: "Implant Surgeon · Germany", badge: "Founder", desc: "Practicing implant surgeon in Germany. Former BDS dentist in India who navigated the entire Approbation process herself and built MediSpire to share every hard-learned lesson." },
              { initials: "SA", name: "Dr. Sandeep", role: "Interventional Radiologist · Germany", badge: "Co-Instructor", desc: "Senior interventional radiologist currently working in a German hospital. Brings the MBBS → Facharzt perspective in vivid, actionable detail." },
            ].map((doc, i) => (
              <div key={i} className="flex items-start gap-5 p-6 rounded-2xl border border-border bg-slate-50 hover:border-primary/20 hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-2xl shrink-0">{doc.initials}</div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-foreground">{doc.name}</span>
                    <Badge className="bg-accent/15 text-accent border-none text-xs">{doc.badge}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">{doc.role}</p>
                  <p className="text-sm text-foreground/70 leading-relaxed">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-16 px-4 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-5xl text-center">
          <span className="text-accent font-bold text-xs tracking-widest uppercase">Who Is This For?</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-8">Built for every Indian healthcare professional</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[["🩺","MBBS Doctors"],["🦷","BDS Dentists"],["💉","Nurses (GNM/B.Sc/M.Sc)"],["🔬","Radiographers"],["🏃","Physiotherapists"],["🧬","Allied Health"]].map(([emoji, label]) => (
              <div key={label} className="flex items-center gap-2.5 bg-white px-5 py-3.5 rounded-2xl shadow-sm border border-border hover:border-primary/20 hover:shadow-md transition-all font-medium text-foreground">
                <span className="text-xl">{emoji}</span>{label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM REMOVED PER USER REQUEST */}

      {/* PRICING */}
      <section className="py-24 px-4 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-accent font-bold text-xs tracking-widest uppercase">Pricing (Pre-Launch Offer)</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Pre-Book & Save 50%</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Pre-book the course today for just ₹500 and lock in a 50% discount on whichever tier you choose when the course officially launches!
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl flex flex-col transition-all ${tier.highlighted ? "bg-primary text-primary-foreground shadow-2xl scale-105 z-10 ring-2 ring-accent ring-offset-4 ring-offset-[#F8FAFC]" : "bg-white border border-border shadow-sm hover:shadow-lg hover:border-primary/20"}`}>
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground px-4 py-1.5 text-xs font-bold shadow-md">{tier.badge}</Badge>
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className={`text-xl font-bold mb-5 ${tier.highlighted ? "text-white" : "text-foreground"}`}>{tier.name}</h3>
                  <div className="mb-8">
                    <div className={`text-5xl font-black ${tier.highlighted ? "text-white" : "text-primary"}`}>{tier.price}</div>
                    <div className={`text-sm mt-1.5 ${tier.highlighted ? "text-white/55" : "text-muted-foreground"}`}>{tier.euro} · one-time payment</div>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f, j) => {
                      const isString = typeof f === 'string';
                      const text = isString ? f : f.text;
                      const included = isString ? true : f.included;
                      const bold = !isString && 'bold' in f ? f.bold : false;
                      
                      return (
                        <li key={j} className={`flex items-start gap-3 ${!included ? 'opacity-40' : ''}`}>
                          {included ? (
                            <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={16}/>
                          ) : (
                            <div className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center"><div className="w-1.5 h-px bg-current rounded-full" /></div>
                          )}
                          <span className={`text-sm leading-snug ${bold ? 'font-bold' : ''} ${tier.highlighted ? (included ? "text-white/95" : "text-white/60") : (included ? "text-foreground/85" : "text-foreground/60")}`}>{text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  {tier.checkoutProduct ? (
                    <CheckoutDialog
                      product={tier.checkoutProduct}
                      amountLabel={tier.price}
                      buttonText={tier.cta}
                      buttonClassName={`w-full h-12 font-bold rounded-xl transition-all ${tier.highlighted ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-[0_0_20px_rgba(234,179,8,0.3)]" : "bg-transparent border-2 border-border hover:border-primary/40 hover:bg-primary/5 text-foreground"}`}
                    />
                  ) : (
                    <Button
                      className={`w-full h-12 font-bold rounded-xl transition-all ${tier.highlighted ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-[0_0_20px_rgba(234,179,8,0.3)]" : "bg-transparent border-2 border-border hover:border-primary/40 hover:bg-primary/5 text-foreground"}`}
                      onClick={handleEnroll}
                    >
                      {tier.cta}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FREEBIES */}
      <section className="py-20 px-4 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <Badge className="bg-accent/20 text-accent border border-accent/30 mb-4 px-4 py-1.5">Included Free</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">6 Power Resources</h2>
            <p className="text-primary-foreground/65 text-lg max-w-xl mx-auto">Bundled with Standard & Premium — resources that take months to find, delivered in minutes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {freebies.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4 bg-white/8 border border-white/10 rounded-2xl p-5 hover:bg-white/12 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent shrink-0">
                  <CheckCircle2 size={20}/>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-0.5">{f.title}</h4>
                  <p className="text-primary-foreground/55 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TUTOR MATCHING */}
      <section id="tutors" className="py-20 px-4 bg-white border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-accent font-bold text-xs tracking-widest uppercase">Add-On Service</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-3">Authorized Tutor Matching</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Once you understand your level from the course, we match you with the ideal verified German tutor.</p>
          </div>
          <div className="max-w-2xl mx-auto rounded-3xl border-2 border-border shadow-xl overflow-hidden">
            <div className="bg-primary p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/12 flex items-center justify-center shrink-0">
                <Video className="text-white" size={28}/>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Get Matched with a Tutor</h3>
                <p className="text-white/65 text-sm mt-0.5">Custom pricing based on your German language standing</p>
              </div>
            </div>
            <div className="p-8 bg-white">
              <ul className="space-y-4 mb-8">
                {["Hand-picked, verified tutors from our expert network","From A1 complete beginner to C1 FSP-level preparation","1-on-1 intensive or small group online classes","Tutors experienced with Indian medical professionals","Pricing varies based on your level and tutor schedule"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={17}/>
                    <span className="text-foreground/75 text-sm leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md" onClick={() => handleWhatsApp("Hi, I'm looking for an authorized German tutor. I'd like to know the custom pricing based on my current level.")}>
                <MessageCircle className="mr-2" size={20}/> Ask for Custom Pricing on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
