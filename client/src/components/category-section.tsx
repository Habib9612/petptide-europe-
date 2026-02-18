import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Beaker, Heart, TrendingUp, Sparkles, Brain } from "lucide-react";

const categories = [
  {
    id: "glp1",
    name: "GLP-1 Agonists",
    description: "Metabolic regulation and weight management research",
    icon: TrendingUp,
    count: 4,
  },
  {
    id: "healing",
    name: "Healing & Repair",
    description: "Tissue regeneration and recovery peptides",
    icon: Heart,
    count: 4,
  },
  {
    id: "growth",
    name: "Growth Factors",
    description: "Growth hormone secretagogue research",
    icon: Beaker,
    count: 2,
  },
  {
    id: "cosmetic",
    name: "Cosmetic Peptides",
    description: "Skin health and anti-aging research",
    icon: Sparkles,
    count: 2,
  },
  {
    id: "nootropics",
    name: "Nootropics",
    description: "Cognitive and cellular enhancement",
    icon: Brain,
    count: 3,
  },
];

export function CategorySection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-3 text-xs font-semibold tracking-widest uppercase">
            Categories
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-3">Browse Research Areas</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            High-purity peptides for specific laboratory applications and research.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <Card className="group h-full border-border/50 hover-elevate" data-testid={`card-category-${category.id}`}>
                <CardContent className="p-5 flex flex-col items-center text-center h-full">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <category.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold mb-1.5">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <span className="mt-auto text-xs font-medium text-primary flex items-center gap-1">
                    Explore
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
