import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CryptoBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("peptide-crypto-banner-dismissed");
    if (dismissed !== "true") {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("peptide-crypto-banner-dismissed", "true");
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      data-testid="banner-crypto"
    >
      <div className="flex items-center gap-3 rounded-md border bg-card px-4 py-3 shadow-lg">
        <div>
          <p className="text-sm font-medium">Pay with crypto, save 10%</p>
          <p className="text-xs text-muted-foreground">Bitcoin, Ethereum & USDT accepted</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          data-testid="button-dismiss-crypto"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
