import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, PenLine } from "lucide-react";
import type { UserBlogPost } from "@shared/schema";

export default function UserBlogPostPage() {
  const { id } = useParams();

  const { data: post, isLoading } = useQuery<UserBlogPost>({
    queryKey: ["/api/blog-posts", id],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

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

  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          <span className="text-muted-foreground text-sm">{date}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight uppercase tracking-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <PenLine className="h-4 w-4" />
          <span>By {post.author}</span>
        </div>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-2xl mb-12 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <PenLine className="h-20 w-20 text-primary/20" />
      </div>

      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0 prose prose-lg dark:prose-invert max-w-none">
          {post.content.split("\n").map((line, i) => {
            if (line.trim() === "") return <br key={i} />;
            return (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                {line.trim()}
              </p>
            );
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
