import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "./language-context";
import { useCart } from "@/lib/cart";
import { getCategoryName } from "@/lib/products";
import { getProductImage } from "@/lib/product-images";
import type { Product } from "@shared/schema";
import { Plus, FlaskConical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categoryColors: Record<string, string> = {
  glp1: "hsl(186, 60%, 42%)",
  growth: "hsl(155, 50%, 40%)",
  healing: "hsl(35, 65%, 50%)",
  cosmetic: "hsl(262, 45%, 52%)",
  nootropics: "hsl(340, 55%, 48%)",
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const { toast } = useToast();

  const hasDiscount = product.regularPrice && product.regularPrice > product.price;
  const catColor = categoryColors[product.category] || "hsl(186, 60%, 42%)";

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} added.`,
    });
  };

  return (
    <Card className="group relative flex flex-col h-full hover-elevate" data-testid={`card-product-${product.id}`}>
      <Link href={`/product/${product.id}`} className="flex flex-col flex-1" data-testid={`link-product-${product.id}`}>
        <div className="p-4 pb-0 flex-1">
          <div className="mb-4 flex h-52 items-center justify-center rounded-md bg-muted/50 overflow-hidden">
            {getProductImage(product.id, "") ? (
              <img
                src={getProductImage(product.id, "")}
                alt={product.name}
                className="h-full w-full object-cover"
                data-testid={`img-product-${product.id}`}
              />
            ) : (
              <FlaskConical className="h-12 w-12 text-muted-foreground/20" />
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: catColor }} />
              <p className="text-[11px] text-muted-foreground truncate" data-testid={`badge-category-${product.id}`}>
                {getCategoryName(product.category)}
              </p>
            </div>
            <h3 className="font-semibold text-sm leading-snug" data-testid={`text-name-${product.id}`}>
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed" data-testid={`text-description-${product.id}`}>
              {product.shortDescription}
            </p>
          </div>
        </div>
      </Link>

      <CardFooter className="flex items-center justify-between gap-3 p-4 pt-3 mt-auto">
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold" data-testid={`text-price-${product.id}`}>
            &euro;{product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through" data-testid={`text-regular-price-${product.id}`}>
              &euro;{product.regularPrice!.toFixed(2)}
            </span>
          )}
        </div>

        <Button size="icon" variant="outline" onClick={handleAddToCart} data-testid={`button-add-cart-${product.id}`}>
          <Plus className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
