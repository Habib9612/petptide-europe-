import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-3">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of research peptides organized by application
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <Card className="group h-full hover-elevate overflow-visible" data-testid={`card-category-${category.id}`}>
                <CardContent className="p-5">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${category.color}`}>
                    <category.icon className={`h-6 w-6 ${category.iconColor}`} />
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{category.count} products</span>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
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
