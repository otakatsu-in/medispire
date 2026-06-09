import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

export type Option = { label: string; value: string; desc?: string };
export type QuizStep = { question: string; key: string; options: Option[] };
export type Answers = Record<string, string>;

interface QuizWizardProps {
  steps: QuizStep[];
  currentStep: number;
  answers: Answers;
  direction: number;
  onSelect: (key: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  showResult: boolean;
  resultView: ReactNode;
  finalButtonText?: string;
}

export function QuizWizard({
  steps,
  currentStep,
  answers,
  direction,
  onSelect,
  onNext,
  onBack,
  showResult,
  resultView,
  finalButtonText = "See My Results"
}: QuizWizardProps) {
  const step = steps[currentStep];
  const isAnswered = !!answers[step?.key];

  if (showResult) {
    return <>{resultView}</>;
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-10">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full flex-1 transition-all duration-300 ${
              i < currentStep ? "bg-accent" : i === currentStep ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
      <div className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-widest">
        Step {currentStep + 1} of {steps.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: direction * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -30 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-primary mb-8">{step.question}</h2>
          <div className="space-y-3">
            {step.options.map((opt) => {
              const selected = answers[step.key] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onSelect(step.key, opt.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                    selected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-white hover:border-primary/40 hover:bg-secondary/50"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                      selected ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}
                  >
                    {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className={`font-semibold ${selected ? "text-primary" : "text-foreground"}`}>
                      {opt.label}
                    </div>
                    {opt.desc && (
                      <div className="text-sm text-muted-foreground mt-0.5">{opt.desc}</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-10">
        {currentStep > 0 ? (
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 font-bold">
            <ChevronLeft size={18} /> Back
          </Button>
        ) : (
          <div />
        )}
        <Button
          onClick={onNext}
          disabled={!isAnswered}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-3 rounded-full flex items-center gap-2 disabled:opacity-40"
        >
          {currentStep < steps.length - 1 ? "Next" : finalButtonText}
          <ChevronRight size={18} />
        </Button>
      </div>
    </>
  );
}
