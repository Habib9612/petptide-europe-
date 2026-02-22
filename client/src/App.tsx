import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/language-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AgeVerification } from "@/components/age-verification";
import { CryptoBanner } from "@/components/crypto-banner";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import Shipping from "@/pages/shipping";
import Terms from "@/pages/terms";
import Refund from "@/pages/refund";
import Insights from "@/pages/insights";
import BlogPost from "@/pages/blog-post";
import UserBlogPostPage from "@/pages/user-blog-post";
import PeptideCalculator from "@/pages/peptide-calculator";
import FAQ from "@/pages/faq";
import PeptideGuide from "@/pages/peptide-guide";
import CheckoutSuccess from "@/pages/checkout-success";
import About from "@/pages/about";
import Partners from "@/pages/partners";
import PartnerSignup from "@/pages/partner-signup";
import PartnerDashboard from "@/pages/partner-dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/insights" component={Insights} />
      <Route path="/insights/user/:id" component={UserBlogPostPage} />
      <Route path="/insights/:slug" component={BlogPost} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout/success" component={CheckoutSuccess} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/shipping" component={Shipping} />
      <Route path="/terms" component={Terms} />
      <Route path="/refund" component={Refund} />
      <Route path="/calculator" component={PeptideCalculator} />
      <Route path="/faq" component={FAQ} />
      <Route path="/peptide-guide" component={PeptideGuide} />
      <Route path="/about" component={About} />
      <Route path="/partners" component={Partners} />
      <Route path="/partners/signup" component={PartnerSignup} />
      <Route path="/partners/dashboard" component={PartnerDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col bg-background text-foreground">
              <AgeVerification />
              <Header />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
              <CryptoBanner />
            </div>
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
