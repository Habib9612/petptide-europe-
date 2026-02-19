import { useState } from "react";
import { Hero } from "@/components/hero";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { useLanguage } from "@/components/language-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
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
  Zap,
  Award,
  Globe,
  Beaker,
  Tag,
  Check,
} from "lucide-react";

function PeptideVisualization() {
  const residues = ["Gly", "Glu", "Pro", "Pro", "Pro", "Gly", "Lys", "Pro", "Ala", "Asp", "Asp", "Ala", "Gly", "Leu", "Val"];
  return (
    <div className="relative" data-testid="section-amino-chain">
      <div className="absolute -inset-4 bg-gradient-to-br from-primary/[0.04] via-transparent to-primary/[0.02] rounded-md -z-10" />
      <Card className="overflow-visible">
        <div className="p-6">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <p className="text-[10px] uppercase tracking-widest font-medium text-primary" data-testid="text-sequence-label">
                BPC-157 — Pentadecapeptide
              </p>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">15 residues</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-5" data-testid="text-sequence-value">
            {residues.map((res, i) => (
              <span key={i} className="inline-flex items-center">
                <span className="font-mono text-xs px-1.5 py-0.5 rounded-md bg-primary/[0.06] text-foreground/80 border border-primary/10">
                  {res}
                </span>
                {i < residues.length - 1 && (
                  <span className="text-primary/30 mx-0.5 text-[10px]">&mdash;</span>
                )}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border text-xs">
            <div data-testid="text-formula-value">
              <span className="block font-medium text-muted-foreground mb-0.5">Formula</span>
              <span className="text-foreground font-mono text-[11px]">C<sub>62</sub>H<sub>98</sub>N<sub>16</sub>O<sub>22</sub></span>
            </div>
            <div data-testid="text-mw-value">
              <span className="block font-medium text-muted-foreground mb-0.5">Mol. Weight</span>
              <span className="text-foreground font-mono text-[11px]">1419.56 g/mol</span>
            </div>
            <div data-testid="text-purity-value">
              <span className="block font-medium text-muted-foreground mb-0.5">Purity (HPLC)</span>
              <span className="font-semibold text-primary text-[11px]">&ge;99.0%</span>
            </div>
            <div data-testid="text-cas-value">
              <span className="block font-medium text-muted-foreground mb-0.5">CAS Number</span>
              <span className="text-foreground font-mono text-[11px]">137525-51-0</span>
            </div>
          </div>
        </div>
      </Card>
      <p className="text-[10px] text-muted-foreground mt-2 pl-1">
        Example compound data. Certificate of Analysis included with every order.
      </p>
    </div>
  );
}

function ScienceSection() {
  return (
    <section className="py-20 lg:py-28" id="science">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-primary mb-3">Peptide Science</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 leading-tight" data-testid="text-science-title">
              Precision-synthesized compounds for advanced research
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Peptides are short chains of amino acids — the fundamental building blocks of proteins. In research settings, synthetic peptides allow scientists to study cellular signaling, receptor binding, and metabolic pathways with unprecedented precision.
              </p>
              <p>
                Each compound in our catalog is synthesized using solid-phase peptide synthesis (SPPS), purified via reverse-phase HPLC, and verified by mass spectrometry. The result is a lyophilized powder with documented purity of 98-99%+.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-7">
              <Link href="/products">
                <Button className="gap-2" data-testid="button-explore-catalog">
                  Explore Catalog
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href="/calculator">
                <Button variant="outline" className="gap-2" data-testid="button-science-calc">
                  Reconstitution Calculator
                </Button>
              </Link>
            </div>
          </div>

          <PeptideVisualization />
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const features = [
    { icon: Zap, value: "24h", title: "Processing Time", desc: "Orders confirmed and dispatched within one business day across the EU." },
    { icon: Award, value: "98-99%+", title: "HPLC Purity", desc: "Every batch verified by HPLC and mass spectrometry with full CoA." },
    { icon: Beaker, value: "20+", title: "Compounds", desc: "GLP-1 agonists, growth factors, healing peptides, and cosmetic compounds." },
    { icon: Globe, value: "27", title: "EU Countries", desc: "Temperature-controlled delivery with full tracking and insurance." },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-[hsl(215,35%,7%)] overflow-hidden" id="why-choose-us">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(186,65%,48%,0.03)]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[hsl(186,65%,48%,0.02)]" />
      </div>
      <div className="container relative mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-[hsl(186,65%,55%)] mb-3">Why Peptide Europe</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-white" data-testid="text-why-title">
            Built for researchers who need reliability
          </h2>
          <p className="text-[hsl(210,15%,55%)]">
            From synthesis to delivery, we maintain pharmaceutical-grade standards at every step.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-md overflow-hidden max-w-5xl mx-auto">
          {features.map((feat, i) => (
            <div className="bg-[hsl(215,35%,7%)] p-6" key={i} data-testid={`card-why-${i}`}>
              <feat.icon className="h-5 w-5 text-[hsl(186,65%,55%)] mb-4" strokeWidth={1.5} />
              <p className="text-2xl font-bold text-white mb-1 tracking-tight">{feat.value}</p>
              <h3 className="font-semibold text-sm mb-2 text-[hsl(210,15%,70%)]" data-testid={`text-why-stat-label-${i}`}>{feat.title}</h3>
              <p className="text-xs text-[hsl(210,15%,45%)] leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { num: "01", icon: FlaskConical, title: "Solid-phase synthesis", desc: "Peptides assembled residue-by-residue using Fmoc chemistry on a resin support." },
    { num: "02", icon: Microscope, title: "HPLC purification", desc: "Reverse-phase chromatography separates the target peptide from impurities." },
    { num: "03", icon: FileText, title: "Mass spec verification", desc: "ESI-MS or MALDI-TOF confirms molecular weight matches expected sequence." },
    { num: "04", icon: Thermometer, title: "Lyophilization", desc: "Freeze-drying produces stable powder for long-term storage at -20°C." },
    { num: "05", icon: ShieldCheck, title: "Quality release", desc: "Only batches meeting ≥98% purity are released with full COA documentation." },
    { num: "06", icon: Truck, title: "Cold-chain dispatch", desc: "Temperature-controlled packaging ships within 24h across the EU." },
  ];

  return (
    <section className="py-20 lg:py-28" id="process">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-primary mb-3">Our Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 leading-tight" data-testid="text-process-title">
            From synthesis to your lab in 6 steps
          </h2>
          <p className="text-muted-foreground">
            Every peptide goes through a rigorous production and quality control pipeline.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <div className="relative pl-8 pb-6" key={i} data-testid={`card-process-${i}`}>
              <div className="absolute left-0 top-0 flex flex-col items-center">
                <span className="text-lg font-bold text-primary/20 tabular-nums leading-none" data-testid={`text-process-num-${i}`}>
                  {step.num}
                </span>
                {i < 5 && <div className="w-px h-full bg-border mt-2 hidden lg:block" />}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <step.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                <h3 className="font-semibold text-sm" data-testid={`text-process-step-${i}`}>{step.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecsTable() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30" id="specifications">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 leading-tight" data-testid="text-specs-title">
              Product quality at a glance
            </h2>
          </div>

          <Card className="overflow-visible" data-testid="table-specs">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-semibold p-4 text-muted-foreground text-xs uppercase tracking-wider" data-testid="th-parameter">Parameter</th>
                    <th className="text-left font-semibold p-4 text-muted-foreground text-xs uppercase tracking-wider" data-testid="th-standard">Standard</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { param: "Purity (HPLC)", value: "≥98% — most products ≥99%" },
                    { param: "Synthesis Method", value: "Solid-Phase Peptide Synthesis (SPPS / Fmoc)" },
                    { param: "Verification", value: "ESI-MS / MALDI-TOF mass spectrometry" },
                    { param: "Form", value: "Lyophilized powder (freeze-dried)" },
                    { param: "Available Quantities", value: "5 mg, 10 mg, 20 mg, 50 mg vials" },
                    { param: "Documentation", value: "Certificate of Analysis (CoA) with every order" },
                    { param: "Storage", value: "-20°C recommended; stable 6-12 months lyophilized" },
                    { param: "Shipping", value: "Temperature-controlled, EU-wide, tracked & insured" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                      <td className="p-4 font-medium" data-testid={`text-spec-param-${i}`}>{row.param}</td>
                      <td className="p-4 text-muted-foreground" data-testid={`text-spec-value-${i}`}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function MidPageCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[hsl(186,65%,32%)] to-[hsl(186,65%,42%)]" data-testid="section-midcta">
      <div className="absolute inset-0" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid slice">
          <g stroke="white" fill="none" strokeWidth="1">
            {Array.from({ length: 12 }).map((_, i) => (
              <circle key={i} cx={70 + i * 60} cy={100 + Math.sin(i * 0.8) * 30} r="3" fill="white" fillOpacity="0.5" />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={i} x1={70 + i * 60} y1={100 + Math.sin(i * 0.8) * 30} x2={70 + (i + 1) * 60} y2={100 + Math.sin((i + 1) * 0.8) * 30} />
            ))}
          </g>
        </svg>
      </div>
      <div className="container relative mx-auto px-4 py-14 lg:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 text-white" data-testid="text-cta-title">
          Ready to order? Ships within 24 hours
        </h2>
        <p className="text-sm text-white/70 mb-6">
          Free shipping on orders over &euro;120. Pay with crypto and save 10%.
        </p>
        <Link href="/products">
          <Button size="lg" variant="secondary" className="gap-2" data-testid="button-cta-order">
            Order Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

function FeaturedPeptides() {
  const featured = [
    { id: "tirzepatide-10mg", name: "Tirzepatide", dose: "10mg", price: "24.00", category: "GLP-1", purity: "≥99.5%" },
    { id: "semaglutide-5mg", name: "Semaglutide", dose: "5mg", price: "14.00", category: "GLP-1", purity: "≥99.5%" },
    { id: "bpc157-5mg", name: "BPC-157", dose: "5mg", price: "10.00", category: "Healing", purity: "≥99.0%" },
    { id: "cjc1295-nodac-5mg", name: "CJC-1295", dose: "5mg (No DAC)", price: "11.00", category: "Growth", purity: "≥99.0%" },
    { id: "ghkcu-50mg", name: "GHK-Cu", dose: "50mg", price: "16.00", category: "Cosmetic", purity: "≥98.5%" },
    { id: "retatrutide-10mg", name: "Retatrutide", dose: "10mg", price: "31.00", category: "GLP-1", purity: "≥99.0%" },
  ];

  return (
    <section className="py-20 lg:py-28" id="catalog">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight" data-testid="text-catalog-title">
              Most requested compounds
            </h2>
            <p className="text-muted-foreground mt-2">Our top-selling research peptides, ready to ship.</p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="gap-2 shrink-0" data-testid="button-browse-all">
              View all 20+ peptides
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((peptide, i) => (
            <Link href={`/products/${peptide.id}`} key={peptide.id}>
              <Card className="hover-elevate h-full overflow-visible" data-testid={`card-featured-${i}`}>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center shrink-0">
                        <FlaskConical className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm" data-testid={`text-featured-name-${i}`}>{peptide.name}</h3>
                        <p className="text-xs text-muted-foreground">{peptide.dose}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground uppercase tracking-wider shrink-0" data-testid={`badge-category-${i}`}>
                      {peptide.category}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-4 mt-4 pt-3 border-t border-border">
                    <span className="text-xl font-bold tracking-tight" data-testid={`text-featured-price-${i}`}>&euro;{peptide.price}</span>
                    <span className="text-xs text-muted-foreground" data-testid={`text-featured-purity-${i}`}>{peptide.purity}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-lg font-bold mb-5" data-testid="text-categories-title">Browse by category</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: "GLP-1 Agonists", count: 4, desc: "Metabolic regulation" },
              { name: "Growth Factors", count: 7, desc: "GH secretagogues" },
              { name: "Healing & Repair", count: 4, desc: "Tissue regeneration" },
              { name: "Cosmetic & Other", count: 5, desc: "Skin, cognition, longevity" },
            ].map((cat, i) => (
              <Link href="/products" key={i}>
                <Card className="hover-elevate overflow-visible" data-testid={`card-category-${i}`}>
                  <div className="p-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm" data-testid={`text-category-name-${i}`}>{cat.name}</p>
                      <p className="text-xs text-muted-foreground">{cat.desc} &middot; {cat.count} peptides</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      quote: "The purity documentation was thorough and the peptides performed consistently across our assay panel. We've since moved all our peptide sourcing here.",
      name: "Dr. M. Kessler",
      role: "Principal Investigator",
      institution: "University of Munich, Biochemistry Dept.",
    },
    {
      quote: "Fast turnaround and reliable cold-chain shipping. The BPC-157 and TB-500 batches matched our reference standards perfectly. Excellent supplier for EU-based labs.",
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
    <section className="relative py-20 lg:py-28 bg-[hsl(215,35%,7%)] overflow-hidden" id="testimonials">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-[hsl(186,65%,48%,0.02)]" />
      </div>
      <div className="container relative mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-[hsl(186,65%,55%)] mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-white" data-testid="text-testimonials-title">
            Trusted by researchers across Europe
          </h2>
          <p className="text-[hsl(210,15%,55%)]">
            Feedback from laboratories and research institutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <div key={i} className="rounded-md border border-white/[0.06] bg-white/[0.02] p-6 flex flex-col h-full" data-testid={`card-testimonial-${i}`}>
              <p className="text-sm leading-relaxed flex-1 mb-5 text-[hsl(210,15%,60%)]" data-testid={`text-testimonial-quote-${i}`}>
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="pt-4 border-t border-white/[0.06]">
                <p className="font-semibold text-sm text-white" data-testid={`text-testimonial-name-${i}`}>{review.name}</p>
                <p className="text-xs text-[hsl(210,15%,50%)] mt-0.5" data-testid={`text-testimonial-role-${i}`}>{review.role}</p>
                <p className="text-xs text-[hsl(186,65%,55%)] mt-0.5" data-testid={`text-testimonial-institution-${i}`}>{review.institution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolsAndResources() {
  const resources = [
    { label: "Peptide Calculator", href: "/calculator", desc: "Reconstitution dosing, draw volumes, and vial duration calculator", icon: Calculator },
    { label: "Research Insights", href: "/insights", desc: "Articles on peptide science, handling guides, and best practices", icon: BookOpen },
    { label: "FAQ & Support", href: "/faq", desc: "Answers about ordering, shipping, storage, purity, and returns", icon: HelpCircle },
  ];

  return (
    <section className="py-20 lg:py-28" id="tools">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-tools-title">
            Everything you need for your research
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {resources.map((link) => (
            <Link key={link.href} href={link.href} data-testid={`link-resource-${link.href.slice(1)}`}>
              <Card className="hover-elevate h-full overflow-visible">
                <div className="p-6">
                  <link.icon className="h-5 w-5 text-primary mb-4" strokeWidth={1.5} />
                  <p className="font-semibold text-sm mb-1.5">{link.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{link.desc}</p>
                </div>
              </Card>
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
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <Tag className="h-5 w-5 text-primary mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2" data-testid="text-newsletter-title">
            Get 10% off your first order
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Subscribe to receive a unique discount code and research updates.
          </p>

          {submitted ? (
            <div className="space-y-4" data-testid="text-newsletter-success">
              <div className="flex items-center justify-center gap-2 font-medium text-primary">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm">Your discount code is ready</span>
              </div>
              {discountCode && (
                <Card className="inline-flex items-center gap-3 px-5 py-3 overflow-visible">
                  <code className="font-mono text-sm tracking-wider text-primary font-semibold" data-testid="text-discount-code">{discountCode}</code>
                  <button onClick={handleCopy} className="text-muted-foreground transition-colors" data-testid="button-copy-code" aria-label="Copy discount code">
                    {copied ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </button>
                </Card>
              )}
              <p className="text-xs text-muted-foreground">Apply at checkout. One-time use.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
              <Input type="email" placeholder="researcher@university.eu" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1" data-testid="input-newsletter-email" />
              <Button type="submit" disabled={isSubmitting} data-testid="button-newsletter-subscribe">
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
    <div>
      <Hero />
      <ScienceSection />
      <WhyChooseUs />
      <ProcessSection />
      <SpecsTable />
      <MidPageCTA />
      <FeaturedPeptides />
      <Testimonials />
      <ToolsAndResources />
      <NewsletterSection />
      <DisclaimerBanner />
    </div>
  );
}
