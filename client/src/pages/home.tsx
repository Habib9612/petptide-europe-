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
  const { t } = useLanguage();
  const residues = ["Gly", "Glu", "Pro", "Pro", "Pro", "Gly", "Lys", "Pro", "Ala", "Asp", "Asp", "Ala", "Gly", "Leu", "Val"];

  return (
    <section className="relative py-24 lg:py-32 bg-[#1a2e2a] overflow-hidden" id="science">
      <div className="container relative mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#c8d7c8]/30 mb-4">{t("science.label")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] leading-tight text-[#e8efe4]" data-testid="text-science-title">
              {t("science.title")}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div variants={fadeInUp}>
              <div className="space-y-4 text-[#c8d7c8]/50 leading-relaxed text-sm">
                <p>{t("science.p1")}</p>
                <p>{t("science.p2")}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link href="/products">
                  <Button className="gap-2 bg-[#e8efe4] text-[#1a2e2a] border-[#7a9e8e]/20" data-testid="button-explore-catalog">
                    {t("science.browsePeptides")}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="/calculator">
                  <Button variant="outline" className="gap-2 border-[#7a9e8e]/15 text-[#c8d7c8]/70 bg-[#7a9e8e]/5" data-testid="button-science-calc">
                    {t("science.calculator")}
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} data-testid="section-amino-chain">
              <div className="rounded-md border border-[#7a9e8e]/10 bg-[#7a9e8e]/[0.03] p-5">
                <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#7a9e8e] animate-pulse" />
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#7a9e8e]/80" data-testid="text-sequence-label">
                      {t("science.sequenceLabel")}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#c8d7c8]/30">{t("science.residues")}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-5" data-testid="text-sequence-value">
                  {residues.map((res, i) => (
                    <span key={i} className="inline-flex items-center">
                      <span className="font-mono text-xs px-1.5 py-0.5 rounded-md bg-[#7a9e8e]/5 text-[#7a9e8e]/80 border border-[#7a9e8e]/10">
                        {res}
                      </span>
                      {i < residues.length - 1 && (
                        <span className="text-[#c8d7c8]/10 mx-0.5 text-[10px]">&mdash;</span>
                      )}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#7a9e8e]/10 text-xs">
                  <div data-testid="text-formula-value">
                    <span className="block font-medium text-[#c8d7c8]/40 mb-0.5">{t("science.formula")}</span>
                    <span className="text-[#c8d7c8]/80 font-mono text-[11px]">C<sub>62</sub>H<sub>98</sub>N<sub>16</sub>O<sub>22</sub></span>
                  </div>
                  <div data-testid="text-mw-value">
                    <span className="block font-medium text-[#c8d7c8]/40 mb-0.5">{t("science.molWeight")}</span>
                    <span className="text-[#c8d7c8]/80 font-mono text-[11px]">1419.56</span>
                  </div>
                  <div data-testid="text-purity-value">
                    <span className="block font-medium text-[#c8d7c8]/40 mb-0.5">{t("science.purity")}</span>
                    <span className="font-semibold text-[#c8d7c8]/80 text-[11px]">&ge;99.0%</span>
                  </div>
                  <div data-testid="text-cas-value">
                    <span className="block font-medium text-[#c8d7c8]/40 mb-0.5">{t("science.cas")}</span>
                    <span className="text-[#c8d7c8]/80 font-mono text-[11px]">137525-51-0</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const { t } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const steps = [
    { num: "01", icon: Beaker, title: t("process.step1"), desc: t("process.step1Desc") },
    { num: "02", icon: Atom, title: t("process.step2"), desc: t("process.step2Desc") },
    { num: "03", icon: Microscope, title: t("process.step3"), desc: t("process.step3Desc") },
    { num: "04", icon: Thermometer, title: t("process.step4"), desc: t("process.step4Desc") },
    { num: "05", icon: ShieldCheck, title: t("process.step5"), desc: t("process.step5Desc") },
    { num: "06", icon: Truck, title: t("process.step6"), desc: t("process.step6Desc") },
  ];

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible, steps.length]);

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden" id="process">
      <div className="container relative mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          onViewportEnter={() => setIsVisible(true)}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-3">{t("process.label")}</motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] leading-tight text-foreground" data-testid="text-process-title">
            {t("process.title")}
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
                  style={{ opacity: isPast ? 1 : 0.4 }}
                  data-testid={`card-process-${i}`}
                >
                  <div className="relative z-10 mb-4 flex justify-center">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
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
                  <span className={`text-2xl font-bold tabular-nums block mb-2 transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground/40"}`}
                    data-testid={`text-process-num-${i}`}
                  >
                    {step.num}
                  </span>
                  <h3 className={`font-semibold text-xs mb-1 transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                    data-testid={`text-process-step-${i}`}
                  >{step.title}</h3>
                  <p className={`text-[10px] leading-relaxed text-muted-foreground transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-50"}`}>{step.desc}</p>
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
  const { t } = useLanguage();
  const specs = [
    { param: t("specs.purityParam"), value: t("specs.purityValue") },
    { param: t("specs.synthesisParam"), value: t("specs.synthesisValue") },
    { param: t("specs.verificationParam"), value: t("specs.verificationValue") },
    { param: t("specs.formParam"), value: t("specs.formValue") },
    { param: t("specs.quantitiesParam"), value: t("specs.quantitiesValue") },
    { param: t("specs.documentationParam"), value: t("specs.documentationValue") },
    { param: t("specs.storageParam"), value: t("specs.storageValue") },
    { param: t("specs.shippingParam"), value: t("specs.shippingValue") },
  ];

  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative" id="specifications">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-10"
          >
            <motion.p variants={fadeInUp} className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-3">{t("specs.label")}</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] leading-tight text-foreground" data-testid="text-specs-title">
              {t("specs.title")}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="rounded-md border border-border bg-card overflow-hidden"
            data-testid="table-specs"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-semibold p-4 text-foreground text-xs uppercase tracking-[0.15em] bg-muted/50" data-testid="th-parameter">{t("specs.parameter")}</th>
                    <th className="text-left font-semibold p-4 text-foreground text-xs uppercase tracking-[0.15em] bg-muted/50" data-testid="th-standard">{t("specs.standard")}</th>
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
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-[#1a2e2a]" data-testid="section-midcta">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
          style={{ background: "radial-gradient(ellipse, rgba(122, 158, 142, 0.06) 0%, transparent 70%)" }}
        />
      </div>
      <div className="container relative mx-auto px-4 py-20 lg:py-28 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] mb-4 text-[#e8efe4]" data-testid="text-cta-title">
            {t("cta.title")}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm text-[#c8d7c8]/40 mb-8 max-w-lg mx-auto">
            {t("cta.subtitle")}
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/products">
              <Button size="lg" className="gap-2 bg-[#e8efe4] text-[#1a2e2a] border-[#7a9e8e]/20" data-testid="button-cta-order">
                {t("cta.button")}
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
  const { t } = useLanguage();
  const reasons = [
    { icon: Sparkles, value: t("why.purityValue"), label: t("why.purityLabel"), desc: t("why.purityDesc") },
    { icon: Truck, value: t("why.dispatchValue"), label: t("why.dispatchLabel"), desc: t("why.dispatchDesc") },
    { icon: FlaskConical, value: t("why.stockValue"), label: t("why.stockLabel"), desc: t("why.stockDesc") },
    { icon: ShieldCheck, value: t("why.countriesValue"), label: t("why.countriesLabel"), desc: t("why.countriesDesc") },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#1f3530] relative" id="why-choose-us">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-xs font-medium tracking-[0.3em] uppercase text-[#c8d7c8]/30 mb-3">{t("why.label")}</motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] text-[#e8efe4]">
            {t("why.title")}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {reasons.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-5 bg-[#7a9e8e]/5 border border-[#7a9e8e]/10">
                <item.icon className="h-5 w-5 text-[#7a9e8e]/70" strokeWidth={1.5} />
              </div>
              <p className="text-4xl lg:text-5xl font-bold text-[#e8efe4] mb-2 tracking-tight">{item.value}</p>
              <p className="text-sm font-medium text-[#c8d7c8]/70 mb-1 tracking-wide">{item.label}</p>
              <p className="text-xs text-[#c8d7c8]/35">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t } = useLanguage();
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
    <section className="py-24 lg:py-32 bg-muted/30 relative" id="testimonials">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.p variants={fadeInUp} className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-3">{t("testimonials.label")}</motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] text-foreground" data-testid="text-testimonials-title">
            {t("testimonials.title")}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="rounded-md border border-border bg-card overflow-visible"
              data-testid={`card-testimonial-${i}`}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className="h-3.5 w-3.5 fill-current text-amber-400/80" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-5 text-muted-foreground" data-testid={`text-testimonial-quote-${i}`}>
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-border/50">
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
  const { t } = useLanguage();
  const resources = [
    { label: t("tools.dosageGuide"), href: "/peptide-guide", desc: t("tools.dosageDesc"), icon: Syringe },
    { label: t("tools.calculator"), href: "/calculator", desc: t("tools.calculatorDesc"), icon: Calculator },
    { label: t("tools.insights"), href: "/insights", desc: t("tools.insightsDesc"), icon: BookOpen },
    { label: t("tools.faq"), href: "/faq", desc: t("tools.faqDesc"), icon: HelpCircle },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background relative" id="tools">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] text-foreground" data-testid="text-tools-title">
            {t("tools.title")}
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
                <div className="rounded-md border border-border bg-card p-5 h-full hover-elevate">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-muted border border-border">
                    <link.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
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
  const { t } = useLanguage();
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
      toast({ title: t("newsletter.welcomeTitle"), description: t("newsletter.welcomeDesc") });
    } catch {
      toast({ title: t("newsletter.errorTitle"), description: t("newsletter.errorDesc"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (discountCode) {
      navigator.clipboard.writeText(discountCode);
      setCopied(true);
      toast({ title: t("newsletter.copied"), description: t("newsletter.copiedDesc") });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative py-24 lg:py-32 bg-[#1a2e2a] overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px]"
          style={{ background: "radial-gradient(ellipse, rgba(122, 158, 142, 0.04) 0%, transparent 70%)" }}
        />
      </div>
      <div className="container relative mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-5 bg-[#7a9e8e]/5 border border-[#7a9e8e]/10">
            <Tag className="h-4 w-4 text-[#7a9e8e]/60" />
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold tracking-[0.08em] mb-3 text-[#e8efe4]" data-testid="text-newsletter-title">
            {t("newsletter.title")}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[#c8d7c8]/40 text-sm mb-8">
            {t("newsletter.subtitle")}
          </motion.p>

          <motion.div variants={fadeInUp}>
            {submitted ? (
              <div className="space-y-4" data-testid="text-newsletter-success">
                <div className="flex items-center justify-center gap-2 font-medium text-[#e8efe4]">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-sm">{t("newsletter.success")}</span>
                </div>
                {discountCode && (
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-md border border-[#7a9e8e]/10 bg-[#7a9e8e]/5">
                    <code className="font-mono text-sm tracking-wider text-[#e8efe4] font-semibold" data-testid="text-discount-code">{discountCode}</code>
                    <button onClick={handleCopy} className="text-[#c8d7c8]/40 hover:text-[#e8efe4] transition-colors" data-testid="button-copy-code" aria-label="Copy discount code">
                      {copied ? <CheckCircle2 className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                )}
                <p className="text-xs text-[#c8d7c8]/30">{t("newsletter.applyAt")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 max-w-sm mx-auto">
                <Input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-[#7a9e8e]/5 border-[#7a9e8e]/10 text-[#e8efe4] placeholder:text-[#c8d7c8]/25"
                  data-testid="input-newsletter-email"
                />
                <Button type="submit" disabled={isSubmitting} className="shrink-0 bg-[#e8efe4] text-[#1a2e2a] border-[#7a9e8e]/20" data-testid="button-newsletter-submit">
                  {isSubmitting ? "..." : t("newsletter.subscribe")}
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
