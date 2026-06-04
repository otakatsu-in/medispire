import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useBooking } from "./BookingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Menu, X, Facebook, Twitter, Linkedin, Instagram, MessageCircle, Phone, Mail, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { openBooking } = useBooking();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [showCookie, setShowCookie] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookieConsent")) {
      setShowCookie(true);
    }
    
    if (!localStorage.getItem("newsletterShown")) {
      const timer = setTimeout(() => {
        setShowNewsletter(true);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowCookie(false);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you!",
      description: "Check your email for the free guide.",
    });
    localStorage.setItem("newsletterShown", "true");
    setShowNewsletter(false);
  };

  const closeNewsletter = () => {
    localStorage.setItem("newsletterShown", "true");
    setShowNewsletter(false);
  };

  const standaloneLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about-us" },
    { label: "Why Germany", path: "/why-germany" },
    { label: "Services", path: "/services" },
    { label: "Blog", path: "/blog" },
    { label: "Resources", path: "/resources" },
    { label: "Contact Us", path: "/contact-us" },
  ];

  const professionalLinks = [
    { label: "For Doctors", path: "/for-doctors", desc: "Pathways for MBBS/MD/MS graduates." },
    { label: "For Dentists", path: "/for-dentists", desc: "Opportunities for BDS/MDS professionals." },
    { label: "For Nurses & Allied", path: "/for-nurses", desc: "Nursing, pharmacy, and allied health roles." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans relative pb-16 sm:pb-0">
      
      {/* Top bar */}
      <div className="hidden lg:block bg-primary/95 border-b border-primary-foreground/10 text-primary-foreground/80 h-9">
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-widest text-primary-foreground/60 uppercase">MEDISPIRE CONSULTANCY</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+491626498523" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone size={12} /> +49 162 649 8523
            </a>
            <a href="mailto:info.medispire@gmail.com" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Mail size={12} /> info.medispire@gmail.com
            </a>
            <div className="flex items-center gap-3 ml-2 border-l border-primary-foreground/20 pl-4">
              <a href="#" className="hover:text-accent transition-colors"><Facebook size={14} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Twitter size={14} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Linkedin size={14} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Instagram size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <header className="sticky top-0 z-40 w-full bg-primary text-primary-foreground shadow-md h-16">
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          
          <Link href="/" className="flex flex-col items-start shrink-0 mr-8">
            <span className="font-bold text-2xl tracking-tight text-white leading-none">MediSpire</span>
            <span className="text-[0.65rem] text-primary-foreground/80 font-medium uppercase tracking-wider mt-0.5">Key to your practice in Germany</span>
          </Link>
          
          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} bg-transparent text-primary-foreground hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[active]:bg-white/10 ${location === '/' ? 'text-accent' : ''}`}>
                    <Link href="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10">
                    For Professionals
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white rounded-xl shadow-lg border-border">
                      {professionalLinks.map((item) => (
                        <li key={item.path}>
                          <NavigationMenuLink asChild className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-secondary-foreground focus:bg-secondary focus:text-secondary-foreground">
                            <Link href={item.path}>
                              <div className="text-sm font-bold leading-none text-foreground">{item.label}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5">
                                {item.desc}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {standaloneLinks.slice(1).map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} bg-transparent text-primary-foreground hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white ${location === item.path ? 'text-accent' : ''}`}>
                      <Link href={item.path}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden lg:flex shrink-0 ml-8">
            <Button 
              onClick={openBooking} 
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-6 py-2 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all ring-2 ring-transparent hover:ring-accent/30"
            >
              Book Free Consultation
            </Button>
          </div>

          <button 
            className="lg:hidden text-primary-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-primary border-b border-white/10 shadow-2xl py-4 px-4 flex flex-col gap-2 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="mb-2 px-3 pb-2 border-b border-white/10 text-xs font-semibold text-primary-foreground/50 uppercase tracking-wider">
              Menu
            </div>
            
            <Link 
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${location === '/' ? 'bg-white/10 text-accent' : 'text-primary-foreground hover:bg-white/5'}`}
            >
              Home
            </Link>

            <div className="px-3 py-2 mt-2 border-l-2 border-accent/50 ml-1 flex flex-col gap-2">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">For Professionals</span>
              {professionalLinks.map((item) => (
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

            <div className="my-2 border-t border-white/10"></div>

            {standaloneLinks.slice(1).map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${location === item.path ? 'bg-white/10 text-accent' : 'text-primary-foreground hover:bg-white/5'}`}
              >
                {item.label}
              </Link>
            ))}
            
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
              <span className="font-bold text-3xl tracking-tight text-white block mb-1">MediSpire</span>
              <span className="text-xs text-accent font-bold uppercase tracking-widest">Key to your practice in Germany</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed pr-4">
              Guidance from real German-registered doctors who've walked the same path. No agents. No hidden fees. No false promises.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-foreground/90 hover:bg-accent hover:text-accent-foreground transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-foreground/90 hover:bg-accent hover:text-accent-foreground transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-foreground/90 hover:bg-accent hover:text-accent-foreground transition-all"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-foreground/90 hover:bg-accent hover:text-accent-foreground transition-all"><Instagram size={18} /></a>
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
              <li><Link href="/for-nurses" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> For Nurses & Allied</Link></li>
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
                  <span>+49 162 649 8523</span>
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
        href="https://wa.me/491626498523?text=Hi%20MediSpire!%20I%20need%20guidance%20about%20moving%20to%20Germany%20as%20a%20healthcare%20professional."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300"
        title="Chat with us on WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75 duration-1000"></div>
        <MessageCircle size={28} className="relative z-10" />
      </a>

      {/* Cookie Banner */}
      {showCookie && (
        <div className="fixed bottom-24 sm:bottom-6 left-0 right-0 sm:left-6 sm:right-auto sm:max-w-md bg-white border border-border p-6 rounded-t-2xl sm:rounded-2xl shadow-2xl z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-1">Your Privacy Matters</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use cookies to improve your experience. By continuing, you agree to our use of cookies.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={acceptCookies} className="flex-1 rounded-xl bg-primary text-primary-foreground font-bold">Accept All</Button>
            <Button variant="outline" onClick={acceptCookies} className="flex-1 rounded-xl font-bold">Manage</Button>
          </div>
        </div>
      )}

      {/* Newsletter Popup */}
      <Dialog open={showNewsletter} onOpenChange={(open) => !open && closeNewsletter()}>
        <DialogContent className="sm:max-w-md rounded-2xl overflow-hidden p-0 border-0">
          <div className="bg-primary p-8 text-center text-primary-foreground relative">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250px_250px] animate-[shimmer_3s_linear_infinite]"></div>
            <div className="w-16 h-16 mx-auto bg-accent text-accent-foreground rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg">
              <BookOpen size={28} />
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-white relative z-10">Free Career Guide</DialogTitle>
            <DialogDescription className="text-primary-foreground/90 mt-2 relative z-10 text-base">
              Join 500+ healthcare professionals who've downloaded our comprehensive guide to Germany.
            </DialogDescription>
          </div>
          <div className="p-8 bg-white">
            <form onSubmit={handleNewsletterSubmit} className="space-y-5">
              <div className="space-y-2.5">
                <Label htmlFor="nl-name" className="text-sm font-bold text-foreground">Full Name</Label>
                <Input id="nl-name" required placeholder="Dr. John Doe" className="h-12 rounded-xl bg-secondary/50" />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="nl-email" className="text-sm font-bold text-foreground">Email Address</Label>
                <Input id="nl-email" type="email" required placeholder="john@example.com" className="h-12 rounded-xl bg-secondary/50" />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg h-14 mt-4 rounded-xl shadow-lg ring-2 ring-transparent hover:ring-accent/30 transition-all">
                Send Me the Guide
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">We respect your privacy. No spam.</p>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Add these to make the layout compile if missing in imports
import { ShieldCheck, BookOpen } from "lucide-react";