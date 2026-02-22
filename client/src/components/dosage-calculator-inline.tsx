import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

function SyringeSVG({ fillPercent }: { fillPercent: number }) {
  const clampedFill = Math.max(0, Math.min(100, fillPercent));
  const barrelTop = 60;
  const barrelHeight = 160;
  const fillHeight = (clampedFill / 100) * barrelHeight;
  const fillY = barrelTop + barrelHeight - fillHeight;
  const plungerY = fillY - 8;

  return (
    <svg viewBox="0 0 60 260" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="syringeBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(210,15%,75%)" stopOpacity="0.6" />
          <stop offset="50%" stopColor="hsl(210,15%,90%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(210,15%,75%)" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="liquidFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(222,30%,22%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(222,25%,18%)" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <rect x="27" y={Math.max(10, plungerY - 30)} width="6" height={Math.max(10, plungerY - 10 + 30)} rx="2" fill="hsl(210,10%,70%)" fillOpacity="0.5" />
      <rect x="20" y={Math.max(10, plungerY - 2)} width="20" height="10" rx="2" fill="hsl(210,10%,60%)" fillOpacity="0.7" />

      <rect x="15" y={barrelTop} width="30" height={barrelHeight} rx="3" fill="url(#syringeBody)" />
      <rect x="15" y={barrelTop} width="30" height={barrelHeight} rx="3" fill="none" stroke="hsl(210,15%,70%)" strokeWidth="0.5" strokeOpacity="0.5" />

      {clampedFill > 0 && (
        <rect x="17" y={fillY} width="26" height={fillHeight} rx="2" fill="url(#liquidFill)" />
      )}

      {[0, 25, 50, 75, 100].map((pct) => {
        const y = barrelTop + barrelHeight - (pct / 100) * barrelHeight;
        return (
          <g key={pct}>
            <line x1="15" y1={y} x2="22" y2={y} stroke="hsl(210,15%,50%)" strokeWidth="0.5" strokeOpacity="0.6" />
            <text x="12" y={y + 2} textAnchor="end" fontSize="5" fill="hsl(210,15%,50%)" fillOpacity="0.6" fontFamily="monospace">
              {pct}
            </text>
          </g>
        );
      })}

      <rect x="26" y={barrelTop + barrelHeight} width="8" height="20" rx="1" fill="hsl(210,10%,70%)" fillOpacity="0.5" />
      <rect x="28" y={barrelTop + barrelHeight + 20} width="4" height="16" rx="0.5" fill="hsl(210,10%,60%)" fillOpacity="0.4" />
    </svg>
  );
}

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  label: string;
  unit: string;
  id: string;
}

function CustomSlider({ min, max, step, value, onChange, label, unit, id }: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">{label}</Label>
        <span className="text-sm font-semibold" data-testid={`value-${id}`}>{value} {unit}</span>
      </div>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer custom-slider"
        style={{
          background: `linear-gradient(to right, hsl(222,30%,30%) 0%, hsl(222,30%,30%) ${percent}%, hsl(210,15%,25%) ${percent}%, hsl(210,15%,25%) 100%)`,
        }}
        data-testid={`slider-${id}`}
      />
    </div>
  );
}

export function DosageCalculatorInline() {
  const [peptideAmount, setPeptideAmount] = useState(10);
  const [bacWaterVolume, setBacWaterVolume] = useState(2);
  const [desiredDose, setDesiredDose] = useState(250);
  const [syringeUnits, setSyringeUnits] = useState(100);

  const results = useMemo(() => {
    if (peptideAmount <= 0 || bacWaterVolume <= 0 || desiredDose <= 0) {
      return { concentration: 0, unitsToDraw: 0, drawVolume: 0, totalDoses: 0 };
    }

    const concentrationMcgPerMl = (peptideAmount * 1000) / bacWaterVolume;
    const drawVolumeMl = desiredDose / concentrationMcgPerMl;
    const totalSyringeVolumeMl = 1;
    const unitsToDraw = (syringeUnits / totalSyringeVolumeMl) * drawVolumeMl;
    const totalDoses = (peptideAmount * 1000) / desiredDose;

    return {
      concentration: concentrationMcgPerMl,
      unitsToDraw: Math.round(unitsToDraw * 10) / 10,
      drawVolume: Math.round(drawVolumeMl * 1000) / 1000,
      totalDoses: Math.floor(totalDoses),
    };
  }, [peptideAmount, bacWaterVolume, desiredDose, syringeUnits]);

  const fillPercent = Math.min(100, (results.unitsToDraw / syringeUnits) * 100);

  return (
    <div className="mt-8 border-t border-border/50 pt-8">
      <div className="flex items-center gap-2 mb-5">
        <Calculator className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold" data-testid="heading-dosage-calculator">Dosage Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_100px] gap-6">
        <div className="space-y-5">
          <CustomSlider
            id="peptide-amount"
            label="Peptide Amount"
            unit="mg"
            min={1}
            max={50}
            step={1}
            value={peptideAmount}
            onChange={setPeptideAmount}
          />
          <CustomSlider
            id="bac-water"
            label="Bacteriostatic Water"
            unit="mL"
            min={0.5}
            max={10}
            step={0.5}
            value={bacWaterVolume}
            onChange={setBacWaterVolume}
          />
          <CustomSlider
            id="desired-dose"
            label="Desired Dose"
            unit="mcg"
            min={25}
            max={2000}
            step={25}
            value={desiredDose}
            onChange={setDesiredDose}
          />
          <CustomSlider
            id="syringe-units"
            label="Syringe Size"
            unit="units"
            min={30}
            max={100}
            step={10}
            value={syringeUnits}
            onChange={setSyringeUnits}
          />

          <Card className="bg-muted/30 border-border/50">
            <CardContent className="py-3 px-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Draw Volume</p>
                  <p className="text-lg font-bold text-primary" data-testid="result-draw-volume">
                    {results.drawVolume.toFixed(3)} mL
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Units to Draw</p>
                  <p className="text-lg font-bold text-primary" data-testid="result-units-to-draw">
                    {results.unitsToDraw} units
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Concentration</p>
                  <p className="text-sm font-semibold" data-testid="result-concentration">
                    {results.concentration.toFixed(0)} mcg/mL
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Total Doses</p>
                  <p className="text-sm font-semibold" data-testid="result-total-doses">
                    {results.totalDoses} per vial
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center">
          <div className="w-16 h-52">
            <SyringeSVG fillPercent={fillPercent} />
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-1">{results.unitsToDraw}u</p>
        </div>
      </div>
    </div>
  );
}
