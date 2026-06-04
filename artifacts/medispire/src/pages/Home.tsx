import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Stethoscope, ShieldCheck, HeartPulse, GraduationCap, 
  Wallet, Scale, CalendarDays, TrendingUp, Hospital, 
  Plane, BookOpen, Briefcase, FileCheck, ArrowRight, UserPlus,
  Quote, CheckCircle2, MessageCircle, MapPin
} from "lucide-react";

export default function Home() {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title = "MediSpire | Your Key to Healthcare in Germany";
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { staggerChildren: 0.15 }
  };

  return (
    <div className="flex flex-col w-full">
      
      {/* 1. Hero */}
      <section 
        className="relative pt-32 pb-40 px-4 overflow-hidden text-white"
        style={{
          background: "linear-gradient(135deg, #1A2E4A 0%, #0f1e33 50%, #1a3555 100%)",
        }}
      >
        {/* Subtle geometric pattern overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Expert Consultation by German-Registered Doctors
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Your Gateway to a Healthcare Career in <span className="text-accent relative inline-block">
                Germany
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Guidance from real German-registered doctors who've walked the same path. No agents. No hidden fees. No false promises.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold px-10 py-7 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.25)] hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] transition-all ring-2 ring-transparent hover:ring-accent/40"
                onClick={openBooking}
              >
                Book Free Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white text-lg font-bold px-10 py-7 rounded-2xl backdrop-blur-sm"
                onClick={() => document.getElementById('professions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Pathways
              </Button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center">
                <span className="text-4xl font-extrabold text-white mb-1">8+</span>
                <span className="text-sm font-medium text-white/70 uppercase tracking-wider">Years Experience</span>
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center">
                <span className="text-4xl font-extrabold text-white mb-1">500+</span>
                <span className="text-sm font-medium text-white/70 uppercase tracking-wider">Professionals Guided</span>
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center">
                <span className="text-4xl font-extrabold text-white mb-1">0</span>
                <span className="text-sm font-medium text-white/70 uppercase tracking-wider">Hidden Fees / Agents</span>
              </div>
            </motion.div>
            
          </div>
        </div>

        {/* Decorative Wave cutting into next section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.83,123.6,192.27,109.81,236.4,99.88,278.4,80.1,321.39,56.44Z" fill="#F4F6F8"></path>
          </svg>
        </div>
      </section>

      {/* 2. Why Choose MediSpire */}
      <section className="py-24 bg-[#F4F6F8] px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold text-sm tracking-widest uppercase mb-3 block">WHY MEDISPIRE</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">The MediSpire Difference</h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              { icon: Stethoscope, title: "First-hand Experience", desc: "Direct guidance from registered German doctors who have successfully navigated the entire system themselves." },
              { icon: MapPin, title: "End-to-End Guidance", desc: "Personalized support at every step—from language learning to job placement, visa, and relocation." },
              { icon: ShieldCheck, title: "100% Transparent", desc: "No agents. No cuts. We believe in clear, honest advice without any hidden fees or false promises." }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeIn} className="relative group bg-white p-10 rounded-2xl shadow-sm hover:shadow-md border-l-4 border-l-transparent hover:border-l-accent transition-all duration-300 overflow-hidden">
                <div className="absolute -right-4 -top-8 text-[120px] font-black text-primary/[0.03] select-none pointer-events-none">
                  0{i + 1}
                </div>
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                  <feature.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary relative z-10">{feature.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Who We Help */}
      <section id="professions" className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold text-sm tracking-widest uppercase mb-3 block">CAREER PATHWAYS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">Who We Help</h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Tailored pathways designed specifically for international healthcare professionals aiming to practice in Germany.</p>
          </div>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              { title: "Doctors", sub: "MBBS / MD / MS", path: "/for-doctors", icon: Stethoscope, color: "bg-blue-600" },
              { title: "Dentists", sub: "BDS / MDS", path: "/for-dentists", icon: HeartPulse, color: "bg-teal-500" },
              { title: "Nurses", sub: "GNM / BSc / MSc", path: "/for-nurses", icon: Hospital, color: "bg-purple-600" },
              { title: "Allied Health", sub: "Radiographers, Pharmacists", path: "/for-nurses", icon: ShieldCheck, color: "bg-green-600" }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn} className="h-full">
                <Link href={item.path} className="block h-full">
                  <Card className="group h-full rounded-2xl overflow-hidden border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className={`${item.color} h-28 flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <item.icon size={48} className="text-white relative z-10 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-8 text-center bg-white flex flex-col h-[calc(100%-7rem)]">
                      <h3 className="text-2xl font-bold mb-2 text-primary">{item.title}</h3>
                      <p className="text-muted-foreground font-medium mb-6">{item.sub}</p>
                      <div className="mt-auto inline-flex items-center justify-center gap-2 text-primary font-bold group-hover:text-accent transition-colors">
                        View Pathway <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Why Germany Grid */}
      <section className="py-24 bg-[#F4F6F8] px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold text-sm tracking-widest uppercase mb-3 block">DESTINATION</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">Why Choose Germany?</h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">One of the world's best healthcare systems offering unparalleled career opportunities and lifestyle.</p>
          </div>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              { icon: Wallet, title: "Attractive Salary", desc: "€5,000–€10,000/month starting salary depending on specialty." },
              { icon: Scale, title: "Work-Life Balance", desc: "Structured hours and strict labor laws prevent physician burnout." },
              { icon: CalendarDays, title: "Paid Holidays", desc: "Approximately 30 Days of paid annual leave plus public holidays." },
              { icon: TrendingUp, title: "High Demand", desc: "Current massive shortage of 50,000+ doctors across all states." },
              { icon: Hospital, title: "World-Class System", desc: "Work with state-of-the-art medical facilities and advanced technology." },
              { icon: ShieldCheck, title: "Social Security", desc: "Comprehensive health, unemployment, and pension insurance." },
              { icon: Plane, title: "Travel Freedom", desc: "Blue Card gives you the freedom to travel across the Schengen zone." },
              { icon: FileCheck, title: "Pathway to PR", desc: "Clear, accelerated route to Permanent Residency & German Citizenship." },
              { icon: BookOpen, title: "CME Support", desc: "Paid time off and funding for Continuous Medical Education." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-md hover:border-primary transition-all duration-300 flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon size={24} className="text-primary group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-2">{item.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Timeline Journey */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <span className="text-accent font-bold text-sm tracking-widest uppercase mb-3 block">ROADMAP</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">Your Journey Step-by-Step</h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
          </div>
          
          <div className="relative">
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 border-r border-dashed border-primary/30 -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {[
                { title: "Language Learning", desc: "Achieve German B2/C1 proficiency through intensive, medically-focused coaching." },
                { title: "Document Preparation", desc: "Gather, translate, and notarize all necessary documents according to state requirements." },
                { title: "Credential Evaluation", desc: "Apply for Approbation (Full License) or Berufserlaubnis (Temporary License)." },
                { title: "FSP Exam Preparation", desc: "Specialized training for the Fachsprachprüfung (Medical Language Exam)." },
                { title: "Hospitation", desc: "Secure an observership to gain insight into the German hospital system." },
                { title: "Job Application", desc: "CV optimization, motivation letter writing, and interview preparation." },
                { title: "Visa & Relocation", desc: "Guidance on Blue Card application, housing, and settling in Germany." }
              ].map((step, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Number Circle for Mobile */}
                    <div className="md:hidden w-16 h-16 shrink-0 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl shadow-lg border-4 border-white z-10">
                      {i + 1}
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}>
                      <div className={`bg-white p-8 rounded-2xl shadow-md border border-border hover:shadow-lg transition-all duration-300 relative ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                        <h4 className="text-2xl font-bold text-primary mb-3">{step.title}</h4>
                        <p className="text-muted-foreground text-lg">{step.desc}</p>
                      </div>
                    </div>

                    {/* Number Circle for Desktop */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-accent text-accent-foreground items-center justify-center font-bold text-2xl shadow-[0_0_0_8px_rgba(255,255,255,1)] z-10">
                      {i + 1}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials (NEW) */}
      <section className="py-24 bg-primary text-primary-foreground px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold text-sm tracking-widest uppercase mb-3 block">SUCCESS STORIES</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">What Doctors Say About MediSpire</h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              { quote: "Speaking to Dr. Amin even before coming to Germany gave me a clear picture of what to expect. His firsthand guidance was invaluable.", name: "Dr. Harish Prabhu", loc: "Germany" },
              { quote: "Dr. Sangeeta Pai has had a great impact in my life. Her mentorship helped me navigate the German healthcare system with confidence.", name: "Dr. Akshaya Krishnamurthy", loc: "Germany" },
              { quote: "She has constantly helped and motivated me throughout my journey from India to Germany. Couldn't have done it without her support.", name: "Dr. Shyam", loc: "Germany" },
              { quote: "I would highly recommend a career consultation with her to anyone planning to move to Germany. Absolutely life-changing advice.", name: "Dr. Renu Nain", loc: "India" }
            ].map((test, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-sm relative">
                <Quote className="absolute top-8 left-8 text-accent/20 w-16 h-16" />
                <div className="relative z-10">
                  <p className="text-xl text-white/90 leading-relaxed italic mb-8">"{test.quote}"</p>
                  <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xl">
                      {test.name.charAt(4)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{test.name}</h4>
                      <p className="text-white/60 text-sm">{test.loc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Services Strip (NEW) */}
      <section className="py-24 bg-[#F4F6F8] px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold text-sm tracking-widest uppercase mb-3 block">OUR EXPERTISE</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">Comprehensive Services</h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              "Online German Language", "Medical/Dental License", "Job Application", 
              "FSP Training", "Translation of Documents", "Document Analysis", 
              "Motivation Letter", "Hospitation", "Visa Assistance", 
              "Defizitbescheid", "Accommodation", "Bridging Courses", "Job Opportunities"
            ].map((service, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white px-6 py-4 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-accent hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 cursor-default">
                <CheckCircle2 size={18} className="text-accent" />
                <span className="font-bold text-primary">{service}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                View All Services Details
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Blog Preview (NEW) */}
      <section className="py-24 bg-white px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-accent font-bold text-sm tracking-widest uppercase mb-3 block">INSIGHTS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">Latest from our Blog</h2>
              <div className="w-16 h-1 bg-accent rounded-full"></div>
            </div>
            <Link href="/blog">
              <Button variant="ghost" className="font-bold text-primary hover:text-accent">
                Read All Articles <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              { cat: "For Doctors", title: "How to Learn German as a Doctor: The Complete A1 to C1 Roadmap", color: "bg-blue-100 text-blue-700" },
              { cat: "FSP & Exams", title: "What is FSP (Fachsprachprüfung) and How to Crack It", color: "bg-purple-100 text-purple-700" },
              { cat: "Medical Licensing", title: "Approbation vs Berufserlaubnis: What Indian Doctors Need to Know", color: "bg-teal-100 text-teal-700" }
            ].map((post, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Link href="/blog">
                  <Card className="h-full rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-border cursor-pointer group">
                    <div className="h-48 bg-secondary flex items-center justify-center">
                      <BookOpen size={48} className="text-primary/20" />
                    </div>
                    <CardContent className="p-8">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${post.color}`}>
                        {post.cat}
                      </span>
                      <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 line-clamp-2">
                        Discover the essential steps and requirements for this crucial stage of your journey to practicing in Germany.
                      </p>
                      <span className="text-primary font-bold flex items-center gap-2 group-hover:text-accent transition-colors">
                        Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="relative py-32 px-4 text-center overflow-hidden bg-[#1A2E4A] text-white">
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #243B5E 25%, transparent 25%, transparent 75%, #243B5E 75%, #243B5E), repeating-linear-gradient(45deg, #243B5E 25%, transparent 25%, transparent 75%, #243B5E 75%, #243B5E)",
            backgroundPosition: "0 0, 20px 20px",
            backgroundSize: "40px 40px"
          }}
        />
        
        <div className="container mx-auto max-w-4xl relative z-10 bg-primary/40 backdrop-blur-md border border-white/10 p-12 md:p-20 rounded-3xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Ready to Start Your Journey to Germany?</h2>
          <p className="text-xl text-white/80 mb-12">Take the first step towards a rewarding medical career in Europe.</p>
          
          <div className="flex flex-col items-center gap-6">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl font-bold px-12 py-8 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_40px_rgba(234,179,8,0.5)] transition-all ring-4 ring-transparent hover:ring-accent/30 w-full sm:w-auto" 
              onClick={openBooking}
            >
              Book Free Consultation
            </Button>
            
            <a 
              href="https://wa.me/491626498523" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              Or message us directly on <MessageCircle size={20} className="text-[#25D366]" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}