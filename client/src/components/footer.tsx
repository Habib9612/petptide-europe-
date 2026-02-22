import { Link } from "wouter";
import { useLanguage } from "./language-context";
import { Logo } from "./logo";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size="sm" className="mb-2" />
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Buy research peptides online in Europe. 99%+ purity, HPLC tested, with Certificate of Analysis. Fast EU-wide shipping.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-3">Shop</h3>
            <nav className="flex flex-col gap-1.5">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-products">All Peptides</Link>
              <Link href="/peptide-guide" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-guide">Dosage Guide</Link>
              <Link href="/calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-calculator">Reconstitution Calculator</Link>
              <Link href="/insights" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-insights">Research Insights</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-3">Company</h3>
            <nav className="flex flex-col gap-1.5">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">About Us</Link>
              <Link href="/partners" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-partners">Partner Program</Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-faq">FAQ</Link>
              <Link href="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-shipping">Shipping & Returns</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">Terms of Service</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-3">Payment</h3>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <p>Bitcoin, Ethereum, USDT</p>
              <p>SEPA Bank Transfer</p>
              <p>Credit Card</p>
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-primary/5 border border-primary/15">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-primary">10% off with crypto</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
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
