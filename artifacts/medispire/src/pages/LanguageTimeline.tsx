import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Calendar, GraduationCap, Clock } from "lucide-react";

const levels = ["A1", "A2", "B1", "B2", "C1"];
const cumulativeHours = {
  "A1": 150,
  "A2": 350,
  "B1": 600,
  "B2": 800,
  "C1": 1000
};

export default function LanguageTimeline() {
  const [currentLevel, setCurrentLevel] = useState("None");
  const [targetLevel, setTargetLevel] = useState("B2");
  const [hoursPerWeek, setHoursPerWeek] = useState([15]);

  const calculateTimeline = () => {
    let startingHours = 0;
    if (currentLevel !== "None") {
      startingHours = cumulativeHours[currentLevel as keyof typeof cumulativeHours];
    }
    
    const targetHours = cumulativeHours[targetLevel as keyof typeof cumulativeHours];
    
    if (startingHours >= targetHours) {
      return { weeks: 0, months: 0, hoursNeeded: 0, milestones: [] };
    }

    const hoursNeeded = targetHours - startingHours;
    const weeks = Math.ceil(hoursNeeded / hoursPerWeek[0]);
    const months = (weeks / 4.33).toFixed(1);

    // Calculate milestones
    const milestones = [];
    let currentWeek = 0;
    
    for (const level of levels) {
      const levelHours = cumulativeHours[level as keyof typeof cumulativeHours];
      if (levelHours > startingHours && levelHours <= targetHours) {
        const hoursForThisLevel = levelHours - startingHours;
        const weeksForThisLevel = Math.ceil(hoursForThisLevel / hoursPerWeek[0]);
        milestones.push({
          level,
          week: weeksForThisLevel,
          month: (weeksForThisLevel / 4.33).toFixed(1)
        });
      }
    }

    return { weeks, months, hoursNeeded, milestones };
  };

  const plan = calculateTimeline();

  return (
    <div className="w-full pb-20">
      <SEO 
        title="German Language Timeline Planner | MediSpire"
        description="Plan your exact roadmap to reach B2/C1 German based on Goethe-Institut standards and your personal study schedule."
        canonicalUrl="/tools/language-timeline"
      />

      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Language Timeline Planner</h1>
          <p className="text-xl text-primary-foreground/90">
            Based on Goethe-Institut standards, calculate exactly how long it will take to reach your target fluency.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Study Parameters</CardTitle>
                <CardDescription>Adjust based on your availability.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="space-y-3">
                  <Label>Current German Level</Label>
                  <Select value={currentLevel} onValueChange={setCurrentLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">Absolute Beginner (None)</SelectItem>
                      <SelectItem value="A1">A1 Completed</SelectItem>
                      <SelectItem value="A2">A2 Completed</SelectItem>
                      <SelectItem value="B1">B1 Completed</SelectItem>
                      <SelectItem value="B2">B2 Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Target Level Needed</Label>
                  <Select value={targetLevel} onValueChange={setTargetLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B2">B2 (Standard for Approbation)</SelectItem>
                      <SelectItem value="C1">C1 (Required by some states/hospitals)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <Label>Study Hours per Week</Label>
                    <span className="font-bold text-accent">{hoursPerWeek[0]} hours</span>
                  </div>
                  <Slider 
                    value={hoursPerWeek} 
                    onValueChange={setHoursPerWeek} 
                    max={40} 
                    min={5} 
                    step={1} 
                    className="py-4"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {hoursPerWeek[0] < 10 ? "Casual pace. Will take significant time." : hoursPerWeek[0] < 25 ? "Intensive. Requires daily dedication." : "Super-intensive language school pace."}
                  </p>
                </div>

              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-7">
            <Card className="shadow-2xl border-accent/20 h-full">
              <CardHeader className="bg-accent/10 border-b border-accent/20">
                <CardTitle className="text-primary flex items-center gap-2">
                  <Calendar className="w-5 h-5"/> Your Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                
                {plan.hoursNeeded <= 0 ? (
                  <div className="text-center py-12">
                    <GraduationCap className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">You've reached your target!</h3>
                    <p className="text-muted-foreground mt-2">Time to book your FSP / Approbation exams.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-around mb-12 bg-muted p-6 rounded-2xl">
                      <div className="text-center">
                        <div className="text-sm font-bold uppercase text-muted-foreground tracking-wider mb-1">Total Time</div>
                        <div className="text-4xl font-extrabold text-primary">{plan.months} <span className="text-xl">Months</span></div>
                        <div className="text-sm font-medium mt-1">({plan.weeks} Weeks)</div>
                      </div>
                      <div className="w-px h-16 bg-border"></div>
                      <div className="text-center">
                        <div className="text-sm font-bold uppercase text-muted-foreground tracking-wider mb-1">Effort Needed</div>
                        <div className="text-4xl font-extrabold text-accent">{plan.hoursNeeded}</div>
                        <div className="text-sm font-medium mt-1">Total Hours</div>
                      </div>
                    </div>

                    <div className="relative border-l-2 border-accent/30 ml-4 space-y-8 pb-4">
                      {plan.milestones.map((milestone, idx) => (
                        <div key={idx} className="relative pl-8">
                          <div className="absolute w-4 h-4 bg-accent rounded-full -left-[9px] top-1 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                          <h4 className="text-xl font-bold text-foreground">Reach Level {milestone.level}</h4>
                          <p className="text-muted-foreground flex items-center gap-1.5 mt-1">
                            <Clock className="w-4 h-4" /> By Month {milestone.month} (Week {milestone.week})
                          </p>
                          {milestone.level === "B2" && (
                            <div className="mt-3 p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm font-medium">
                              🏆 Milestone: You can now apply for Approbation / Berufserlaubnis!
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
}
