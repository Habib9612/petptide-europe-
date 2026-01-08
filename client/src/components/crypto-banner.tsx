import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { SiBitcoin } from "react-icons/si";

export function CryptoBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("peptide-crypto-banner-dismissed");
    if (dismissed !== "true") {
      const timer = setTimeout(() => setIsVisible(true), 2000);
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
      className={`fixed bottom-4 right-4 z-50 max-w-sm transform transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      data-testid="banner-crypto"
    >
      <div className="relative overflow-hidden rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 shadow-lg backdrop-blur-sm">
        <button
          onClick={handleDismiss}
          className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
          data-testid="button-dismiss-crypto"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="flex items-center gap-3 pr-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
            <SiBitcoin className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Pay with Crypto</p>
            <p className="text-sm text-muted-foreground">Save 10% on all orders!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
