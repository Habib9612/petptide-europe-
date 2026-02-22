import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, AlertTriangle, UserCheck, Scale } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-muted/50 to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-terms-title">Terms of Service</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Terms and conditions for purchasing research peptides from Peptide Europe. Strictly for laboratory use only.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By accessing and using this website, you accept and agree to be bound by the terms and 
                provision of this agreement. In addition, when using this website's services, you shall 
                be subject to any posted guidelines or rules applicable to such services.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <AlertTriangle className="h-5 w-5 text-foreground" />
                </div>
                <CardTitle className="text-foreground">2. Research Use Only</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                All products sold by Peptide Europe are strictly for <span className="font-bold text-foreground">RESEARCH AND LABORATORY USE ONLY</span>. 
                They are not intended for human consumption, diagnostic, therapeutic, or veterinary use.
              </p>
              <p className="text-muted-foreground">
                Any communication suggesting human use will result in immediate order cancellation and 
                a permanent ban from our platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>3. Age Requirement</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You must be at least <span className="font-semibold text-foreground">18 years of age</span> to purchase from this website. 
                By placing an order, you confirm that you meet this age requirement and are purchasing these 
                products for legitimate research purposes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>4. Liability & Indemnification</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Peptide Europe shall not be held liable for any damages resulting from the misuse of our products. 
                The buyer assumes full responsibility for the handling, storage, and use of all purchased items 
                in accordance with applicable laws and safety regulations.
              </p>
              <p className="text-muted-foreground">
                You agree to indemnify and hold Peptide Europe harmless from any claims, losses, or damages 
                arising from your use or misuse of our products.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
