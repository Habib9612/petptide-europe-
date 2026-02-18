import { AlertTriangle } from "lucide-react";
import { useLanguage } from "./language-context";

export function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-950 border-y border-white/5 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent opacity-50" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-amber-500/5 border border-amber-500/20 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div>
              <h4 className="text-xl font-black text-amber-500 uppercase tracking-wider mb-2" data-testid="text-disclaimer-title">
                {t("legal.disclaimer")}
              </h4>
              <p className="text-amber-200/70 text-sm leading-relaxed font-medium" data-testid="text-disclaimer-body">
                {t("legal.disclaimerText")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
