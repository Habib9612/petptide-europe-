import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useLanguage } from "@/components/language-context";
import { blogPosts } from "@/lib/blog-data";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, Check, Copy } from "lucide-react";

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await apiRequest("POST", "/api/newsletter", { email });
      return res.json();
    },
    onSuccess: (data) => {
      setDiscountCode(data.discountCode);
      toast({
        title: "Subscribed!",
        description: "Check below for your 10% discount code.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    subscribeMutation.mutate(email);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 overflow-visible">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Join Our Newsletter</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-2">
              Subscribe to receive the latest peptide research updates, exclusive offers, and a
              <span className="font-bold text-primary"> 10% discount code</span> on your first order.
            </p>
            <p className="text-xs text-muted-foreground">
              Free shipping on orders over &euro;120. No spam, unsubscribe anytime.
            </p>
          </div>
          <div className="w-full md:w-auto md:min-w-[340px]">
            {discountCode ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="h-5 w-5" />
                  <span className="font-bold text-sm">You're subscribed!</span>
                </div>
                <div className="text-sm text-muted-foreground">Your 10% discount code:</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-background rounded-md border-2 border-dashed border-primary/40 px-4 py-3 text-center font-mono font-bold tracking-widest text-primary">
                    {discountCode}
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleCopy}
                    data-testid="button-copy-code"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Use this code at checkout for 10% off your first order.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  data-testid="input-newsletter-email"
                />
                <Button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="gap-2 shrink-0"
                  data-testid="button-subscribe"
                >
                  {subscribeMutation.isPending ? "..." : (
                    <>
                      <Send className="h-4 w-4" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Insights() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 uppercase tracking-tighter">Peptide Research & Longevity Insights</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the latest research, stability studies, and experimental best practices for high-purity research peptides.
        </p>
      </div>

      <div className="mb-12">
        <NewsletterSection />
      </div>

      <h2 className="text-2xl font-bold mb-6 uppercase tracking-tight">Research Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <Card key={index} className="flex flex-col hover-elevate overflow-hidden border-border/50 group">
            <Link href={`/insights/${post.slug}`}>
              <div className="aspect-video w-full overflow-hidden cursor-pointer">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
              </div>
            </Link>
            <CardHeader className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{post.date}</span>
              </div>
              <Link href={`/insights/${post.slug}`}>
                <CardTitle className="text-xl font-bold line-clamp-2 leading-snug cursor-pointer hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="flex-1 p-6 pt-0">
              <p className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <Link href={`/insights/${post.slug}`}>
                <button className="text-primary text-xs font-black uppercase tracking-[0.2em] hover:opacity-80 transition-opacity flex items-center gap-2 group/btn">
                  Read Article
                  <span className="transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
