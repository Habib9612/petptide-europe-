import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle2, Copy, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

export default function PartnerSignup() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [promotionMethod, setPromotionMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !promotionMethod) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await apiRequest("POST", "/api/affiliates/signup", { name, email, website, promotionMethod });
      const data = await res.json();
      setReferralCode(data.referralCode);
      setSuccess(true);
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied!", description: "Copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-lg mx-auto text-center"
          >
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-green-500/10">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="text-welcome">Welcome to the program!</h1>
            <p className="text-muted-foreground mb-8">Your affiliate account has been created successfully.</p>

            <div className="rounded-xl border bg-card p-6 mb-6 text-left">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">Your Referral Code</Label>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 rounded-md border bg-muted/50 px-4 py-3 font-mono text-lg font-bold text-foreground" data-testid="text-referral-code">
                  {referralCode}
                </div>
                <Button size="icon" variant="outline" onClick={() => copyToClipboard(referralCode)} data-testid="button-copy-code">
                  {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Your referral link:</p>
              <button
                type="button"
                onClick={() => copyToClipboard(`https://peptideeurope.com?ref=${referralCode}`)}
                className="text-xs text-primary break-all text-left mt-1 cursor-pointer"
                data-testid="button-copy-link"
              >
                https://peptideeurope.com?ref={referralCode}
              </button>
            </div>

            <Link href={`/partners/dashboard?email=${encodeURIComponent(email)}&code=${encodeURIComponent(referralCode)}`}>
              <Button className="gap-2" data-testid="button-go-dashboard">
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-lg mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2" data-testid="text-signup-title">
              Join the Partner Program
            </h1>
            <p className="text-sm text-muted-foreground">
              Create your free affiliate account and start earning commissions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-6 sm:p-8 space-y-5">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                data-testid="input-name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                data-testid="input-email"
              />
            </div>
            <div>
              <Label htmlFor="website">Website / Social Media URL</Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yoursite.com"
                data-testid="input-website"
              />
            </div>
            <div>
              <Label htmlFor="promotionMethod">How will you promote Peptide Europe? *</Label>
              <select
                id="promotionMethod"
                value={promotionMethod}
                onChange={(e) => setPromotionMethod(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-testid="select-promotion"
              >
                <option value="">Select an option</option>
                <option value="Social Media">Social Media</option>
                <option value="Blog / Website">Blog / Website</option>
                <option value="YouTube">YouTube</option>
                <option value="Email Marketing">Email Marketing</option>
                <option value="Podcast">Podcast</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-submit-signup">
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
