import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Beaker, Syringe, Info, FlaskConical, RotateCcw } from "lucide-react";

const presetPeptides = [
  { name: "BPC-157", amounts: ["5mg", "10mg"] },
  { name: "TB-500", amounts: ["5mg", "10mg"] },
  { name: "CJC-1295", amounts: ["2mg", "5mg"] },
  { name: "Ipamorelin", amounts: ["5mg", "10mg"] },
  { name: "Semaglutide", amounts: ["3mg", "5mg", "10mg"] },
  { name: "Tirzepatide", amounts: ["5mg", "10mg", "15mg"] },
  { name: "GHK-Cu", amounts: ["50mg", "100mg", "200mg"] },
  { name: "Hexarelin", amounts: ["2mg", "5mg"] },
  { name: "GHRP-6", amounts: ["5mg", "10mg"] },
  { name: "Melanotan II", amounts: ["10mg"] },
  { name: "Custom", amounts: [] },
];

export default function PeptideCalculator() {
  const [peptideAmount, setPeptideAmount] = useState<string>("5");
  const [waterVolume, setWaterVolume] = useState<string>("2");
  const [desiredDose, setDesiredDose] = useState<string>("250");
  const [doseUnit, setDoseUnit] = useState<string>("mcg");
  const [syringeSize, setSyringeSize] = useState<string>("1");
  const [selectedPeptide, setSelectedPeptide] = useState<string>("BPC-157");

  const results = useMemo(() => {
    const peptideMg = parseFloat(peptideAmount);
    const waterMl = parseFloat(waterVolume);
    const dose = parseFloat(desiredDose);

    if (isNaN(peptideMg) || isNaN(waterMl) || isNaN(dose) || peptideMg <= 0 || waterMl <= 0 || dose <= 0) {
      return null;
    }

    const peptideMcg = peptideMg * 1000;
    const doseMcg = doseUnit === "mg" ? dose * 1000 : dose;
    const concentrationMcgPerMl = peptideMcg / waterMl;
    const concentrationMgPerMl = peptideMg / waterMl;
    const volumeToDrawMl = doseMcg / concentrationMcgPerMl;
    const syringeMl = parseFloat(syringeSize);
    const totalUnits = syringeMl === 1 ? 100 : syringeMl === 0.5 ? 50 : 30;
    const unitsToDraw = (volumeToDrawMl / syringeMl) * totalUnits;
    const totalDoses = peptideMcg / doseMcg;

    return {
      concentrationMcgPerMl: concentrationMcgPerMl.toFixed(1),
      concentrationMgPerMl: concentrationMgPerMl.toFixed(2),
      volumeToDrawMl: volumeToDrawMl.toFixed(3),
      unitsToDraw: unitsToDraw.toFixed(1),
      totalDoses: totalDoses.toFixed(1),
      totalUnits,
      syringeMl,
      tooSmall: volumeToDrawMl < 0.01,
      exceedsSyringe: volumeToDrawMl > syringeMl,
    };
  }, [peptideAmount, waterVolume, desiredDose, doseUnit, syringeSize]);

  const handleReset = () => {
    setPeptideAmount("5");
    setWaterVolume("2");
    setDesiredDose("250");
    setDoseUnit("mcg");
    setSyringeSize("1");
    setSelectedPeptide("BPC-157");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/5 to-background border-b border-border/40">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-calculator-title">Peptide Reconstitution Calculator</h1>
              <p className="text-muted-foreground">Calculate precise dosing for your research peptides</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">For Research Use Only</Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
                <CardTitle className="flex items-center gap-2">
                  <Beaker className="h-5 w-5 text-primary" />
                  Calculator Inputs
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={handleReset} data-testid="button-reset-calculator">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="peptide-select">Peptide</Label>
                    <Select value={selectedPeptide} onValueChange={(val) => setSelectedPeptide(val)}>
                      <SelectTrigger data-testid="select-peptide">
                        <SelectValue placeholder="Select peptide" />
                      </SelectTrigger>
                      <SelectContent>
                        {presetPeptides.map((p) => (
                          <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="peptide-amount">Peptide Amount (mg)</Label>
                    <Input
                      id="peptide-amount"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={peptideAmount}
                      onChange={(e) => setPeptideAmount(e.target.value)}
                      placeholder="e.g. 5"
                      data-testid="input-peptide-amount"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="water-volume">Bacteriostatic Water (mL)</Label>
                    <Input
                      id="water-volume"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={waterVolume}
                      onChange={(e) => setWaterVolume(e.target.value)}
                      placeholder="e.g. 2"
                      data-testid="input-water-volume"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="syringe-size">Syringe Size</Label>
                    <Select value={syringeSize} onValueChange={setSyringeSize}>
                      <SelectTrigger data-testid="select-syringe-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.3">0.3 mL (30 units)</SelectItem>
                        <SelectItem value="0.5">0.5 mL (50 units)</SelectItem>
                        <SelectItem value="1">1.0 mL (100 units)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="desired-dose">Desired Dose</Label>
                    <Input
                      id="desired-dose"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={desiredDose}
                      onChange={(e) => setDesiredDose(e.target.value)}
                      placeholder="e.g. 250"
                      data-testid="input-desired-dose"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dose-unit">Dose Unit</Label>
                    <Select value={doseUnit} onValueChange={setDoseUnit}>
                      <SelectTrigger data-testid="select-dose-unit">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcg">mcg (micrograms)</SelectItem>
                        <SelectItem value="mg">mg (milligrams)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {results && (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Syringe className="h-5 w-5 text-primary" />
                    Calculation Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="rounded-lg bg-primary/5 p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Draw Volume</p>
                      <p className="text-2xl font-bold text-primary" data-testid="text-draw-volume">{results.volumeToDrawMl} mL</p>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Syringe Units</p>
                      <p className="text-2xl font-bold text-primary" data-testid="text-syringe-units">{results.unitsToDraw} units</p>
                      <p className="text-xs text-muted-foreground">on {results.totalUnits}-unit syringe</p>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Total Doses / Vial</p>
                      <p className="text-2xl font-bold text-primary" data-testid="text-total-doses">{results.totalDoses}</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border p-4 mb-4">
                    <p className="text-sm font-medium mb-2">Solution Concentration</p>
                    <p className="text-lg">{results.concentrationMgPerMl} mg/mL ({results.concentrationMcgPerMl} mcg/mL)</p>
                  </div>

                  {results.tooSmall && (
                    <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 mb-4">
                      <p className="text-sm text-destructive font-medium flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Warning: The dose volume is very small and may be difficult to measure accurately. Consider using less bacteriostatic water to increase concentration.
                      </p>
                    </div>
                  )}

                  {results.exceedsSyringe && (
                    <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 mb-4">
                      <p className="text-sm text-destructive font-medium flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Warning: The required volume exceeds your syringe capacity. Consider using a larger syringe or adding less water to increase concentration.
                      </p>
                    </div>
                  )}

                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm font-medium mb-2">How to Read This</p>
                    <p className="text-sm text-muted-foreground">
                      After reconstituting {peptideAmount}mg of {selectedPeptide} with {waterVolume}mL of bacteriostatic water, 
                      draw {results.unitsToDraw} units ({results.volumeToDrawMl} mL) on your {results.syringeMl}mL syringe 
                      to get a {desiredDose} {doseUnit} dose. You will get approximately {results.totalDoses} doses from one vial.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FlaskConical className="h-5 w-5 text-primary" />
                  Reconstitution Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground mb-1">Step 1: Prepare</p>
                  <p>Ensure all materials are sterile. Use alcohol swabs to clean the vial tops and injection sites.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Step 2: Add Solvent</p>
                  <p>Slowly inject bacteriostatic water into the vial along the glass wall. Do not spray directly onto the powder.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Step 3: Mix Gently</p>
                  <p>Tilt the vial gently at a 45-degree angle and roll between your fingers. Never shake vigorously as this can damage the peptide.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Step 4: Store Properly</p>
                  <p>Once reconstituted, store in the refrigerator at 2-8 degrees C. Use within 3-4 weeks for best results.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Info className="h-5 w-5 text-primary" />
                  Storage Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Lyophilized (powder)</span>
                  <Badge variant="secondary" className="text-xs">-20 degrees C</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Reconstituted (short-term)</span>
                  <Badge variant="secondary" className="text-xs">2-8 degrees C</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Reconstituted (long-term)</span>
                  <Badge variant="secondary" className="text-xs">-20 degrees C</Badge>
                </div>
                <p className="text-xs border-t border-border pt-3 mt-3">
                  Always protect peptides from light and avoid repeated freeze-thaw cycles. Aliquot solutions before freezing when possible.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Beaker className="h-5 w-5 text-primary" />
                  Common Solvents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Bacteriostatic Water</p>
                  <p>Most common. Contains 0.9% benzyl alcohol as preservative. Allows multi-use vials.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Sterile Water</p>
                  <p>Preservative-free. Best for single-use applications.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Bacteriostatic NaCl (0.9%)</p>
                  <p>Isotonic saline with benzyl alcohol. Reduces injection-site irritation.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            This calculator is provided for educational and research purposes only. All peptides sold by Peptide Europe are strictly for in-vitro research and laboratory use. Not for human consumption. Always consult relevant research protocols and institutional guidelines before use.
          </p>
        </div>
      </div>
    </div>
  );
}
