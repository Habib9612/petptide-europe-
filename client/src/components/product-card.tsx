import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "./language-context";
import { useCart } from "@/lib/cart";
import { getCategoryName } from "@/lib/products";
import type { Product } from "@shared/schema";
import { ShoppingCart, FlaskConical, Eye } from "lucide-react";
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group relative overflow-visible transition-all duration-200 hover-elevate" data-testid={`card-product-${product.id}`}>
      {hasDiscount && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge className="bg-red-500 text-white border-0 px-2 py-1 text-xs font-semibold">
            -{discountPercent}%
          </Badge>
        </div>
      )}
      
      <Link href={`/product/${product.id}`}>
        <CardContent className="p-6">
          <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
            <div className="relative">
              <FlaskConical className="h-16 w-16 text-primary/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary mt-2">{product.codeName}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-primary" data-testid={`text-codename-${product.id}`}>
              {product.codeName}
            </p>
            <h3 className="font-semibold line-clamp-1" data-testid={`text-name-${product.id}`}>
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.shortDescription}
            </p>
            
            <div className="flex items-center justify-between pt-2">
              <Badge variant="secondary" className="text-xs">
                {getCategoryName(product.category)}
              </Badge>
              
              <div className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${isLowStock ? "bg-amber-500 animate-pulse" : "bg-green-500 animate-pulse"}`} />
                <span className={`text-xs ${isLowStock ? "text-amber-600 dark:text-amber-500" : "text-green-600 dark:text-green-500"}`} data-testid={`text-stock-${product.id}`}>
                  {isLowStock ? t("products.lowStock") : t("products.inStock")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex items-center justify-between gap-4 border-t p-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary" data-testid={`text-price-${product.id}`}>
              €{product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through" data-testid={`text-regular-price-${product.id}`}>
                €{product.regularPrice!.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1.5" data-testid={`button-view-${product.id}`}>
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View</span>
            </Button>
            <Button size="sm" className="gap-1.5" onClick={handleAddToCart} data-testid={`button-add-cart-${product.id}`}>
              <ShoppingCart className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
