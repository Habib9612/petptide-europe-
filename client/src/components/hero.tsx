import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight, Check } from "lucide-react";

function MolecularBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(186 65% 48%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(186 65% 48%)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(186 65% 48%)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="hsl(186 65% 48%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="150" r="250" fill="url(#glow2)" />
        <circle cx="900" cy="600" r="300" fill="url(#glow1)" />

        <g stroke="hsl(186 65% 48%)" strokeOpacity="0.12" fill="none" strokeWidth="1">
          <line x1="100" y1="200" x2="250" y2="300">
            <animate attributeName="y2" values="300;290;300" dur="6s" repeatCount="indefinite" />
          </line>
          <line x1="250" y1="300" x2="400" y2="250">
            <animate attributeName="y1" values="300;290;300" dur="6s" repeatCount="indefinite" />
          </line>
          <line x1="400" y1="250" x2="520" y2="350" />
          <line x1="520" y1="350" x2="680" y2="280">
            <animate attributeName="y2" values="280;270;280" dur="5s" repeatCount="indefinite" />
          </line>
          <line x1="680" y1="280" x2="800" y2="320" />
          <line x1="800" y1="320" x2="950" y2="240">
            <animate attributeName="y1" values="320;310;320" dur="7s" repeatCount="indefinite" />
          </line>
          <line x1="950" y1="240" x2="1100" y2="300" />
        </g>

        <g stroke="hsl(186 65% 48%)" strokeOpacity="0.07" fill="none" strokeWidth="1">
          <line x1="150" y1="500" x2="300" y2="580" />
          <line x1="300" y1="580" x2="470" y2="520">
            <animate attributeName="y2" values="520;510;520" dur="8s" repeatCount="indefinite" />
          </line>
          <line x1="470" y1="520" x2="620" y2="600" />
          <line x1="620" y1="600" x2="780" y2="540">
            <animate attributeName="y1" values="600;590;600" dur="6s" repeatCount="indefinite" />
          </line>
          <line x1="780" y1="540" x2="920" y2="620" />
          <line x1="920" y1="620" x2="1080" y2="560" />
        </g>

        {[
          { cx: 100, cy: 200, r: 3, delay: "0s", dur: "6s" },
          { cx: 250, cy: 300, r: 4, delay: "0.5s", dur: "6s" },
          { cx: 400, cy: 250, r: 3, delay: "1s", dur: "5s" },
          { cx: 520, cy: 350, r: 5, delay: "0.3s", dur: "7s" },
          { cx: 680, cy: 280, r: 3, delay: "1.5s", dur: "5s" },
          { cx: 800, cy: 320, r: 4, delay: "0.8s", dur: "7s" },
          { cx: 950, cy: 240, r: 3, delay: "2s", dur: "6s" },
          { cx: 1100, cy: 300, r: 4, delay: "0.2s", dur: "8s" },
          { cx: 150, cy: 500, r: 3, delay: "1.2s", dur: "8s" },
          { cx: 300, cy: 580, r: 4, delay: "0.7s", dur: "6s" },
          { cx: 470, cy: 520, r: 3, delay: "1.8s", dur: "8s" },
          { cx: 620, cy: 600, r: 5, delay: "0.4s", dur: "6s" },
          { cx: 780, cy: 540, r: 3, delay: "1.1s", dur: "7s" },
          { cx: 920, cy: 620, r: 4, delay: "2.5s", dur: "5s" },
          { cx: 1080, cy: 560, r: 3, delay: "0.9s", dur: "6s" },
        ].map((node, i) => (
          <circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="hsl(186 65% 48%)"
            fillOpacity="0.25"
          >
            <animate
              attributeName="fillOpacity"
              values="0.15;0.35;0.15"
              dur={node.dur}
              begin={node.delay}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`${node.cy};${node.cy - 6};${node.cy}`}
              dur={node.dur}
              begin={node.delay}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        <g fill="hsl(186 65% 48%)" fillOpacity="0.06">
          <circle cx="60" cy="100" r="1.5" />
          <circle cx="340" cy="160" r="1" />
          <circle cx="560" cy="120" r="1.5" />
          <circle cx="730" cy="180" r="1" />
          <circle cx="1000" cy="140" r="1.5" />
          <circle cx="180" cy="680" r="1" />
          <circle cx="500" cy="700" r="1.5" />
          <circle cx="850" cy="680" r="1" />
          <circle cx="1050" cy="720" r="1.5" />
        </g>
      </svg>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(215,35%,7%)] to-transparent" />
    </div>
  );
}

function HelixStripe() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] h-[500px] opacity-[0.06] hidden lg:block" aria-hidden="true">
      <svg viewBox="0 0 200 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {Array.from({ length: 20 }).map((_, i) => {
          const y = i * 25 + 10;
          const x1 = 60 + Math.sin(i * 0.6) * 40;
          const x2 = 140 - Math.sin(i * 0.6) * 40;
          return (
            <g key={i}>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke="hsl(186 65% 60%)" strokeWidth="1" strokeOpacity="0.5" />
              <circle cx={x1} cy={y} r="3" fill="hsl(186 65% 60%)" fillOpacity="0.6" />
              <circle cx={x2} cy={y} r="3" fill="hsl(186 65% 60%)" fillOpacity="0.6" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[hsl(215,35%,7%)]" data-testid="section-hero">
      <MolecularBackground />
      <HelixStripe />

      <div className="container relative mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-36 lg:pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[hsl(186,65%,48%,0.2)] bg-[hsl(186,65%,48%,0.06)] mb-8" data-testid="badge-hero-verified">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(186,65%,48%)] animate-pulse" />
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[hsl(186,65%,70%)]">
              Research-Grade Peptides
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06] mb-6 text-white" data-testid="text-hero-title">
            European-sourced peptides,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(186,65%,55%)] to-[hsl(186,65%,40%)]">
              verified to 98-99%+ purity
            </span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl text-[hsl(210,15%,65%)]" data-testid="text-hero-subtitle">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-14">
            <Link href="/products">
              <Button size="lg" className="gap-2" data-testid="button-hero-cta">
                Browse Catalog
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="gap-2 border-[hsl(186,65%,48%,0.25)] text-white bg-white/5 backdrop-blur-sm" data-testid="button-hero-browse">
                Request a Quote
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[hsl(210,15%,55%)]" data-testid="text-hero-features">
            {["HPLC & MS verified", "Ships within 24h", "27 EU countries", "Cold-chain logistics"].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[hsl(186,65%,48%)]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/[0.06]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {[
              { value: "24h", label: "Order Processing" },
              { value: "98-99%+", label: "HPLC Purity" },
              { value: "20+", label: "Peptide Catalog" },
              { value: "EU-Wide", label: "Cold-Chain Delivery" },
            ].map((stat, i) => (
              <div key={i} className="px-4 py-5 md:py-6 text-center" data-testid={`text-hero-stat-${i}`}>
                <p className="text-xl md:text-2xl font-bold tracking-tight text-white">{stat.value}</p>
                <p className="text-[11px] tracking-wide mt-1 text-[hsl(210,15%,50%)] uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
