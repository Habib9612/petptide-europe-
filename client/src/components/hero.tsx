import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight, ShieldCheck, Truck, Award, FlaskConical } from "lucide-react";
import { useRef, useCallback, useState, useEffect } from "react";
import vialVideo from "@assets/peptide_vial_3d_rotating_1771609453361.MP4";

function Vial3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / rect.width;
    const dy = (e.clientY - centerY) / rect.height;
    setOffset({ x: -dx * 20, y: -dy * 15 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const hero = containerRef.current?.closest("[data-testid='section-hero']");
    if (!hero) return;
    const el = hero as HTMLElement;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center" aria-hidden="true">
      <div className="absolute w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] rounded-full bg-[hsl(186,65%,48%,0.05)]" />
      <div
        className="relative w-[280px] h-[350px] lg:w-[360px] lg:h-[450px]"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <video
          src={vialVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain drop-shadow-[0_0_40px_hsl(186,65%,48%,0.25)]"
          style={{ background: "transparent" }}
          data-testid="video-hero-vial"
        />
      </div>
      <svg className="absolute top-0 left-0 w-full h-full opacity-[0.12] pointer-events-none" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        {[
          { cx: 30, cy: 50, r: 2.5 }, { cx: 80, cy: 20, r: 2 },
          { cx: 260, cy: 40, r: 2.5 }, { cx: 230, cy: 90, r: 2 },
          { cx: 50, cy: 250, r: 2 }, { cx: 270, cy: 240, r: 2.5 },
          { cx: 20, cy: 160, r: 2 }, { cx: 280, cy: 170, r: 2 },
        ].map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="hsl(186,65%,55%)">
            <animate attributeName="fillOpacity" values="0.3;0.7;0.3" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <line x1="30" y1="50" x2="80" y2="20" stroke="hsl(186,65%,55%)" strokeWidth="0.5" strokeOpacity="0.3" />
        <line x1="260" y1="40" x2="230" y2="90" stroke="hsl(186,65%,55%)" strokeWidth="0.5" strokeOpacity="0.3" />
        <line x1="50" y1="250" x2="20" y2="160" stroke="hsl(186,65%,55%)" strokeWidth="0.5" strokeOpacity="0.3" />
        <line x1="270" y1="240" x2="280" y2="170" stroke="hsl(186,65%,55%)" strokeWidth="0.5" strokeOpacity="0.3" />
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

          <div className="flex justify-center">
            <Vial3D />
          </div>
        </div>
      </div>
    </section>
  );
}
