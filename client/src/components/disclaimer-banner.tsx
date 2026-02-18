import { AlertTriangle } from "lucide-react";
import { useLanguage } from "./language-context";

export function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-950 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-1" data-testid="text-disclaimer-title">
                {t("legal.disclaimer")}
              </h4>
              <p className="text-amber-200/60 text-xs leading-relaxed" data-testid="text-disclaimer-body">
                {t("legal.disclaimerText")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
