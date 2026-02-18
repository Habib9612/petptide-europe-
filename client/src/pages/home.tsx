import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { CategorySection } from "@/components/category-section";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { useLanguage } from "@/components/language-context";
import { getFeaturedProducts } from "@/lib/products";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      <Hero />
      
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-cyan-500/5 blur-[100px] rounded-full -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4 border-primary/20 text-primary font-bold tracking-widest uppercase text-[10px]">
                Research Catalog
              </Badge>
              <h2 className="text-4xl font-black mb-4 tracking-tight" data-testid="text-featured-title">
                {t("products.featured")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Explore our most requested high-purity research peptides, trusted by laboratories across Europe for precision and reliability.
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" size="lg" className="group h-12 px-6 font-bold border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm" data-testid="button-view-all">
                Explore All Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CategorySection />
      
      <DisclaimerBanner />
    </div>
  );
}
