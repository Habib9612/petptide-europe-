import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/components/language-context";
import { useCart, type CartItemData } from "@/lib/cart";
import { getCategoryName } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  ArrowRight,
  FlaskConical,
} from "lucide-react";
import { SiBitcoin } from "react-icons/si";

function CartItemRow({ item }: { item: CartItemData }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 py-4 border-b last:border-0" data-testid={`cart-item-${product.id}`}>
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted">
        <FlaskConical className="h-8 w-8 text-primary/50" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold hover:text-primary transition-colors" data-testid={`text-item-name-${product.id}`}>
                {product.name}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.codeName}
            </p>
            <Badge variant="secondary" className="mt-1 text-xs">
              {getCategoryName(product.category)}
            </Badge>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(product.id)}
            data-testid={`button-remove-${product.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              data-testid={`button-decrease-${product.id}`}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium" data-testid={`text-qty-${product.id}`}>
              {quantity}
            </span>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              data-testid={`button-increase-${product.id}`}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="text-right">
            <p className="font-semibold" data-testid={`text-item-total-${product.id}`}>
              €{(product.price * quantity).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">
              €{product.price.toFixed(2)} each
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const { t } = useLanguage();
  const { items, getSubtotal, clearCart } = useCart();
  const subtotal = getSubtotal();
  const cryptoDiscount = subtotal * 0.1;
  const shipping = subtotal >= 120 ? 0 : 9.99;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-muted">
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-3" data-testid="text-cart-empty">{t("cart.empty")}</h1>
          <p className="text-muted-foreground mb-6">
            Add some peptides to your cart to get started.
          </p>
          <Link href="/products">
            <Button className="gap-2" data-testid="button-continue-shopping">
              <ArrowLeft className="h-4 w-4" />
              {t("cart.continue")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-muted/50 to-background border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold" data-testid="text-cart-title">{t("cart.title")}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
                <CardTitle className="text-lg">
                  Items ({items.length})
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={clearCart}
                  data-testid="button-clear-cart"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                {items.map((item) => (
                  <CartItemRow key={item.product.id} item={item} />
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                  <span className="font-medium" data-testid="text-subtotal">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("cart.shipping")}</span>
                  <span className="font-medium" data-testid="text-shipping">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `€${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600">Free shipping on orders over &euro;120</p>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>{t("cart.total")}</span>
                    <span data-testid="text-total">€{(subtotal + shipping).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                    <SiBitcoin className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Pay with Crypto & Save</p>
                    <p className="text-xs text-muted-foreground">
                      Save €{cryptoDiscount.toFixed(2)} (10% off) with cryptocurrency
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Link href="/checkout">
              <Button size="lg" className="w-full gap-2" data-testid="button-checkout">
                {t("cart.checkout")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/products">
              <Button variant="outline" className="w-full gap-2" data-testid="button-continue">
                <ArrowLeft className="h-4 w-4" />
                {t("cart.continue")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
