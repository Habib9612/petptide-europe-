import { useLanguage } from "./language-context";
import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <section className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl flex gap-4">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 text-foreground/60" data-testid="text-disclaimer-title">
              {t("disclaimer.title")}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground" data-testid="text-disclaimer-body">
              {t("disclaimer.text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
