import { Suspense } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight, Sparkles } from "lucide-react";
import { MolecularScene } from "./molecular-scene";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]" style={{ background: "linear-gradient(135deg, hsl(215, 40%, 8%) 0%, hsl(200, 35%, 10%) 40%, hsl(190, 30%, 12%) 70%, hsl(215, 35%, 10%) 100%)" }}>
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <MolecularScene className="absolute inset-0 opacity-70" />
        </Suspense>
      </div>

      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsla(215, 40%, 6%, 0.92) 0%, hsla(200, 35%, 8%, 0.65) 50%, transparent 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsla(215, 40%, 6%, 0.85) 0%, transparent 40%, hsla(215, 40%, 8%, 0.35) 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent 10%, hsl(186, 65%, 45%, 0.4) 50%, hsl(35, 75%, 50%, 0.2) 80%, transparent 100%)" }} />

      <div className="container relative mx-auto px-4 py-28 md:py-36 lg:py-44 z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ border: "1px solid hsla(186, 65%, 45%, 0.25)", background: "hsla(186, 65%, 30%, 0.1)" }} data-testid="badge-hero-verified">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "hsl(155, 55%, 50%)" }} />
            <span className="text-xs font-medium tracking-wide" style={{ color: "hsl(186, 50%, 70%)" }}>
              HPLC Verified &middot; 98-99%+ Purity
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.06] mb-6" data-testid="text-hero-title">
            Research-grade peptides
            <span className="block mt-1" style={{ color: "hsl(186, 65%, 60%)" }}>for European laboratories</span>
          </h1>

          <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "hsl(210, 15%, 65%)" }} data-testid="text-hero-subtitle">
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
              <Button size="lg" variant="outline" className="text-base" style={{ borderColor: "hsla(0, 0%, 100%, 0.12)", backgroundColor: "hsla(0, 0%, 100%, 0.05)", color: "hsl(210, 15%, 75%)", backdropFilter: "blur(8px)" }} data-testid="button-hero-learn">
                Reconstitution Calculator
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-12 text-sm" style={{ color: "hsl(210, 15%, 55%)" }} data-testid="hero-stats-row">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "hsl(35, 75%, 55%)" }} />
              20+ peptides
            </span>
            <span className="w-px h-3" style={{ backgroundColor: "hsl(210, 15%, 22%)" }} />
            <span>48h EU shipping</span>
            <span className="w-px h-3" style={{ backgroundColor: "hsl(210, 15%, 22%)" }} />
            <span>10% off with crypto</span>
          </div>
        </div>
      </div>
    </section>
  );
}
