import { useParams, Link } from "wouter";
import { blogPosts } from "@/lib/blog-data";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/insights">
          <Button>Back to Insights</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/insights">
        <Button variant="ghost" className="mb-8 gap-2 hover-elevate">
          <ChevronLeft className="h-4 w-4" />
          Back to Insights
        </Button>
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-muted-foreground text-sm">{post.date}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight uppercase tracking-tight">
          {post.title}
        </h1>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-2xl mb-12 shadow-2xl">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>

      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0 prose prose-lg dark:prose-invert max-w-none">
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('###')) {
              return <h3 key={i} className="text-2xl font-bold mt-8 mb-4">{line.replace('###', '').trim()}</h3>;
            }
            if (line.startsWith('**')) {
              return <p key={i} className="font-bold my-2">{line.replace(/\*\*/g, '').trim()}</p>;
            }
            if (line.startsWith('-')) {
              return <li key={i} className="ml-4 mb-2">{line.replace('-', '').trim()}</li>;
            }
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{line.trim()}</p>;
          })}
        </CardContent>
      </Card>

      <div className="mt-16 pt-8 border-t border-border/50">
        <h4 className="text-lg font-bold mb-4 uppercase tracking-wider text-primary">Disclaimer</h4>
        <p className="text-xs text-muted-foreground italic leading-relaxed">
          The information provided in this article is strictly for educational and laboratory research purposes. 
          None of the substances mentioned are approved for human consumption. Peptide Europe does not provide 
          medical advice or diagnostic guidance.
        </p>
      </div>
    </div>
  );
}
