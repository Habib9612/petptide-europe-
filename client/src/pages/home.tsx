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
  Mail,
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
  Atom,
  Quote,
} from "lucide-react";

function SectionNav() {
  const navItems = [
    { label: "Overview", href: "#science" },
    { label: "Why Us", href: "#why-choose-us" },
    { label: "Quality", href: "#process" },
    { label: "Specs", href: "#specifications" },
    { label: "Catalog", href: "#catalog" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <nav className="sticky top-14 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md" data-testid="nav-section">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-1 overflow-x-auto no-scrollbar py-0">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 px-4 py-3 text-xs font-medium text-muted-foreground transition-colors"
              data-testid={`link-section-${item.href.slice(1)}`}
            >
              {item.label}
            </a>
          ))}
          <div className="flex-1" />
          <Link href="/products">
            <Button size="sm" className="shrink-0 gap-1.5 my-1.5" data-testid="button-nav-order">
              Order Now
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function ScienceSection() {
  return (
    <section className="py-20 lg:py-28 relative" id="science">
      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <Atom className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold tracking-widest text-primary uppercase" data-testid="text-science-label">
                Molecular Science
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 leading-tight" data-testid="text-science-title">
              Precision-synthesized peptide compounds
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
              <p>
                Peptides are short chains of amino acids — the fundamental building blocks of proteins. In research settings, synthetic peptides allow scientists to study cellular signaling, receptor binding, and metabolic pathways with unprecedented precision.
              </p>
              <p>
                Each compound in our catalog is synthesized using solid-phase peptide synthesis (SPPS), purified via reverse-phase HPLC, and verified by mass spectrometry. The result is a lyophilized powder with documented purity of 98-99%+.
              </p>
            </div>
            <div className="mt-6">
              <Link href="/products">
                <Button variant="outline" className="gap-2" data-testid="button-explore-catalog">
                  Explore full catalog
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-1" data-testid="section-amino-chain">
            <div className="rounded-md p-7 border" style={{ background: "linear-gradient(145deg, hsl(215, 35%, 8%), hsl(200, 30%, 10%))", borderColor: "hsla(186, 40%, 30%, 0.25)" }}>
              <p className="text-[10px] uppercase tracking-widest mb-4 font-medium" style={{ color: "hsl(186, 40%, 50%)" }} data-testid="text-sequence-label">Amino Acid Sequence — BPC-157</p>
              <p className="font-mono text-sm leading-loose tracking-wider break-all" style={{ color: "hsl(186, 55%, 60%)" }} data-testid="text-sequence-value">
                Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val
              </p>
              <div className="flex flex-wrap gap-6 mt-5 pt-4 text-xs" style={{ borderTop: "1px solid hsla(186, 30%, 25%, 0.3)", color: "hsl(210, 15%, 58%)" }}>
                <div data-testid="text-formula-value">
                  <span className="block font-medium" style={{ color: "hsl(210, 15%, 68%)" }}>Formula</span>
                  C<sub>62</sub>H<sub>98</sub>N<sub>16</sub>O<sub>22</sub>
                </div>
                <div data-testid="text-mw-value">
                  <span className="block font-medium" style={{ color: "hsl(210, 15%, 68%)" }}>MW</span>
                  1419.56 g/mol
                </div>
                <div data-testid="text-purity-value">
                  <span className="block font-medium" style={{ color: "hsl(155, 45%, 55%)" }}>Purity</span>
                  <span style={{ color: "hsl(155, 50%, 55%)" }}>≥99.0%</span>
                </div>
                <div data-testid="text-cas-value">
                  <span className="block font-medium" style={{ color: "hsl(210, 15%, 55%)" }}>CAS</span>
                  137525-51-0
                </div>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground pl-1">
              Example compound data. Every product ships with a certificate of analysis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const stats = [
    {
      number: "24h",
      label: "Processing",
      desc: "Orders confirmed and dispatched within one business day.",
      accent: "hsl(186, 60%, 42%)",
    },
    {
      number: "98-99%+",
      label: "Purity",
      desc: "HPLC verified with certificate of analysis included.",
      accent: "hsl(155, 50%, 42%)",
    },
    {
      number: "20+",
      label: "Peptides",
      desc: "GLP-1, growth factors, healing, and cosmetic peptides.",
      accent: "hsl(35, 65%, 50%)",
    },
    {
      number: "EU-Wide",
      label: "Shipping",
      desc: "Temperature-controlled delivery with full tracking.",
      accent: "hsl(262, 45%, 52%)",
    },
  ];

  return (
    <section className="relative" id="why-choose-us" style={{ background: "linear-gradient(180deg, hsl(215, 35%, 8%) 0%, hsl(200, 30%, 10%) 50%, hsl(215, 35%, 8%) 100%)" }}>
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: "hsla(186, 30%, 25%, 0.2)" }}>
          {stats.map((stat, i) => (
            <div key={i} className="py-6 md:py-0 md:px-8 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0" data-testid={`card-why-${i}`}>
              <p className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-1" data-testid={`text-why-number-${i}`}>{stat.number}</p>
              <p className="text-sm font-semibold mb-2" style={{ color: stat.accent }} data-testid={`text-why-stat-label-${i}`}>{stat.label}</p>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 15%, 58%)" }}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      icon: FlaskConical,
      title: "Solid-phase synthesis",
      desc: "Peptides assembled residue-by-residue using Fmoc chemistry on a resin support.",
      accent: "hsl(186, 60%, 42%)",
    },
    {
      icon: Microscope,
      title: "HPLC purification",
      desc: "Reverse-phase chromatography separates the target peptide from impurities.",
      accent: "hsl(165, 50%, 42%)",
    },
    {
      icon: FileText,
      title: "Mass spec verification",
      desc: "ESI-MS or MALDI-TOF confirms molecular weight matches expected sequence.",
      accent: "hsl(35, 65%, 50%)",
    },
    {
      icon: Thermometer,
      title: "Lyophilization",
      desc: "Freeze-drying produces stable powder for long-term storage at -20°C.",
      accent: "hsl(155, 45%, 42%)",
    },
    {
      icon: ShieldCheck,
      title: "Quality release",
      desc: "Only batches meeting ≥98% purity are released with full COA documentation.",
      accent: "hsl(186, 55%, 45%)",
    },
    {
      icon: Truck,
      title: "Cold-chain shipping",
      desc: "Temperature-controlled packaging ships within 24h across the EU.",
      accent: "hsl(35, 55%, 48%)",
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative" id="process">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-primary" data-testid="text-process-label">
            From synthesis to delivery
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight" data-testid="text-process-title">
            6-step quality pipeline
          </h2>
          <p className="text-muted-foreground">
            Every peptide goes through a rigorous production and quality control process before reaching your laboratory.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-md overflow-visible bg-border/40">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-background p-6 relative"
              data-testid={`card-process-${i}`}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <span className="text-xs font-bold" style={{ color: step.accent }} data-testid={`text-process-num-${i}`}>
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <step.icon className="h-4 w-4" style={{ color: step.accent }} strokeWidth={1.5} />
                    <h3 className="font-semibold text-sm" data-testid={`text-process-step-${i}`}>{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecsTable() {
  return (
    <section className="py-20 lg:py-28 relative" id="specifications">
      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3" data-testid="text-specs-label">
              Specifications
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 leading-tight" data-testid="text-specs-title">
              Product quality at a glance
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto" data-testid="text-specs-desc">
              Every peptide in our catalog meets strict quality benchmarks.
            </p>
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
                    { param: "Available Quantities", value: "5 mg, 10 mg, 20 mg vials" },
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

function CategoriesSection() {
  const categories = [
    {
      name: "GLP-1 Agonists",
      desc: "Semaglutide, Tirzepatide, Retatrutide, MOTS-c — metabolic regulation peptides for glucose and weight research.",
      count: 4,
      color: "hsl(186, 60%, 42%)",
    },
    {
      name: "Growth Factors",
      desc: "CJC-1295, Ipamorelin, MK-677, IGF-1 LR3, Tesamorelin, Sermorelin, Hexarelin — growth hormone secretagogues.",
      count: 7,
      color: "hsl(155, 50%, 40%)",
    },
    {
      name: "Healing & Repair",
      desc: "BPC-157, TB-500, KPV, Thymosin Alpha-1 — tissue regeneration and anti-inflammatory peptides.",
      count: 4,
      color: "hsl(35, 65%, 50%)",
    },
    {
      name: "Cosmetic & Nootropics",
      desc: "GHK-Cu, Melanotan II, PT-141, NAD+, Epithalon — skin remodeling, cognition, and longevity compounds.",
      count: 5,
      color: "hsl(262, 45%, 52%)",
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative" id="catalog">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3" data-testid="text-catalog-label">
              Research Catalog
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight" data-testid="text-catalog-title">
              20+ peptides across 4 categories
            </h2>
            <p className="text-muted-foreground mb-6">
              Covering the most actively researched peptide families in metabolic science, regenerative medicine, and molecular biology.
            </p>
            <Link href="/products">
              <Button className="gap-2" data-testid="button-browse-all">
                Browse all peptides
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="lg:col-span-3 space-y-3">
            {categories.map((cat, i) => (
              <Link href="/products" key={i}>
                <Card className="group hover-elevate" data-testid={`card-category-${i}`}>
                  <div className="p-5 flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="shrink-0 mt-1 w-1 h-8 rounded-full" style={{ backgroundColor: cat.color }} />
                      <div>
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors" data-testid={`text-category-name-${i}`}>{cat.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-category-desc-${i}`}>{cat.desc}</p>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground" data-testid={`text-category-count-${i}`}>{cat.count} peptides</span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
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
    <section className="py-20 lg:py-28 relative" id="testimonials" style={{ background: "linear-gradient(180deg, hsl(215, 35%, 8%) 0%, hsl(200, 30%, 10%) 50%, hsl(215, 35%, 8%) 100%)" }}>
      <div className="container relative mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "hsl(35, 65%, 55%)" }} data-testid="text-testimonials-label">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 leading-tight text-white" data-testid="text-testimonials-title">
            What researchers say
          </h2>
          <p style={{ color: "hsl(210, 15%, 58%)" }}>
            Feedback from laboratories and research institutions across Europe.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <div key={i} className="rounded-md p-6 flex flex-col" style={{ background: "hsla(210, 25%, 12%, 0.6)", border: "1px solid hsla(186, 30%, 25%, 0.15)" }} data-testid={`card-testimonial-${i}`}>
              <Quote className="h-5 w-5 mb-4 shrink-0" style={{ color: "hsla(186, 50%, 50%, 0.3)" }} />
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "hsl(210, 15%, 65%)" }} data-testid={`text-testimonial-quote-${i}`}>
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="pt-4" style={{ borderTop: "1px solid hsla(186, 30%, 25%, 0.2)" }}>
                <p className="font-semibold text-sm text-white" data-testid={`text-testimonial-name-${i}`}>{review.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "hsl(210, 15%, 50%)" }} data-testid={`text-testimonial-role-${i}`}>{review.role}</p>
                <p className="text-xs mt-0.5" style={{ color: "hsl(186, 40%, 50%)" }} data-testid={`text-testimonial-institution-${i}`}>{review.institution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourcesBar() {
  const links = [
    { label: "Reconstitution Calculator", href: "/calculator", desc: "Dosing, draw volumes, vial duration", icon: Calculator, color: "hsl(186, 55%, 42%)" },
    { label: "Research Insights", href: "/insights", desc: "Articles on peptide science", icon: BookOpen, color: "hsl(35, 60%, 50%)" },
    { label: "FAQ", href: "/faq", desc: "Ordering, shipping, storage", icon: HelpCircle, color: "hsl(155, 45%, 42%)" },
  ];

  return (
    <section className="border-y border-border/40">
      <div className="container mx-auto px-4">
        <div className="py-8 grid sm:grid-cols-3 gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} data-testid={`link-resource-${link.href.slice(1)}`}>
              <div className="group flex items-center gap-4 p-4 rounded-md hover-elevate">
                <div className="shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-muted">
                  <link.icon className="h-5 w-5" style={{ color: link.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{link.label}</p>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
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
      toast({
        title: "Welcome!",
        description: "Your 10% discount code is ready.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
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
    <section className="py-16 lg:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="container relative mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-muted mb-4">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2" data-testid="text-newsletter-title">
            10% off your first order
          </h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our research newsletter and receive a unique discount code.
          </p>

          {submitted ? (
            <div className="space-y-4" data-testid="text-newsletter-success">
              <div className="flex items-center justify-center gap-2 font-medium" style={{ color: "hsl(155, 50%, 45%)" }}>
                <CheckCircle2 className="h-4 w-4" />
                <span>Your discount code is ready</span>
              </div>
              {discountCode && (
                <div className="inline-flex items-center gap-3 rounded-md px-5 py-3" style={{ background: "linear-gradient(145deg, hsl(215, 35%, 8%), hsl(200, 30%, 10%))", border: "1px solid hsla(186, 40%, 30%, 0.25)" }}>
                  <code className="font-mono text-sm tracking-wider" style={{ color: "hsl(186, 55%, 60%)" }} data-testid="text-discount-code">{discountCode}</code>
                  <button
                    onClick={handleCopy}
                    className="transition-colors"
                    style={{ color: "hsl(210, 15%, 60%)" }}
                    data-testid="button-copy-code"
                    aria-label="Copy discount code"
                  >
                    {copied ? <CheckCircle2 className="h-4 w-4" style={{ color: "hsl(155, 50%, 50%)" }} /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Apply this code at checkout for 10% off. One-time use.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder="researcher@university.eu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                data-testid="input-newsletter-email"
              />
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
      <SectionNav />
      <ScienceSection />
      <WhyChooseUs />
      <ProcessSection />
      <SpecsTable />
      <CategoriesSection />
      <Testimonials />
      <ResourcesBar />
      <NewsletterSection />
      <DisclaimerBanner />
    </div>
  );
}
