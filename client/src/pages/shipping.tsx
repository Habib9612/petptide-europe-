import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, Package, Shield, MapPin, CheckCircle } from "lucide-react";

export default function Shipping() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-muted/50 to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-shipping-title">Shipping & Delivery</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Fast, guaranteed shipping of research peptides to all EU countries. Same-day dispatch and discreet packaging.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Dispatch Time</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All orders placed before <span className="font-semibold text-foreground">2:00 PM CET</span> (Monday-Friday) 
                  are dispatched the same day. Orders placed after this time or on weekends will be dispatched 
                  the next business day.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Shipping Options</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Standard EU Shipping (DHL/Post)</p>
                    <p className="text-sm text-muted-foreground">3-7 business days</p>
                  </div>
                  <Badge variant="secondary">€9.99</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Express EU Shipping (DHL Express)</p>
                    <p className="text-sm text-muted-foreground">1-3 business days</p>
                  </div>
                  <Badge variant="secondary">€19.99</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-400">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">On all orders over €150</p>
                  </div>
                  <Badge className="bg-green-500 text-white border-0">FREE</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Customs & Discretion</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We understand the importance of privacy. All packages are shipped in 
                  <span className="font-semibold text-foreground"> plain, unbranded packaging</span> with 
                  no indication of the contents on the outside label. We use stealth shipping methods 
                  where necessary to ensure smooth delivery.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Delivery Guarantee</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We guarantee delivery to all EU countries (plus UK, Norway, Switzerland). 
                  If your package is seized by customs or lost in transit (no tracking update for 7 days), 
                  we will <span className="font-semibold text-foreground">reship your order once free of charge</span>.
                </p>
                <p className="text-sm text-muted-foreground">
                  Please contact support with your order number to initiate a reshipment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Countries We Ship To</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Austria", "Belgium", "Czech Republic", "Denmark", 
                    "Finland", "France", "Germany", "Greece",
                    "Hungary", "Ireland", "Italy", "Netherlands",
                    "Norway", "Poland", "Portugal", "Spain",
                    "Sweden", "Switzerland", "United Kingdom"
                  ].map((country) => (
                    <div key={country} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>{country}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
