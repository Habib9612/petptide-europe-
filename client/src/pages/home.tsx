import { useState } from "react";
import { Hero, TrustBar } from "@/components/hero";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { useLanguage } from "@/components/language-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
} from "lucide-react";

function FeaturedPeptides() {
  const featured = [
    { id: "tirzepatide-10mg", name: "Tirzepatide", dose: "10mg", price: "24.00", compPrice: "28.00", category: "GLP-1", purity: "≥99.5%" },
    { id: "semaglutide-5mg", name: "Semaglutide", dose: "5mg", price: "14.00", compPrice: "18.00", category: "GLP-1", purity: "≥99.5%" },
    { id: "bpc157-5mg", name: "BPC-157", dose: "5mg", price: "10.00", compPrice: "14.00", category: "Healing", purity: "≥99.0%" },
    { id: "cjc1295-nodac-5mg", name: "CJC-1295", dose: "5mg (No DAC)", price: "11.00", compPrice: "15.00", category: "Growth", purity: "≥99.0%" },
    { id: "ghkcu-50mg", name: "GHK-Cu", dose: "50mg", price: "16.00", compPrice: "20.00", category: "Cosmetic", purity: "≥98.5%" },
    { id: "retatrutide-10mg", name: "Retatrutide", dose: "10mg", price: "31.00", compPrice: "35.00", category: "GLP-1", purity: "≥99.0%" },
  ];

  return (
    <section className="py-16 lg:py-24" id="catalog">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-primary mb-2">Popular Products</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight" data-testid="text-catalog-title">
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
            <Link href={`/products/${peptide.id}`} key={peptide.id} data-testid={`link-product-${peptide.id}`}>
              <Card className="hover-elevate h-full overflow-visible" data-testid={`card-featured-${i}`}>
                <div className="p-5">
                  <div className="mb-3 h-48 rounded-md bg-muted/40 flex items-center justify-center overflow-hidden">
                    {getProductImage(peptide.id, "") ? (
                      <img
                        src={getProductImage(peptide.id, "")}
                        alt={peptide.name}
                        className="h-full w-full object-cover"
                        data-testid={`img-featured-${i}`}
                      />
                    ) : (
                      <FlaskConical className="h-8 w-8 text-muted-foreground/40" />
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-semibold text-sm" data-testid={`text-featured-name-${i}`}>{peptide.name}</h3>
                      <p className="text-xs text-muted-foreground">{peptide.dose}</p>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground uppercase tracking-wider shrink-0" data-testid={`badge-category-${i}`}>
                      {peptide.category}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-4 pt-3 border-t border-border">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold tracking-tight text-primary" data-testid={`text-featured-price-${i}`}>&euro;{peptide.price}</span>
                      <span className="text-xs text-muted-foreground line-through">&euro;{peptide.compPrice}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Check className="h-3 w-3 text-primary" />
                      <span data-testid={`text-featured-purity-${i}`}>{peptide.purity}</span>
                    </div>
                  </div>
                </div>
              </Card>
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
    </section>
  );
}

function ScienceSection() {
  const residues = ["Gly", "Glu", "Pro", "Pro", "Pro", "Gly", "Lys", "Pro", "Ala", "Asp", "Asp", "Ala", "Gly", "Leu", "Val"];

  return (
    <section className="relative py-16 lg:py-24 bg-[hsl(215,35%,7%)] overflow-hidden" id="science">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[hsl(186,65%,48%,0.03)]" />
      </div>
      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[hsl(186,65%,55%)] mb-3">Peptide Science</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5 leading-tight text-white" data-testid="text-science-title">
              Every batch synthesized, purified, and verified
            </h2>
            <div className="space-y-3 text-[hsl(210,15%,60%)] leading-relaxed text-sm">
              <p>
                Our peptides are built amino acid by amino acid using solid-phase peptide synthesis (SPPS), then purified via reverse-phase HPLC and confirmed by mass spectrometry.
              </p>
              <p>
                The result: lyophilized powder with 98-99%+ documented purity, shipped with a full Certificate of Analysis.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <Link href="/products">
                <Button className="gap-2" data-testid="button-explore-catalog">
                  Browse Products
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href="/calculator">
                <Button variant="outline" className="gap-2" data-testid="button-science-calc">
                  Calculator
                </Button>
              </Link>
            </div>
          </div>

          <div data-testid="section-amino-chain">
            <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[hsl(186,65%,48%)] animate-pulse" />
                  <p className="text-[10px] uppercase tracking-widest font-medium text-[hsl(186,65%,55%)]" data-testid="text-sequence-label">
                    BPC-157 Sequence
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[hsl(210,15%,45%)]">15 residues</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-5" data-testid="text-sequence-value">
                {residues.map((res, i) => (
                  <span key={i} className="inline-flex items-center">
                    <span className="font-mono text-xs px-1.5 py-0.5 rounded-md bg-[hsl(186,65%,48%,0.08)] text-[hsl(186,65%,70%)] border border-[hsl(186,65%,48%,0.12)]">
                      {res}
                    </span>
                    {i < residues.length - 1 && (
                      <span className="text-[hsl(186,65%,48%,0.25)] mx-0.5 text-[10px]">&mdash;</span>
                    )}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.06] text-xs">
                <div data-testid="text-formula-value">
                  <span className="block font-medium text-[hsl(210,15%,45%)] mb-0.5">Formula</span>
                  <span className="text-white font-mono text-[11px]">C<sub>62</sub>H<sub>98</sub>N<sub>16</sub>O<sub>22</sub></span>
                </div>
                <div data-testid="text-mw-value">
                  <span className="block font-medium text-[hsl(210,15%,45%)] mb-0.5">Mol. Weight</span>
                  <span className="text-white font-mono text-[11px]">1419.56</span>
                </div>
                <div data-testid="text-purity-value">
                  <span className="block font-medium text-[hsl(210,15%,45%)] mb-0.5">Purity</span>
                  <span className="font-semibold text-[hsl(186,65%,55%)] text-[11px]">&ge;99.0%</span>
                </div>
                <div data-testid="text-cas-value">
                  <span className="block font-medium text-[hsl(210,15%,45%)] mb-0.5">CAS</span>
                  <span className="text-white font-mono text-[11px]">137525-51-0</span>
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
  const steps = [
    { num: "01", icon: FlaskConical, title: "Synthesis", desc: "Solid-phase peptide synthesis using Fmoc chemistry" },
    { num: "02", icon: Microscope, title: "Purification", desc: "Reverse-phase HPLC chromatographic separation" },
    { num: "03", icon: FileText, title: "Verification", desc: "ESI-MS / MALDI-TOF mass spectrometry analysis" },
    { num: "04", icon: Thermometer, title: "Lyophilization", desc: "Freeze-dried for long-term stability at -20\u00B0C" },
    { num: "05", icon: ShieldCheck, title: "QC Release", desc: "Full Certificate of Analysis documentation" },
    { num: "06", icon: Truck, title: "Cold-Chain", desc: "Temperature-controlled EU-wide dispatch" },
  ];

  return (
    <section className="py-16 lg:py-24" id="process">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-primary mb-2">Quality Pipeline</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight" data-testid="text-process-title">
            From synthesis to your lab
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-px bg-border rounded-md overflow-hidden max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div className="bg-background p-4 text-center" key={i} data-testid={`card-process-${i}`}>
              <span className="text-xs font-bold text-primary/40 tabular-nums block mb-2" data-testid={`text-process-num-${i}`}>
                {step.num}
              </span>
              <step.icon className="h-5 w-5 text-primary mx-auto mb-2" strokeWidth={1.5} />
              <h3 className="font-semibold text-xs mb-1" data-testid={`text-process-step-${i}`}>{step.title}</h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecsTable() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30" id="specifications">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-primary mb-2">Specifications</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight" data-testid="text-specs-title">
              Product quality standards
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
                    { param: "Purity (HPLC)", value: "\u226598% \u2014 most products \u226599%" },
                    { param: "Synthesis", value: "Solid-Phase Peptide Synthesis (SPPS / Fmoc)" },
                    { param: "Verification", value: "ESI-MS / MALDI-TOF mass spectrometry" },
                    { param: "Form", value: "Lyophilized powder (freeze-dried)" },
                    { param: "Quantities", value: "5 mg, 10 mg, 20 mg, 50 mg vials" },
                    { param: "Documentation", value: "Certificate of Analysis (CoA) with every order" },
                    { param: "Storage", value: "-20\u00B0C recommended; stable 6-12 months" },
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
      <div className="container relative mx-auto px-4 py-12 lg:py-16 text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3 text-white" data-testid="text-cta-title">
          Ready to order? Ships within 24 hours
        </h2>
        <p className="text-sm text-white/70 mb-5">
          Free shipping on orders over &euro;120. Pay with crypto and save 10%.
        </p>
        <Link href="/products">
          <Button size="lg" variant="outline" className="gap-2" data-testid="button-cta-order">
            Order Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
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
    <section className="py-16 lg:py-24 bg-muted/30" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-primary mb-2">Testimonials</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-testimonials-title">
            Trusted by researchers across Europe
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <Card key={i} className="overflow-visible" data-testid={`card-testimonial-${i}`}>
              <div className="p-5 flex flex-col h-full">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className="h-3.5 w-3.5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-4 text-muted-foreground" data-testid={`text-testimonial-quote-${i}`}>
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="pt-3 border-t border-border">
                  <p className="font-semibold text-sm" data-testid={`text-testimonial-name-${i}`}>{review.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5" data-testid={`text-testimonial-role-${i}`}>{review.role}</p>
                  <p className="text-xs text-primary mt-0.5" data-testid={`text-testimonial-institution-${i}`}>{review.institution}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolsAndResources() {
  const resources = [
    { label: "Peptide Calculator", href: "/calculator", desc: "Reconstitution dosing and vial duration calculator", icon: Calculator },
    { label: "Research Insights", href: "/insights", desc: "Articles on peptide science and best practices", icon: BookOpen },
    { label: "FAQ & Support", href: "/faq", desc: "Ordering, shipping, storage, and returns", icon: HelpCircle },
  ];

  return (
    <section className="py-16 lg:py-24" id="tools">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" data-testid="text-tools-title">
            Resources for your research
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {resources.map((link) => (
            <Link key={link.href} href={link.href} data-testid={`link-resource-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <Card className="hover-elevate h-full overflow-visible">
                <div className="p-5">
                  <link.icon className="h-5 w-5 text-primary mb-3" strokeWidth={1.5} />
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
    <section className="relative py-16 lg:py-24 bg-[hsl(215,35%,7%)] overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[hsl(186,65%,48%,0.03)]" />
      </div>
      <div className="container relative mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <Tag className="h-5 w-5 text-[hsl(186,65%,55%)] mx-auto mb-3" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-white" data-testid="text-newsletter-title">
            Get 10% off your first order
          </h2>
          <p className="text-[hsl(210,15%,55%)] text-sm mb-6">
            Subscribe to receive a unique discount code and research updates.
          </p>

          {submitted ? (
            <div className="space-y-4" data-testid="text-newsletter-success">
              <div className="flex items-center justify-center gap-2 font-medium text-[hsl(186,65%,55%)]">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm">Your discount code is ready</span>
              </div>
              {discountCode && (
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-md border border-white/[0.06] bg-white/[0.02]">
                  <code className="font-mono text-sm tracking-wider text-[hsl(186,65%,55%)] font-semibold" data-testid="text-discount-code">{discountCode}</code>
                  <button onClick={handleCopy} className="text-[hsl(210,15%,50%)] transition-colors" data-testid="button-copy-code" aria-label="Copy discount code">
                    {copied ? <CheckCircle2 className="h-4 w-4 text-[hsl(186,65%,55%)]" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              )}
              <p className="text-xs text-[hsl(210,15%,45%)]">Apply at checkout. One-time use.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder="researcher@university.eu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/[0.06] border-white/[0.1] text-white placeholder:text-[hsl(210,15%,40%)]"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" disabled={isSubmitting} className="shrink-0" data-testid="button-newsletter-submit">
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
      <TrustBar />
      <FeaturedPeptides />
      <ScienceSection />
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
