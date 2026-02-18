import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "./language-context";
import { useCart } from "@/lib/cart";
import { getCategoryName } from "@/lib/products";
import { getProductImage } from "@/lib/product-images";
import type { Product } from "@shared/schema";
import { Plus, FlaskConical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const { toast } = useToast();

  const isLowStock = product.stock < 5;
  const hasDiscount = product.regularPrice && product.regularPrice > product.price;

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
          <div className="mb-4 flex h-32 items-center justify-center rounded-md bg-muted/40">
            {getProductImage(product.id, "") ? (
              <img
                src={getProductImage(product.id, "")}
                alt={product.name}
                className="h-full w-full object-contain p-3"
                data-testid={`img-product-${product.id}`}
              />
            ) : (
              <FlaskConical className="h-12 w-12 text-muted-foreground/20" />
            )}
          </div>

          <div className="space-y-1.5">
            <p className="text-[11px] text-muted-foreground" data-testid={`badge-category-${product.id}`}>
              {getCategoryName(product.category)}
            </p>
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
