import { useParams, Link } from "wouter";
import { blogPosts } from "@/lib/blog-data";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

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

      <CardContent className="p-0">
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-td:text-muted-foreground prose-th:text-primary prose-th:text-xs prose-th:uppercase prose-th:tracking-wider prose-table:text-sm prose-hr:border-border">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </CardContent>

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
