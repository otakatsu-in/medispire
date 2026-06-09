import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { QuizWizard, QuizStep, Answers } from "@/components/QuizWizard";
import { SEO } from "@/components/SEO";

const steps: QuizStep[] = [
  {
    question: "What is your healthcare profession?",
    key: "profession",
    options: [
      { label: "Doctor (MBBS / MD / MS)", value: "doctor", desc: "Allopathic physicians seeking Approbation" },
      { label: "Dentist (BDS / MDS)", value: "dentist", desc: "Dental surgeons seeking Approbation" },
      { label: "Nurse (BSc / GNM)", value: "nurse", desc: "Registered nurses seeking Anerkennung" },
      { label: "Radiographer (BSc Radiology)", value: "radiographer", desc: "MTRA equivalence pathway" },
      { label: "Dental Assistant", value: "dental-assistant", desc: "ZFA equivalence pathway" },
      { label: "Pharmacist (B.Pharm / M.Pharm)", value: "pharmacist", desc: "Apotheker Approbation pathway" },
    ],
  },
  {
    question: "What is your current German language level?",
    key: "language",
    options: [
      { label: "No German yet", value: "none", desc: "Complete beginner — A0" },
      { label: "Beginner (A1 – A2)", value: "a1a2", desc: "Basic phrases only" },
      { label: "Intermediate (B1)", value: "b1", desc: "Can hold basic conversations" },
      { label: "Upper Intermediate (B2)", value: "b2", desc: "The minimum for most professions" },
      { label: "Advanced (C1 or higher)", value: "c1", desc: "Fluent — exam-ready level" },
    ],
  },
  {
    question: "Have you had your Indian degree/qualification documents evaluated or apostilled?",
    key: "documents",
    options: [
      { label: "Yes — all documents ready", value: "ready", desc: "Degree, transcripts, registration, translations done" },
      { label: "Partially prepared", value: "partial", desc: "Some documents done, some pending" },
      { label: "Not yet started", value: "none", desc: "Haven't started document preparation" },
    ],
  },
  {
    question: "How many years of clinical work experience do you have?",
    key: "experience",
    options: [
      { label: "Less than 1 year", value: "less1" },
      { label: "1 – 3 years", value: "1to3" },
      { label: "3 – 5 years", value: "3to5" },
      { label: "More than 5 years", value: "5plus" },
    ],
  },
  {
    question: "Where are you currently located?",
    key: "location",
    options: [
      { label: "India (planning to move)", value: "india" },
      { label: "Already in Germany", value: "germany" },
      { label: "Other country", value: "other" },
    ],
  },
];

function getResult(answers: Answers) {
  const { profession, language, documents, experience } = answers;

  let score = 0;
  let readiness = "Exploratory";
  let color = "text-orange-600";
  let bgColor = "bg-orange-50 border-orange-200";
  let headline = "";
  let timeline = "";
  let summary = "";
  const nextSteps: string[] = [];

  if (language === "b2" || language === "c1") score += 3;
  else if (language === "b1") score += 2;
  else if (language === "a1a2") score += 1;

  if (documents === "ready") score += 3;
  else if (documents === "partial") score += 2;
  else score += 0;

  if (experience === "5plus") score += 2;
  else if (experience === "3to5") score += 1.5;
  else if (experience === "1to3") score += 1;
  else score += 0.5;

  if (score >= 7) {
    readiness = "High Readiness";
    color = "text-green-700";
    bgColor = "bg-green-50 border-green-200";
  } else if (score >= 5) {
    readiness = "Moderate Readiness";
    color = "text-yellow-700";
    bgColor = "bg-yellow-50 border-yellow-200";
  } else {
    readiness = "Early Stage";
    color = "text-orange-600";
    bgColor = "bg-orange-50 border-orange-200";
  }

  const professionLabel: Record<string, string> = {
    doctor: "Doctor (Arzt/Ärztin)",
    dentist: "Dentist (Zahnarzt/Zahnärztin)",
    nurse: "Nurse (Pflegefachkraft)",
    radiographer: "Radiographer (MTRA)",
    "dental-assistant": "Dental Assistant (ZFA)",
    pharmacist: "Pharmacist (Apotheker/in)",
  };

  const licenseTarget: Record<string, string> = {
    doctor: "Approbation as Arzt/Ärztin",
    dentist: "Approbation as Zahnarzt/Zahnärztin",
    nurse: "Anerkennung as Pflegefachkraft",
    radiographer: "Anerkennung as MTRA",
    "dental-assistant": "Anerkennung as ZFA",
    pharmacist: "Approbation as Apotheker/in",
  };

  headline = `Pathway to: ${licenseTarget[profession] || "Healthcare Recognition in Germany"}`;

  const langMonths: Record<string, string> = {
    none: "18–24 months of language study needed",
    a1a2: "12–18 months of language study needed",
    b1: "6–9 months to reach B2",
    b2: profession === "pharmacist" ? "3–6 months to reach C1 (required for pharmacists)" : "Language ready",
    c1: "Language requirement met",
  };

  const docNote =
    documents === "ready"
      ? "Documents ready"
      : documents === "partial"
      ? "Document preparation: 1–3 months to complete"
      : "Document preparation: 2–4 months needed";

  const licenseTime: Record<string, string> = {
    doctor: "6–12 months for Berufserlaubnis + FSP exam",
    dentist: "6–12 months for Berufserlaubnis + FSP exam",
    nurse: "3–9 months for recognition assessment",
    radiographer: "3–9 months for recognition assessment",
    "dental-assistant": "3–6 months for recognition assessment",
    pharmacist: "6–18 months including Kenntnisprüfung exam",
  };

  if (language === "none" || language === "a1a2") {
    timeline = `Total estimated time: 2.5 – 4 years (language is your main bottleneck)`;
  } else if (language === "b1") {
    timeline = `Total estimated time: 1.5 – 2.5 years`;
  } else if (language === "b2") {
    timeline = `Total estimated time: 1 – 1.5 years`;
  } else {
    timeline = `Total estimated time: 6 – 12 months (you're in a strong position)`;
  }

  summary = `As a ${professionLabel[profession] || "healthcare professional"}, your target qualification in Germany is ${licenseTarget[profession] || "professional recognition"}. ${langMonths[language]}. ${docNote}. ${licenseTime[profession] || ""}.`;

  if (language === "none" || language === "a1a2") {
    nextSteps.push("Start German language classes immediately — this is the single most important step");
  }
  if (language === "b1") {
    nextSteps.push("Enroll in B2-targeted German course — aim for medical/clinical vocabulary");
  }
  if (documents === "none" || documents === "partial") {
    nextSteps.push("Begin document apostille and certified translation process now — takes 2–4 months");
  }
  if (profession === "doctor" || profession === "dentist") {
    nextSteps.push("Book a MediSpire consultation to understand FSP preparation and Ärztekammer strategy");
  } else {
    nextSteps.push("Book a MediSpire consultation to identify the right state authority and fast-track your application");
  }
  nextSteps.push("Use our Cost & Timeline Estimator to plan your budget");

  return { readiness, color, bgColor, headline, timeline, summary, nextSteps, score: Math.round((score / 8) * 100) };
}

export default function EligibilityChecker() {
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
    if (currentStep < steps.length - 1) {
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

  const result = showResult ? getResult(answers) : null;

  const resultView = result ? (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className={`${result.bgColor} border-2 rounded-2xl p-8 mb-8 text-center`}>
        <div className={`text-5xl font-extrabold ${result.color} mb-2`}>{result.score}%</div>
        <div className={`text-xl font-bold ${result.color} mb-1`}>{result.readiness}</div>
        <div className="text-sm text-muted-foreground">Readiness Score</div>
      </div>

      <div className="bg-white border border-border rounded-2xl p-8 mb-6">
        <h3 className="text-xl font-bold text-primary mb-2">{result.headline}</h3>
        <div className="inline-block bg-accent/10 text-accent font-bold text-sm px-4 py-1.5 rounded-full mb-4">{result.timeline}</div>
        <p className="text-muted-foreground leading-relaxed">{result.summary}</p>
      </div>

      <div className="bg-secondary rounded-2xl p-8 mb-8">
        <h3 className="text-lg font-bold text-primary mb-4">Your Recommended Next Steps</h3>
        <ul className="space-y-3">
          {result.nextSteps.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-14 rounded-xl" onClick={openBooking}>
          Book Free Consultation
        </Button>
        <Link href="/cost-estimator">
          <Button size="lg" variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold h-14 rounded-xl flex items-center justify-center gap-2">
            Estimate My Costs <ArrowRight size={18} />
          </Button>
        </Link>
      </div>

      <div className="text-center">
        <button onClick={handleReset} className="text-sm text-muted-foreground hover:text-primary transition-colors underline">
          Start over
        </button>
      </div>

      <div className="mt-8 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
        <MessageCircle size={28} className="text-[#25D366] shrink-0" />
        <p className="text-sm text-muted-foreground flex-1">
          Have questions about your results? Chat directly with Dr. Sandeep or Dr. Sangeeta on WhatsApp.
        </p>
        <a
          href="https://wa.me/918310010112?text=Hi%20MediSpire!%20I%20just%20completed%20the%20eligibility%20checker%20and%20have%20some%20questions."
          target="_blank"
          rel="noreferrer"
          className="shrink-0 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          Ask on WhatsApp
        </a>
      </div>
    </motion.div>
  ) : null;

  return (
    <div className="w-full">
      <SEO 
        title="Eligibility Checker" 
        description="Answer 5 quick questions to find out your readiness and estimated pathway to practising in Germany." 
      />
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Eligibility Checker</h1>
          <p className="text-xl text-primary-foreground/80">Answer 5 quick questions to find out your readiness and estimated pathway to practising in Germany.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <QuizWizard
            steps={steps}
            currentStep={currentStep}
            answers={answers}
            direction={direction}
            onSelect={handleSelect}
            onNext={handleNext}
            onBack={handleBack}
            showResult={showResult}
            resultView={resultView}
            finalButtonText="See My Results"
          />
        </div>
      </section>
    </div>
  );
}
