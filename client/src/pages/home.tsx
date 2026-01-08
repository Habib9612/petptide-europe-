import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { CategorySection } from "@/components/category-section";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { useLanguage } from "@/components/language-context";
import { getFeaturedProducts } from "@/lib/products";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      <Hero />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2" data-testid="text-featured-title">
                {t("products.featured")}
              </h2>
              <p className="text-muted-foreground">
                Our most popular research peptides
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-2" data-testid="button-view-all">
                View All
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

      <CategorySection />
      
      <DisclaimerBanner />
    </div>
  );
}
