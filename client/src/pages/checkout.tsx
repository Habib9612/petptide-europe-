import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/components/language-context";
import { useCart } from "@/lib/cart";
import { euCountries } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  ArrowLeft,
  CreditCard,
  Building,
  ShoppingCart,
  CheckCircle,
  FlaskConical,
  Tag,
  Check,
} from "lucide-react";
import { SiBitcoin } from "react-icons/si";

export default function Checkout() {
  const { t } = useLanguage();
  const { items, getSubtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("crypto");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [newsletterDiscount, setNewsletterDiscount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [validatingCode, setValidatingCode] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
  });

  const subtotal = getSubtotal();
  const cryptoDiscount = paymentMethod === "crypto" ? subtotal * 0.1 : 0;
  const newsletterDiscountAmount = discountApplied ? subtotal * (newsletterDiscount / 100) : 0;
  const shipping = subtotal >= 120 ? 0 : 9.99;
  const total = subtotal - cryptoDiscount - newsletterDiscountAmount + shipping;

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    setValidatingCode(true);
    try {
      const res = await apiRequest("POST", "/api/newsletter/validate", { code: discountCode.trim() });
      const data = await res.json();
      setNewsletterDiscount(data.discount);
      setDiscountApplied(true);
      toast({ title: "Discount applied!", description: `${data.discount}% off your order.` });
    } catch {
      toast({ title: "Invalid code", description: "This discount code is invalid or already used.", variant: "destructive" });
    }
    setValidatingCode(false);
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-muted">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-md">
          <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-3" data-testid="text-order-success">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your order. You will receive a confirmation email shortly with payment instructions.
          </p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.firstName || !formData.lastName || 
        !formData.address || !formData.city || !formData.country || !formData.postalCode || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "card" && !formData.email) {
      toast({
        title: "Email required",
        description: "Please enter your email address for credit card payment.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (paymentMethod === "card") {
        const stripePayload = {
          items: items.map(i => ({ productId: i.product.id, name: i.product.name, quantity: i.quantity, price: i.product.price })),
          email: formData.email,
          shipping,
          subtotal,
          discount: cryptoDiscount + newsletterDiscountAmount,
          total,
          discountCode: discountApplied ? discountCode.trim() : '',
          customerInfo: formData,
        };

        const res = await apiRequest("POST", "/api/stripe/create-checkout", stripePayload);
        const data = await res.json();

        if (data.url) {
          if (discountApplied && discountCode) {
            try { await apiRequest("POST", "/api/newsletter/use-code", { code: discountCode.trim() }); } catch {}
          }
          window.location.href = data.url;
          return;
        }
      }

      const orderPayload = {
        ...formData,
        paymentMethod,
        subtotal,
        shipping,
        discount: cryptoDiscount + newsletterDiscountAmount,
        total,
        items: JSON.stringify(items.map(i => ({ productId: i.product.id, quantity: i.quantity, price: i.product.price }))),
      };

      await apiRequest("POST", "/api/orders", orderPayload);

      if (discountApplied && discountCode) {
        try {
          await apiRequest("POST", "/api/newsletter/use-code", { code: discountCode.trim() });
        } catch {}
      }

      clearCart();
      setOrderComplete(true);
      
      toast({
        title: "Order placed!",
        description: "You will receive payment instructions via email.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-muted/50 to-background border-b">
        <div className="container mx-auto px-4 py-8">
          <Link href="/cart">
            <Button variant="ghost" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-3xl font-bold" data-testid="text-checkout-title">{t("checkout.title")}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("checkout.contact")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        data-testid="input-email"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                          data-testid="input-first-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("checkout.shipping")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Research Lane"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                        data-testid="input-address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apartment">Apartment / Suite (optional)</Label>
                      <Input
                        id="apartment"
                        placeholder="Apt 4B, Floor 2, etc."
                        value={formData.apartment}
                        onChange={(e) => handleInputChange("apartment", e.target.value)}
                        data-testid="input-apartment"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="Berlin"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          required
                          data-testid="input-city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          placeholder="10115"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          required
                          data-testid="input-postal-code"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Country / Region</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => handleInputChange("country", value)}
                      >
                        <SelectTrigger data-testid="select-country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {euCountries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+49 123 456 7890"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        data-testid="input-phone"
                      />
                      <p className="text-xs text-muted-foreground mt-1">For shipping updates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("checkout.payment")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                      <RadioGroupItem value="crypto" id="crypto" data-testid="radio-crypto" />
                      <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <SiBitcoin className="h-5 w-5 text-amber-500" />
                          <div>
                            <p className="font-medium">{t("checkout.crypto")}</p>
                            <p className="text-xs text-muted-foreground">
                              {t("checkout.cryptoNote")}
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg border p-4">
                      <RadioGroupItem value="bank" id="bank" data-testid="radio-bank" />
                      <Label htmlFor="bank" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Building className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{t("checkout.bank")}</p>
                            <p className="text-xs text-muted-foreground">
                              Direct bank transfer to our SEPA account
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg border p-4">
                      <RadioGroupItem value="card" id="card" data-testid="radio-card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{t("checkout.card")}</p>
                            <p className="text-xs text-muted-foreground">
                              Visa, Mastercard, American Express
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-h-48 overflow-auto space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted">
                          <FlaskConical className="h-4 w-4 text-primary/50" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">
                          €{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                          placeholder="Discount code"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          className="pl-9 text-sm"
                          disabled={discountApplied}
                          data-testid="input-discount-code"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleApplyDiscount}
                        disabled={discountApplied || validatingCode || !discountCode.trim()}
                        data-testid="button-apply-discount"
                      >
                        {discountApplied ? <Check className="h-4 w-4" /> : validatingCode ? "..." : "Apply"}
                      </Button>
                    </div>
                    {discountApplied && (
                      <p className="text-xs text-green-600">Newsletter discount applied: {newsletterDiscount}% off</p>
                    )}
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>&euro;{subtotal.toFixed(2)}</span>
                    </div>
                    {cryptoDiscount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>{t("cart.discount")} (Crypto)</span>
                        <span data-testid="text-discount">-&euro;{cryptoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    {newsletterDiscountAmount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Newsletter Discount</span>
                        <span data-testid="text-newsletter-discount">-&euro;{newsletterDiscountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `\u20AC${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-xs text-green-600">Free shipping on orders over &euro;120</p>
                    )}
                    <div className="flex justify-between text-lg font-semibold border-t pt-2">
                      <span>Total</span>
                      <span data-testid="text-checkout-total">&euro;{total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
                data-testid="button-place-order"
              >
                {isSubmitting ? "Processing..." : t("checkout.place")}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
