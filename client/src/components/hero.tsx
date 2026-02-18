import { Suspense } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight } from "lucide-react";
import { MolecularScene } from "./molecular-scene";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-slate-950 overflow-hidden min-h-[600px] md:min-h-[700px]">
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <MolecularScene className="absolute inset-0 opacity-70" />
        </Suspense>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="container relative mx-auto px-4 py-28 md:py-36 lg:py-44 z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6" data-testid="badge-hero-verified">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium tracking-wide text-blue-300/90">
              HPLC Verified &middot; 98-99%+ Purity
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.06] mb-6" data-testid="text-hero-title">
            Research-grade peptides
            <span className="block text-blue-400/90 mt-1">for European laboratories</span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg" data-testid="text-hero-subtitle">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/products">
              <Button size="lg" className="gap-2 text-base" data-testid="button-hero-cta">
                Browse Catalog
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/calculator">
              <Button size="lg" variant="outline" className="border-white/10 bg-white/[0.05] text-slate-300 backdrop-blur-sm text-base" data-testid="button-hero-learn">
                Reconstitution Calculator
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-12 text-sm text-slate-500" data-testid="hero-stats-row">
            <span>20+ peptides</span>
            <span className="w-px h-3 bg-slate-700" />
            <span>48h EU shipping</span>
            <span className="w-px h-3 bg-slate-700" />
            <span>10% off with crypto</span>
          </div>
        </div>
      </div>
    </section>
  );
}
