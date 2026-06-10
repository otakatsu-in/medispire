import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useBooking } from "./BookingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Menu, X, Facebook, Instagram, Youtube, MessageCircle, Phone, Mail, ChevronDown, BookOpen } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { openBooking } = useBooking();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  


  const professionalLinks = [
    { label: "For Doctors", path: "/for-doctors", desc: "Pathways for MBBS/MD/MS graduates." },
    { label: "For Dentists", path: "/for-dentists", desc: "Opportunities for BDS/MDS professionals." },
    { label: "For Nurses", path: "/for-nurses", desc: "Nursing and midwifery pathways." },
    { label: "For Allied Health", path: "/for-allied-health", desc: "Radiographers, pharmacists, dental assistants." },
  ];

  const toolLinks = [
    { label: "Eligibility Checker", path: "/eligibility-checker", desc: "Find out if you qualify to practise in Germany." },
    { label: "Salary & Tax Calculator", path: "/tools/salary-calculator", desc: "Estimate your net take-home pay in Germany." },
    { label: "Cost & Timeline Estimator", path: "/cost-estimator", desc: "Estimate your costs and journey timeline." },
    { label: "Document Checklist", path: "/tools/document-checklist", desc: "Generate your custom MEA verification checklist." },
    { label: "State Comparison", path: "/tools/state-compare", desc: "Compare German states for rent and processing." },
    { label: "Language Timeline", path: "/tools/language-timeline", desc: "Plan your roadmap to B2/C1 German." },
    { label: "Readiness Checklist", path: "/tools/readiness-checklist", desc: "Track your progress towards your German dream." },
  ];

  const resourceLinks = [
    { label: "Our Blog", path: "/blog", desc: "Latest news, tips, and success stories." },
    { label: "Resource Center", path: "/resources", desc: "Downloadable guides and checklists." },
  ];

  const companyLinks = [
    { label: "About Us", path: "/about-us", desc: "Our story, mission, and the team." },
    { label: "Why Germany?", path: "/why-germany", desc: "Benefits of living and working in Germany." },
    { label: "Contact Us", path: "/contact-us", desc: "Get in touch with our expert consultants." },
  ];

  const DesktopDropdownItem = ({ item }: { item: { label: string, path: string, desc: string } }) => (
    <Link 
      href={item.path} 
      className="block p-3 rounded-lg hover:bg-secondary/50 transition-colors group/item"
    >
      <div className="text-sm font-bold text-foreground group-hover/item:text-accent transition-colors">{item.label}</div>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.desc}</p>
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans relative pb-16 sm:pb-0">
      
      {/* Top bar */}
      <div className="hidden lg:block bg-primary/95 border-b border-primary-foreground/10 text-primary-foreground/80 h-9 z-50 relative">
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-widest text-primary-foreground/60 uppercase">MEDISPIRE CONSULTANCY</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+491626498523" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone size={12} /> +49 162 649 8523
            </a>
            <span className="text-primary-foreground/30">|</span>
            <a href="tel:+918310010112" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone size={12} /> +91 83100 10112
            </a>
            <a href="mailto:info.medispire@gmail.com" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Mail size={12} /> info.medispire@gmail.com
            </a>
            <div className="flex items-center gap-3 ml-2 border-l border-primary-foreground/20 pl-4">
              <a href="https://www.facebook.com/profile.php?id=61589388965018" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><Facebook size={14} /></a>
              <a href="https://www.instagram.com/docs.in.de/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><Instagram size={14} /></a>
              <a href="https://www.youtube.com/@DocsinDE" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><Youtube size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <header className="sticky top-0 z-40 w-full bg-primary text-primary-foreground shadow-md h-24">
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          
          <Link href="/" className="flex items-center shrink-0 mr-4 xl:mr-8 z-50">
            <img src="/logo.png" alt="MediSpire" className="h-20 w-auto" />
          </Link>
          
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-1 xl:gap-2">
              
              {/* Home */}
              <li>
                <Link href="/" className={`px-3 xl:px-4 py-2 rounded-md text-sm font-medium transition-all hover:bg-white/10 hover:text-white ${location === '/' ? 'text-accent' : 'text-primary-foreground'}`}>
                  Home
                </Link>
              </li>

              {/* Professions */}
              <li className="relative group">
                <button className="flex items-center gap-1 px-3 xl:px-4 py-2 rounded-md text-sm font-medium text-primary-foreground transition-all hover:bg-white/10 hover:text-white group-hover:bg-white/10 group-hover:text-white">
                  Professions <ChevronDown size={14} className="opacity-70 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-2 w-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="p-2 bg-white rounded-xl shadow-2xl border border-border">
                    <div className="grid grid-cols-1 gap-1">
                      {professionalLinks.map((item) => <DesktopDropdownItem key={item.path} item={item} />)}
                    </div>
                  </div>
                </div>
              </li>

              {/* Free Tools */}
              <li className="relative group">
                <button className="flex items-center gap-1 px-3 xl:px-4 py-2 rounded-md text-sm font-medium text-primary-foreground transition-all hover:bg-white/10 hover:text-white group-hover:bg-white/10 group-hover:text-white">
                  Free Tools <ChevronDown size={14} className="opacity-70 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[350px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="p-2 bg-white rounded-xl shadow-2xl border border-border">
                    <div className="grid grid-cols-1 gap-1">
                      {toolLinks.map((item) => <DesktopDropdownItem key={item.path} item={item} />)}
                    </div>
                  </div>
                </div>
              </li>

              {/* Services */}
              <li>
                <Link href="/services" className={`px-3 xl:px-4 py-2 rounded-md text-sm font-medium transition-all hover:bg-white/10 hover:text-white ${location === '/services' ? 'text-accent' : 'text-primary-foreground'}`}>
                  Services
                </Link>
              </li>

              {/* Resources */}
              <li className="relative group">
                <button className="flex items-center gap-1 px-3 xl:px-4 py-2 rounded-md text-sm font-medium text-primary-foreground transition-all hover:bg-white/10 hover:text-white group-hover:bg-white/10 group-hover:text-white">
                  Resources <ChevronDown size={14} className="opacity-70 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                {/* Aligned to right to prevent overflow on smaller screens */}
                <div className="absolute right-0 lg:-right-12 xl:left-1/2 xl:-translate-x-1/2 xl:right-auto top-full pt-2 w-[300px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="p-2 bg-white rounded-xl shadow-2xl border border-border relative before:content-[''] before:absolute before:-top-2 before:right-8 xl:before:left-1/2 xl:before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white">
                    <div className="grid grid-cols-1 gap-1">
                      {resourceLinks.map((item) => <DesktopDropdownItem key={item.path} item={item} />)}
                    </div>
                  </div>
                </div>
              </li>

              {/* Company */}
              <li className="relative group">
                <button className="flex items-center gap-1 px-3 xl:px-4 py-2 rounded-md text-sm font-medium text-primary-foreground transition-all hover:bg-white/10 hover:text-white group-hover:bg-white/10 group-hover:text-white">
                  Company <ChevronDown size={14} className="opacity-70 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                {/* Strictly aligned right to never overflow */}
                <div className="absolute right-0 top-full pt-2 w-[300px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="p-2 bg-white rounded-xl shadow-2xl border border-border relative before:content-[''] before:absolute before:-top-2 before:right-6 before:border-8 before:border-transparent before:border-b-white">
                    <div className="grid grid-cols-1 gap-1">
                      {companyLinks.map((item) => <DesktopDropdownItem key={item.path} item={item} />)}
                    </div>
                  </div>
                </div>
              </li>
              
            </ul>
          </nav>

          <div className="hidden lg:flex shrink-0 ml-4 xl:ml-8 z-50">
            <Button 
              onClick={openBooking} 
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-6 py-2 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all ring-2 ring-transparent hover:ring-accent/30"
            >
              Book Free Consultation
            </Button>
          </div>

          <button 
            className="lg:hidden text-primary-foreground p-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-primary border-b border-white/10 shadow-2xl py-4 px-4 flex flex-col gap-2 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
            
            <Link 
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${location === '/' ? 'bg-white/10 text-accent' : 'text-primary-foreground hover:bg-white/5'}`}
            >
              Home
            </Link>

            <div className="px-3 py-2 mt-1 border-l-2 border-white/20 ml-1 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Professions</span>
              {professionalLinks.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1.5 text-sm font-medium transition-colors ${location === item.path ? 'text-accent' : 'text-primary-foreground/80 hover:text-white'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="px-3 py-2 mt-1 border-l-2 border-accent/50 ml-1 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Free Tools</span>
              {toolLinks.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1.5 text-sm font-medium transition-colors ${location === item.path ? 'text-white' : 'text-primary-foreground/80 hover:text-white'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link 
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${location === '/services' ? 'bg-white/10 text-accent' : 'text-primary-foreground hover:bg-white/5'}`}
            >
              Services
            </Link>

            <div className="px-3 py-2 mt-1 border-l-2 border-white/20 ml-1 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Resources</span>
              {resourceLinks.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1.5 text-sm font-medium transition-colors ${location === item.path ? 'text-accent' : 'text-primary-foreground/80 hover:text-white'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="px-3 py-2 mt-1 border-l-2 border-white/20 ml-1 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Company</span>
              {companyLinks.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1.5 text-sm font-medium transition-colors ${location === item.path ? 'text-accent' : 'text-primary-foreground/80 hover:text-white'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <Button onClick={() => { openBooking(); setMobileMenuOpen(false); }} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-6 text-base rounded-xl shadow-lg">
                Book Free Consultation
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-primary text-primary-foreground py-16 mt-auto pb-24 sm:pb-16 border-t-[6px] border-accent">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
            <div>
              <img src="/logo.png" alt="MediSpire" className="h-16 w-auto" />
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed pr-4">
              Guidance from real German-registered doctors who've walked the same path. No agents. No hidden fees. No false promises.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/profile.php?id=61589388965018" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-foreground/90 hover:bg-accent hover:text-accent-foreground transition-all"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/docs.in.de/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-foreground/90 hover:bg-accent hover:text-accent-foreground transition-all"><Instagram size={18} /></a>
              <a href="https://www.youtube.com/@DocsinDE" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-foreground/90 hover:bg-accent hover:text-accent-foreground transition-all"><Youtube size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div> Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/about-us" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> About Us</Link></li>
              <li><Link href="/why-germany" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> Why Germany</Link></li>
              <li><Link href="/for-doctors" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> For Doctors</Link></li>
              <li><Link href="/for-dentists" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> For Dentists</Link></li>
              <li><Link href="/for-nurses" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> For Nurses</Link></li>
              <li><Link href="/for-allied-health" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> For Allied Health</Link></li>
              <li><Link href="/eligibility-checker" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> Eligibility Checker</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div> Top Services
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/services" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> Approbation / License</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> Language Coaching</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> Job Application Support</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> FSP Training</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> Visa Assistance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div> Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li>
                <a href="mailto:info.medispire@gmail.com" className="group flex items-start gap-3 hover:text-white transition-colors">
                  <Mail size={18} className="mt-0.5 text-accent group-hover:text-white transition-colors" />
                  <span>info.medispire@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+491626498523" className="group flex items-start gap-3 hover:text-white transition-colors">
                  <Phone size={18} className="mt-0.5 text-accent group-hover:text-white transition-colors" />
                  <span>+49 162 649 8523 (DE)</span>
                </a>
              </li>
              <li>
                <a href="tel:+918310010112" className="group flex items-start gap-3 hover:text-white transition-colors">
                  <Phone size={18} className="mt-0.5 text-accent group-hover:text-white transition-colors" />
                  <span>+91 83100 10112 (IN)</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                <span className="text-primary-foreground/60 leading-relaxed">Medispire UG<br/>Emsdettener Str. 10<br/>48268 Greven, Germany</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50 font-medium">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
            <span>© {new Date().getFullYear()} MediSpire UG. All rights reserved.</span>
            <span className="hidden md:inline text-white/20">|</span>
            <div className="flex gap-6">
              <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
          <div className="text-center md:text-right flex items-center gap-1.5">
            Made with <span className="text-red-500">♥</span> by Indian Doctors in Germany
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-background border-t border-border z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] flex items-center justify-between pb-safe">
        <Button onClick={openBooking} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base h-12 rounded-xl shadow-md">
          Book Free Consultation
        </Button>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918310010112?text=Hi%20MediSpire!%20I%20need%20guidance%20about%20moving%20to%20Germany%20as%20a%20healthcare%20professional."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 group flex items-center justify-end gap-0 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] transition-all duration-300 pr-4 overflow-hidden"
        style={{ width: "3.5rem" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.width = "185px"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.width = "3.5rem"; }}
        title="Chat with us on WhatsApp"
      >
        <span className="text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2 pl-4">
          Chat with us
        </span>
        <div className="relative shrink-0 w-6 h-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-75"></div>
          <MessageCircle size={24} className="relative z-10" />
        </div>
      </a>



    </div>
  );
}