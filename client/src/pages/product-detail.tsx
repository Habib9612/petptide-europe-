import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/language-context";
import { useCart } from "@/lib/cart";
import { getProductById, getCategoryName } from "@/lib/products";
import { getProductImage } from "@/lib/product-images";
import { useToast } from "@/hooks/use-toast";
import {
  ShoppingCart,
  ArrowLeft,
  FlaskConical,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const { t } = useLanguage();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = params?.id ? getProductById(params.id) : null;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold mb-4">Product not found</h1>
        <Link href="/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
    );
  }

  const isLowStock = product.stock < 5;
  const hasDiscount = product.regularPrice && product.regularPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice! - product.price) / product.regularPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added.`,
    });
  };

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, product.stock));
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1));

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Link href="/products">
          <Button variant="ghost" size="sm" className="mb-6 gap-1.5 text-muted-foreground" data-testid="button-back">
            <ArrowLeft className="h-3.5 w-3.5" />
            Products
          </Button>
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="flex h-72 lg:h-96 items-center justify-center rounded-md bg-gradient-to-b from-muted/60 to-muted/20 border border-border/50">
              {getProductImage(product.id, "") ? (
                <img
                  src={getProductImage(product.id, "")}
                  alt={product.name}
                  className="h-full w-full object-contain p-6"
                  data-testid="img-product-detail"
                />
              ) : (
                <FlaskConical className="h-24 w-24 text-muted-foreground/15" />
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
              <div className="rounded-md border border-border/50 py-2.5" data-testid="info-shipping">Fast EU shipping</div>
              <div className="rounded-md border border-border/50 py-2.5" data-testid="info-purity">HPLC verified</div>
              <div className="rounded-md border border-border/50 py-2.5" data-testid="info-packaging">Discreet packaging</div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1" data-testid="text-product-codename">
                {product.codeName}
              </p>
              <h1 className="text-2xl font-bold mb-2" data-testid="text-product-name">
                {product.name}
              </h1>
              <p className="text-xs text-muted-foreground">{getCategoryName(product.category)}</p>
            </div>

            <div className="flex items-center gap-1.5 text-sm">
              <span className={`h-2 w-2 rounded-full ${isLowStock ? "bg-amber-500" : "bg-emerald-500"}`} />
              <span className={isLowStock ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"} data-testid="text-product-stock">
                {isLowStock ? t("products.lowStock") : t("products.inStock")} ({product.stock} units)
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold" data-testid="text-product-price">
                &euro;{product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through" data-testid="text-product-regular-price">
                    &euro;{product.regularPrice!.toFixed(2)}
                  </span>
                  <Badge variant="secondary" className="text-xs">-{discountPercent}%</Badge>
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-product-short-desc">
              {product.shortDescription}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border rounded-md">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  data-testid="button-decrease-qty"
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="w-10 text-center text-sm font-medium" data-testid="text-quantity">
                  {quantity}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  data-testid="button-increase-qty"
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>

              <Button className="flex-1 gap-2" onClick={handleAddToCart} data-testid="button-add-to-cart">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart &mdash; &euro;{(product.price * quantity).toFixed(2)}
              </Button>
            </div>

            <Tabs defaultValue="description" className="pt-4">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="description" data-testid="tab-description">
                  {t("product.description")}
                </TabsTrigger>
                <TabsTrigger value="specs" data-testid="tab-specs">
                  {t("product.specs")}
                </TabsTrigger>
                <TabsTrigger value="disclaimer" data-testid="tab-disclaimer">
                  {t("product.disclaimer")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed" data-testid="text-full-description">
                  {product.fullDescription}
                </p>
              </TabsContent>

              <TabsContent value="specs" className="mt-4 space-y-3">
                {product.sequence && product.sequence !== "N/A (Coenzyme)" && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">{t("product.sequence")}</p>
                    <p className="text-xs font-mono break-all" data-testid="text-sequence">
                      {product.sequence}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{t("product.cas")}</p>
                    <p className="text-sm" data-testid="text-cas">{product.casNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{t("product.purity")}</p>
                    <p className="text-sm" data-testid="text-purity">{product.purity}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{t("product.formula")}</p>
                    <p className="text-sm" data-testid="text-formula">{product.molecularFormula}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{t("product.weight")}</p>
                    <p className="text-sm" data-testid="text-weight">{product.molecularWeight}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{t("product.storage")}</p>
                  <p className="text-sm" data-testid="text-storage">{product.storage}</p>
                </div>
              </TabsContent>

              <TabsContent value="disclaimer" className="mt-4">
                <div className="rounded-md bg-amber-500/5 border border-amber-500/15 p-4">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1.5">
                    Research Use Only
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This product is intended for laboratory research purposes only. It is not
                    intended for human consumption, diagnostic, therapeutic, or veterinary use.
                    By purchasing, you confirm you are acquiring it for legitimate research
                    purposes and will handle it in accordance with all applicable laws.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
