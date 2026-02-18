import { useLanguage } from "./language-context";
import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <section style={{ background: "linear-gradient(135deg, hsl(215, 35%, 8%), hsl(200, 30%, 10%))" }} className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl flex gap-4">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "hsl(35, 70%, 55%)" }} />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "hsl(35, 65%, 55%)" }} data-testid="text-disclaimer-title">
              {t("legal.disclaimer")}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "hsl(210, 15%, 62%)" }} data-testid="text-disclaimer-body">
              {t("legal.disclaimerText")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
