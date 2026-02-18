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
import { Calculator, Beaker, Syringe, Info, FlaskConical, RotateCcw, Clock, Droplets, Target, TrendingUp } from "lucide-react";

interface PeptidePreset {
  name: string;
  amounts: number[];
  defaultAmount: number;
  defaultDose: number;
  defaultUnit: "mcg" | "mg";
  defaultWater: number;
  category: string;
}

const presetPeptides: PeptidePreset[] = [
  { name: "BPC-157", amounts: [5, 10], defaultAmount: 5, defaultDose: 250, defaultUnit: "mcg", defaultWater: 2, category: "Recovery" },
  { name: "TB-500", amounts: [5, 10], defaultAmount: 5, defaultDose: 2.5, defaultUnit: "mg", defaultWater: 2, category: "Recovery" },
  { name: "CJC-1295", amounts: [2, 5], defaultAmount: 2, defaultDose: 100, defaultUnit: "mcg", defaultWater: 2, category: "Growth Hormone" },
  { name: "Ipamorelin", amounts: [5, 10], defaultAmount: 5, defaultDose: 200, defaultUnit: "mcg", defaultWater: 2, category: "Growth Hormone" },
  { name: "Semaglutide", amounts: [3, 5, 10], defaultAmount: 5, defaultDose: 0.25, defaultUnit: "mg", defaultWater: 2, category: "Metabolic" },
  { name: "Tirzepatide", amounts: [5, 10, 15], defaultAmount: 5, defaultDose: 2.5, defaultUnit: "mg", defaultWater: 2, category: "Metabolic" },
  { name: "GHK-Cu", amounts: [50, 100, 200], defaultAmount: 50, defaultDose: 1, defaultUnit: "mg", defaultWater: 5, category: "Skin & Hair" },
  { name: "Hexarelin", amounts: [2, 5], defaultAmount: 2, defaultDose: 100, defaultUnit: "mcg", defaultWater: 2, category: "Growth Hormone" },
  { name: "GHRP-6", amounts: [5, 10], defaultAmount: 5, defaultDose: 100, defaultUnit: "mcg", defaultWater: 2, category: "Growth Hormone" },
  { name: "Melanotan II", amounts: [10], defaultAmount: 10, defaultDose: 0.5, defaultUnit: "mg", defaultWater: 2, category: "Tanning" },
];

function SyringeVisual({ fillPercent, units, totalUnits }: { fillPercent: number; units: string; totalUnits: number }) {
  const clampedFill = Math.min(Math.max(fillPercent, 0), 100);
  const barHeight = 180;
  const fillHeight = (clampedFill / 100) * barHeight;

  const tickCount = totalUnits === 100 ? 10 : totalUnits === 50 ? 5 : 3;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => i);

  return (
    <div className="flex flex-col items-center gap-2" data-testid="visual-syringe">
      <div className="relative flex items-end gap-2">
        <div className="flex flex-col justify-between text-[10px] text-muted-foreground" style={{ height: barHeight }}>
          {ticks.map((i) => {
            const val = Math.round((totalUnits / tickCount) * (tickCount - i));
            return (
              <span key={i} className="leading-none text-right w-6">{val}</span>
            );
          })}
        </div>
        <div className="relative rounded-md border border-border overflow-hidden" style={{ width: 40, height: barHeight }}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-primary/20 transition-all duration-300"
            style={{ height: `${clampedFill}%` }}
          />
          <div
            className="absolute left-0 right-0 border-t-2 border-primary transition-all duration-300"
            style={{ bottom: `${clampedFill}%` }}
          />
          {ticks.slice(1, -1).map((i) => {
            const pct = (i / tickCount) * 100;
            return (
              <div
                key={i}
                className="absolute left-0 w-2 border-t border-muted-foreground/30"
                style={{ bottom: `${100 - pct}%` }}
              />
            );
          })}
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-primary">{units} units</p>
        <p className="text-[11px] text-muted-foreground">{totalUnits}-unit syringe</p>
      </div>
    </div>
  );
}

export default function PeptideCalculator() {
  const [peptideAmount, setPeptideAmount] = useState<string>("5");
  const [waterVolume, setWaterVolume] = useState<string>("2");
  const [desiredDose, setDesiredDose] = useState<string>("250");
  const [doseUnit, setDoseUnit] = useState<string>("mcg");
  const [syringeSize, setSyringeSize] = useState<string>("1");
  const [selectedPeptide, setSelectedPeptide] = useState<string>("BPC-157");
  const [frequency, setFrequency] = useState<string>("1");

  const currentPreset = presetPeptides.find((p) => p.name === selectedPeptide);

  const handlePeptideChange = (name: string) => {
    setSelectedPeptide(name);
    const preset = presetPeptides.find((p) => p.name === name);
    if (preset) {
      setPeptideAmount(String(preset.defaultAmount));
      setDesiredDose(String(preset.defaultDose));
      setDoseUnit(preset.defaultUnit);
      setWaterVolume(String(preset.defaultWater));
    }
  };

  const handleAmountQuickSelect = (amount: number) => {
    setPeptideAmount(String(amount));
  };

  const results = useMemo(() => {
    const peptideMg = parseFloat(peptideAmount);
    const waterMl = parseFloat(waterVolume);
    const dose = parseFloat(desiredDose);
    const freq = parseFloat(frequency);

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
    const daysSupply = !isNaN(freq) && freq > 0 ? totalDoses / freq : null;
    const fillPercent = (volumeToDrawMl / syringeMl) * 100;

    return {
      concentrationMcgPerMl: concentrationMcgPerMl.toFixed(1),
      concentrationMgPerMl: concentrationMgPerMl.toFixed(2),
      volumeToDrawMl: volumeToDrawMl.toFixed(3),
      unitsToDraw: unitsToDraw.toFixed(1),
      totalDoses: totalDoses.toFixed(1),
      totalUnits,
      syringeMl,
      fillPercent,
      daysSupply: daysSupply ? daysSupply.toFixed(0) : null,
      tooSmall: volumeToDrawMl < 0.01,
      exceedsSyringe: volumeToDrawMl > syringeMl,
    };
  }, [peptideAmount, waterVolume, desiredDose, doseUnit, syringeSize, frequency]);

  const handleReset = () => {
    setPeptideAmount("5");
    setWaterVolume("2");
    setDesiredDose("250");
    setDoseUnit("mcg");
    setSyringeSize("1");
    setSelectedPeptide("BPC-157");
    setFrequency("1");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/5 to-background border-b border-border/40">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold" data-testid="text-calculator-title">Peptide Reconstitution Calculator</h1>
              <p className="text-sm text-muted-foreground">Calculate precise dosing for your research peptides</p>
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
                  Setup
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={handleReset} data-testid="button-reset-calculator">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Peptide</Label>
                  <Select value={selectedPeptide} onValueChange={handlePeptideChange}>
                    <SelectTrigger data-testid="select-peptide">
                      <SelectValue placeholder="Select peptide" />
                    </SelectTrigger>
                    <SelectContent>
                      {presetPeptides.map((p) => (
                        <SelectItem key={p.name} value={p.name} data-testid={`select-item-${p.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
                          <span className="flex items-center gap-2">
                            {p.name}
                            <span className="text-muted-foreground text-xs">({p.category})</span>
                          </span>
                        </SelectItem>
                      ))}
                      <SelectItem value="Custom" data-testid="select-item-custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {currentPreset && currentPreset.amounts.length > 0 && (
                  <div className="space-y-2">
                    <Label>Vial Size</Label>
                    <div className="flex flex-wrap gap-2">
                      {currentPreset.amounts.map((amt) => (
                        <Button
                          key={amt}
                          variant={peptideAmount === String(amt) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleAmountQuickSelect(amt)}
                          data-testid={`button-amount-${amt}`}
                        >
                          {amt} mg
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <Label htmlFor="desired-dose">Desired Dose</Label>
                    <div className="flex gap-2">
                      <Input
                        id="desired-dose"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={desiredDose}
                        onChange={(e) => setDesiredDose(e.target.value)}
                        placeholder="e.g. 250"
                        className="flex-1"
                        data-testid="input-desired-dose"
                      />
                      <Select value={doseUnit} onValueChange={setDoseUnit}>
                        <SelectTrigger className="w-[100px]" data-testid="select-dose-unit">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mcg">mcg</SelectItem>
                          <SelectItem value="mg">mg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="frequency">Doses per Day</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger data-testid="select-frequency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.143">Once per week</SelectItem>
                        <SelectItem value="0.333">Every 3 days</SelectItem>
                        <SelectItem value="0.5">Every other day</SelectItem>
                        <SelectItem value="1">Once daily</SelectItem>
                        <SelectItem value="2">Twice daily</SelectItem>
                        <SelectItem value="3">Three times daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {results && (
              <Card data-testid="card-results">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="hidden sm:flex items-center justify-center px-2">
                      <SyringeVisual
                        fillPercent={results.fillPercent}
                        units={results.unitsToDraw}
                        totalUnits={results.totalUnits}
                      />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-md bg-primary/5 p-3">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Droplets className="h-3.5 w-3.5 text-primary" />
                            <p className="text-xs text-muted-foreground">Draw Volume</p>
                          </div>
                          <p className="text-xl font-bold" data-testid="text-draw-volume">{results.volumeToDrawMl} mL</p>
                        </div>
                        <div className="rounded-md bg-primary/5 p-3">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Syringe className="h-3.5 w-3.5 text-primary" />
                            <p className="text-xs text-muted-foreground">Syringe Units</p>
                          </div>
                          <p className="text-xl font-bold" data-testid="text-syringe-units">{results.unitsToDraw}</p>
                          <p className="text-[11px] text-muted-foreground">on {results.totalUnits}-unit syringe</p>
                        </div>
                        <div className="rounded-md bg-primary/5 p-3">
                          <div className="flex items-center gap-1.5 mb-1">
                            <TrendingUp className="h-3.5 w-3.5 text-primary" />
                            <p className="text-xs text-muted-foreground">Doses / Vial</p>
                          </div>
                          <p className="text-xl font-bold" data-testid="text-total-doses">{results.totalDoses}</p>
                        </div>
                        {results.daysSupply && (
                          <div className="rounded-md bg-primary/5 p-3">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Clock className="h-3.5 w-3.5 text-primary" />
                              <p className="text-xs text-muted-foreground">Days Supply</p>
                            </div>
                            <p className="text-xl font-bold" data-testid="text-days-supply">{results.daysSupply}</p>
                            <p className="text-[11px] text-muted-foreground">per vial</p>
                          </div>
                        )}
                      </div>

                      <div className="rounded-md border border-border p-3">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Concentration</p>
                        <p className="text-sm font-medium">{results.concentrationMgPerMl} mg/mL <span className="text-muted-foreground">({results.concentrationMcgPerMl} mcg/mL)</span></p>
                      </div>

                      {results.tooSmall && (
                        <div className="rounded-md bg-destructive/10 border border-destructive/30 p-3">
                          <p className="text-sm text-destructive font-medium flex items-center gap-2">
                            <Info className="h-4 w-4 shrink-0" />
                            The dose volume is very small. Consider using less water to increase concentration.
                          </p>
                        </div>
                      )}

                      {results.exceedsSyringe && (
                        <div className="rounded-md bg-destructive/10 border border-destructive/30 p-3">
                          <p className="text-sm text-destructive font-medium flex items-center gap-2">
                            <Info className="h-4 w-4 shrink-0" />
                            Volume exceeds syringe capacity. Use a larger syringe or less water.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-md border border-border p-3 mt-4">
                    <p className="text-xs font-medium mb-1">Summary</p>
                    <p className="text-sm text-muted-foreground">
                      Reconstitute {peptideAmount} mg of {selectedPeptide} with {waterVolume} mL of bacteriostatic water.
                      Draw to {results.unitsToDraw} units ({results.volumeToDrawMl} mL) on your {results.syringeMl} mL syringe for a {desiredDose} {doseUnit} dose.
                      {results.daysSupply && ` At your selected frequency, one vial lasts approximately ${results.daysSupply} days.`}
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
                  <p>Ensure all materials are sterile. Use alcohol swabs to clean the vial tops.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Step 2: Add Solvent</p>
                  <p>Slowly inject bacteriostatic water along the glass wall. Do not spray directly onto the powder.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Step 3: Mix Gently</p>
                  <p>Roll the vial gently between your fingers. Never shake vigorously as this can damage the peptide.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Step 4: Store Properly</p>
                  <p>Refrigerate at 2-8 C. Use within 3-4 weeks for best results.</p>
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
                <div className="flex justify-between gap-2 flex-wrap">
                  <span>Lyophilized (powder)</span>
                  <Badge variant="secondary" className="text-xs">-20 C</Badge>
                </div>
                <div className="flex justify-between gap-2 flex-wrap">
                  <span>Reconstituted (short-term)</span>
                  <Badge variant="secondary" className="text-xs">2-8 C</Badge>
                </div>
                <div className="flex justify-between gap-2 flex-wrap">
                  <span>Reconstituted (long-term)</span>
                  <Badge variant="secondary" className="text-xs">-20 C</Badge>
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
                  <p>Isotonic saline with benzyl alcohol. Reduces irritation.</p>
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
