import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight, FlaskConical, Shield, Truck, Sparkles } from "lucide-react";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-slate-950">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/hero-science.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            <span>Premium Research-Grade Peptides</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]" data-testid="text-hero-title">
            Precision Peptides for<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              European Science
            </span>
          </h1>
          
          <p className="mb-10 max-w-xl text-lg text-slate-300 md:text-xl leading-relaxed" data-testid="text-hero-subtitle">
            {t("hero.subtitle")}
          </p>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/products">
              <Button size="lg" className="h-14 px-10 text-lg font-semibold gap-2 hover-elevate active-elevate-2 shadow-lg shadow-primary/25" data-testid="button-hero-cta">
                {t("hero.cta")}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/shipping">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-semibold border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md transition-all" data-testid="button-hero-learn">
                {t("hero.learn")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
