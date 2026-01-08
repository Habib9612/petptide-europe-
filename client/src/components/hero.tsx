import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight, FlaskConical, Shield, Truck, Sparkles } from "lucide-react";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-40" />
      
      <div className="container relative mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span>Premium Research-Grade Peptides</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl" data-testid="text-hero-title">
            Precision Peptides for{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              European Science
            </span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 md:text-xl" data-testid="text-hero-subtitle">
            {t("hero.subtitle")}
          </p>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/products">
              <Button size="lg" className="h-12 px-8 text-base gap-2" data-testid="button-hero-cta">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/shipping">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-slate-600 bg-slate-800/50 text-white hover:bg-slate-700/50 backdrop-blur-sm" data-testid="button-hero-learn">
                {t("hero.learn")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 backdrop-blur-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20">
              <Truck className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white" data-testid="text-trust-shipping">{t("trust.shipping")}</h3>
              <p className="text-sm text-slate-400">{t("trust.shippingDesc")}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 backdrop-blur-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20">
              <FlaskConical className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white" data-testid="text-trust-purity">{t("trust.purity")}</h3>
              <p className="text-sm text-slate-400">{t("trust.purityDesc")}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 backdrop-blur-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20">
              <Shield className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white" data-testid="text-trust-discreet">{t("trust.discreet")}</h3>
              <p className="text-sm text-slate-400">{t("trust.discreetDesc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
