import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="container relative mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-blue-400/80 mb-4" data-testid="text-hero-tagline">
            HPLC Verified &middot; 98-99%+ Purity &middot; EU Shipping
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.08] mb-6" data-testid="text-hero-title">
            Research-grade peptides for European laboratories
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg" data-testid="text-hero-subtitle">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/products">
              <Button size="lg" className="gap-2" data-testid="button-hero-cta">
                Browse Catalog
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/calculator">
              <Button size="lg" variant="outline" className="border-white/10 bg-white/[0.03] text-slate-300 backdrop-blur-sm" data-testid="button-hero-learn">
                Reconstitution Calculator
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
