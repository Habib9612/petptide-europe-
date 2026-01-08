import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "./language-context";
import { ShieldCheck, AlertTriangle } from "lucide-react";

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
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      data-testid="modal-age-verification"
    >
      <Card className="mx-4 max-w-md border-primary/20 bg-card shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold" data-testid="text-age-title">
            {t("age.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-3 rounded-lg bg-amber-500/10 p-4 border border-amber-500/20">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-age-body">
              {t("age.body")}
            </p>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button 
              onClick={handleAgree}
              className="flex-1"
              size="lg"
              data-testid="button-age-agree"
            >
              {t("age.agree")}
            </Button>
            <Button 
              onClick={handleExit}
              variant="outline"
              size="lg"
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
