import { useLanguage } from "./language-context";

export function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/80 mb-1.5" data-testid="text-disclaimer-title">
            {t("legal.disclaimer")}
          </p>
          <p className="text-xs text-slate-400 leading-relaxed" data-testid="text-disclaimer-body">
            {t("legal.disclaimerText")}
          </p>
        </div>
      </div>
    </section>
  );
}
