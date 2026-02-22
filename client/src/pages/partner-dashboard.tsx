import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, TrendingUp, Users, DollarSign, MousePointerClick, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

interface DashboardData {
  name: string;
  referralCode: string;
  clicks: number;
  conversions: number;
  earnings: number;
  commissionRate: number;
  referrals: Array<{
    date: string;
    orderTotal: number;
    commission: number;
    status: string;
  }>;
}

export default function PartnerDashboard() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [copied, setCopied] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    const codeParam = params.get("code");
    if (emailParam && codeParam) {
      setEmail(emailParam);
      setCode(codeParam);
      fetchDashboard(emailParam, codeParam);
    }
  }, []);

  const fetchDashboard = async (e: string, c: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/affiliates/dashboard?email=${encodeURIComponent(e)}&code=${encodeURIComponent(c)}`);
      if (!res.ok) throw new Error("Failed");
      const d = await res.json();
      setData({
        name: d.affiliate.name,
        referralCode: d.affiliate.referralCode,
        clicks: d.affiliate.totalClicks,
        conversions: d.affiliate.totalConversions,
        earnings: d.affiliate.totalEarnings,
        commissionRate: d.affiliate.commissionRate,
        referrals: d.referrals.map((r: any) => ({
          date: new Date(r.createdAt).toLocaleDateString(),
          orderTotal: r.orderTotal || 0,
          commission: r.commission || 0,
          status: r.status,
        })),
      });
      setAuthenticated(true);
    } catch {
      toast({ title: "Access denied", description: "Invalid email or referral code.", variant: "destructive" });
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code) {
      toast({ title: "Missing fields", description: "Please enter both email and referral code.", variant: "destructive" });
      return;
    }
    fetchDashboard(email, code);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied!", description: "Copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  if (!authenticated || !data) {
    return (
      <div className="min-h-screen py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2" data-testid="text-dashboard-login-title">
                Partner Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">Enter your credentials to access your dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="rounded-xl border bg-card p-6 sm:p-8 space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  data-testid="input-login-email"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Referral Code</label>
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Your referral code"
                  required
                  data-testid="input-login-code"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading} data-testid="button-access-dashboard">
                {loading ? "Loading..." : "Access Dashboard"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: MousePointerClick, label: "Total Clicks", value: data.clicks.toLocaleString() },
    { icon: Users, label: "Conversions", value: data.conversions.toLocaleString() },
    { icon: DollarSign, label: "Total Earnings", value: `\u20AC${data.earnings.toFixed(2)}` },
    { icon: TrendingUp, label: "Commission Rate", value: `${data.commissionRate}%` },
  ];

  const referralLink = `https://peptideeurope.com?ref=${data.referralCode}`;

  return (
    <div className="min-h-screen py-20 lg:py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-1">Partner Dashboard</p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" data-testid="text-dashboard-title">
              Welcome back, {data.name}
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp} className="rounded-xl border bg-card p-4 sm:p-5 mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Your Referral Code</p>
              <p className="font-mono text-xl font-bold text-foreground" data-testid="text-dashboard-code">{data.referralCode}</p>
            </div>
            <Button variant="outline" onClick={() => copyToClipboard(data.referralCode)} className="gap-2" data-testid="button-copy-dashboard-code">
              {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              Copy Code
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                data-testid={`card-stat-${i}`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="rounded-xl border bg-card p-5 mb-8">
            <p className="text-sm font-medium text-foreground mb-2">Your Referral Link</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-md border bg-muted/50 px-4 py-2.5 text-sm font-mono text-muted-foreground truncate" data-testid="text-referral-link">
                {referralLink}
              </div>
              <Button size="icon" variant="outline" onClick={() => copyToClipboard(referralLink)} data-testid="button-copy-referral-link">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {data.referrals && data.referrals.length > 0 && (
            <motion.div variants={fadeInUp} className="rounded-xl border bg-card overflow-hidden">
              <div className="p-5 border-b">
                <h2 className="text-lg font-semibold text-foreground">Recent Referrals</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">Date</th>
                      <th className="text-left p-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">Order Total</th>
                      <th className="text-left p-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">Commission</th>
                      <th className="text-left p-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.referrals.map((ref, i) => (
                      <tr key={i} className="border-b border-border/50" data-testid={`row-referral-${i}`}>
                        <td className="p-4 text-foreground">{ref.date}</td>
                        <td className="p-4 text-foreground">&euro;{ref.orderTotal.toFixed(2)}</td>
                        <td className="p-4 text-foreground">&euro;{ref.commission.toFixed(2)}</td>
                        <td className="p-4">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            ref.status === "paid" ? "bg-green-500/10 text-green-600" :
                            ref.status === "pending" ? "bg-amber-500/10 text-amber-600" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {ref.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
