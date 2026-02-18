import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/components/language-context";

const blogPosts = [
  {
    title: "Retatrutide in Research: Stability, Storage, and Experimental Optimization",
    excerpt: "Explore the stability, storage, and experimental best practices for retatrutide peptide in laboratory research.",
    date: "February 15, 2026",
    category: "Peptide Resources",
    image: "https://www.peptideregenesis.com/cdn/shop/articles/retahandling_blog_176a0919-8ab5-4e5f-afbc-f733a9b0997b.png?v=1771416687&width=1100"
  },
  {
    title: "What is Orforglipron?",
    excerpt: "Orforglipron is a small-molecule compound examined in experimental research focused on GLP-1 receptor signaling.",
    date: "February 12, 2026",
    category: "Metabolic Research",
    image: "https://www.peptideregenesis.com/cdn/shop/articles/Orforglipron_blog_eb1b7af2-52a5-4723-873e-13abda4e0f6d.png?v=1771410598&width=1100"
  },
  {
    title: "Cellular Homeostasis & Health Maintenance Research",
    excerpt: "An overview of experimental research exploring cellular balance, metabolic regulation, and antioxidant systems.",
    date: "February 10, 2026",
    category: "Homeostasis",
    image: "https://www.peptideregenesis.com/cdn/shop/articles/Homeostasis_Health_Maintenance_blog_1fcdfe95-487b-4fee-9e6b-a609b35f7731.png?v=1769849923&width=1100"
  },
  {
    title: "What is GHK-Cu? - A Copper Peptide in Tissue Remodeling",
    excerpt: "An introduction to GHK-Cu as a research peptide studied in models examining cellular communication.",
    date: "February 8, 2026",
    category: "Cosmetic Peptides",
    image: "https://www.peptideregenesis.com/cdn/shop/articles/whatisghk-cu_blog_cb26c99b-5c11-49b6-8fec-3cb4db556b7a.png?v=1769850147&width=1100"
  },
  {
    title: "BPC 157 TB 500: How These Peptides Work Together",
    excerpt: "Explore how BPC-157 and TB-500 are studied in preclinical research, including their distinct mechanisms.",
    date: "February 5, 2026",
    category: "Healing & Repair",
    image: "https://www.peptideregenesis.com/cdn/shop/articles/BPC-157_TB-500_together_blog_ed81d66d-57a7-434b-a8e8-4261153c7b05.png?v=1768312802&width=1100"
  },
  {
    title: "NAD+ and Longevity: Unlocking the Science of Anti-Aging",
    excerpt: "Discover how NAD+, autophagy, and senescence shape the body's aging process and cellular renewal.",
    date: "February 1, 2026",
    category: "Longevity",
    image: "https://www.peptideregenesis.com/cdn/shop/articles/Longevity_Healthy_blog_aaa5534a-80f6-4121-9fd9-d7d311293252.png?v=1768382941&width=1100"
  }
];

export default function Insights() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Peptide Research & Longevity Insights</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the latest research, stability studies, and experimental best practices for high-purity research peptides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <Card key={index} className="flex flex-col hover-elevate">
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">{post.category}</span>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                {post.excerpt}
              </p>
              <button className="text-primary text-sm font-semibold hover:underline">
                Read more...
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
