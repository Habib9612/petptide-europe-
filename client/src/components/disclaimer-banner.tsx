import { AlertTriangle } from "lucide-react";
import { useLanguage } from "./language-context";

export function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <section className="bg-amber-500/10 border-y border-amber-500/20 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 text-center">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-500" />
          <div>
            <span className="font-semibold text-amber-700 dark:text-amber-400" data-testid="text-disclaimer-title">
              {t("legal.disclaimer")}:
            </span>{" "}
            <span className="text-amber-600 dark:text-amber-500" data-testid="text-disclaimer-body">
              {t("legal.disclaimerText")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
