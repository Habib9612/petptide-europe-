import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "./language-context";
import { useCart } from "@/lib/cart";
import { getCategoryName } from "@/lib/products";
import { getProductImage } from "@/lib/product-images";
import type { Product } from "@shared/schema";
import { ShoppingCart, FlaskConical } from "lucide-react";
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
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice! - product.price) / product.regularPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group relative flex flex-col h-full border-border/50 hover-elevate" data-testid={`card-product-${product.id}`}>
      {hasDiscount && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="text-[10px] font-semibold" data-testid={`badge-discount-${product.id}`}>
            -{discountPercent}%
          </Badge>
        </div>
      )}

      <Link href={`/product/${product.id}`} className="flex flex-col flex-1" data-testid={`link-product-${product.id}`}>
        <div className="relative p-5 flex-1">
          <div className="mb-5 flex h-36 items-center justify-center rounded-md bg-muted/50">
            {getProductImage(product.id, "") ? (
              <img
                src={getProductImage(product.id, "")}
                alt={product.name}
                className="h-full w-full object-contain p-2"
                data-testid={`img-product-${product.id}`}
              />
            ) : (
              <div className="relative">
                <FlaskConical className="h-16 w-16 text-muted-foreground/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-muted-foreground mt-2.5 tracking-widest">{product.codeName}</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Badge variant="outline" className="text-[10px]" data-testid={`badge-category-${product.id}`}>
                {getCategoryName(product.category)}
              </Badge>
              <div className="flex items-center gap-1">
                <span className={`h-1.5 w-1.5 rounded-full ${isLowStock ? "bg-amber-500" : "bg-emerald-500"}`} />
                <span className="text-[10px] text-muted-foreground" data-testid={`text-stock-${product.id}`}>
                  {isLowStock ? t("products.lowStock") : t("products.inStock")}
                </span>
              </div>
            </div>

            <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors" data-testid={`text-name-${product.id}`}>
              {product.name}
            </h3>

            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed" data-testid={`text-description-${product.id}`}>
              {product.shortDescription}
            </p>
          </div>
        </div>
      </Link>

      <CardFooter className="flex items-center justify-between gap-3 p-5 pt-0 mt-auto">
        <div>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through mr-1.5" data-testid={`text-regular-price-${product.id}`}>
              {product.regularPrice!.toFixed(2)}
            </span>
          )}
          <span className="text-xl font-bold" data-testid={`text-price-${product.id}`}>
            {product.price.toFixed(2)}
          </span>
        </div>

        <Button size="sm" onClick={handleAddToCart} data-testid={`button-add-cart-${product.id}`}>
          <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
