import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/language-context";
import { getProductById, getCategoryName } from "@/lib/products";
import { getProductImage } from "@/lib/product-images";
import { ProductEngine } from "@/components/product-engine";
import { DosageCalculatorInline } from "@/components/dosage-calculator-inline";
import {
  ArrowLeft,
  FlaskConical,
  ShieldCheck,
  Truck,
  Award,
  Package,
} from "lucide-react";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const { t } = useLanguage();

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
            <div className="flex h-72 lg:h-[28rem] items-center justify-center rounded-md bg-muted/50 dark:bg-gradient-to-b dark:from-muted/60 dark:to-muted/20 border border-border/50 overflow-hidden">
              {getProductImage(product.id, "") ? (
                <img
                  src={getProductImage(product.id, "")}
                  alt={`${product.name} - ${product.purity} research peptide`}
                  className="h-full w-full object-contain"
                  data-testid="img-product-detail"
                />
              ) : (
                <FlaskConical className="h-24 w-24 text-muted-foreground/15" />
              )}
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs text-muted-foreground">
              <div className="rounded-md border border-border/50 py-2.5 flex flex-col items-center gap-1" data-testid="info-shipping">
                <Truck className="h-3.5 w-3.5 text-primary/60" />
                <span>Fast EU</span>
              </div>
              <div className="rounded-md border border-border/50 py-2.5 flex flex-col items-center gap-1" data-testid="info-purity">
                <Award className="h-3.5 w-3.5 text-primary/60" />
                <span>HPLC</span>
              </div>
              <div className="rounded-md border border-border/50 py-2.5 flex flex-col items-center gap-1" data-testid="info-coa">
                <ShieldCheck className="h-3.5 w-3.5 text-primary/60" />
                <span>CoA</span>
              </div>
              <div className="rounded-md border border-border/50 py-2.5 flex flex-col items-center gap-1" data-testid="info-packaging">
                <Package className="h-3.5 w-3.5 text-primary/60" />
                <span>Discreet</span>
              </div>
            </div>

            <DosageCalculatorInline />
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
              <span className={`h-2 w-2 rounded-full ${isLowStock ? "bg-primary/60" : "bg-primary"}`} />
              <span className="text-muted-foreground" data-testid="text-product-stock">
                {isLowStock ? t("products.lowStock") : t("products.inStock")} ({product.stock} units)
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold" data-testid="text-product-price">
                From &euro;{product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-base text-muted-foreground line-through" data-testid="text-product-regular-price">
                    &euro;{product.regularPrice!.toFixed(2)}
                  </span>
                  <Badge variant="secondary" className="text-xs">-{discountPercent}%</Badge>
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-product-short-desc">
              {product.shortDescription}
            </p>

            <ProductEngine product={product} />

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
                <h2 className="sr-only">Product Description</h2>
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed" data-testid="text-full-description">
                  {product.fullDescription}
                </p>
              </TabsContent>

              <TabsContent value="specs" className="mt-4 space-y-3">
                <h2 className="sr-only">Product Specifications</h2>
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
                <div className="rounded-md bg-muted border border-border p-4">
                  <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
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
