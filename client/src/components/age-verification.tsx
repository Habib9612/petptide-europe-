import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "./language-context";

export function AgeVerification() {
  const { t } = useLanguage();
  const [isVerified, setIsVerified] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("peptide-europe-age-verified");
    if (verified !== "true") {
      setIsVerified(false);
      setIsVisible(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem("peptide-europe-age-verified", "true");
    setIsVisible(false);
    setTimeout(() => setIsVerified(true), 300);
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  if (isVerified) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      data-testid="modal-age-verification"
    >
      <Card className="mx-4 max-w-sm">
        <CardContent className="p-6 space-y-5">
          <div>
            <h2 className="text-lg font-bold mb-1" data-testid="text-age-title">
              {t("age.title")}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-age-body">
              {t("age.body")}
            </p>
          </div>

          <div className="rounded-md bg-muted border border-border p-3">
            <p className="text-xs text-muted-foreground">
              All products are intended for laboratory research purposes only. Not for human consumption.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleAgree}
              className="flex-1"
              data-testid="button-age-agree"
            >
              {t("age.agree")}
            </Button>
            <Button 
              onClick={handleExit}
              variant="outline"
              className="flex-1"
              data-testid="button-age-exit"
            >
              {t("age.exit")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
