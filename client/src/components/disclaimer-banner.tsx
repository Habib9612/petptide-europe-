import { useLanguage } from "./language-context";
import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <section className="py-8 bg-[#0A0F1E] border-t border-[#7D00FF]/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl flex gap-4">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400/70" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 text-amber-400/80" data-testid="text-disclaimer-title">
              {t("legal.disclaimer")}
            </p>
            <p className="text-xs leading-relaxed text-[#8A94B6]" data-testid="text-disclaimer-body">
              {t("legal.disclaimerText")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
