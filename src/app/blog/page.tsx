"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Settings } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: { seconds: number };
  slug: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const q = query(
          collection(db, "st_blog_posts"),
          orderBy("publishedAt", "desc")
        );
        const snap = await getDocs(q);
        setPosts(
          snap.docs
            .map((d) => ({ id: d.id, ...d.data() } as BlogPost & { published?: boolean }))
            .filter((p) => p.published !== false) as BlogPost[]
        );
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Tech Blog</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Insights on AI, software development, and building products that matter.
        </p>
        <div className="mt-4">
          <Link href="/blog/admin">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" /> Manage Posts
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-12">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-semibold">Coming Soon</h3>
          <p className="text-muted-foreground">We&apos;re working on our first articles. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/post?id=${post.id}`}>
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.publishedAt.seconds * 1000).toLocaleDateString()}
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
