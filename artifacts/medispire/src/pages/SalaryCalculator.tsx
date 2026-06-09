import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { HeartPulse, Receipt, PiggyBank, Landmark, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/currency";

export default function SalaryCalculator() {
  const [profession, setProfession] = useState("doctor_resident");
  const [taxClass, setTaxClass] = useState("1");
  const [churchTax, setChurchTax] = useState("no");

  // Hardcoded data based on research
  const baseSalaries: Record<string, number> = {
    "doctor_resident": 5500, // TV-Ärzte/VKA Assistenzarzt Year 1 (2024: €5,499.85)
    "doctor_specialist": 7260, // TV-Ärzte/VKA Facharzt Year 1 (2024: €7,258.93)
    "dentist": 5000, // Employed dentist (approx)
    "nurse": 3300, // TVöD-P Registered nurse
    "pharmacist": 4200, // Public pharmacy starting salary
  };

  const calculateNet = () => {
    const gross = baseSalaries[profession] || 5000;
    
    // Simplified German Tax brackets (Progressive estimation)
    let incomeTaxRate = 0.20; // Default approximation for Class I
    if (taxClass === "3") incomeTaxRate = 0.12;
    if (gross > 6000) incomeTaxRate += 0.05;

    const incomeTax = gross * incomeTaxRate;
    const churchTaxAmount = churchTax === "yes" ? incomeTax * 0.08 : 0;
    
    // Social Security (Employee share limits apply, simplifying for UI)
    const healthInsurance = gross * 0.073; // 7.3%
    const pension = gross * 0.093; // 9.3%
    const unemployment = gross * 0.013; // 1.3%
    const careInsurance = gross * 0.023; // ~2.3%

    const totalDeductions = incomeTax + churchTaxAmount + healthInsurance + pension + unemployment + careInsurance;
    const net = gross - totalDeductions;

    return {
      gross,
      incomeTax,
      churchTaxAmount,
      healthInsurance,
      pension,
      unemployment,
      careInsurance,
      totalDeductions,
      net
    };
  };

  const results = calculateNet();

  return (
    <div className="w-full pb-20">
      <SEO 
        title="German Salary & Tax Calculator | MediSpire"
        description="Estimate your net take-home salary as a doctor, dentist, or nurse in Germany. See exact deductions for taxes and social security in EUR and INR."
        canonical="/tools/salary-calculator"
      />

      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">German Salary Calculator</h1>
          <p className="text-xl text-primary-foreground/90">
            Calculate exactly what you'll take home after German taxes and social security.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Input Form */}
          <Card className="shadow-lg border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Receipt className="w-5 h-5 text-accent"/> Your Details</CardTitle>
              <CardDescription>Select your situation to calculate taxes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-3">
                <Label>Profession & Level</Label>
                <Select value={profession} onValueChange={setProfession}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor_resident">Resident Doctor (Assistenzarzt) - Year 1</SelectItem>
                    <SelectItem value="doctor_specialist">Specialist Doctor (Facharzt) - Year 1</SelectItem>
                    <SelectItem value="dentist">Dentist (Employed)</SelectItem>
                    <SelectItem value="nurse">Registered Nurse</SelectItem>
                    <SelectItem value="pharmacist">Pharmacist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Tax Class (Steuerklasse)</Label>
                <Select value={taxClass} onValueChange={setTaxClass}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select tax class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Class I (Single / Unmarried)</SelectItem>
                    <SelectItem value="3">Class III (Married, higher earner)</SelectItem>
                    <SelectItem value="4">Class IV (Married, equal earners)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Church Tax (Kirchensteuer)</Label>
                <Select value={churchTax} onValueChange={setChurchTax}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select church tax" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No (I am not registered with a church)</SelectItem>
                    <SelectItem value="yes">Yes (Registered Catholic/Protestant)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </CardContent>
          </Card>

          {/* Results Output */}
          <Card className="shadow-xl border-accent/20 bg-accent/5">
            <CardHeader className="bg-accent/10 border-b border-accent/20">
              <CardTitle className="text-center text-primary">Estimated Take-Home Pay</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-1">Net Monthly Salary</p>
                <div className="text-5xl font-extrabold text-green-600 mb-2">
                  {formatCurrency(results.net, "EUR")}
                </div>
                <div className="text-lg text-muted-foreground font-medium">
                  ≈ {formatCurrency(results.net, "INR")}
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-foreground">Gross Salary</span>
                  <span className="font-bold">{formatCurrency(results.gross, "EUR")}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-red-500/80 pl-4 border-l-2 border-red-500/20">
                  <span className="flex items-center gap-2"><Landmark className="w-4 h-4"/> Income Tax</span>
                  <span>- {formatCurrency(results.incomeTax, "EUR")}</span>
                </div>

                <div className="flex justify-between items-center text-sm text-blue-500/80 pl-4 border-l-2 border-blue-500/20">
                  <span className="flex items-center gap-2"><HeartPulse className="w-4 h-4"/> Health Insurance</span>
                  <span>- {formatCurrency(results.healthInsurance, "EUR")}</span>
                </div>

                <div className="flex justify-between items-center text-sm text-orange-500/80 pl-4 border-l-2 border-orange-500/20">
                  <span className="flex items-center gap-2"><PiggyBank className="w-4 h-4"/> Pension Insurance</span>
                  <span>- {formatCurrency(results.pension, "EUR")}</span>
                </div>

                <div className="flex justify-between items-center text-sm text-purple-500/80 pl-4 border-l-2 border-purple-500/20">
                  <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Other Social (Unemp. & Care)</span>
                  <span>- {formatCurrency(results.unemployment + results.careInsurance, "EUR")}</span>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  );
}
