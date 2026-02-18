import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "./language-context";
import { useCart } from "@/lib/cart";
import { getCategoryName } from "@/lib/products";
import { getProductImage } from "@/lib/product-images";
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
    <Card className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 border-border/50 bg-card/50 backdrop-blur-sm" data-testid={`card-product-${product.id}`}>
      {hasDiscount && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-primary text-primary-foreground border-none px-2.5 py-1 text-xs font-bold shadow-lg">
            -{discountPercent}%
          </Badge>
        </div>
      )}
      
      <Link href={`/product/${product.id}`} className="flex flex-col flex-1">
        <div className="relative p-6 pt-8 flex-1">
          <div className="mb-6 flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100/50 to-slate-50/30 dark:from-slate-800/50 dark:to-slate-900/30 group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
            {getProductImage(product.id, "") ? (
              <img
                src={getProductImage(product.id, "")}
                alt={product.name}
                className="h-full w-full object-contain p-2"
                data-testid={`img-product-${product.id}`}
              />
            ) : (
              <div className="relative">
                <FlaskConical className="h-20 w-20 text-primary/40 group-hover:text-primary/60 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-black text-primary/80 mt-3 tracking-widest">{product.codeName}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70" data-testid={`text-codename-${product.id}`}>
                {product.codeName}
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${isLowStock ? "bg-amber-500" : "bg-emerald-500"}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isLowStock ? t("products.lowStock") : t("products.inStock")}
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors" data-testid={`text-name-${product.id}`}>
              {product.name}
            </h3>
            
            <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>
        </div>
        
        <CardFooter className="flex flex-col gap-4 p-6 pt-0 mt-auto">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-xs text-muted-foreground line-through decoration-primary/30" data-testid={`text-regular-price-${product.id}`}>
                  €{product.regularPrice!.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-black tracking-tight text-foreground" data-testid={`text-price-${product.id}`}>
                €{product.price.toFixed(2)}
              </span>
            </div>
            
            <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary font-bold px-3 py-1">
              {getCategoryName(product.category)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" className="h-10 font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300" data-testid={`button-view-${product.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              Detail
            </Button>
            <Button className="h-10 font-bold shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all" onClick={handleAddToCart} data-testid={`button-add-cart-${product.id}`}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
