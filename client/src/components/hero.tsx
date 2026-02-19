import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight, Check } from "lucide-react";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-transparent dark:from-primary/[0.06]" />

      <div className="container relative mx-auto px-4 pt-16 pb-14 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-6" data-testid="badge-hero-verified">
            Research-Grade Peptides
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] mb-6 text-foreground" data-testid="text-hero-title">
            European-sourced peptides,
            <br className="hidden sm:block" />
            verified to{" "}
            <span className="text-primary">98-99%+ purity</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto text-muted-foreground" data-testid="text-hero-subtitle">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            <Link href="/products">
              <Button size="lg" className="gap-2" data-testid="button-hero-cta">
                Browse Catalog
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-hero-browse">
                Request a Quote
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground" data-testid="text-hero-features">
            {["HPLC & MS verified", "Ships within 24h", "27 EU countries", "Cold-chain logistics"].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
            {[
              { value: "24h", label: "Order Processing" },
              { value: "98-99%+", label: "HPLC Purity" },
              { value: "20+", label: "Peptide Catalog" },
              { value: "EU-Wide", label: "Cold-Chain Delivery" },
            ].map((stat, i) => (
              <div key={i} className="px-4 py-5 md:py-6 text-center" data-testid={`text-hero-stat-${i}`}>
                <p className="text-xl md:text-2xl font-bold tracking-tight text-foreground">{stat.value}</p>
                <p className="text-[11px] tracking-wide mt-1 text-muted-foreground uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
