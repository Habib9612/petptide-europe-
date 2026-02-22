import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, FlaskConical, Truck, Microscope, Beaker, Thermometer, Award, Users, Globe } from "lucide-react";

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
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "Open disclosure of sourcing, testing methodology, and quality data",
  },
  {
    icon: Truck,
    title: "Reliable Fulfillment",
    desc: "Same-day dispatch on qualifying orders keeps projects on track",
  },
  {
    icon: Users,
    title: "Research Support",
    desc: "Knowledgeable team ready to help with product selection",
  },
];

const pipelineSteps = [
  { num: "01", title: "Laboratory-Grade Water", desc: "Contaminant-free foundation for synthesis" },
  { num: "02", title: "Stabilizing Excipients", desc: "Precisely measured mannitol and sucrose protect peptide integrity" },
  { num: "03", title: "Analytical Verification", desc: "ESI-MS confirms molecular structure" },
  { num: "04", title: "0.22\u00B5m Filtration", desc: "Removes particulates prior to vialing" },
  { num: "05", title: "Lyophilization & Vialing", desc: "36-hour freeze-dry cycle for long-term stability" },
];

const stats = [
  { value: "27+", label: "Countries", desc: "EU-wide delivery network" },
  { value: "98-99%+", label: "Purity", desc: "HPLC verified purity standard" },
  { value: "20+", label: "Peptides", desc: "Research-grade peptides in stock" },
];

export default function About() {
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
              About Peptide Europe
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6" data-testid="text-about-title">
              Advancing European peptide research
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Peptide Europe supplies high-purity research peptides to laboratories across the continent, enabling breakthroughs in cellular biology, metabolic science, and regenerative medicine.
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
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Our Story</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5 leading-tight text-foreground" data-testid="text-who-we-are-title">
                Who We Are
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                <p>
                  Peptide Europe was founded to close the gap between cutting-edge peptide science and the researchers who depend on it. We supply synthetic peptides at &ge;98-99%+ purity, each accompanied by a comprehensive Certificate of Analysis that documents HPLC purity, mass-spectrometry confirmation, and endotoxin data.
                </p>
                <p>
                  Our customers include independent researchers, university laboratories, and commercial R&amp;D teams who require consistent, well-documented compounds for in-vitro and in-vivo study. From order to delivery, we prioritize transparency, scientific accuracy, and reliable fulfillment so your work never stalls.
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
                    <p className="font-bold text-sm text-foreground mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
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
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Manufacturing Process</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-foreground" data-testid="text-pipeline-title">
                Our Quality Pipeline
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
                    <p className="font-bold text-sm text-foreground mb-1">{step.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
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
              &ldquo;At Peptide Europe, advancing research is not just our business &mdash; it&rsquo;s our purpose.&rdquo;
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
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Why Choose Us</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-foreground" data-testid="text-why-choose-title">
                Numbers that speak for themselves
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
                  <p className="text-sm font-semibold text-foreground mb-1">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <Link href="/products">
                <Button className="gap-2" data-testid="button-browse-catalog">
                  Browse Our Catalog
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-12" data-testid="section-disclaimer">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground text-center italic max-w-2xl mx-auto">
            All products sold by Peptide Europe are intended for laboratory and research use only. They are not intended for human consumption, therapeutic, or diagnostic purposes.
          </p>
        </div>
      </section>
    </>
  );
}
