import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, Camera, Clock } from "lucide-react";

export default function Refund() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-muted/50 to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-refund-title">Refund & Return Policy</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Our policy on returns and refunds for research chemicals. All sales are final to ensure quality and safety.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="border-red-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <CardTitle className="text-red-700 dark:text-red-400">All Sales Final</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Due to the sensitive nature of our products (research chemicals) and the strict storage 
                requirements needed to maintain purity, <span className="font-semibold text-foreground">all sales are final</span>. 
                We cannot accept returns or exchanges once the product has left our facility, as we cannot 
                guarantee the integrity of returned items.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Camera className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Damaged or Incorrect Items</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you receive a damaged item (broken vial) or the wrong product, please contact us 
                within <span className="font-semibold text-foreground">48 hours of delivery</span>.
              </p>
              <p className="text-muted-foreground">
                You must provide photographic evidence of the damage or error. Once verified, we will 
                arrange for a replacement to be sent immediately at no cost to you.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Order Cancellation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You may cancel your order for a full refund if it has <span className="font-semibold text-foreground">not yet been dispatched</span>. 
                Once the shipping label has been created, the order cannot be cancelled.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
