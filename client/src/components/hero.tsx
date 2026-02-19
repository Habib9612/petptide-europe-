import { Suspense } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight } from "lucide-react";
import { MolecularScene } from "./molecular-scene";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(215, 40%, 7%) 0%, hsl(200, 35%, 9%) 40%, hsl(190, 30%, 11%) 70%, hsl(215, 35%, 9%) 100%)" }}>
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <MolecularScene className="absolute inset-0 opacity-60" />
        </Suspense>
      </div>

      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsla(215, 40%, 5%, 0.95) 0%, hsla(200, 35%, 7%, 0.7) 45%, hsla(200, 35%, 8%, 0.3) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsla(215, 40%, 5%, 0.9) 0%, transparent 35%, hsla(215, 40%, 7%, 0.3) 100%)" }} />

      <div className="container relative mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36 z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5" style={{ border: "1px solid hsla(186, 65%, 45%, 0.2)", background: "hsla(186, 65%, 30%, 0.08)" }} data-testid="badge-hero-verified">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "hsl(155, 55%, 50%)" }} />
            <span className="text-xs font-medium tracking-wide" style={{ color: "hsl(186, 50%, 70%)" }}>
              HPLC Verified &middot; 98-99%+ Purity
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.08] mb-4" data-testid="text-hero-title">
            Trusted peptides,
            <span className="block mt-0.5" style={{ color: "hsl(186, 65%, 60%)" }}>exceptional quality</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-md" style={{ color: "hsl(210, 15%, 62%)" }} data-testid="text-hero-subtitle">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/products">
              <Button size="lg" className="gap-2 text-base" data-testid="button-hero-cta">
                Quote / Order
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="text-base gap-2" style={{ borderColor: "hsla(0, 0%, 100%, 0.12)", backgroundColor: "hsla(0, 0%, 100%, 0.04)", color: "hsl(210, 15%, 72%)", backdropFilter: "blur(8px)" }} data-testid="button-hero-browse">
                Browse Catalog
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10" style={{ background: "hsla(215, 35%, 5%, 0.75)", backdropFilter: "blur(16px)", borderTop: "1px solid hsla(186, 40%, 30%, 0.15)" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: "24h", label: "Order Processing", accent: "hsl(186, 60%, 55%)" },
              { value: "98-99%+", label: "HPLC Verified Purity", accent: "hsl(155, 55%, 50%)" },
              { value: "20+", label: "Research Peptides", accent: "hsl(35, 70%, 55%)" },
              { value: "EU-Wide", label: "Cold-Chain Shipping", accent: "hsl(262, 50%, 60%)" },
            ].map((stat, i) => (
              <div key={i} className="px-4 py-4 md:py-5 text-center" style={{ borderLeft: i > 0 ? "1px solid hsla(186, 30%, 25%, 0.12)" : "none" }} data-testid={`text-hero-stat-${i}`}>
                <p className="text-lg md:text-xl font-bold tracking-tight" style={{ color: stat.accent }}>{stat.value}</p>
                <p className="text-[11px] tracking-wide mt-0.5" style={{ color: "hsl(210, 15%, 48%)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
