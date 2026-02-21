import { useState, useRef, useEffect } from "react";
import { Hero, TrustBar } from "@/components/hero";
import { PeptideShowcase } from "@/components/peptide-showcase";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { useLanguage } from "@/components/language-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { getProductImage } from "@/lib/product-images";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  FlaskConical,
  Microscope,
  Thermometer,
  ShieldCheck,
  Truck,
  FileText,
  Calculator,
  BookOpen,
  HelpCircle,
  Tag,
  Check,
  Syringe,
  Atom,
  Sparkles,
  Beaker,
} from "lucide-react";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FeaturedPeptides() {
  const { ref, visible } = useScrollReveal();
  const featured = [
    { id: "tirzepatide-10mg", name: "Tirzepatide", dose: "10mg", price: "24.00", compPrice: "28.00", category: "GLP-1", purity: "≥99.5%" },
    { id: "semaglutide-5mg", name: "Semaglutide", dose: "5mg", price: "14.00", compPrice: "18.00", category: "GLP-1", purity: "≥99.5%" },
    { id: "bpc157-5mg", name: "BPC-157", dose: "5mg", price: "10.00", compPrice: "14.00", category: "Healing", purity: "≥99.0%" },
    { id: "cjc1295-nodac-5mg", name: "CJC-1295", dose: "5mg (No DAC)", price: "11.00", compPrice: "15.00", category: "Growth", purity: "≥99.0%" },
    { id: "ghkcu-50mg", name: "GHK-Cu", dose: "50mg", price: "16.00", compPrice: "20.00", category: "Cosmetic", purity: "≥98.5%" },
    { id: "retatrutide-10mg", name: "Retatrutide", dose: "10mg", price: "31.00", compPrice: "35.00", category: "GLP-1", purity: "≥99.0%" },
  ];

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-[#0A0F1E] relative" id="catalog">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#00F5FF] mb-2">Popular Products</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-[#E0E8FF]" data-testid="text-catalog-title">
              Most requested compounds
            </h2>
          </div>
          <Link href="/products">
            <Button variant="outline" className="gap-2 shrink-0 border-[#00F5FF]/20 text-[#00F5FF]" data-testid="button-browse-all">
              View all 20+ peptides
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((peptide, i) => (
            <Link href={`/products/${peptide.id}`} key={peptide.id} data-testid={`link-product-${peptide.id}`}>
              <div
                className="rounded-xl border border-[#00F5FF]/8 bg-[#101830] overflow-hidden group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease ${i * 80}ms`,
                }}
                data-testid={`card-featured-${i}`}
              >
                <div className="p-5">
                  <div className="mb-3 h-56 rounded-lg bg-[#0A0F1E]/60 flex items-center justify-center overflow-hidden border border-[#00F5FF]/5">
                    {getProductImage(peptide.id, "") ? (
                      <img
                        src={getProductImage(peptide.id, "")}
                        alt={peptide.name}
                        className="h-full w-full object-contain"
                        data-testid={`img-featured-${i}`}
                      />
                    ) : (
                      <FlaskConical className="h-8 w-8 text-[#8A94B6]/40" />
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-semibold text-sm text-[#E0E8FF]" data-testid={`text-featured-name-${i}`}>{peptide.name}</h3>
                      <p className="text-xs text-[#8A94B6]">{peptide.dose}</p>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#00F5FF]/8 text-[#00F5FF] uppercase tracking-wider shrink-0" data-testid={`badge-category-${i}`}>
                      {peptide.category}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-4 pt-3 border-t border-[#E0E8FF]/5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold tracking-tight text-[#00F5FF]" data-testid={`text-featured-price-${i}`}>&euro;{peptide.price}</span>
                      <span className="text-xs text-[#8A94B6] line-through">&euro;{peptide.compPrice}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#8A94B6]">
                      <Check className="h-3 w-3 text-[#00F5FF]" />
                      <span data-testid={`text-featured-purity-${i}`}>{peptide.purity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
          {[
            { name: "GLP-1 Agonists", count: 4, desc: "Metabolic regulation" },
            { name: "Growth Factors", count: 7, desc: "GH secretagogues" },
            { name: "Healing & Repair", count: 4, desc: "Tissue regeneration" },
            { name: "Cosmetic & Other", count: 5, desc: "Skin, cognition, longevity" },
          ].map((cat, i) => (
            <Link href="/products" key={i} data-testid={`link-category-${i}`}>
              <div className="rounded-lg border border-[#00F5FF]/8 bg-[#101830] p-4 flex items-center gap-3" data-testid={`card-category-${i}`}>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[#E0E8FF]" data-testid={`text-category-name-${i}`}>{cat.name}</p>
                  <p className="text-xs text-[#8A94B6]">{cat.desc} &middot; {cat.count} peptides</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-[#8A94B6] shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScienceSection() {
  const { ref, visible } = useScrollReveal();
  const residues = ["Gly", "Glu", "Pro", "Pro", "Pro", "Gly", "Lys", "Pro", "Ala", "Asp", "Asp", "Ala", "Gly", "Leu", "Val"];

  return (
    <section ref={ref} className="relative py-16 lg:py-24 bg-[#0A0F1E] overflow-hidden" id="science">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,245,255,0.03) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(125,0,255,0.03) 0%, transparent 70%)" }}
        />
      </div>
      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.6s ease",
            }}
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#00F5FF] mb-3">Peptide Science</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5 leading-tight text-[#E0E8FF]" data-testid="text-science-title"
              style={{ textShadow: "0 0 30px rgba(125,0,255,0.2)" }}
            >
              Every batch synthesized, purified, and verified
            </h2>
            <div className="space-y-3 text-[#8A94B6] leading-relaxed text-sm">
              <p>
                Our peptides are built amino acid by amino acid using solid-phase peptide synthesis (SPPS), then purified via reverse-phase HPLC and confirmed by mass spectrometry.
              </p>
              <p>
                The result: lyophilized powder with 98-99%+ documented purity, shipped with a full Certificate of Analysis.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <Link href="/products">
                <Button className="gap-2 bg-[#00F5FF] text-[#0A0F1E] font-semibold shadow-[0_0_20px_rgba(0,245,255,0.25)]" data-testid="button-explore-catalog">
                  Browse Products
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href="/calculator">
                <Button variant="outline" className="gap-2 border-[#00F5FF]/20 text-[#00F5FF]" data-testid="button-science-calc">
                  Calculator
                </Button>
              </Link>
            </div>
          </div>

          <div data-testid="section-amino-chain"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.6s ease 200ms",
            }}
          >
            <div className="rounded-xl border border-[#00F5FF]/10 bg-[#101830] p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#00F5FF] animate-pulse" />
                  <p className="text-[10px] uppercase tracking-widest font-medium text-[#00F5FF]" data-testid="text-sequence-label">
                    BPC-157 Sequence
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#8A94B6]">15 residues</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-5" data-testid="text-sequence-value">
                {residues.map((res, i) => (
                  <span key={i} className="inline-flex items-center">
                    <span className="font-mono text-xs px-1.5 py-0.5 rounded-md bg-[#00F5FF]/8 text-[#00F5FF] border border-[#00F5FF]/12">
                      {res}
                    </span>
                    {i < residues.length - 1 && (
                      <span className="text-[#00F5FF]/25 mx-0.5 text-[10px]">&mdash;</span>
                    )}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E0E8FF]/5 text-xs">
                <div data-testid="text-formula-value">
                  <span className="block font-medium text-[#8A94B6] mb-0.5">Formula</span>
                  <span className="text-[#E0E8FF] font-mono text-[11px]">C<sub>62</sub>H<sub>98</sub>N<sub>16</sub>O<sub>22</sub></span>
                </div>
                <div data-testid="text-mw-value">
                  <span className="block font-medium text-[#8A94B6] mb-0.5">Mol. Weight</span>
                  <span className="text-[#E0E8FF] font-mono text-[11px]">1419.56</span>
                </div>
                <div data-testid="text-purity-value">
                  <span className="block font-medium text-[#8A94B6] mb-0.5">Purity</span>
                  <span className="font-semibold text-[#00F5FF] text-[11px]">&ge;99.0%</span>
                </div>
                <div data-testid="text-cas-value">
                  <span className="block font-medium text-[#8A94B6] mb-0.5">CAS</span>
                  <span className="text-[#E0E8FF] font-mono text-[11px]">137525-51-0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const { ref, visible } = useScrollReveal();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { num: "01", icon: Beaker, title: "Synthesis", desc: "Solid-phase peptide synthesis using Fmoc chemistry with automated coupling cycles" },
    { num: "02", icon: Atom, title: "Purification", desc: "Reverse-phase HPLC chromatographic separation to isolate target compound" },
    { num: "03", icon: Microscope, title: "Verification", desc: "ESI-MS / MALDI-TOF mass spectrometry analysis confirms molecular identity" },
    { num: "04", icon: Thermometer, title: "Lyophilization", desc: "Freeze-dried for long-term stability at -20°C storage conditions" },
    { num: "05", icon: ShieldCheck, title: "QC Release", desc: "Full Certificate of Analysis documentation with batch-specific data" },
    { num: "06", icon: Truck, title: "Cold-Chain", desc: "Temperature-controlled EU-wide dispatch with real-time tracking" },
  ];

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [visible, steps.length]);

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-[#101830] relative overflow-hidden" id="process">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-0 w-full h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(0,245,255,0.1), transparent)" }}
        />
      </div>
      <div className="container relative mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#00F5FF] mb-2">Quality Pipeline</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-[#E0E8FF]" data-testid="text-process-title"
            style={{ textShadow: "0 0 30px rgba(125,0,255,0.2)" }}
          >
            From synthesis to your lab
          </h2>
        </div>

        <div ref={timelineRef} className="relative max-w-6xl mx-auto">
          <div className="absolute top-[60px] left-0 right-0 h-[2px] hidden lg:block" aria-hidden="true">
            <div className="absolute inset-0 bg-[#00F5FF]/10" />
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00F5FF] to-[#7D00FF]"
              style={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
                transition: "width 0.6s ease",
                boxShadow: "0 0 10px rgba(0,245,255,0.5), 0 0 30px rgba(0,245,255,0.2)",
              }}
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {steps.map((step, i) => {
              const isActive = i === activeStep;
              const isPast = i <= activeStep;
              return (
                <div
                  key={i}
                  className="relative text-center cursor-pointer"
                  onClick={() => setActiveStep(i)}
                  style={{
                    opacity: visible ? (isPast ? 1 : 0.5) : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s ease ${i * 100}ms`,
                  }}
                  data-testid={`card-process-${i}`}
                >
                  <div className="relative z-10 mb-4 flex justify-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: isActive ? "rgba(0,245,255,0.15)" : "rgba(0,245,255,0.05)",
                        border: `1px solid ${isActive ? "rgba(0,245,255,0.4)" : "rgba(0,245,255,0.1)"}`,
                        boxShadow: isActive ? "0 0 20px rgba(0,245,255,0.3), 0 0 40px rgba(125,0,255,0.1)" : "none",
                        transition: "all 0.4s ease",
                      }}
                    >
                      <step.icon
                        className="h-5 w-5"
                        strokeWidth={1.5}
                        style={{ color: isActive ? "#00F5FF" : "#8A94B6" }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold tabular-nums block mb-1"
                    style={{ color: isActive ? "#00F5FF" : "#8A94B6" }}
                    data-testid={`text-process-num-${i}`}
                  >
                    {step.num}
                  </span>
                  <h3 className="font-semibold text-xs mb-1"
                    style={{ color: isActive ? "#E0E8FF" : "#8A94B6" }}
                    data-testid={`text-process-step-${i}`}
                  >{step.title}</h3>
                  <p className="text-[10px] leading-relaxed"
                    style={{
                      color: isActive ? "#8A94B6" : "#8A94B6",
                      opacity: isActive ? 1 : 0.6,
                      transition: "opacity 0.4s ease",
                    }}
                  >{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecsTable() {
  const { ref, visible } = useScrollReveal();

  const specs = [
    { param: "Purity (HPLC)", value: "≥98% — most products ≥99%" },
    { param: "Synthesis", value: "Solid-Phase Peptide Synthesis (SPPS / Fmoc)" },
    { param: "Verification", value: "ESI-MS / MALDI-TOF mass spectrometry" },
    { param: "Form", value: "Lyophilized powder (freeze-dried)" },
    { param: "Quantities", value: "5 mg, 10 mg, 20 mg, 50 mg vials" },
    { param: "Documentation", value: "Certificate of Analysis (CoA) with every order" },
    { param: "Storage", value: "-20°C recommended; stable 6-12 months" },
    { param: "Shipping", value: "Temperature-controlled, EU-wide, tracked & insured" },
  ];

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-[#0A0F1E] relative" id="specifications">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#00F5FF] mb-2">Specifications</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-[#E0E8FF]" data-testid="text-specs-title"
              style={{ textShadow: "0 0 30px rgba(125,0,255,0.2)" }}
            >
              Product quality standards
            </h2>
          </div>

          <div className="rounded-xl border border-[#00F5FF]/10 bg-[#101830] overflow-hidden" data-testid="table-specs">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(125,0,255,0.2)" }}>
                    <th className="text-left font-semibold p-4 text-[#00F5FF] text-xs uppercase tracking-wider bg-[#0A0F1E]/50" data-testid="th-parameter">Parameter</th>
                    <th className="text-left font-semibold p-4 text-[#00F5FF] text-xs uppercase tracking-wider bg-[#0A0F1E]/50" data-testid="th-standard">Standard</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid rgba(125,0,255,0.08)",
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateX(0)" : "translateX(-10px)",
                        transition: `all 0.4s ease ${i * 80}ms`,
                      }}
                    >
                      <td className="p-4 font-medium text-[#E0E8FF]" data-testid={`text-spec-param-${i}`}>{row.param}</td>
                      <td className="p-4 text-[#8A94B6]" data-testid={`text-spec-value-${i}`}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MidPageCTA() {
  return (
    <section className="relative overflow-hidden" data-testid="section-midcta"
      style={{
        background: "linear-gradient(135deg, #0A0F1E 0%, #101830 50%, #0A0F1E 100%)",
      }}
    >
      <div className="absolute inset-0" aria-hidden="true"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.06), rgba(125,0,255,0.06), transparent)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(0,245,255,0.3), rgba(125,0,255,0.3), transparent)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(125,0,255,0.3), rgba(0,245,255,0.3), transparent)" }}
      />
      <div className="container relative mx-auto px-4 py-12 lg:py-16 text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3 text-[#E0E8FF]" data-testid="text-cta-title"
          style={{ textShadow: "0 0 30px rgba(0,245,255,0.3)" }}
        >
          Ready to order? Ships within 24 hours
        </h2>
        <p className="text-sm text-[#8A94B6] mb-5">
          Free shipping on orders over &euro;120. Pay with crypto and save 10%.
        </p>
        <Link href="/products">
          <Button size="lg" className="gap-2 bg-[#00F5FF] text-[#0A0F1E] font-semibold shadow-[0_0_20px_rgba(0,245,255,0.3)]" data-testid="button-cta-order">
            Order Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const { ref, visible } = useScrollReveal();

  const reasons = [
    { icon: Sparkles, value: "98-99%+", label: "Purity", desc: "HPLC verified, CoA included" },
    { icon: Truck, value: "24h", label: "Dispatch", desc: "Same-day shipping, cold-chain" },
    { icon: FlaskConical, value: "20+", label: "Peptides", desc: "Research-grade compounds" },
    { icon: ShieldCheck, value: "27", label: "Countries", desc: "EU-wide delivery network" },
  ];

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-[#101830] relative" id="why-choose-us">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#00F5FF] mb-2">Why Peptide Europe</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E0E8FF]"
            style={{ textShadow: "0 0 30px rgba(125,0,255,0.2)" }}
          >
            Built for serious research
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {reasons.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#00F5FF]/10 bg-[#0A0F1E] p-6 text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${i * 100}ms`,
              }}
            >
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: "rgba(0,245,255,0.08)",
                  border: "1px solid rgba(0,245,255,0.15)",
                }}
              >
                <item.icon className="h-5 w-5 text-[#00F5FF]" strokeWidth={1.5} />
              </div>
              <p className="text-2xl font-bold text-[#00F5FF] mb-1"
                style={{ textShadow: "0 0 15px rgba(0,245,255,0.3)" }}
              >{item.value}</p>
              <p className="text-sm font-semibold text-[#E0E8FF] mb-1">{item.label}</p>
              <p className="text-xs text-[#8A94B6]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { ref, visible } = useScrollReveal();
  const reviews = [
    {
      quote: "The purity documentation was thorough and the peptides performed consistently across our assay panel. We've since moved all our peptide sourcing here.",
      name: "Dr. M. Kessler",
      role: "Principal Investigator",
      institution: "University of Munich",
    },
    {
      quote: "Fast turnaround and reliable cold-chain shipping. The BPC-157 and TB-500 batches matched our reference standards perfectly.",
      name: "Dr. S. van der Berg",
      role: "Research Scientist",
      institution: "Utrecht Institute for Pharmaceutical Sciences",
    },
    {
      quote: "We needed consistent GLP-1 agonist peptides for a multi-site study. Peptide Europe delivered on purity, quantity, and documentation every time.",
      name: "Dr. L. Moreau",
      role: "Group Leader, Metabolic Research",
      institution: "INSERM, Lyon",
    },
  ];

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-[#0A0F1E] relative" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#00F5FF] mb-2">Testimonials</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E0E8FF]" data-testid="text-testimonials-title"
            style={{ textShadow: "0 0 30px rgba(125,0,255,0.2)" }}
          >
            Trusted by researchers across Europe
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#00F5FF]/10 bg-[#101830] overflow-hidden"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${i * 120}ms`,
              }}
              data-testid={`card-testimonial-${i}`}
            >
              <div className="p-5 flex flex-col h-full">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className="h-3.5 w-3.5 fill-current" style={{ color: "#00F5FF" }} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-4 text-[#8A94B6]" data-testid={`text-testimonial-quote-${i}`}>
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="pt-3 border-t border-[#E0E8FF]/5">
                  <p className="font-semibold text-sm text-[#E0E8FF]" data-testid={`text-testimonial-name-${i}`}>{review.name}</p>
                  <p className="text-xs text-[#8A94B6] mt-0.5" data-testid={`text-testimonial-role-${i}`}>{review.role}</p>
                  <p className="text-xs text-[#00F5FF] mt-0.5" data-testid={`text-testimonial-institution-${i}`}>{review.institution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolsAndResources() {
  const { ref, visible } = useScrollReveal();
  const resources = [
    { label: "Dosage Guide", href: "/peptide-guide", desc: "Comprehensive dosing, reconstitution, and cycle reference for 50+ peptides", icon: Syringe },
    { label: "Peptide Calculator", href: "/calculator", desc: "Reconstitution dosing and vial duration calculator", icon: Calculator },
    { label: "Research Insights", href: "/insights", desc: "Articles on peptide science and best practices", icon: BookOpen },
    { label: "FAQ & Support", href: "/faq", desc: "Ordering, shipping, storage, and returns", icon: HelpCircle },
  ];

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-[#101830] relative" id="tools">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E0E8FF]" data-testid="text-tools-title"
            style={{ textShadow: "0 0 30px rgba(125,0,255,0.2)" }}
          >
            Resources for your research
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {resources.map((link, i) => (
            <Link key={link.href} href={link.href} data-testid={`link-resource-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <div
                className="rounded-xl border border-[#00F5FF]/10 bg-[#0A0F1E] p-5 h-full"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(15px)",
                  transition: `all 0.4s ease ${i * 80}ms`,
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.12)" }}
                >
                  <link.icon className="h-4 w-4 text-[#00F5FF]" strokeWidth={1.5} />
                </div>
                <p className="font-semibold text-sm mb-1 text-[#E0E8FF]">{link.label}</p>
                <p className="text-xs text-[#8A94B6] leading-relaxed">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const res = await apiRequest("POST", "/api/newsletter", { email });
      const data = await res.json();
      setDiscountCode(data.discountCode || "");
      setSubmitted(true);
      setEmail("");
      toast({ title: "Welcome!", description: "Your 10% discount code is ready." });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (discountCode) {
      navigator.clipboard.writeText(discountCode);
      setCopied(true);
      toast({ title: "Copied!", description: "Discount code copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative py-16 lg:py-24 bg-[#0A0F1E] overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(125,0,255,0.04) 0%, transparent 70%)" }}
        />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,245,255,0.03) 0%, transparent 70%)" }}
        />
      </div>
      <div className="container relative mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.15)" }}
          >
            <Tag className="h-4 w-4 text-[#00F5FF]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-[#E0E8FF]" data-testid="text-newsletter-title"
            style={{ textShadow: "0 0 30px rgba(125,0,255,0.2)" }}
          >
            Get 10% off your first order
          </h2>
          <p className="text-[#8A94B6] text-sm mb-6">
            Subscribe to receive a unique discount code and research updates.
          </p>

          {submitted ? (
            <div className="space-y-4" data-testid="text-newsletter-success">
              <div className="flex items-center justify-center gap-2 font-medium text-[#00F5FF]">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm">Your discount code is ready</span>
              </div>
              {discountCode && (
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-[#00F5FF]/15 bg-[#101830]">
                  <code className="font-mono text-sm tracking-wider text-[#00F5FF] font-semibold" data-testid="text-discount-code">{discountCode}</code>
                  <button onClick={handleCopy} className="text-[#8A94B6]" data-testid="button-copy-code" aria-label="Copy discount code">
                    {copied ? <CheckCircle2 className="h-4 w-4 text-[#00F5FF]" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              )}
              <p className="text-xs text-[#8A94B6]">Apply at checkout. One-time use.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder="researcher@university.eu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-[#101830] border-[#00F5FF]/15 text-[#E0E8FF] placeholder:text-[#8A94B6]/50"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" disabled={isSubmitting} className="shrink-0 bg-[#00F5FF] text-[#0A0F1E] font-semibold" data-testid="button-newsletter-submit">
                {isSubmitting ? "..." : "Subscribe"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#0A0F1E]">
      <Hero />
      <TrustBar />
      <FeaturedPeptides />
      <ScienceSection />
      <PeptideShowcase />
      <WhyChooseUs />
      <ProcessSection />
      <SpecsTable />
      <MidPageCTA />
      <Testimonials />
      <ToolsAndResources />
      <NewsletterSection />
      <DisclaimerBanner />
    </div>
  );
}
