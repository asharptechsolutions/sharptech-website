"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  publishedAt: { seconds: number };
  author?: string;
  coverImage?: string;
}

function BlogPostContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const snap = await getDoc(doc(db, "st_blog_posts", id));
      if (snap.exists()) setPost(snap.data() as BlogPost);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div className="text-center py-16 text-muted-foreground">Loading...</div>;
  if (!post) return <div className="text-center py-16"><h2 className="text-2xl font-bold">Post not found</h2></div>;

  return (
    <div className="max-w-3xl mx-auto">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/blog"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog</Link>
      </Button>

      <article className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(post.publishedAt.seconds * 1000).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
            {post.author && <span>• {post.author}</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </div>

        {post.coverImage && (
          <div className="relative w-full rounded-lg overflow-hidden max-h-96">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <Separator />

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.coverImage
              ? post.content.replace(
                  new RegExp(`!\\[[^\\]]*\\]\\(${post.coverImage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)\\n*`),
                  ''
                )
              : post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

export default function BlogPostPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Suspense fallback={<div className="text-center py-16 text-muted-foreground">Loading...</div>}>
        <BlogPostContent />
      </Suspense>
    </div>
  );
}
