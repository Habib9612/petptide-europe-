import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { useCart } from "@/lib/cart";
import { ShoppingCart, Menu, X, ChevronDown, Truck } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Language } from "@/lib/i18n";

const languageOptions: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "GB" },
  { code: "de", name: "Deutsch", flag: "DE" },
  { code: "fr", name: "Fran\u00e7ais", flag: "FR" },
  { code: "es", name: "Espa\u00f1ol", flag: "ES" },
  { code: "it", name: "Italiano", flag: "IT" },
  { code: "nl", name: "Nederlands", flag: "NL" },
];

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { getItemCount } = useCart();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const itemCount = getItemCount();
  const currentLang = languageOptions.find(l => l.code === language);

  const navLinks = [
    { href: "/products", label: t("nav.products") },
    { href: "/peptide-guide", label: "Dosage Guide" },
    { href: "/calculator", label: "Calculator" },
    { href: "/insights", label: "Insights" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/partners", label: "Partners" },
  ];

  return (
    <>
    <div className="w-full text-center py-1.5 text-xs font-medium tracking-wide text-foreground bg-secondary border-b border-border" data-testid="banner-free-shipping">
      <Truck className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5 text-primary" />
      Free Shipping on Orders Over &euro;120
    </div>
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between gap-6">
          <Link href="/" data-testid="link-logo">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm ${location === link.href ? "text-primary" : "text-muted-foreground"}`}
                  data-testid={`link-nav-${link.href.slice(1)}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <div className="hidden sm:flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground" data-testid="button-language">
                    <span>{currentLang?.flag}</span>
                    <span className="font-medium uppercase">{currentLang?.code}</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  {languageOptions.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`cursor-pointer ${language === lang.code ? "text-primary" : ""}`}
                      data-testid={`button-lang-${lang.code}`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

            </div>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative" data-testid="link-cart">
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground" data-testid="badge-cart-count">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-3 space-y-1" data-testid="nav-mobile">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start ${location === link.href ? "text-primary" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <div className="flex items-center gap-1 pt-2 border-t border-border mt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <span>{currentLang?.flag}</span>
                    <span>{currentLang?.name}</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-44">
                  {languageOptions.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`cursor-pointer ${language === lang.code ? "text-primary" : ""}`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </header>
    </>
  );
}
