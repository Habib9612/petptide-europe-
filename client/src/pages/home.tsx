import { useState } from "react";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { useLanguage } from "@/components/language-context";
import { getFeaturedProducts } from "@/lib/products";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
} from "lucide-react";

function StatsBar() {
  return (
    <section className="border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-y-4 gap-x-8 py-6 text-sm">
          <div className="flex items-baseline gap-2" data-testid="stat-peptides">
            <span className="text-2xl font-bold">20+</span>
            <span className="text-muted-foreground">research peptides</span>
          </div>
          <div className="flex items-baseline gap-2" data-testid="stat-purity">
            <span className="text-2xl font-bold">99%+</span>
            <span className="text-muted-foreground">HPLC-verified purity</span>
          </div>
          <div className="flex items-baseline gap-2" data-testid="stat-shipping">
            <span className="text-2xl font-bold">48h</span>
            <span className="text-muted-foreground">EU delivery</span>
          </div>
          <div className="flex items-baseline gap-2" data-testid="stat-discount">
            <span className="text-2xl font-bold">-10%</span>
            <span className="text-muted-foreground">with crypto payment</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6" data-testid="text-about-peptides-title">
              What are research peptides?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Peptides are short chains of amino acids that serve as the building blocks of proteins. In research settings, synthetic peptides are used to study cellular mechanisms, develop new therapeutic strategies, and advance molecular biology.
              </p>
              <p>
                Our catalog includes GLP-1 agonists, growth hormone secretagogues, healing peptides, cosmetic peptides, and nootropic compounds. All products are supplied as lyophilized powder with published certificates of analysis.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="border-l-2 border-primary/30 pl-5" data-testid="card-info-lyophilized">
              <h3 className="font-semibold mb-1">Lyophilized powder</h3>
              <p className="text-sm text-muted-foreground">Freeze-dried for stability. Store at -20C for maximum shelf life.</p>
            </div>
            <div className="border-l-2 border-primary/30 pl-5" data-testid="card-info-coa">
              <h3 className="font-semibold mb-1">Certificate of analysis</h3>
              <p className="text-sm text-muted-foreground">HPLC and mass spectrometry verification included with every batch.</p>
            </div>
            <div className="border-l-2 border-primary/30 pl-5" data-testid="card-info-reconstitution">
              <h3 className="font-semibold mb-1">Reconstitution required</h3>
              <p className="text-sm text-muted-foreground">Use our <Link href="/calculator" className="text-primary hover:underline" data-testid="link-about-calculator">calculator tool</Link> to determine correct dilution ratios.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const points = [
    { title: "Lab-verified quality", desc: "Every batch tested via HPLC and mass spectrometry. Certificates of analysis published for full transparency." },
    { title: "Fast EU shipping", desc: "Orders ship within 24 hours. Free delivery on orders over \u20AC120. Temperature-controlled packaging." },
    { title: "Regulatory compliance", desc: "Full compliance with European research chemical regulations. Strictly for in-vitro research use." },
    { title: "Cold chain storage", desc: "Products stored at -20\u00B0C and shipped with cold chain packaging to preserve peptide integrity." },
    { title: "Fair pricing", desc: "Research-grade peptides without markup. Save an additional 10% when paying with cryptocurrency." },
    { title: "Research-grade standards", desc: "Pharmaceutical-grade synthesis ensuring consistency and reliability for your laboratory work." },
  ];

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4" data-testid="text-why-title">
          Why researchers choose us
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl">
          We supply laboratories and institutions across Europe with peptides they can rely on.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {points.map((point, i) => (
            <div key={i} data-testid={`card-why-${i}`}>
              <h3 className="font-semibold mb-1.5">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourcesBar() {
  const links = [
    { label: "Reconstitution Calculator", href: "/calculator", desc: "Dosing, draw volumes, vial duration" },
    { label: "Research Insights", href: "/insights", desc: "Articles on peptide science" },
    { label: "FAQ", href: "/faq", desc: "Ordering, shipping, storage" },
  ];

  return (
    <section className="border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="py-12 grid sm:grid-cols-3 gap-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} data-testid={`link-resource-${link.href.slice(1)}`}>
              <div className="group flex items-center justify-between">
                <div>
                  <p className="font-semibold group-hover:text-primary transition-colors">{link.label}</p>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/newsletter", { email });
      setSubmitted(true);
      setEmail("");
      toast({
        title: "Welcome!",
        description: "Check your inbox for your 10% discount code.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-lg">
          <h2 className="text-xl font-bold tracking-tight mb-1.5" data-testid="text-newsletter-title">
            10% off your first order
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Subscribe and get a unique discount code sent to your inbox.
          </p>

          {submitted ? (
            <div className="flex items-center gap-2 text-primary font-medium text-sm" data-testid="text-newsletter-success">
              <CheckCircle2 className="h-4 w-4" />
              <span>Discount code sent. Check your email.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="you@lab.eu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" disabled={isSubmitting} data-testid="button-newsletter-subscribe">
                {isSubmitting ? "..." : "Subscribe"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      <Hero />
      <StatsBar />
      <AboutSection />
      <WhySection />

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2" data-testid="text-featured-title">
                {t("products.featured")}
              </h2>
              <p className="text-muted-foreground text-sm">
                Our most requested peptides, trusted by labs across Europe.
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" size="sm" className="gap-2 shrink-0" data-testid="button-view-all">
                View all products
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <ResourcesBar />
      <NewsletterSection />
      <DisclaimerBanner />
    </div>
  );
}
