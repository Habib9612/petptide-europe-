import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, FlaskConical, Truck, Microscope, Beaker, Thermometer, Award, Users, Globe } from "lucide-react";
import { useLanguage } from "@/components/language-context";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const values = [
  {
    icon: Award,
    title: "Scientific Rigor",
    desc: "Every batch \u226598-99%+ pure with full Certificate of Analysis",
    titleKey: "about.valueRigor",
    descKey: "about.valueRigorDesc",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "Open disclosure of sourcing, testing methodology, and quality data",
    titleKey: "about.valueIntegrity",
    descKey: "about.valueIntegrityDesc",
  },
  {
    icon: Truck,
    title: "Reliable Fulfillment",
    desc: "Same-day dispatch on qualifying orders keeps projects on track",
    titleKey: "about.valueFulfillment",
    descKey: "about.valueFulfillmentDesc",
  },
  {
    icon: Users,
    title: "Research Support",
    desc: "Knowledgeable team ready to help with product selection",
    titleKey: "about.valueSupport",
    descKey: "about.valueSupportDesc",
  },
];

const pipelineSteps = [
  { num: "01", titleKey: "about.pipeline1", descKey: "about.pipeline1Desc" },
  { num: "02", titleKey: "about.pipeline2", descKey: "about.pipeline2Desc" },
  { num: "03", titleKey: "about.pipeline3", descKey: "about.pipeline3Desc" },
  { num: "04", titleKey: "about.pipeline4", descKey: "about.pipeline4Desc" },
  { num: "05", titleKey: "about.pipeline5", descKey: "about.pipeline5Desc" },
];

const stats = [
  { value: "27+", labelKey: "about.stat1Label", descKey: "about.stat1Desc" },
  { value: "98-99%+", labelKey: "about.stat2Label", descKey: "about.stat2Desc" },
  { value: "20+", labelKey: "about.stat3Label", descKey: "about.stat3Desc" },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <>
      <section className="bg-primary text-primary-foreground py-20 lg:py-28" data-testid="section-about-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.p variants={fadeInUp} className="tracking-[0.2em] uppercase text-xs font-medium text-primary-foreground/70 mb-4">
              {t("about.heroLabel")}
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6" data-testid="text-about-title">
              {t("about.heroTitle")}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
              {t("about.heroSubtitle")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28" data-testid="section-who-we-are">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          >
            <motion.div variants={fadeInUp}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">{t("about.whoWeAreLabel")}</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5 leading-tight text-foreground" data-testid="text-who-we-are-title">
                {t("about.whoWeAreTitle")}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                <p>
                  {t("about.whoWeAreP1")}
                </p>
                <p>
                  {t("about.whoWeAreP2")}
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    data-testid={`card-value-${i}`}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-primary/8 border border-primary/15">
                      <item.icon className="h-4.5 w-4.5 text-primary" strokeWidth={1.5} />
                    </div>
                    <p className="font-bold text-sm text-foreground mb-1">{t(item.titleKey)}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/30 py-20 lg:py-28" data-testid="section-quality-pipeline">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">{t("about.pipelineLabel")}</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-foreground" data-testid="text-pipeline-title">
                {t("about.pipelineTitle")}
              </h2>
            </motion.div>

            <div className="space-y-0">
              {pipelineSteps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative flex gap-5 items-start"
                  data-testid={`card-pipeline-${i}`}
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                      {step.num}
                    </div>
                    {i < pipelineSteps.length - 1 && (
                      <div className="w-px h-12 bg-border mt-0" />
                    )}
                  </div>
                  <div className="pb-10">
                    <p className="font-bold text-sm text-foreground mb-1">{t(step.titleKey)}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-20 border-t border-b border-border" data-testid="section-mission-quote">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl lg:text-2xl font-light italic text-foreground text-center leading-relaxed" data-testid="text-mission-quote">
              {t("about.missionQuote")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/30 py-20 lg:py-28" data-testid="section-why-choose">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">{t("about.statsLabel")}</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-foreground" data-testid="text-why-choose-title">
                {t("about.statsTitle")}
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-3 gap-5 mb-10"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="rounded-xl bg-card border border-border p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  data-testid={`card-stat-${i}`}
                >
                  <p className="text-3xl font-bold text-foreground mb-1" data-testid={`text-stat-value-${i}`}>{stat.value}</p>
                  <p className="text-sm font-semibold text-foreground mb-1">{t(stat.labelKey)}</p>
                  <p className="text-xs text-muted-foreground">{t(stat.descKey)}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <Link href="/products">
                <Button className="gap-2" data-testid="button-browse-catalog">
                  {t("about.heroCTA")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-12" data-testid="section-disclaimer">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">{t("about.disclaimerLabel")}</p>
            <h3 className="text-lg font-bold tracking-tight text-foreground mb-3">{t("about.disclaimerTitle")}</h3>
            <p className="text-sm text-muted-foreground italic">
              {t("about.disclaimerText")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
