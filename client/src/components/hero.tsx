import { Suspense } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight, Shield } from "lucide-react";
import { MolecularScene } from "./molecular-scene";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(215, 40%, 8%) 0%, hsl(200, 35%, 10%) 40%, hsl(190, 30%, 12%) 70%, hsl(215, 35%, 10%) 100%)" }}>
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <MolecularScene className="absolute inset-0 opacity-70" />
        </Suspense>
      </div>

      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsla(215, 40%, 6%, 0.92) 0%, hsla(200, 35%, 8%, 0.65) 50%, transparent 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsla(215, 40%, 6%, 0.85) 0%, transparent 40%, hsla(215, 40%, 8%, 0.35) 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent 10%, hsl(186, 65%, 45%, 0.4) 50%, hsl(35, 75%, 50%, 0.2) 80%, transparent 100%)" }} />

      <div className="container relative mx-auto px-4 pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-36 lg:pb-40 z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-6" style={{ border: "1px solid hsla(186, 65%, 45%, 0.25)", background: "hsla(186, 65%, 30%, 0.1)" }} data-testid="badge-hero-verified">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "hsl(155, 55%, 50%)" }} />
            <span className="text-xs font-medium tracking-wide" style={{ color: "hsl(186, 50%, 70%)" }}>
              HPLC Verified &middot; 98-99%+ Purity
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-5" data-testid="text-hero-title">
            Research-grade peptides
            <span className="block mt-1" style={{ color: "hsl(186, 65%, 60%)" }}>for European laboratories</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "hsl(210, 15%, 65%)" }} data-testid="text-hero-subtitle">
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
                Peptide Calculator
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t" style={{ borderColor: "hsla(186, 40%, 30%, 0.2)", background: "hsla(215, 35%, 6%, 0.7)", backdropFilter: "blur(12px)" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x" style={{ borderColor: "hsla(186, 30%, 25%, 0.15)" }}>
            {[
              { value: "24h", label: "Order Processing" },
              { value: "98-99%+", label: "Verified Purity" },
              { value: "20+", label: "Peptide Catalog" },
              { value: "EU-Wide", label: "Cold-Chain Shipping" },
            ].map((stat, i) => (
              <div key={i} className="px-4 py-4 md:py-5 text-center" style={{ borderColor: "hsla(186, 30%, 25%, 0.15)" }} data-testid={`text-hero-stat-${i}`}>
                <p className="text-lg md:text-xl font-bold tracking-tight text-white">{stat.value}</p>
                <p className="text-[11px] tracking-wide mt-0.5" style={{ color: "hsl(210, 15%, 50%)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
