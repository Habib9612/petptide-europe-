import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { useLanguage } from "@/components/language-context";
import { blogPosts } from "@/lib/blog-data";

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
                  <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

