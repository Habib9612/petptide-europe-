import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { useTheme } from "./theme-provider";
import { useCart } from "@/lib/cart";
import { ShoppingCart, Menu, X, Sun, Moon, FlaskConical, ChevronDown } from "lucide-react";
import { useState } from "react";
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
  { code: "fr", name: "Français", flag: "FR" },
  { code: "es", name: "Español", flag: "ES" },
  { code: "it", name: "Italiano", flag: "IT" },
  { code: "nl", name: "Nederlands", flag: "NL" },
];

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { getItemCount } = useCart();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const itemCount = getItemCount();
  const currentLang = languageOptions.find(l => l.code === language);

  const navLinks = [
    { href: "/products", label: t("nav.products") },
    { href: "/shipping", label: t("nav.shipping") },
    { href: "/terms", label: t("nav.terms") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1" data-testid="link-logo">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FlaskConical className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">Peptide Europe</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider hidden sm:block">Research Only</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={location === link.href ? "bg-accent" : ""}
                  data-testid={`link-nav-${link.href.slice(1)}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex gap-1" data-testid="button-language">
                  <span className="text-sm">{currentLang?.flag}</span>
                  <span className="text-sm">{currentLang?.name}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languageOptions.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? "bg-accent" : ""}
                    data-testid={`button-lang-${lang.code}`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative" data-testid="link-cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground" data-testid="badge-cart-count">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2" data-testid="nav-mobile">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${location === link.href ? "bg-accent" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <div className="pt-2 border-t">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <span>{currentLang?.flag}</span>
                    <span>{currentLang?.name}</span>
                    <ChevronDown className="h-3 w-3 opacity-50 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {languageOptions.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={language === lang.code ? "bg-accent" : ""}
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
  );
}
