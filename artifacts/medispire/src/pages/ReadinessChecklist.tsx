import { SEO } from "@/components/SEO";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, ArrowRight, BookOpen, FileCheck, Landmark, Plane } from "lucide-react";

type Task = { id: string; label: string; checked: boolean };
type Category = { id: string; title: string; icon: React.ReactNode; tasks: Task[] };

const defaultChecklist: Category[] = [
  {
    id: "lang",
    title: "1. Language Mastery",
    icon: <BookOpen className="w-5 h-5 text-blue-500" />,
    tasks: [
      { id: "l1", label: "Clear A1 & A2 levels", checked: false },
      { id: "l2", label: "Clear B1 level", checked: false },
      { id: "l3", label: "Pass Goethe/TELC B2 Exam", checked: false },
      { id: "l4", label: "Start Medical German (FSP Prep)", checked: false },
    ]
  },
  {
    id: "docs",
    title: "2. Document Preparation",
    icon: <FileCheck className="w-5 h-5 text-orange-500" />,
    tasks: [
      { id: "d1", label: "Gather all degree and transcripts", checked: false },
      { id: "d2", label: "Get Good Standing & Police Clearance", checked: false },
      { id: "d3", label: "Submit documents for Embassy Verification", checked: false },
      { id: "d4", label: "Translate verified documents via German Sworn Translator", checked: false },
    ]
  },
  {
    id: "app",
    title: "3. Approbation Application",
    icon: <Landmark className="w-5 h-5 text-purple-500" />,
    tasks: [
      { id: "a1", label: "Choose target German state (Bundesland)", checked: false },
      { id: "a2", label: "Submit formal Approbation application", checked: false },
      { id: "a3", label: "Receive Defizitbescheid (Deficit Notice)", checked: false },
      { id: "a4", label: "Register for Fachsprachenprüfung (FSP)", checked: false },
    ]
  },
  {
    id: "visa",
    title: "4. Visa & Relocation",
    icon: <Plane className="w-5 h-5 text-green-500" />,
    tasks: [
      { id: "v1", label: "Secure a Job Offer / Hospitation", checked: false },
      { id: "v2", label: "Apply for 16d / Blue Card Visa", checked: false },
      { id: "v3", label: "Book flights & temporary accommodation", checked: false },
      { id: "v4", label: "Register address in Germany (Anmeldung)", checked: false },
    ]
  }
];

export default function ReadinessChecklist() {
  const [checklist, setChecklist] = useState<Category[]>(defaultChecklist);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("medispire_readiness");
    if (saved) {
      try {
        setChecklist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved checklist");
      }
    }
    setMounted(true);
  }, []);

  const saveChecklist = (newChecklist: Category[]) => {
    setChecklist(newChecklist);
    localStorage.setItem("medispire_readiness", JSON.stringify(newChecklist));
  };

  const toggleTask = (catId: string, taskId: string) => {
    const newChecklist = checklist.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          tasks: cat.tasks.map(t => t.id === taskId ? { ...t, checked: !t.checked } : t)
        };
      }
      return cat;
    });
    saveChecklist(newChecklist);
  };

  // Calculate Progress
  const totalTasks = checklist.reduce((acc, cat) => acc + cat.tasks.length, 0);
  const completedTasks = checklist.reduce((acc, cat) => acc + cat.tasks.filter(t => t.checked).length, 0);
  const progressPercent = Math.round((completedTasks / totalTasks) * 100) || 0;

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="w-full pb-20">
      <SEO 
        title="Am I Ready? Pre-Application Checklist | MediSpire"
        description="Track your progress to Germany. A gamified checklist covering language, documents, approbation, and visas."
        canonical="/tools/readiness-checklist"
      />

      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Am I Ready to Apply?</h1>
          <p className="text-xl text-primary-foreground/90">
            Track your progress. Complete these steps to secure your German medical license and visa.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 container mx-auto max-w-4xl">
        
        {/* Progress Tracker Widget */}
        <Card className="shadow-2xl border-accent/20 bg-accent/5 mb-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <CardContent className="p-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <Trophy className="text-accent" /> Your Journey Progress
                </h2>
                <p className="text-muted-foreground mt-1">
                  You have completed {completedTasks} out of {totalTasks} essential milestones.
                </p>
              </div>
              <div className="text-5xl font-extrabold text-accent bg-background px-6 py-4 rounded-2xl shadow-inner border border-border">
                {progressPercent}%
              </div>
            </div>
            
            <div className="relative">
              <Progress value={progressPercent} className="h-4 bg-primary/10 [&>div]:bg-accent" />
            </div>

            {progressPercent === 100 && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 text-green-700 rounded-xl font-bold text-center animate-in zoom-in fade-in">
                🎉 Congratulations! You are completely ready to move to Germany!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Task Boards */}
        <div className="grid md:grid-cols-2 gap-6">
          {checklist.map((category) => {
            const catCompleted = category.tasks.filter(t => t.checked).length;
            const catTotal = category.tasks.length;
            const isDone = catCompleted === catTotal;

            return (
              <Card key={category.id} className={`shadow-lg transition-all duration-300 ${isDone ? 'border-green-500/50 bg-green-50/30' : 'border-border'}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                    <h3 className="font-bold text-lg flex items-center gap-2 text-foreground">
                      {category.icon} {category.title}
                    </h3>
                    <span className={`text-sm font-bold px-2 py-1 rounded-md ${isDone ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                      {catCompleted} / {catTotal}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {category.tasks.map((task) => (
                      <div key={task.id} className="flex items-start gap-3 group">
                        <Checkbox 
                          id={task.id} 
                          checked={task.checked}
                          onCheckedChange={() => toggleTask(category.id, task.id)}
                          className={`mt-1 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500`}
                        />
                        <label 
                          htmlFor={task.id}
                          className={`text-sm font-medium leading-tight cursor-pointer transition-colors ${task.checked ? 'text-muted-foreground line-through' : 'text-foreground group-hover:text-accent'}`}
                        >
                          {task.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </section>
    </div>
  );
}
