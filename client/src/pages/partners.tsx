import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus, Megaphone, Coins, TrendingUp, Gift, BarChart3, CheckCircle2 } from "lucide-react";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };

export default function Partners() {
  const steps = [
    { icon: UserPlus, title: "Join", desc: "It's free and easy to join. Get up and running today." },
    { icon: Megaphone, title: "Advertise", desc: "Share your unique referral code with your audience. Whether you're a content creator, researcher, or influencer." },
    { icon: Coins, title: "Earn", desc: "Get up to 10% commission on every qualifying purchase made with your code." },
  ];

  const stats = [
    { value: "10%", label: "Commission Rate" },
    { value: "30 Days", label: "Cookie Duration" },
    { value: "Monthly", label: "Payouts" },
  ];

  const benefits = [
    "Earn from all qualifying purchases, not just what you advertise",
    "Real-time tracking dashboard to monitor your performance",
    "Unique referral code for easy sharing",
    "No minimum payout threshold",
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-xs font-medium tracking-[0.2em] uppercase text-primary-foreground/70 mb-4">
              PARTNER PROGRAM
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 text-primary-foreground max-w-3xl mx-auto" data-testid="text-partners-title">
              Earn up to 10% commission for every referral
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Join our affiliate program and monetize your audience while promoting premium research peptides
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/partners/signup">
                <Button variant="secondary" size="lg" className="gap-2" data-testid="button-hero-join">
                  Join Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="text-primary-foreground border-primary-foreground/30 bg-primary-foreground/5 backdrop-blur-sm" data-testid="button-hero-learn">
                  Learn More
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28" id="how-it-works">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Getting Started</motion.p>
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" data-testid="text-how-it-works">
              How does it work?
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="rounded-xl border bg-card p-8 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                data-testid={`card-step-${i}`}
              >
                <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-5 bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mt-10"
          >
            <Link href="/partners/signup">
              <Button className="gap-2" data-testid="button-how-join">
                Join Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/30 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">Earnings</motion.p>
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" data-testid="text-commission-title">
              Commission structure
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="rounded-xl border bg-card p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                data-testid={`card-stat-${i}`}
              >
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto space-y-3"
          >
            {benefits.map((benefit, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold tracking-tight mb-5 text-primary-foreground" data-testid="text-cta-title">
              Ready to start earning?
            </motion.h2>
            <motion.div variants={fadeInUp}>
              <Link href="/partners/signup">
                <Button variant="secondary" size="lg" className="gap-2" data-testid="button-cta-join">
                  Join Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
