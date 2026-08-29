import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function ConsultationIntakeForm({ 
  orderId, 
  defaultName, 
  defaultEmail, 
  defaultPhone, 
  onComplete 
}: { 
  orderId: string | null;
  defaultName?: string;
  defaultEmail?: string;
  defaultPhone?: string;
  onComplete: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // State for checkboxes since FormData doesn't handle multiple same-name checkboxes easily as an array in standard entries
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
  const [selectedLanguageCerts, setSelectedLanguageCerts] = useState<string[]>([]);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [consentGiven, setConsentGiven] = useState(false);

  const toggleArrayItem = (array: string[], setArray: (val: string[]) => void, item: string) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consentGiven) {
      toast({ title: "Consent Required", description: "Please provide your consent at the bottom to proceed.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    
    // Convert to JSON
    const data: Record<string, any> = Object.fromEntries(fd.entries());
    
    // Inject array states
    data.degrees = selectedDegrees;
    data.languageCerts = selectedLanguageCerts;
    data.docsReady = selectedDocs;
    data.goals = selectedGoals;

    try {
      const res = await fetch("/api/submit-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderId,
          formData: data
        })
      });

      if (!res.ok) throw new Error("Failed to submit");
      onComplete();
    } catch (err) {
      toast({ title: "Submission Error", description: "Something went wrong saving your answers. Please try again.", variant: "destructive" });
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-border text-left w-full max-w-4xl mx-auto">
      <div className="mb-8 border-b border-border pb-6 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
          <CheckCircle2 size={16} /> Payment Successful!
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-primary mb-2">Just One More Step...</h2>
        <p className="text-muted-foreground">Dr. Sangeeta needs this information to prepare for your 1-on-1 consultation and provide you with the most accurate, tailored advice.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* 1. Basic Identification */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-accent flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm">1</span> Basic Identification</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input name="fullName" required defaultValue={defaultName} placeholder="Dr. Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number (WhatsApp Active)</Label>
              <Input type="tel" name="phone" defaultValue={defaultPhone} pattern="^\+[1-9][0-9\s\-]{6,18}$" title="Please include your country code starting with '+' (e.g. +91 9876543210)" required placeholder="+91 9876543210" />
            </div>
            <div className="space-y-2">
              <Label>Email ID</Label>
              <Input name="email" type="email" defaultValue={defaultEmail} required placeholder="jane@example.com" />
            </div>
            <div className="space-y-2">
              <Label>City & State (Current Location)</Label>
              <Input name="location" required placeholder="Mumbai, Maharashtra" />
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <Label className="text-base font-semibold">Preferred language for consultation <span className="text-destructive">*</span></Label>
            <RadioGroup name="preferredLanguage" defaultValue="English" required className="flex flex-wrap gap-4">
              {['English', 'Hindi', 'Kannada', 'Other'].map(opt => (
                <div className="flex items-center space-x-2" key={opt}>
                  <RadioGroupItem value={opt} id={`lang-${opt}`} />
                  <Label htmlFor={`lang-${opt}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </section>

        {/* 2. Professional Background */}
        <section className="space-y-6 bg-slate-50 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-accent flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm">2</span> Professional Background</h3>
          
          <div className="space-y-3">
            <Label className="text-base font-semibold">Current Profession <span className="text-destructive">*</span></Label>
            <RadioGroup name="profession" required className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['MBBS Doctor', 'BDS Dentist', 'Nurse', 'Allied Health', 'Student', 'Other'].map(opt => (
                <div className="flex items-center space-x-2" key={opt}>
                  <RadioGroupItem value={opt} id={`prof-${opt}`} />
                  <Label htmlFor={`prof-${opt}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Current Status <span className="text-destructive">*</span></Label>
            <RadioGroup name="currentStatus" required className="grid grid-cols-2 gap-3">
              {['Student', 'Intern', 'Practicing', 'Not practicing', 'Working abroad'].map(opt => (
                <div className="flex items-center space-x-2" key={opt}>
                  <RadioGroupItem value={opt} id={`stat-${opt}`} />
                  <Label htmlFor={`stat-${opt}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <Select name="experience">
                <SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger>
                <SelectContent>
                  {['0', '1–2', '3–5', '5+'].map(val => <SelectItem key={val} value={val}>{val}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Field / Specialization</Label>
              <Input name="specialization" placeholder="e.g., General Surgery, Pediatrics" />
            </div>
          </div>
        </section>

        {/* 3. Education Details */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-accent flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm">3</span> Education Details</h3>
          
          <div className="space-y-3">
            <Label className="text-base font-semibold">Degree Completed</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['MBBS', 'BDS', 'BSc Nursing', 'GNM', 'MD/MS', 'MDS', 'Other'].map(opt => (
                <div className="flex items-center space-x-2" key={opt}>
                  <Checkbox id={`deg-${opt}`} onCheckedChange={() => toggleArrayItem(selectedDegrees, setSelectedDegrees, opt)} />
                  <Label htmlFor={`deg-${opt}`}>{opt}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 pt-2">
            <div className="space-y-2">
              <Label>Country of Education</Label>
              <Input name="countryOfEducation" placeholder="e.g., India, Russia, Ukraine" />
            </div>
            <div className="space-y-2">
              <Label>College Name</Label>
              <Input name="collegeName" placeholder="Full name of university" />
            </div>
            <div className="space-y-2">
              <Label>Year of Graduation</Label>
              <Input name="graduationYear" type="number" placeholder="YYYY" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Internship Completed?</Label>
              <RadioGroup name="internship" className="flex flex-wrap gap-4">
                {['Yes', 'No', 'Ongoing'].map(opt => (
                  <div className="flex items-center space-x-2" key={opt}>
                    <RadioGroupItem value={opt} id={`int-${opt}`} />
                    <Label htmlFor={`int-${opt}`}>{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label className="text-base font-semibold">Any backlog/attempts?</Label>
              <RadioGroup name="backlogs" className="flex flex-wrap gap-4">
                {['Yes', 'No'].map(opt => (
                  <div className="flex items-center space-x-2" key={opt}>
                    <RadioGroupItem value={opt} id={`back-${opt}`} />
                    <Label htmlFor={`back-${opt}`}>{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </section>

        {/* 4. Germany Preparation Status */}
        <section className="space-y-6 bg-slate-50 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-accent flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm">4</span> Germany Preparation Status</h3>
          
          <div className="space-y-3">
            <Label className="text-base font-semibold">Have you started planning for Germany?</Label>
            <RadioGroup name="planningStage" className="flex flex-wrap gap-4">
              {['Just exploring', 'Actively planning', 'Already in process'].map(opt => (
                <div className="flex items-center space-x-2" key={opt}>
                  <RadioGroupItem value={opt} id={`plan-${opt}`} />
                  <Label htmlFor={`plan-${opt}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <Label className="text-base font-semibold">German Language Level <span className="text-destructive">*</span></Label>
              <RadioGroup name="languageLevel" required className="grid grid-cols-3 gap-2">
                {['No German', 'A1', 'A2', 'B1', 'B2', 'C1'].map(opt => (
                  <div className="flex items-center space-x-2" key={opt}>
                    <RadioGroupItem value={opt} id={`lvl-${opt}`} />
                    <Label htmlFor={`lvl-${opt}`}>{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label className="text-base font-semibold">Do you have language certificates?</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Goethe', 'TELC', 'ÖSD', 'None'].map(opt => (
                  <div className="flex items-center space-x-2" key={opt}>
                    <Checkbox id={`cert-${opt}`} onCheckedChange={() => toggleArrayItem(selectedLanguageCerts, setSelectedLanguageCerts, opt)} />
                    <Label htmlFor={`cert-${opt}`}>{opt}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Label className="text-base font-semibold">Are you looking for assistance with learning German? <span className="text-destructive">*</span></Label>
            <RadioGroup name="needLanguageAssistance" required className="flex flex-wrap gap-4">
              {['Yes, I need classes', 'Maybe later', 'No, I am already studying / done'].map(opt => (
                <div className="flex items-center space-x-2" key={opt}>
                  <RadioGroupItem value={opt} id={`lang-assist-${opt}`} />
                  <Label htmlFor={`lang-assist-${opt}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Started document preparation?</Label>
              <RadioGroup name="docPrep" className="flex gap-4">
                {['Yes', 'No'].map(opt => (
                  <div className="flex items-center space-x-2" key={opt}><RadioGroupItem value={opt} id={`dp-${opt}`} /><Label htmlFor={`dp-${opt}`}>{opt}</Label></div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label className="text-base font-semibold">Applied for recognition (Approbation)?</Label>
              <RadioGroup name="approbation" className="flex flex-wrap gap-4">
                {['Yes', 'No', 'Don’t know'].map(opt => (
                  <div className="flex items-center space-x-2" key={opt}><RadioGroupItem value={opt} id={`app-${opt}`} /><Label htmlFor={`app-${opt}`}>{opt}</Label></div>
                ))}
              </RadioGroup>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Decided on a German state?</Label>
              <RadioGroup name="stateDecided" className="flex gap-4">
                {['Yes', 'No'].map(opt => (
                  <div className="flex items-center space-x-2" key={opt}><RadioGroupItem value={opt} id={`sd-${opt}`} /><Label htmlFor={`sd-${opt}`}>{opt}</Label></div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label className="text-base font-semibold">Taken any licensing exam steps?</Label>
              <RadioGroup name="examSteps" className="flex flex-wrap gap-4">
                {['Yes', 'No', 'Not applicable'].map(opt => (
                  <div className="flex items-center space-x-2" key={opt}><RadioGroupItem value={opt} id={`ex-${opt}`} /><Label htmlFor={`ex-${opt}`}>{opt}</Label></div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </section>

        {/* 5. Timeline & Intent */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-accent flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm">5</span> Timeline & Intent</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">When do you want to move? <span className="text-destructive">*</span></Label>
              <RadioGroup name="timeline" required className="grid grid-cols-2 gap-2">
                {['3–6 months', '6–12 months', '1–2 years', 'Just exploring'].map(opt => (
                  <div className="flex items-center space-x-2" key={opt}><RadioGroupItem value={opt} id={`time-${opt}`} /><Label htmlFor={`time-${opt}`}>{opt}</Label></div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label className="text-base font-semibold">Primary goal in Germany? <span className="text-destructive">*</span></Label>
              <RadioGroup name="goal" required className="grid grid-cols-2 gap-2">
                {['Clinical job', 'Ausbildung', 'Higher studies', 'Not sure'].map(opt => (
                  <div className="flex items-center space-x-2" key={opt}><RadioGroupItem value={opt} id={`goal-${opt}`} /><Label htmlFor={`goal-${opt}`}>{opt}</Label></div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <Label className="text-base font-semibold">Are you open to multiple pathways?</Label>
            <RadioGroup name="openPathways" className="flex gap-4">
              {['Yes', 'No'].map(opt => (
                <div className="flex items-center space-x-2" key={opt}><RadioGroupItem value={opt} id={`op-${opt}`} /><Label htmlFor={`op-${opt}`}>{opt}</Label></div>
              ))}
            </RadioGroup>
          </div>
        </section>

        {/* 6. Work & Documentation Readiness */}
        <section className="space-y-6 bg-slate-50 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-accent flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm">6</span> Documentation Readiness</h3>
          
          <div className="space-y-3">
            <Label className="text-base font-semibold">Do you have the following documents ready?</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Passport', 'Degree certificate', 'Transcript', 'Internship certificate', 'Experience letters', 'CV', 'None'].map(opt => (
                <div className="flex items-center space-x-2" key={opt}>
                  <Checkbox id={`doc-${opt}`} onCheckedChange={() => toggleArrayItem(selectedDocs, setSelectedDocs, opt)} />
                  <Label htmlFor={`doc-${opt}`}>{opt}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <Label className="text-base font-semibold">Do you have a CV prepared in German format?</Label>
            <RadioGroup name="germanCV" className="flex gap-4">
              {['Yes', 'No'].map(opt => (
                <div className="flex items-center space-x-2" key={opt}><RadioGroupItem value={opt} id={`cv-${opt}`} /><Label htmlFor={`cv-${opt}`}>{opt}</Label></div>
              ))}
            </RadioGroup>
          </div>
        </section>

        {/* 7. Constraints & Concerns */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-accent flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm">7</span> Constraints & Concerns</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Any career gaps?</Label>
              <RadioGroup name="careerGaps" className="flex gap-4">
                {['Yes', 'No'].map(opt => (
                  <div className="flex items-center space-x-2" key={opt}><RadioGroupItem value={opt} id={`gap-${opt}`} /><Label htmlFor={`gap-${opt}`}>{opt}</Label></div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label className="text-base font-semibold">Any previous visa rejection?</Label>
              <RadioGroup name="visaRejection" className="flex gap-4">
                {['Yes', 'No'].map(opt => (
                  <div className="flex items-center space-x-2" key={opt}><RadioGroupItem value={opt} id={`visa-${opt}`} /><Label htmlFor={`visa-${opt}`}>{opt}</Label></div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <Label className="text-base font-semibold">Any specific challenges you’re facing?</Label>
            <Textarea name="challenges" placeholder="Tell us about any hurdles or specific problems..." className="min-h-[100px]" />
          </div>
        </section>

        {/* 8. Consultation Goals */}
        <section className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-primary/20">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">8</span> Consultation Goals (Most Important)</h3>
          
          <div className="space-y-3">
            <Label className="text-base font-semibold">What do you want clarity on in this consultation?</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Best pathway', 'Timeline', 'Cost breakdown', 'Language roadmap', 'Job opportunities', 'Documentation', 'Visa process', 'Other'].map(opt => (
                <div className="flex items-center space-x-2" key={opt}>
                  <Checkbox id={`cg-${opt}`} onCheckedChange={() => toggleArrayItem(selectedGoals, setSelectedGoals, opt)} />
                  <Label htmlFor={`cg-${opt}`}>{opt}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <Label className="text-base font-semibold">Describe your situation and expectations</Label>
            <Textarea name="expectations" required placeholder="I want to know..." className="min-h-[120px]" />
          </div>
        </section>

        <div className="border-t border-border pt-8 pb-4">
          <div className="flex items-start space-x-3 mb-8 bg-accent/5 p-4 rounded-xl border border-accent/20">
            <Checkbox id="consent" required checked={consentGiven} onCheckedChange={(checked) => setConsentGiven(checked as boolean)} className="mt-1" />
            <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer font-medium text-foreground/80">
              I consent to Medispire using this data solely for the purpose of preparing for my consultation and providing accurate medical career advice.
            </Label>
          </div>
          
          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-14 text-lg font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl">
            {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting Profile...</> : <>Submit Profile & Complete Booking <ArrowRight className="ml-2 h-5 w-5" /></>}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
