import { Link } from "wouter";
import { useLanguage } from "./language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-sm font-bold tracking-tight">Peptide<span className="text-primary">Europe</span></span>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed max-w-xs">
              Research-grade peptides with lab-verified purity for European laboratories and research institutions.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Shop</h3>
            <nav className="flex flex-col gap-1.5">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-products">All Products</Link>
              <Link href="/calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-calculator">Calculator</Link>
              <Link href="/insights" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-insights">Insights</Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-faq">FAQ</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Legal</h3>
            <nav className="flex flex-col gap-1.5">
              <Link href="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-shipping">Shipping</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">Terms of Service</Link>
              <Link href="/refund" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-refund">Refund Policy</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Payment</h3>
            <p className="text-sm text-muted-foreground mb-1">Bitcoin, Ethereum, USDT</p>
            <p className="text-sm text-muted-foreground mb-1">SEPA Bank Transfer</p>
            <p className="text-sm text-muted-foreground">Credit Card</p>
            <p className="text-xs text-muted-foreground mt-2">10% off with crypto</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground" data-testid="text-copyright">
            {t("footer.copyright")}
          </p>
          <p className="text-xs text-muted-foreground" data-testid="text-research-only">
            {t("footer.research")}
          </p>
        </div>
      </div>
    </footer>
  );
}
