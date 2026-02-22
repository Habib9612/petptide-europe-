import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Hero, TrustBar } from "@/components/hero";
import { PeptideShowcase } from "@/components/peptide-showcase";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { useLanguage } from "@/components/language-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
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
  Tag,
  Syringe,
  Atom,
  Sparkles,
  Beaker,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

function ScienceSection() {
  const residues = ["Gly", "Glu", "Pro", "Pro", "Pro", "Gly", "Lys", "Pro", "Ala", "Asp", "Asp", "Ala", "Gly", "Leu", "Val"];

  return (
    <section className="relative py-20 lg:py-28 bg-muted/30 overflow-hidden" id="science">
      <div className="container relative mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Peptide Science</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5 leading-tight text-foreground" data-testid="text-science-title">
              Every batch synthesized, purified, and verified
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
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
          </motion.div>

          <motion.div variants={fadeInUp} data-testid="section-amino-chain">
            <div className="rounded-xl border border-border bg-background p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <p className="text-[10px] uppercase tracking-widest font-medium text-primary" data-testid="text-sequence-label">
                    BPC-157 Sequence
                  </p>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">15 residues</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-5" data-testid="text-sequence-value">
                {residues.map((res, i) => (
                  <span key={i} className="inline-flex items-center">
                    <span className="font-mono text-xs px-1.5 py-0.5 rounded-md bg-primary/6 text-primary border border-primary/10">
                      {res}
                    </span>
                    {i < residues.length - 1 && (
                      <span className="text-primary/20 mx-0.5 text-[10px]">&mdash;</span>
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
                  <span className="text-foreground font-mono text-[11px]">1419.56</span>
                </div>
                <div data-testid="text-purity-value">
                  <span className="block font-medium text-muted-foreground mb-0.5">Purity</span>
                  <span className="font-semibold text-foreground text-[11px]">&ge;99.0%</span>
                </div>
                <div data-testid="text-cas-value">
                  <span className="block font-medium text-muted-foreground mb-0.5">CAS</span>
                  <span className="text-foreground font-mono text-[11px]">137525-51-0</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const steps = [
    { num: "01", icon: Beaker, title: "Synthesis", desc: "Solid-phase peptide synthesis using Fmoc chemistry with automated coupling cycles" },
    { num: "02", icon: Atom, title: "Purification", desc: "Reverse-phase HPLC chromatographic separation to isolate target compound" },
    { num: "03", icon: Microscope, title: "Verification", desc: "ESI-MS / MALDI-TOF mass spectrometry analysis confirms molecular identity" },
    { num: "04", icon: Thermometer, title: "Lyophilization", desc: "Freeze-dried for long-term stability at -20°C storage conditions" },
    { num: "05", icon: ShieldCheck, title: "QC Release", desc: "Full Certificate of Analysis documentation with batch-specific data" },
    { num: "06", icon: Truck, title: "Cold-Chain", desc: "Temperature-controlled EU-wide dispatch with real-time tracking" },
  ];

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible, steps.length]);

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden" id="process">
      <div className="container relative mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          onViewportEnter={() => setIsVisible(true)}
          className="text-center mb-12"
        >
          <motion.p variants={fadeInUp} className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Quality Pipeline</motion.p>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-foreground" data-testid="text-process-title">
            From synthesis to your lab
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          ref={timelineRef}
          className="relative max-w-6xl mx-auto"
        >
          <div className="absolute top-[60px] left-0 right-0 h-[2px] hidden lg:block" aria-hidden="true">
            <div className="absolute inset-0 bg-border" />
            <div
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-600 ease-in-out"
              style={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {steps.map((step, i) => {
              const isActive = i === activeStep;
              const isPast = i <= activeStep;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative text-center cursor-pointer"
                  onClick={() => setActiveStep(i)}
                  style={{ opacity: isPast ? 1 : 0.5 }}
                  data-testid={`card-process-${i}`}
                >
                  <div className="relative z-10 mb-4 flex justify-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-muted border border-border"
                      }`}
                    >
                      <step.icon
                        className={`h-5 w-5 transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                  <span className={`text-xs font-bold tabular-nums block mb-1 transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                    data-testid={`text-process-num-${i}`}
                  >
                    {step.num}
                  </span>
                  <h3 className={`font-semibold text-xs mb-1 transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                    data-testid={`text-process-step-${i}`}
                  >{step.title}</h3>
                  <p className={`text-[10px] leading-relaxed text-muted-foreground transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-60"}`}>{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SpecsTable() {
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
    <section className="py-20 lg:py-28 bg-muted/30 relative" id="specifications">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-8"
          >
            <motion.p variants={fadeInUp} className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Specifications</motion.p>
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-foreground" data-testid="text-specs-title">
              Product quality standards
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="rounded-xl border border-border bg-card overflow-hidden"
            data-testid="table-specs"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-semibold p-4 text-foreground text-xs uppercase tracking-wider bg-muted/50" data-testid="th-parameter">Parameter</th>
                    <th className="text-left font-semibold p-4 text-foreground text-xs uppercase tracking-wider bg-muted/50" data-testid="th-standard">Standard</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((row, i) => (
                    <motion.tr
                      key={i}
                      variants={fadeInUp}
                      className="border-b border-border/50"
                    >
                      <td className="p-4 font-medium text-foreground" data-testid={`text-spec-param-${i}`}>{row.param}</td>
                      <td className="p-4 text-muted-foreground" data-testid={`text-spec-value-${i}`}>{row.value}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MidPageCTA() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground" data-testid="section-midcta">
      <div className="container relative mx-auto px-4 py-14 lg:py-20 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3 text-primary-foreground" data-testid="text-cta-title">
            Ready to order? Ships within 24 hours
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm text-primary-foreground/80 mb-5">
            Free shipping on orders over &euro;120. Pay with crypto and save 10%.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/products">
              <Button variant="secondary" size="lg" className="gap-2" data-testid="button-cta-order">
                Order Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const reasons = [
    { icon: Sparkles, value: "98-99%+", label: "Purity", desc: "HPLC verified, CoA included" },
    { icon: Truck, value: "24h", label: "Dispatch", desc: "Same-day shipping, cold-chain" },
    { icon: FlaskConical, value: "20+", label: "Peptides", desc: "Research-grade compounds" },
    { icon: ShieldCheck, value: "27", label: "Countries", desc: "EU-wide delivery network" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background relative" id="why-choose-us">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.p variants={fadeInUp} className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Why Peptide Europe</motion.p>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Built for serious research
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {reasons.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="rounded-xl border border-border bg-card p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-primary/8 border border-primary/15">
                <item.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{item.value}</p>
              <p className="text-sm font-semibold text-foreground mb-1">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
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
    <section className="py-20 lg:py-28 bg-muted/30 relative" id="testimonials">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-10"
        >
          <motion.p variants={fadeInUp} className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Testimonials</motion.p>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" data-testid="text-testimonials-title">
            Trusted by researchers across Europe
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto"
        >
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="rounded-xl border border-border bg-card overflow-visible hover:shadow-md transition-all duration-300"
              data-testid={`card-testimonial-${i}`}
            >
              <div className="p-5 flex flex-col h-full">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className="h-3.5 w-3.5 fill-current text-amber-400/80" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-4 text-muted-foreground" data-testid={`text-testimonial-quote-${i}`}>
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="pt-3 border-t border-border/50">
                  <p className="font-semibold text-sm text-foreground" data-testid={`text-testimonial-name-${i}`}>{review.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5" data-testid={`text-testimonial-role-${i}`}>{review.role}</p>
                  <p className="text-xs text-muted-foreground mt-0.5" data-testid={`text-testimonial-institution-${i}`}>{review.institution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ToolsAndResources() {
  const resources = [
    { label: "Dosage Guide", href: "/peptide-guide", desc: "Comprehensive dosing, reconstitution, and cycle reference for 50+ peptides", icon: Syringe },
    { label: "Peptide Calculator", href: "/calculator", desc: "Reconstitution dosing and vial duration calculator", icon: Calculator },
    { label: "Research Insights", href: "/insights", desc: "Articles on peptide science and best practices", icon: BookOpen },
    { label: "FAQ & Support", href: "/faq", desc: "Ordering, shipping, storage, and returns", icon: HelpCircle },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background relative" id="tools">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-10"
        >
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" data-testid="text-tools-title">
            Resources for your research
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto"
        >
          {resources.map((link, i) => (
            <motion.div key={link.href} variants={fadeInUp}>
              <Link href={link.href} data-testid={`link-resource-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="rounded-xl border border-border bg-card p-5 h-full hover:border-primary/25 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-primary/8 border border-primary/12">
                    <link.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="font-semibold text-sm mb-1 text-foreground">{link.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{link.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
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
    <section className="relative py-20 lg:py-28 bg-muted/30 overflow-hidden">
      <div className="container relative mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 bg-primary/8 border border-primary/15">
            <Tag className="h-4 w-4 text-primary" />
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-foreground" data-testid="text-newsletter-title">
            Get 10% off your first order
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-sm mb-6">
            Subscribe to receive a unique discount code and research updates.
          </motion.p>

          <motion.div variants={fadeInUp}>
            {submitted ? (
              <div className="space-y-4" data-testid="text-newsletter-success">
                <div className="flex items-center justify-center gap-2 font-medium text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Your discount code is ready</span>
                </div>
                {discountCode && (
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-border bg-card">
                    <code className="font-mono text-sm tracking-wider text-foreground font-semibold" data-testid="text-discount-code">{discountCode}</code>
                    <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-copy-code" aria-label="Copy discount code">
                      {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">Apply at checkout. One-time use.</p>
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
                <Button type="submit" disabled={isSubmitting} className="shrink-0" data-testid="button-newsletter-submit">
                  {isSubmitting ? "..." : "Subscribe"}
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="bg-background">
      <Hero />
      <TrustBar />
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
