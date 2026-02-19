import { Suspense } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight, Sparkles } from "lucide-react";
import { MolecularScene } from "./molecular-scene";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden min-h-[540px] lg:min-h-[620px] flex flex-col">
      <div className="absolute inset-0 bg-background" />

      <div className="absolute inset-0" style={{
        background: "linear-gradient(160deg, hsl(186, 30%, 95%) 0%, hsl(186, 25%, 92%) 25%, hsl(200, 20%, 90%) 50%, hsl(186, 20%, 93%) 75%, hsl(40, 30%, 95%) 100%)",
      }} />
      <div className="dark:block hidden absolute inset-0" style={{
        background: "linear-gradient(160deg, hsl(215, 35%, 8%) 0%, hsl(200, 30%, 10%) 25%, hsl(195, 25%, 11%) 50%, hsl(210, 30%, 9%) 75%, hsl(215, 35%, 8%) 100%)",
      }} />

      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-15" style={{
        background: "radial-gradient(circle, hsla(186, 60%, 70%, 0.4) 0%, transparent 70%)",
      }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-20 dark:opacity-10" style={{
        background: "radial-gradient(circle, hsla(35, 60%, 70%, 0.3) 0%, transparent 70%)",
      }} />
      <div className="absolute top-[30%] left-[60%] w-[300px] h-[300px] rounded-full opacity-15 dark:opacity-10" style={{
        background: "radial-gradient(circle, hsla(155, 50%, 65%, 0.3) 0%, transparent 70%)",
      }} />

      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.25]">
        <Suspense fallback={null}>
          <MolecularScene className="absolute inset-0" />
        </Suspense>
      </div>

      <div className="container relative mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-36 lg:pb-28 z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 bg-white/60 dark:bg-white/[0.06] backdrop-blur-sm border border-black/[0.06] dark:border-white/[0.08]" data-testid="badge-hero-verified">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-foreground/70">
              HPLC Verified &middot; 98-99%+ Purity &middot; EU-Wide Shipping
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5 text-foreground" data-testid="text-hero-title">
            Research peptides,{" "}
            <span className="bg-clip-text text-transparent" style={{
              backgroundImage: "linear-gradient(135deg, hsl(186, 65%, 38%) 0%, hsl(186, 55%, 48%) 50%, hsl(155, 50%, 42%) 100%)",
            }}>
              exceptional purity
            </span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto text-muted-foreground" data-testid="text-hero-subtitle">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link href="/products">
              <Button size="lg" className="gap-2 text-base rounded-full" data-testid="button-hero-cta">
                Browse Catalog
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="text-base gap-2 rounded-full bg-white/50 dark:bg-white/[0.04] backdrop-blur-sm" data-testid="button-hero-browse">
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-border/50 bg-background/50 dark:bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: "24h", label: "Order Processing", accent: "text-primary" },
              { value: "98-99%+", label: "HPLC Purity", accent: "text-[hsl(155,50%,38%)] dark:text-[hsl(155,55%,50%)]" },
              { value: "20+", label: "Peptide Catalog", accent: "text-[hsl(35,60%,42%)] dark:text-[hsl(35,65%,55%)]" },
              { value: "EU-Wide", label: "Cold-Chain Delivery", accent: "text-[hsl(262,40%,50%)] dark:text-[hsl(262,50%,60%)]" },
            ].map((stat, i) => (
              <div key={i} className={`px-4 py-4 md:py-5 text-center ${i > 0 ? "border-l border-border/30" : ""}`} data-testid={`text-hero-stat-${i}`}>
                <p className={`text-lg md:text-xl font-bold tracking-tight ${stat.accent}`}>{stat.value}</p>
                <p className="text-[11px] tracking-wide mt-0.5 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
