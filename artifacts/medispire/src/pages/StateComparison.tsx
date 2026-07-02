import { SEO } from "@/components/SEO";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Map, Home, Clock, Building2 } from "lucide-react";

const stateData = {
  "nrw": {
    name: "North Rhine-Westphalia (NRW)",
    rent: "€600 - €1,000",
    costOfLiving: "Moderate (Ruhr area highly budget-friendly)",
    approbationDifficulty: "High backlog, significant processing delays",
    hospitalDensity: "Very High (highest absolute number of clinics)",
    languageCenters: "Excellent (Düsseldorf, Cologne, Essen)"
  },
  "bavaria": {
    name: "Bavaria (Bayern)",
    rent: "€900 - €1,700+",
    costOfLiving: "Very High (especially Munich)",
    approbationDifficulty: "Strict document verification, highly rigorous",
    hospitalDensity: "High (many rural hospitals & university clinics)",
    languageCenters: "Excellent (Munich, Nuremberg)"
  },
  "bw": {
    name: "Baden-Württemberg",
    rent: "€900 - €1,500+",
    costOfLiving: "High (Stuttgart area notably expensive)",
    approbationDifficulty: "Moderate to High (standardized but slow)",
    hospitalDensity: "High",
    languageCenters: "Excellent (Stuttgart, Heidelberg, Freiburg)"
  },
  "hesse": {
    name: "Hesse (Hessen)",
    rent: "€800 - €1,300+",
    costOfLiving: "High (driven heavily by Frankfurt)",
    approbationDifficulty: "Moderate (efficient if documents perfectly aligned)",
    hospitalDensity: "Moderate to High",
    languageCenters: "Excellent (Frankfurt, Marburg)"
  }
};

type StateKey = keyof typeof stateData;

export default function StateComparison() {
  const [state1, setState1] = useState<StateKey>("nrw");
  const [state2, setState2] = useState<StateKey>("bavaria");

  return (
    <div className="w-full pb-20">
      <SEO 
        title="German State Comparison Tool | MediSpire"
        description="Compare German states for doctors. View rent, cost of living, approbation difficulty, and hospital density side-by-side."
        canonical="/tools/state-compare"
      />

      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">State Comparison Tool</h1>
          <p className="text-xl text-primary-foreground/90">
            Compare German Bundesländer to find the perfect region for your medical career and lifestyle.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Card>
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg">Select State 1</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Select value={state1} onValueChange={(val) => setState1(val as StateKey)}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(stateData).map(([key, data]) => (
                    <SelectItem key={key} value={key} disabled={key === state2}>{data.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg">Select State 2</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Select value={state2} onValueChange={(val) => setState2(val as StateKey)}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(stateData).map(([key, data]) => (
                    <SelectItem key={key} value={key} disabled={key === state1}>{data.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-2xl border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-primary text-primary-foreground">
              <TableRow className="hover:bg-primary border-b-0">
                <TableHead className="w-1/4 font-bold text-white text-lg py-6 px-6">Metric</TableHead>
                <TableHead className="w-3/8 font-bold text-accent text-xl py-6 px-6">{stateData[state1].name}</TableHead>
                <TableHead className="w-3/8 font-bold text-blue-300 text-xl py-6 px-6">{stateData[state2].name}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              
              <TableRow className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-bold text-foreground px-6 py-6 border-r">
                  <div className="flex items-center gap-2"><Home className="w-5 h-5 text-muted-foreground"/> Avg. Rent (1 Bed)</div>
                </TableCell>
                <TableCell className="px-6 py-6 text-lg font-medium border-r">{stateData[state1].rent}</TableCell>
                <TableCell className="px-6 py-6 text-lg font-medium">{stateData[state2].rent}</TableCell>
              </TableRow>

              <TableRow className="hover:bg-muted/50 transition-colors bg-muted/20">
                <TableCell className="font-bold text-foreground px-6 py-6 border-r">
                  <div className="flex items-center gap-2"><Map className="w-5 h-5 text-muted-foreground"/> Cost of Living</div>
                </TableCell>
                <TableCell className="px-6 py-6 leading-relaxed border-r">{stateData[state1].costOfLiving}</TableCell>
                <TableCell className="px-6 py-6 leading-relaxed">{stateData[state2].costOfLiving}</TableCell>
              </TableRow>

              <TableRow className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-bold text-foreground px-6 py-6 border-r">
                  <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-muted-foreground"/> Approbation Process</div>
                </TableCell>
                <TableCell className="px-6 py-6 leading-relaxed border-r text-red-700 font-medium">{stateData[state1].approbationDifficulty}</TableCell>
                <TableCell className="px-6 py-6 leading-relaxed text-red-700 font-medium">{stateData[state2].approbationDifficulty}</TableCell>
              </TableRow>

              <TableRow className="hover:bg-muted/50 transition-colors bg-muted/20">
                <TableCell className="font-bold text-foreground px-6 py-6 border-r">
                  <div className="flex items-center gap-2"><Building2 className="w-5 h-5 text-muted-foreground"/> Hospital Density</div>
                </TableCell>
                <TableCell className="px-6 py-6 leading-relaxed border-r text-green-700 font-medium">{stateData[state1].hospitalDensity}</TableCell>
                <TableCell className="px-6 py-6 leading-relaxed text-green-700 font-medium">{stateData[state2].hospitalDensity}</TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  );
}
