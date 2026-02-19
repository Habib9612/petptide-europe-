import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight, ShieldCheck, Truck, Award, FlaskConical } from "lucide-react";

function VialIllustration() {
  return (
    <div className="relative flex items-center justify-center" aria-hidden="true">
      <div className="absolute w-[280px] h-[280px] lg:w-[360px] lg:h-[360px] rounded-full bg-[hsl(186,65%,48%,0.06)] animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute w-[200px] h-[200px] lg:w-[260px] lg:h-[260px] rounded-full bg-[hsl(186,65%,48%,0.04)]" />
      <svg viewBox="0 0 120 260" className="relative w-[100px] lg:w-[130px] drop-shadow-[0_0_30px_hsl(186,65%,48%,0.3)]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vialBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(210, 15%, 85%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(210, 15%, 70%)" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="vialLiquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(186, 65%, 55%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(186, 65%, 40%)" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(186, 65%, 45%)" />
            <stop offset="100%" stopColor="hsl(186, 65%, 32%)" />
          </linearGradient>
        </defs>
        <rect x="30" y="10" width="60" height="22" rx="4" fill="url(#capGrad)" />
        <rect x="38" y="32" width="44" height="8" rx="2" fill="hsl(210, 10%, 60%)" fillOpacity="0.6" />
        <rect x="35" y="40" width="50" height="180" rx="6" fill="url(#vialBody)" />
        <rect x="35" y="40" width="50" height="180" rx="6" fill="none" stroke="hsl(210,15%,80%)" strokeWidth="0.5" strokeOpacity="0.5" />
        <rect x="37" y="120" width="46" height="98" rx="5" fill="url(#vialLiquid)" />
        <rect x="42" y="46" width="2" height="170" rx="1" fill="white" fillOpacity="0.15" />
        <line x1="40" y1="80" x2="52" y2="80" stroke="hsl(210,15%,60%)" strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="40" y1="120" x2="55" y2="120" stroke="hsl(210,15%,60%)" strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="40" y1="160" x2="52" y2="160" stroke="hsl(210,15%,60%)" strokeWidth="0.5" strokeOpacity="0.4" />
        <text x="60" y="246" textAnchor="middle" fontSize="7" fill="hsl(210,15%,60%)" fillOpacity="0.6" fontFamily="monospace">5mg</text>
      </svg>
      <svg className="absolute top-0 left-0 w-full h-full opacity-[0.15]" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        {[
          { cx: 40, cy: 60, r: 2.5 }, { cx: 90, cy: 30, r: 2 },
          { cx: 250, cy: 50, r: 2.5 }, { cx: 220, cy: 100, r: 2 },
          { cx: 60, cy: 240, r: 2 }, { cx: 260, cy: 230, r: 2.5 },
          { cx: 30, cy: 150, r: 2 }, { cx: 270, cy: 160, r: 2 },
        ].map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="hsl(186,65%,55%)">
            <animate attributeName="fillOpacity" values="0.3;0.7;0.3" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <line x1="40" y1="60" x2="90" y2="30" stroke="hsl(186,65%,55%)" strokeWidth="0.5" strokeOpacity="0.3" />
        <line x1="250" y1="50" x2="220" y2="100" stroke="hsl(186,65%,55%)" strokeWidth="0.5" strokeOpacity="0.3" />
        <line x1="60" y1="240" x2="30" y2="150" stroke="hsl(186,65%,55%)" strokeWidth="0.5" strokeOpacity="0.3" />
        <line x1="260" y1="230" x2="270" y2="160" stroke="hsl(186,65%,55%)" strokeWidth="0.5" strokeOpacity="0.3" />
      </svg>
    </div>
  );
}

export function TrustBar() {
  const badges = [
    { icon: Award, label: "98-99%+ Purity", sub: "HPLC verified" },
    { icon: ShieldCheck, label: "CoA Included", sub: "Every order" },
    { icon: Truck, label: "Free Shipping", sub: "Orders over \u20AC120" },
    { icon: FlaskConical, label: "20+ Peptides", sub: "In stock now" },
  ];

  return (
    <div className="border-y border-border bg-muted/30" data-testid="section-trust-bar">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {badges.map((badge, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-4 bg-background" data-testid={`trust-badge-${i}`}>
              <badge.icon className="h-5 w-5 text-primary shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold leading-tight">{badge.label}</p>
                <p className="text-[11px] text-muted-foreground">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[hsl(215,35%,7%)]" data-testid="section-hero">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[hsl(186,65%,48%,0.04)] -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(186,65%,48%,0.03)] translate-x-1/4 translate-y-1/4" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <g stroke="hsl(186,65%,60%)" fill="none" strokeWidth="0.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 80 + 40} x2="1200" y2={i * 80 + 40} />
            ))}
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 80 + 40} y1="0" x2={i * 80 + 40} y2="600" />
            ))}
          </g>
        </svg>
      </div>

      <div className="container relative mx-auto px-4 pt-16 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[hsl(186,65%,48%,0.2)] bg-[hsl(186,65%,48%,0.06)] mb-6" data-testid="badge-hero-verified">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(186,65%,48%)] animate-pulse" />
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[hsl(186,65%,70%)]">
                Research-Grade Peptides
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold tracking-tight leading-[1.1] mb-5 text-white" data-testid="text-hero-title">
              Premium peptides for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(186,65%,55%)] to-[hsl(186,65%,40%)]">
                European research
              </span>
            </h1>

            <p className="text-base leading-relaxed mb-8 max-w-lg text-[hsl(210,15%,60%)]" data-testid="text-hero-subtitle">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Link href="/products">
                <Button size="lg" className="gap-2" data-testid="button-hero-cta">
                  Shop All Peptides
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products" data-testid="link-hero-categories">
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-hero-browse">
                  View Categories
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.06]">
              {[
                { value: "24h", label: "Shipping" },
                { value: "98-99%+", label: "Purity" },
                { value: "27", label: "EU Countries" },
              ].map((stat, i) => (
                <div key={i} data-testid={`text-hero-stat-${i}`}>
                  <p className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{stat.value}</p>
                  <p className="text-[11px] tracking-wide mt-0.5 text-[hsl(210,15%,45%)] uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <VialIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
