import { useState } from "react";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { useLanguage } from "@/components/language-context";
import { getFeaturedProducts } from "@/lib/products";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  ArrowRight,
  FlaskConical,
  Shield,
  Truck,
  Award,
  Beaker,
  Microscope,
  TestTubes,
  Clock,
  CheckCircle2,
  BookOpen,
  Calculator,
  HelpCircle,
  Mail,
} from "lucide-react";

function StatsSection() {
  const stats = [
    { value: "20+", label: "Research Peptides", icon: FlaskConical },
    { value: "99%+", label: "HPLC Purity", icon: Award },
    { value: "48h", label: "EU Delivery", icon: Truck },
    { value: "10%", label: "Crypto Discount", icon: Shield },
  ];

  return (
    <section className="py-16 border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="flex justify-center mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const reasons = [
    {
      icon: Microscope,
      title: "Lab-Verified Quality",
      description: "Every batch undergoes rigorous HPLC and mass spectrometry analysis. We publish certificates of analysis for full transparency.",
    },
    {
      icon: TestTubes,
      title: "Research-Grade Standards",
      description: "Our peptides meet strict pharmaceutical-grade synthesis standards, ensuring consistency and reliability for your research.",
    },
    {
      icon: Truck,
      title: "Fast EU Shipping",
      description: "Orders ship within 24 hours. Free delivery on orders over 120. Discreet, temperature-controlled packaging.",
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "We operate in full compliance with European research chemical regulations. All products are strictly for in-vitro research use.",
    },
    {
      icon: Clock,
      title: "Proper Storage & Handling",
      description: "Products are stored at -20C and shipped with cold chain packaging to preserve peptide integrity throughout transit.",
    },
    {
      icon: Award,
      title: "Competitive Pricing",
      description: "Research-grade peptides at fair prices. Save an additional 10% when paying with cryptocurrency. No hidden fees.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-3 text-xs font-semibold tracking-widest uppercase">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-3" data-testid="text-why-title">Built for Serious Research</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            We supply laboratories and research institutions across Europe with peptides they can trust.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <Card key={reason.title} className="border-border/50" data-testid={`card-why-${reason.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <reason.icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PeptideInfoSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-3 text-xs font-semibold tracking-widest uppercase">
              About Peptides
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-4" data-testid="text-about-peptides-title">
              What Are Research Peptides?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Peptides are short chains of amino acids linked by peptide bonds. They serve as the building blocks of proteins and play crucial roles in biological processes including cell signaling, immune response, and tissue repair.
              </p>
              <p>
                In research settings, synthetic peptides are used to study cellular mechanisms, develop new therapeutic strategies, and advance our understanding of molecular biology. Each peptide has a unique amino acid sequence that determines its biological activity.
              </p>
              <p>
                At Peptide Europe, we provide high-purity synthetic peptides manufactured under strict quality controls. Our catalog includes GLP-1 agonists, growth hormone secretagogues, healing peptides, cosmetic peptides, and nootropic compounds — all for in-vitro research use only.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <h3 className="font-semibold">Lyophilized (Freeze-Dried) Powder</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  All peptides are supplied as stable lyophilized powder. This form ensures maximum shelf life when stored at -20C and protects molecular integrity.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <h3 className="font-semibold">Certificate of Analysis (CoA)</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Each product comes with documentation verifying purity, identity, and molecular weight through HPLC and mass spectrometry testing.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <h3 className="font-semibold">Reconstitution Required</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-8">
                  Peptides must be reconstituted with bacteriostatic water before use. Our calculator tool helps determine the correct dilution ratios.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  const tools = [
    {
      icon: Calculator,
      title: "Reconstitution Calculator",
      description: "Calculate precise dosing, draw volumes, and vial supply duration for any peptide.",
      href: "/calculator",
      cta: "Open Calculator",
    },
    {
      icon: BookOpen,
      title: "Research Insights",
      description: "Read articles about peptide science, handling protocols, and the latest research findings.",
      href: "/insights",
      cta: "Read Insights",
    },
    {
      icon: HelpCircle,
      title: "FAQ & Support",
      description: "Find answers about ordering, shipping, storage, quality testing, and return policies.",
      href: "/faq",
      cta: "View FAQ",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-3 text-xs font-semibold tracking-widest uppercase">
            Resources
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-3" data-testid="text-tools-title">Research Tools & Resources</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Free tools and educational content to support your peptide research.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full border-border/50 hover-elevate transition-colors" data-testid={`card-tool-${tool.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary mb-4">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{tool.description}</p>
                  <span className="text-sm font-medium text-primary flex items-center gap-1">
                    {tool.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </CardContent>
              </Card>
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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2" data-testid="text-newsletter-title">Get 10% Off Your First Order</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter and receive a unique discount code for 10% off.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-primary font-medium" data-testid="text-newsletter-success">
              <CheckCircle2 className="h-5 w-5" />
              <span>Your discount code has been sent!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
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
      <StatsSection />
      <PeptideInfoSection />
      <WhySection />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-lg">
              <Badge variant="outline" className="mb-3 text-xs font-semibold tracking-widest uppercase">
                Catalog
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-3" data-testid="text-featured-title">
                {t("products.featured")}
              </h2>
              <p className="text-muted-foreground">
                Our most requested high-purity research peptides, trusted by laboratories across Europe.
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-2 font-semibold" data-testid="button-view-all">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <ToolsSection />
      <NewsletterSection />
      <DisclaimerBanner />
    </div>
  );
}
