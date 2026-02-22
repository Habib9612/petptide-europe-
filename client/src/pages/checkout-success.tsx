import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/lib/cart";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, Loader2 } from "lucide-react";

interface SessionData {
  id: string;
  payment_status: string;
  customer_email: string | null;
  amount_total: number | null;
  currency: string | null;
  metadata: Record<string, string> | null;
}

export default function CheckoutSuccess() {
  const { clearCart } = useCart();
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    clearCart();

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      apiRequest("GET", `/api/stripe/session/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSession(data);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-muted-foreground">Loading payment details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-primary/5">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-3" data-testid="text-payment-success">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your order. Your payment has been processed successfully.
        </p>

        {session && !error && (
          <Card className="mb-6 text-left">
            <CardContent className="pt-6 space-y-3">
              {session.customer_email && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Email</span>
                  <span data-testid="text-session-email">{session.customer_email}</span>
                </div>
              )}
              {session.amount_total != null && session.currency && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-medium" data-testid="text-session-amount">
                    {session.currency.toUpperCase() === "EUR" ? "\u20AC" : session.currency.toUpperCase()}{" "}
                    {(session.amount_total / 100).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="text-primary font-medium" data-testid="text-session-status">
                  {session.payment_status === "paid" ? "Paid" : session.payment_status}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <Link href="/products">
          <Button data-testid="button-continue-shopping">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
