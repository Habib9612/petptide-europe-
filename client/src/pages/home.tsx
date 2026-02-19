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
  Zap,
  Award,
  Globe,
  Beaker,
  Tag,
} from "lucide-react";

function SectionNav() {
  const navItems = [
    { label: "Overview", href: "#science" },
    { label: "Why Us", href: "#why-choose-us" },
    { label: "Quality", href: "#process" },
    { label: "Specs", href: "#specifications" },
    { label: "Catalog", href: "#catalog" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Tools", href: "#tools" },
  ];

  return (
    <nav className="sticky top-14 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md" data-testid="nav-section">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-0 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 px-3.5 py-3 text-xs font-medium text-muted-foreground transition-colors"
              data-testid={`link-section-${item.href.slice(1)}`}
            >
              {item.label}
            </a>
          ))}
          <div className="flex-1" />
          <Link href="/products">
            <Button size="sm" className="shrink-0 gap-1.5 my-1.5" data-testid="button-nav-order">
              Quote / Order
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
    <section className="py-16 lg:py-24 relative" id="science">
      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 leading-tight" data-testid="text-science-title">
              Precision-synthesized peptide compounds for your research
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Peptides are short chains of amino acids — the fundamental building blocks of proteins. In research settings, synthetic peptides allow scientists to study cellular signaling, receptor binding, and metabolic pathways with unprecedented precision.
              </p>
              <p>
                Each compound in our catalog is synthesized using solid-phase peptide synthesis (SPPS), purified via reverse-phase HPLC, and verified by mass spectrometry. The result is a lyophilized powder with documented purity of 98-99%+.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <Link href="/products">
                <Button className="gap-2" data-testid="button-explore-catalog">
                  Quote / Order
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

          <div className="space-y-1" data-testid="section-amino-chain">
            <div className="rounded-md p-6 border" style={{ background: "linear-gradient(145deg, hsl(215, 35%, 8%), hsl(200, 30%, 10%))", borderColor: "hsla(186, 40%, 30%, 0.25)" }}>
              <p className="text-[10px] uppercase tracking-widest mb-3 font-medium" style={{ color: "hsl(186, 40%, 50%)" }} data-testid="text-sequence-label">Amino Acid Sequence — BPC-157</p>
              <p className="font-mono text-sm leading-loose tracking-wider break-all" style={{ color: "hsl(186, 55%, 60%)" }} data-testid="text-sequence-value">
                Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val
              </p>
              <div className="flex flex-wrap gap-5 mt-4 pt-3 text-xs" style={{ borderTop: "1px solid hsla(186, 30%, 25%, 0.3)", color: "hsl(210, 15%, 58%)" }}>
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
  const features = [
    {
      icon: Zap,
      title: "Industry-Leading Speed",
      stat: "24h",
      desc: "Orders confirmed and dispatched within one business day across the European Union.",
      accent: "hsl(186, 60%, 45%)",
    },
    {
      icon: Award,
      title: "Guaranteed Purity",
      stat: "98-99%+",
      desc: "Every batch verified by HPLC and mass spectrometry. Certificate of analysis included with each order.",
      accent: "hsl(155, 50%, 45%)",
    },
    {
      icon: Beaker,
      title: "Comprehensive Catalog",
      stat: "20+",
      desc: "GLP-1 agonists, growth factors, healing peptides, and cosmetic compounds. From 5mg to 50mg quantities.",
      accent: "hsl(35, 65%, 50%)",
    },
    {
      icon: Globe,
      title: "EU-Wide Cold-Chain",
      stat: "27 Countries",
      desc: "Temperature-controlled delivery with full tracking and insurance to all EU member states.",
      accent: "hsl(262, 45%, 55%)",
    },
  ];

  return (
    <section className="relative" id="why-choose-us" style={{ background: "linear-gradient(180deg, hsl(215, 35%, 7%) 0%, hsl(200, 30%, 9%) 50%, hsl(215, 35%, 7%) 100%)" }}>
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3" data-testid="text-why-title">
            Why Peptide Europe
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "hsl(210, 15%, 55%)" }}>
            From synthesis to delivery, we maintain pharmaceutical-grade standards at every step.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <div key={i} className="text-center" data-testid={`card-why-${i}`}>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md mb-4" style={{ backgroundColor: `${feat.accent}15`, border: `1px solid ${feat.accent}20` }}>
                <feat.icon className="h-5 w-5" style={{ color: feat.accent }} strokeWidth={1.5} />
              </div>
              <p className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-1" data-testid={`text-why-number-${i}`}>{feat.stat}</p>
              <p className="text-sm font-semibold mb-2" style={{ color: feat.accent }} data-testid={`text-why-stat-label-${i}`}>{feat.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: "hsl(210, 15%, 55%)" }}>{feat.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/products">
            <Button className="gap-2" data-testid="button-why-order">
              Quote / Order
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Link href="/faq">
            <Button variant="outline" className="gap-2" style={{ borderColor: "hsla(0, 0%, 100%, 0.1)", backgroundColor: "hsla(0, 0%, 100%, 0.03)", color: "hsl(210, 15%, 70%)" }} data-testid="button-why-faq">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { icon: FlaskConical, title: "Solid-phase synthesis", desc: "Peptides assembled residue-by-residue using Fmoc chemistry on a resin support.", accent: "hsl(186, 60%, 42%)" },
    { icon: Microscope, title: "HPLC purification", desc: "Reverse-phase chromatography separates the target peptide from impurities.", accent: "hsl(165, 50%, 42%)" },
    { icon: FileText, title: "Mass spec verification", desc: "ESI-MS or MALDI-TOF confirms molecular weight matches expected sequence.", accent: "hsl(35, 65%, 50%)" },
    { icon: Thermometer, title: "Lyophilization", desc: "Freeze-drying produces stable powder for long-term storage at -20°C.", accent: "hsl(155, 45%, 42%)" },
    { icon: ShieldCheck, title: "Quality release", desc: "Only batches meeting ≥98% purity are released with full COA documentation.", accent: "hsl(186, 55%, 45%)" },
    { icon: Truck, title: "Cold-chain dispatch", desc: "Temperature-controlled packaging ships within 24h across the EU.", accent: "hsl(35, 55%, 48%)" },
  ];

  return (
    <section className="py-16 lg:py-24 relative" id="process">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2 text-primary" data-testid="text-process-label">
            Quality Pipeline
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 leading-tight" data-testid="text-process-title">
            From synthesis to your lab in 6 steps
          </h2>
          <p className="text-muted-foreground">
            Every peptide goes through a rigorous production and quality control process.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-md overflow-visible bg-border/50">
          {steps.map((step, i) => (
            <div key={i} className="bg-background p-5 relative" data-testid={`card-process-${i}`}>
              <div className="flex items-start gap-3">
                <span className="text-[10px] font-bold mt-0.5 shrink-0 w-5 text-right" style={{ color: step.accent }} data-testid={`text-process-num-${i}`}>
                  0{i + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <step.icon className="h-3.5 w-3.5" style={{ color: step.accent }} strokeWidth={1.5} />
                    <h3 className="font-semibold text-sm" data-testid={`text-process-step-${i}`}>{step.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
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
    <section className="py-16 lg:py-24 relative" id="specifications">
      <div className="absolute inset-0 bg-muted/20" />
      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2" data-testid="text-specs-label">
              Specifications
            </p>
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
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(186, 50%, 32%) 0%, hsl(186, 60%, 38%) 40%, hsl(190, 45%, 34%) 100%)" }}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)", backgroundSize: "60px 60px, 40px 40px" }} />
      <div className="container relative mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-2" data-testid="text-cta-title">
              Ready to order? Ships within <span style={{ color: "hsl(35, 80%, 65%)" }}>24 hours</span>
            </h2>
            <p className="text-sm" style={{ color: "hsla(0, 0%, 100%, 0.7)" }}>
              Free shipping on orders over &euro;120. Pay with crypto and save 10%.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/products">
              <Button size="lg" className="gap-2 text-base" style={{ backgroundColor: "white", color: "hsl(186, 60%, 28%)", borderColor: "white" }} data-testid="button-cta-order">
                Order Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedPeptides() {
  const featured = [
    { id: "tirzepatide-10mg", name: "Tirzepatide", dose: "10mg", price: "24.00", category: "GLP-1", color: "hsl(186, 60%, 42%)", purity: "≥99.5%" },
    { id: "semaglutide-5mg", name: "Semaglutide", dose: "5mg", price: "14.00", category: "GLP-1", color: "hsl(186, 60%, 42%)", purity: "≥99.5%" },
    { id: "bpc157-5mg", name: "BPC-157", dose: "5mg", price: "10.00", category: "Healing", color: "hsl(35, 65%, 50%)", purity: "≥99.0%" },
    { id: "cjc1295-nodac-5mg", name: "CJC-1295", dose: "5mg (No DAC)", price: "11.00", category: "Growth", color: "hsl(155, 50%, 40%)", purity: "≥99.0%" },
    { id: "ghkcu-50mg", name: "GHK-Cu", dose: "50mg", price: "16.00", category: "Cosmetic", color: "hsl(262, 45%, 52%)", purity: "≥98.5%" },
    { id: "retatrutide-10mg", name: "Retatrutide", dose: "10mg", price: "31.00", category: "GLP-1", color: "hsl(186, 60%, 42%)", purity: "≥99.0%" },
  ];

  return (
    <section className="py-16 lg:py-24 relative" id="catalog">
      <div className="container relative mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2" data-testid="text-catalog-label">
              Popular Peptides
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight" data-testid="text-catalog-title">
              Most requested compounds
            </h2>
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
              <Card className="hover-elevate h-full" data-testid={`card-featured-${i}`}>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <FlaskConical className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-semibold text-sm" data-testid={`text-featured-name-${i}`}>{peptide.name}</h3>
                        <p className="text-xs text-muted-foreground">{peptide.dose}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: `${peptide.color}12`, color: peptide.color, border: `1px solid ${peptide.color}20` }} data-testid={`badge-category-${i}`}>
                      {peptide.category}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-3 mt-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-bold tracking-tight" data-testid={`text-featured-price-${i}`}>&euro;{peptide.price}</span>
                    </div>
                    <span className="text-xs text-muted-foreground" data-testid={`text-featured-purity-${i}`}>{peptide.purity}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-bold mb-4" data-testid="text-categories-title">Browse by category</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: "GLP-1 Agonists", count: 4, color: "hsl(186, 60%, 42%)", desc: "Metabolic regulation" },
              { name: "Growth Factors", count: 7, color: "hsl(155, 50%, 40%)", desc: "GH secretagogues" },
              { name: "Healing & Repair", count: 4, color: "hsl(35, 65%, 50%)", desc: "Tissue regeneration" },
              { name: "Cosmetic & Other", count: 5, color: "hsl(262, 45%, 52%)", desc: "Skin, cognition, longevity" },
            ].map((cat, i) => (
              <Link href="/products" key={i}>
                <Card className="hover-elevate" data-testid={`card-category-${i}`}>
                  <div className="p-4 flex items-center gap-3">
                    <div className="shrink-0 w-1 h-8 rounded-full" style={{ backgroundColor: cat.color }} />
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
    <section className="py-16 lg:py-24 relative" id="testimonials" style={{ background: "linear-gradient(180deg, hsl(215, 35%, 7%) 0%, hsl(200, 30%, 9%) 50%, hsl(215, 35%, 7%) 100%)" }}>
      <div className="container relative mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2" data-testid="text-testimonials-title">
            Trusted by researchers across Europe
          </h2>
          <p className="text-sm" style={{ color: "hsl(210, 15%, 55%)" }}>
            Feedback from laboratories and research institutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <div key={i} className="rounded-md p-5 flex flex-col" style={{ background: "hsla(210, 25%, 12%, 0.5)", border: "1px solid hsla(186, 30%, 25%, 0.12)" }} data-testid={`card-testimonial-${i}`}>
              <Quote className="h-4 w-4 mb-3 shrink-0" style={{ color: "hsla(186, 50%, 50%, 0.25)" }} />
              <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "hsl(210, 15%, 65%)" }} data-testid={`text-testimonial-quote-${i}`}>
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="pt-3" style={{ borderTop: "1px solid hsla(186, 30%, 25%, 0.15)" }}>
                <p className="font-semibold text-sm text-white" data-testid={`text-testimonial-name-${i}`}>{review.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "hsl(210, 15%, 48%)" }} data-testid={`text-testimonial-role-${i}`}>{review.role}</p>
                <p className="text-xs mt-0.5" style={{ color: "hsl(186, 40%, 48%)" }} data-testid={`text-testimonial-institution-${i}`}>{review.institution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolsAndResources() {
  return (
    <section className="py-16 lg:py-24" id="tools">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2" data-testid="text-tools-label">
            Tools & Resources
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-tools-title">
            Everything you need for your research
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { label: "Peptide Calculator", href: "/calculator", desc: "Reconstitution dosing, draw volumes, and vial duration calculator", icon: Calculator, color: "hsl(186, 55%, 42%)" },
            { label: "Research Insights", href: "/insights", desc: "Articles on peptide science, handling guides, and best practices", icon: BookOpen, color: "hsl(35, 60%, 50%)" },
            { label: "FAQ & Support", href: "/faq", desc: "Answers about ordering, shipping, storage, purity, and returns", icon: HelpCircle, color: "hsl(155, 45%, 42%)" },
          ].map((link) => (
            <Link key={link.href} href={link.href} data-testid={`link-resource-${link.href.slice(1)}`}>
              <Card className="hover-elevate h-full">
                <div className="p-5 text-center">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-muted mb-3">
                    <link.icon className="h-5 w-5" style={{ color: link.color }} />
                  </div>
                  <p className="font-semibold text-sm mb-1">{link.label}</p>
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
    <section className="py-14 lg:py-20 relative">
      <div className="absolute inset-0 bg-muted/20" />
      <div className="container relative mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-muted mb-3">
            <Tag className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2" data-testid="text-newsletter-title">
            Get 10% off your first order
          </h2>
          <p className="text-muted-foreground text-sm mb-5">
            Subscribe to receive a unique discount code and research updates.
          </p>

          {submitted ? (
            <div className="space-y-3" data-testid="text-newsletter-success">
              <div className="flex items-center justify-center gap-2 font-medium" style={{ color: "hsl(155, 50%, 45%)" }}>
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm">Your discount code is ready</span>
              </div>
              {discountCode && (
                <div className="inline-flex items-center gap-3 rounded-md px-5 py-3" style={{ background: "linear-gradient(145deg, hsl(215, 35%, 8%), hsl(200, 30%, 10%))", border: "1px solid hsla(186, 40%, 30%, 0.25)" }}>
                  <code className="font-mono text-sm tracking-wider" style={{ color: "hsl(186, 55%, 60%)" }} data-testid="text-discount-code">{discountCode}</code>
                  <button onClick={handleCopy} className="transition-colors" style={{ color: "hsl(210, 15%, 60%)" }} data-testid="button-copy-code" aria-label="Copy discount code">
                    {copied ? <CheckCircle2 className="h-4 w-4" style={{ color: "hsl(155, 50%, 50%)" }} /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
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
      <SectionNav />
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
