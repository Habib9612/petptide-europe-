import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight, Shield, Truck, Award } from "lucide-react";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-md border border-blue-400/20 bg-blue-400/5 px-3 py-1.5 text-xs font-medium text-blue-300 backdrop-blur-sm">
            <Award className="h-3.5 w-3.5" />
            <span>HPLC Verified &middot; 98-99%+ Purity</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]" data-testid="text-hero-title">
            Research-Grade Peptides{" "}
            <span className="text-blue-400">
              for European Laboratories
            </span>
          </h1>

          <p className="mb-10 max-w-xl text-base text-slate-400 sm:text-lg leading-relaxed" data-testid="text-hero-subtitle">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link href="/products">
              <Button size="lg" className="gap-2 font-semibold" data-testid="button-hero-cta">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/insights">
              <Button size="lg" variant="outline" className="border-white/15 bg-white/5 text-white backdrop-blur-sm" data-testid="button-hero-learn">
                Learn About Peptides
              </Button>
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap gap-6 sm:gap-10 text-sm text-slate-400">
            <div className="flex items-center gap-2" data-testid="trust-shipping">
              <Truck className="h-4 w-4 text-blue-400" />
              <span>Free EU Shipping Over 120</span>
            </div>
            <div className="flex items-center gap-2" data-testid="trust-research">
              <Shield className="h-4 w-4 text-blue-400" />
              <span>For Research Use Only</span>
            </div>
            <div className="flex items-center gap-2" data-testid="trust-crypto">
              <Award className="h-4 w-4 text-blue-400" />
              <span>10% Off with Crypto</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
