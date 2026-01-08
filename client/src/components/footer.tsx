import { Link } from "wouter";
import { useLanguage } from "./language-context";
import { FlaskConical, Shield, Truck, Lock, CreditCard } from "lucide-react";
import { SiBitcoin, SiEthereum } from "react-icons/si";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <FlaskConical className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-bold">Peptide Europe</span>
                <p className="text-xs text-muted-foreground">Precision Peptides for European Science</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium research-grade peptides with lab-verified purity. Serving laboratories and research institutions across Europe.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-products">
                Products
              </Link>
              <Link href="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-shipping">
                Shipping
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">
                Terms of Service
              </Link>
              <Link href="/refund" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-refund">
                Refund Policy
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Trust & Security</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>Research Use Only</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4 text-primary" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" />
                <span>Discreet Packaging</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Payment Methods</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex h-10 w-14 items-center justify-center rounded-md bg-muted/50 border">
                <SiBitcoin className="h-6 w-6 text-[#f7931a]" />
              </div>
              <div className="flex h-10 w-14 items-center justify-center rounded-md bg-muted/50 border">
                <SiEthereum className="h-6 w-6 text-[#627eea]" />
              </div>
              <div className="flex h-10 w-14 items-center justify-center rounded-md bg-muted/50 border">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Save 10% when paying with cryptocurrency
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-500">
            <Shield className="h-4 w-4" />
            <span data-testid="text-research-only">{t("footer.research")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
