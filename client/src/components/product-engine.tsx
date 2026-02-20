import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
import {
  ShoppingCart,
  Minus,
  Plus,
  Droplets,
  Syringe,
  Check,
  Star,
  Zap,
} from "lucide-react";

interface PricingTier {
  label: string;
  mg: number;
  price: number;
  tag?: string;
  tagColor?: string;
}

function buildTiers(product: Product): PricingTier[] {
  const basePrice = product.price;
  const nameParts = product.name.match(/(\d+)\s*mg/i);
  const baseMg = nameParts ? parseInt(nameParts[1]) : 5;

  if (baseMg >= 10) {
    return [
      { label: `${baseMg / 2}mg`, mg: baseMg / 2, price: Math.round(basePrice * 0.6 * 100) / 100 },
      { label: `${baseMg}mg`, mg: baseMg, price: basePrice, tag: "Most Popular", tagColor: "text-[hsl(186,65%,48%)]" },
      { label: `${baseMg * 2}mg`, mg: baseMg * 2, price: Math.round(basePrice * 1.7 * 100) / 100, tag: "Best Value", tagColor: "text-amber-500" },
    ];
  }

  return [
    { label: `${baseMg}mg`, mg: baseMg, price: basePrice, tag: "Most Popular", tagColor: "text-[hsl(186,65%,48%)]" },
    { label: `${baseMg * 2}mg`, mg: baseMg * 2, price: Math.round(basePrice * 1.7 * 100) / 100, tag: "Best Value", tagColor: "text-amber-500" },
    { label: `${baseMg * 4}mg`, mg: baseMg * 4, price: Math.round(basePrice * 3.0 * 100) / 100 },
  ];
}

const BAC_WATER_PRICE = 4.99;
const NEEDLE_PRICE = 1.50;

export function ProductEngine({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const tiers = useMemo(() => buildTiers(product), [product]);

  const [selectedTierIdx, setSelectedTierIdx] = useState(() =>
    tiers.findIndex((t) => t.tag === "Most Popular") >= 0
      ? tiers.findIndex((t) => t.tag === "Most Popular")
      : 0
  );
  const [quantity, setQuantity] = useState(1);
  const [bacWater, setBacWater] = useState(false);
  const [needles, setNeedles] = useState(0);

  const selectedTier = tiers[selectedTierIdx];

  const totalPrice = useMemo(() => {
    const tierTotal = selectedTier.price * quantity;
    const bacTotal = bacWater ? BAC_WATER_PRICE : 0;
    const needleTotal = NEEDLE_PRICE * needles;
    return tierTotal + bacTotal + needleTotal;
  }, [selectedTier, quantity, bacWater, needles]);

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,
      name: `${product.name.replace(/\d+mg/i, `${selectedTier.mg}mg`)}`,
      price: selectedTier.price,
    };
    addItem(cartProduct, quantity);

    if (bacWater) {
      addItem(
        {
          ...product,
          id: `bac-water-${product.id}`,
          name: "Bacteriostatic Water 10mL",
          price: BAC_WATER_PRICE,
          regularPrice: 6.99,
          category: "accessories",
          shortDescription: "Sterile bacteriostatic water for reconstitution",
          fullDescription: "",
          sequence: "",
          casNumber: "",
          molecularFormula: "",
          molecularWeight: "",
          purity: "",
          storage: "",
          stock: 100,
          imageUrl: "",
        },
        1
      );
    }

    if (needles > 0) {
      addItem(
        {
          ...product,
          id: `needles-${product.id}`,
          name: `Insulin Syringes (U100) x${needles}`,
          price: NEEDLE_PRICE * needles,
          regularPrice: 2.0 * needles,
          category: "accessories",
          shortDescription: "Sterile insulin syringes for research",
          fullDescription: "",
          sequence: "",
          casNumber: "",
          molecularFormula: "",
          molecularWeight: "",
          purity: "",
          storage: "",
          stock: 100,
          imageUrl: "",
        },
        1
      );
    }

    toast({
      title: "Added to cart",
      description: `${quantity}x ${selectedTier.label} ${product.name.replace(/\d+mg/i, "").trim()} added.`,
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider" data-testid="heading-choose-dosage">
          Choose Your Dosage
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {tiers.map((tier, i) => (
            <button
              key={tier.label}
              onClick={() => setSelectedTierIdx(i)}
              className={`relative rounded-lg border-2 p-3 text-center ${
                selectedTierIdx === i
                  ? "border-[hsl(186,65%,48%)] bg-[hsl(186,65%,48%,0.06)]"
                  : "border-border/60"
              }`}
              data-testid={`tier-${tier.label}`}
            >
              {tier.tag && (
                <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background border border-border/60 whitespace-nowrap ${tier.tagColor || ""}`}>
                  {tier.tag === "Most Popular" && <Star className="inline h-3 w-3 mr-0.5 -mt-0.5" />}
                  {tier.tag === "Best Value" && <Zap className="inline h-3 w-3 mr-0.5 -mt-0.5" />}
                  {tier.tag}
                </span>
              )}
              <p className="text-lg font-bold mt-1">{tier.label}</p>
              <p className="text-sm text-muted-foreground">&euro;{tier.price.toFixed(2)}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
          Quantity
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-md">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
              disabled={quantity <= 1}
              data-testid="button-engine-decrease-qty"
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span className="w-10 text-center text-sm font-medium" data-testid="text-engine-quantity">
              {quantity}
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setQuantity((q) => Math.min(q + 1, product.stock))}
              disabled={quantity >= product.stock}
              data-testid="button-engine-increase-qty"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            &euro;{(selectedTier.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
          Add-Ons
        </h2>
        <div className="space-y-2">
          <button
            onClick={() => setBacWater(!bacWater)}
            className={`w-full flex items-center gap-3 rounded-lg border p-3 text-left ${
              bacWater
                ? "border-[hsl(186,65%,48%)] bg-[hsl(186,65%,48%,0.06)]"
                : "border-border/60"
            }`}
            data-testid="addon-bac-water"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-md ${bacWater ? "bg-[hsl(186,65%,48%,0.15)]" : "bg-muted/50"}`}>
              {bacWater ? (
                <Check className="h-4 w-4 text-[hsl(186,65%,48%)]" />
              ) : (
                <Droplets className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Bacteriostatic Water (10mL)</p>
              <p className="text-xs text-muted-foreground">Required for reconstitution</p>
            </div>
            <span className="text-sm font-medium">&euro;{BAC_WATER_PRICE.toFixed(2)}</span>
          </button>

          <div
            className={`rounded-lg border p-3 ${
              needles > 0
                ? "border-[hsl(186,65%,48%)] bg-[hsl(186,65%,48%,0.06)]"
                : "border-border/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-md ${needles > 0 ? "bg-[hsl(186,65%,48%,0.15)]" : "bg-muted/50"}`}>
                {needles > 0 ? (
                  <Check className="h-4 w-4 text-[hsl(186,65%,48%)]" />
                ) : (
                  <Syringe className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Insulin Syringes (U100)</p>
                <p className="text-xs text-muted-foreground">&euro;{NEEDLE_PRICE.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => setNeedles((n) => Math.max(n - 1, 0))}
                  disabled={needles <= 0}
                  data-testid="button-decrease-needles"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-6 text-center text-sm font-medium" data-testid="text-needles-count">
                  {needles}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => setNeedles((n) => Math.min(n + 1, 30))}
                  disabled={needles >= 30}
                  data-testid="button-increase-needles"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="bg-muted/30 border-border/50">
        <CardContent className="py-3 px-4">
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{selectedTier.label} x{quantity}</span>
              <span>&euro;{(selectedTier.price * quantity).toFixed(2)}</span>
            </div>
            {bacWater && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bac Water</span>
                <span>&euro;{BAC_WATER_PRICE.toFixed(2)}</span>
              </div>
            )}
            {needles > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Syringes x{needles}</span>
                <span>&euro;{(NEEDLE_PRICE * needles).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold border-t border-border/50 pt-1.5 text-base">
              <span>Total</span>
              <span data-testid="text-engine-total">&euro;{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full gap-2 text-base" size="lg" onClick={handleAddToCart} data-testid="button-engine-add-to-cart">
        <ShoppingCart className="h-4 w-4" />
        Add to Cart &mdash; &euro;{totalPrice.toFixed(2)}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Free shipping on orders over &euro;120
      </p>
    </div>
  );
}
