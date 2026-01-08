import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/language-context";
import { useCart } from "@/lib/cart";
import { getProductById, getCategoryName } from "@/lib/products";
import { useToast } from "@/hooks/use-toast";
import {
  ShoppingCart,
  ArrowLeft,
  FlaskConical,
  Shield,
  Truck,
  Package,
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
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/products">
          <Button>Back to Products</Button>
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
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
  };

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, product.stock));
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1));

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link href="/products">
          <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative flex h-80 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 lg:h-96">
                  <div className="relative">
                    <FlaskConical className="h-32 w-32 text-primary/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary mt-4">{product.codeName}</span>
                    </div>
                  </div>
                  {hasDiscount && (
                    <Badge className="absolute top-4 right-4 bg-red-500 text-white border-0 px-3 py-1">
                      -{discountPercent}% OFF
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="flex flex-col items-center p-4 text-center">
                  <Truck className="h-6 w-6 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">Fast EU Shipping</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-4 text-center">
                  <Shield className="h-6 w-6 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">Lab-Grade Purity</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-4 text-center">
                  <Package className="h-6 w-6 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">Discreet Package</span>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2" data-testid="text-product-codename">
                {product.codeName}
              </p>
              <h1 className="text-3xl font-bold mb-3" data-testid="text-product-name">
                {product.name}
              </h1>
              <Badge variant="secondary">{getCategoryName(product.category)}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className={`h-3 w-3 rounded-full ${isLowStock ? "bg-amber-500 animate-pulse" : "bg-green-500 animate-pulse"}`} />
              <span className={isLowStock ? "text-amber-600 dark:text-amber-500" : "text-green-600 dark:text-green-500"} data-testid="text-product-stock">
                {isLowStock ? t("products.lowStock") : t("products.inStock")} ({product.stock} units)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary" data-testid="text-product-price">
                €{product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through" data-testid="text-product-regular-price">
                  €{product.regularPrice!.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground" data-testid="text-product-short-desc">
              {product.shortDescription}
            </p>

            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      data-testid="button-decrease-qty"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium" data-testid="text-quantity">
                      {quantity}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                      data-testid="button-increase-qty"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-lg font-semibold ml-auto" data-testid="text-total">
                    €{(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Button size="lg" className="w-full gap-2" onClick={handleAddToCart} data-testid="button-add-to-cart">
              <ShoppingCart className="h-5 w-5" />
              {t("products.addToCart")}
            </Button>

            <Tabs defaultValue="description" className="mt-8">
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
                <Card>
                  <CardContent className="p-4">
                    <p className="whitespace-pre-line text-muted-foreground" data-testid="text-full-description">
                      {product.fullDescription}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specs" className="mt-4">
                <Card>
                  <CardContent className="p-4 space-y-3">
                    {product.sequence && product.sequence !== "N/A (Coenzyme)" && (
                      <div>
                        <span className="text-sm font-medium">{t("product.sequence")}:</span>
                        <p className="text-xs font-mono text-muted-foreground mt-1 break-all" data-testid="text-sequence">
                          {product.sequence}
                        </p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium">{t("product.cas")}:</span>
                        <p className="text-sm text-muted-foreground" data-testid="text-cas">{product.casNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">{t("product.purity")}:</span>
                        <p className="text-sm text-muted-foreground" data-testid="text-purity">{product.purity}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">{t("product.formula")}:</span>
                        <p className="text-sm text-muted-foreground" data-testid="text-formula">{product.molecularFormula}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">{t("product.weight")}:</span>
                        <p className="text-sm text-muted-foreground" data-testid="text-weight">{product.molecularWeight}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">{t("product.storage")}:</span>
                      <p className="text-sm text-muted-foreground" data-testid="text-storage">{product.storage}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="disclaimer" className="mt-4">
                <Card className="border-amber-500/30 bg-amber-500/5">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
                          Research Use Only
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          This product is intended for laboratory research purposes only. It is not
                          intended for human consumption, diagnostic, therapeutic, or veterinary use.
                          By purchasing this product, you confirm that you are acquiring it for
                          legitimate research purposes and that you will handle it in accordance with
                          all applicable laws and safety regulations.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
