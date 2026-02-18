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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group" data-testid="link-logo">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <FlaskConical className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-none uppercase">Peptide<span className="text-primary">Europe</span></span>
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em] mt-1 hidden sm:block">Precision Science</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`px-4 font-semibold text-sm transition-colors ${location === link.href ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-primary"}`}
                  data-testid={`link-nav-${link.href.slice(1)}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-muted/50 rounded-full p-1 pr-3 gap-2 border border-border/50">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 rounded-full gap-2 px-3 hover:bg-background" data-testid="button-language">
                    <span className="text-base leading-none">{currentLang?.flag}</span>
                    <span className="text-xs font-bold uppercase tracking-wider">{currentLang?.code}</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl">
                  {languageOptions.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`rounded-lg cursor-pointer mb-1 last:mb-0 ${language === lang.code ? "bg-primary/10 text-primary" : ""}`}
                      data-testid={`button-lang-${lang.code}`}
                    >
                      <span className="mr-3 text-lg">{lang.flag}</span>
                      <span className="font-semibold">{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="w-[1px] h-4 bg-border/50" />

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-background"
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Link href="/cart">
              <Button size="icon" className="h-11 w-11 rounded-xl relative shadow-lg shadow-primary/10 transition-transform active:scale-95" data-testid="link-cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-black text-white ring-2 ring-background animate-in zoom-in" data-testid="badge-cart-count">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-11 w-11 rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
