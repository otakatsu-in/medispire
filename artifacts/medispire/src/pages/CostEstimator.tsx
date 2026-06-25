import { useState } from "react";
import { motion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { MessageCircle, Info } from "lucide-react";
import { QuizWizard, QuizStep, Answers } from "@/components/QuizWizard";
import { SEO } from "@/components/SEO";
import { formatCurrencyINR } from "@/lib/currency";

const quizSteps: QuizStep[] = [
  {
    question: "What is your healthcare profession?",
    key: "profession",
    options: [
      { label: "Doctor (MBBS / MD / MS)", value: "doctor" },
      { label: "Dentist (BDS / MDS)", value: "dentist" },
      { label: "Nurse (BSc / GNM)", value: "nurse" },
      { label: "Radiographer", value: "radiographer" },
      { label: "Pharmacist", value: "pharmacist" },
      { label: "Dental Assistant", value: "dental-assistant" },
    ],
  },
  {
    question: "What is your current German language level?",
    key: "language",
    options: [
      { label: "No German (starting from scratch)", value: "none", desc: "Need A1 → B2/C1 course" },
      { label: "Beginner (A1 – A2)", value: "a1a2", desc: "Need B1 → B2/C1 course" },
      { label: "Intermediate (B1)", value: "b1", desc: "Need B2 course only" },
      { label: "Upper Intermediate (B2)", value: "b2", desc: "Language mostly ready" },
      { label: "Advanced (C1 or higher)", value: "c1", desc: "Language requirement met" },
    ],
  },
  {
    question: "Where are you currently based?",
    key: "location",
    options: [
      { label: "India — planning to relocate", value: "india" },
      { label: "Already in Germany", value: "germany" },
      { label: "Other country in Europe", value: "europe" },
    ],
  },
  {
    question: "Have you started document apostille and translation?",
    key: "documents",
    options: [
      { label: "Yes — all documents apostilled & translated", value: "done" },
      { label: "Partially done", value: "partial" },
      { label: "Not started yet", value: "none" },
    ],
  },
];

type CostItem = { label: string; low: number; high: number; note?: string };
type Phase = { phase: string; duration: string; items: CostItem[] };

function buildEstimate(answers: Answers): { phases: Phase[]; totalLow: number; totalHigh: number; totalTimeline: string } {
  const { profession, language, location, documents } = answers;

  const phases: Phase[] = [];

  const langCosts: Record<string, { low: number; high: number; months: string }> = {
    none: { low: 2500, high: 5500, months: "18–24 months" },
    a1a2: { low: 1800, high: 3500, months: "12–18 months" },
    b1: { low: 800, high: 1800, months: "6–10 months" },
    b2: { low: 400, high: 800, months: "0–4 months (C1 optional)" },
    c1: { low: 0, high: 0, months: "Language ready" },
  };

  const lang = langCosts[language] || langCosts.none;
  if (lang.low > 0) {
    phases.push({
      phase: "German Language Training",
      duration: lang.months,
      items: [
        { label: "Language course fees (online/hybrid)", low: lang.low, high: lang.high, note: "Goethe, VHS, telc, or private coaching" },
        { label: "Study materials & practice exams", low: 150, high: 400 },
        { label: "Language exam fee (Goethe / telc / ÖSD)", low: 180, high: 280 },
      ],
    });
  }

  const docLow = documents === "done" ? 0 : documents === "partial" ? 300 : 700;
  const docHigh = documents === "done" ? 0 : documents === "partial" ? 800 : 2000;
  if (docLow > 0) {
    phases.push({
      phase: "Document Apostille & Translation",
      duration: "2–4 months",
      items: [
        { label: "Certified translation (degree, transcripts, certificates)", low: 400, high: 900 },
        { label: "Apostille fees (India)", low: 100, high: 250, note: "MEA / State Home Dept." },
        { label: "Notarisation & courier", low: 100, high: 300 },
      ].filter((_, i) => {
        if (documents === "partial") return i < 2;
        return true;
      }),
    });
  }

  const isDoctor = profession === "doctor" || profession === "dentist";
  const isPharmacist = profession === "pharmacist";

  const licensePhase: Phase = {
    phase: isDoctor ? "Licensing & Exam Preparation" : "Recognition Process",
    duration: isDoctor ? "6–12 months" : isPharmacist ? "6–18 months" : "3–9 months",
    items: [],
  };
  if (isDoctor) {
    licensePhase.items = [
      { label: "Ärztekammer application fee", low: 150, high: 500 },
      { label: "FSP (Fachsprachprüfung) exam fee", low: 300, high: 650, note: "State Medical Chamber fee" },
      { label: "FSP preparation coaching", low: 500, high: 1200, note: "MediSpire coaching or private tutors" },
      { label: "Berufserlaubnis application", low: 100, high: 300 },
    ];
  } else if (isPharmacist) {
    licensePhase.items = [
      { label: "Approbationsbehörde application fee", low: 100, high: 350 },
      { label: "Kenntnisprüfung exam preparation", low: 500, high: 1500 },
      { label: "Exam fee", low: 200, high: 500 },
    ];
  } else {
    licensePhase.items = [
      { label: "State authority application fee", low: 50, high: 200 },
      { label: "Adaptation course (if required)", low: 0, high: 1500, note: "May be employer-sponsored" },
    ];
  }
  phases.push(licensePhase);

  if (location === "india") {
    const hospPhase: Phase = {
      phase: "Observership / Hospitation in Germany",
      duration: "4–12 weeks",
      items: [
        { label: "Return flight (India ↔ Germany)", low: 600, high: 1200 },
        { label: "Accommodation during observership", low: 800, high: 2000, note: "Shared flat or hospital accommodation" },
        { label: "Health insurance (short-term)", low: 150, high: 400 },
        { label: "Daily living expenses", low: 600, high: 1200 },
      ],
    };
    if (isDoctor || profession === "dentist") phases.push(hospPhase);
  }

  if (location === "india") {
    phases.push({
      phase: "Visa & Relocation",
      duration: "1–3 months",
      items: [
        { label: "German visa fee (Job Seeker / Work Visa)", low: 75, high: 150 },
        { label: "One-way flight to Germany", low: 500, high: 1000 },
        { label: "Initial accommodation deposit & rent (first 2 months)", low: 2000, high: 4000, note: "Room in shared flat or WG" },
        { label: "Health insurance (incoming, first month)", low: 150, high: 500 },
        { label: "Living expenses during job search (1–2 months)", low: 1500, high: 2500 },
      ],
    });
  }

  let totalLow = 0;
  let totalHigh = 0;
  for (const p of phases) {
    for (const item of p.items) {
      totalLow += item.low;
      totalHigh += item.high;
    }
  }

  let totalTimeline = "";
  if (language === "none") totalTimeline = "2.5 – 4 years total";
  else if (language === "a1a2") totalTimeline = "2 – 3 years total";
  else if (language === "b1") totalTimeline = "1.5 – 2 years total";
  else if (language === "b2") totalTimeline = "1 – 1.5 years total";
  else totalTimeline = "6 – 12 months total";

  return { phases, totalLow, totalHigh, totalTimeline };
}

export default function CostEstimator() {
  const { openBooking } = useBooking();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);
  const [direction, setDirection] = useState(1);

  const handleSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    setDirection(1);
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    if (showResult) {
      setShowResult(false);
    } else {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
  };

  const estimate = showResult ? buildEstimate(answers) : null;

  const resultView = estimate ? (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="bg-primary text-primary-foreground rounded-2xl p-8 mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-primary-foreground/60 mb-2">Total Estimated Investment</p>
        <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2">
          {formatCurrencyINR(estimate.totalLow)} – {formatCurrencyINR(estimate.totalHigh)}
        </div>
        <div className="text-primary-foreground/80 font-medium">{estimate.totalTimeline}</div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
        <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          Amounts shown in INR at approx. ₹90/€ for easy planning from India. These are estimates based on average market rates as of 2025. Actual costs vary by location, employer, and individual circumstances. Joining our free webinar can help you plan precisely.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {estimate.phases.map((phase, pi) => (
          <div key={pi} className="bg-white border border-border rounded-2xl overflow-hidden">
            <div className="bg-secondary px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-primary">{phase.phase}</h3>
                <span className="text-sm text-muted-foreground">{phase.duration}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Range</div>
                <div className="font-bold text-primary text-sm">
                  {formatCurrencyINR(phase.items.reduce((s, i) => s + i.low, 0))} – {formatCurrencyINR(phase.items.reduce((s, i) => s + i.high, 0))}
                </div>
              </div>
            </div>
            <div className="divide-y divide-border">
              {phase.items.map((item, ii) => (
                <div key={ii} className="px-6 py-3 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium">{item.label}</div>
                    {item.note && <div className="text-xs text-muted-foreground mt-0.5">{item.note}</div>}
                  </div>
                  <div className="text-sm font-bold text-primary shrink-0">
                    {item.low === 0 ? "Varies" : `${formatCurrencyINR(item.low)} – ${formatCurrencyINR(item.high)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-14 rounded-xl" onClick={openBooking}>
          Join Free Webinar
        </Button>
        <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold h-14 rounded-xl" onClick={handleReset}>
          Recalculate
        </Button>
      </div>

      <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
        <MessageCircle size={28} className="text-[#25D366] shrink-0" />
        <p className="text-sm text-muted-foreground flex-1">
          Want a detailed, personalised cost breakdown? Chat with our team — we've helped hundreds of professionals plan their budget.
        </p>
        <a
          href="https://wa.me/918310010112?text=Hi%20MediSpire!%20I%20used%20the%20cost%20estimator%20and%20want%20a%20personalised%20breakdown."
          target="_blank"
          rel="noreferrer"
          className="shrink-0 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          Chat on WhatsApp
        </a>
      </div>
    </motion.div>
  ) : null;

  return (
    <div className="w-full">
      <SEO 
        title="Cost & Timeline Estimator" 
        description="Get a personalized breakdown of the costs and time involved in your healthcare journey to Germany based on your current situation." 
      />
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cost & Timeline Estimator</h1>
          <p className="text-xl text-primary-foreground/80">Get a personalised breakdown of the costs and time involved in your journey to Germany — based on your current situation.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <QuizWizard
            steps={quizSteps}
            currentStep={currentStep}
            answers={answers}
            direction={direction}
            onSelect={handleSelect}
            onNext={handleNext}
            onBack={handleBack}
            showResult={showResult}
            resultView={resultView}
            finalButtonText="Show My Estimate"
          />
        </div>
      </section>
    </div>
  );
}
