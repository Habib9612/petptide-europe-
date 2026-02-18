import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Beaker, Heart, TrendingUp, Sparkles, Brain } from "lucide-react";

const categories = [
  {
    id: "glp1",
    name: "GLP-1 Agonists",
    description: "Metabolic regulation and weight management research",
    icon: TrendingUp,
    count: 4,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-500",
  },
  {
    id: "healing",
    name: "Healing & Repair",
    description: "Tissue regeneration and recovery peptides",
    icon: Heart,
    count: 4,
    color: "from-red-500/20 to-pink-500/20",
    iconColor: "text-pink-500",
  },
  {
    id: "growth",
    name: "Growth Factors",
    description: "Growth hormone secretagogue research",
    icon: Beaker,
    count: 2,
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-emerald-500",
  },
  {
    id: "cosmetic",
    name: "Cosmetic Peptides",
    description: "Skin health and anti-aging research",
    icon: Sparkles,
    count: 2,
    color: "from-purple-500/20 to-violet-500/20",
    iconColor: "text-violet-500",
  },
  {
    id: "nootropics",
    name: "Nootropics",
    description: "Cognitive and cellular enhancement",
    icon: Brain,
    count: 3,
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
  },
];

export function CategorySection() {
  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 bg-primary/5 text-primary uppercase tracking-[0.2em] text-[10px] font-bold">
            Explore Science
          </Badge>
          <h2 className="text-4xl font-black mb-4 tracking-tight">Browse Research Areas</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            High-purity peptides synthesized for specific laboratory applications and innovative research.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <Card className="group relative h-full transition-all duration-300 hover:shadow-xl border-border/50 overflow-hidden bg-card/80" data-testid={`card-category-${category.id}`}>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${category.color} transition-opacity duration-500`} />
                <CardContent className="relative p-8 flex flex-col items-center text-center h-full z-10">
                  <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md dark:bg-slate-900 group-hover:scale-110 transition-transform duration-500`}>
                    <category.icon className={`h-10 w-10 ${category.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="mt-auto flex items-center justify-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    Explore Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
