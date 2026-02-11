"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, serverTimestamp, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, LogIn, FileText } from "lucide-react";

export default function BlogAdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [posts, setPosts] = useState<{ id: string; title: string; published: boolean; publishedAt?: { seconds: number } }[]>([]);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    author: "",
    published: true,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) loadPosts();
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthError("");
    } catch {
      setAuthError("Invalid credentials");
    }
  };

  const loadPosts = async () => {
    const q = query(collection(db, "st_blog_posts"), orderBy("publishedAt", "desc"));
    const snap = await getDocs(q);
    setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as { id: string; title: string; published: boolean; publishedAt?: { seconds: number } })));
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await addDoc(collection(db, "st_blog_posts"), {
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        author: form.author || "SharpTech Team",
        published: form.published,
        publishedAt: serverTimestamp(),
      });
      setForm({ title: "", excerpt: "", content: "", tags: "", author: "", published: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      loadPosts();
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await deleteDoc(doc(db, "st_blog_posts", id));
    loadPosts();
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5" /> Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {authError && <p className="text-sm text-destructive">{authError}</p>}
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Blog Admin</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> New Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePublish} className="space-y-4">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <Input placeholder="Author (optional)" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            <Input placeholder="Excerpt (short summary)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required />
            <Textarea placeholder="Content (HTML supported)" rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
            <Input placeholder="Tags (comma-separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            <div className="flex items-center gap-4">
              <Button type="submit" disabled={saving}>{saving ? "Publishing..." : "Publish"}</Button>
              {saved && <span className="text-sm text-green-500">Published!</span>}
            </div>
          </form>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5" /> Existing Posts ({posts.length})
      </h2>
      <div className="space-y-3">
        {posts.map((p) => (
          <Card key={p.id}>
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-muted-foreground">
                  {p.publishedAt ? new Date(p.publishedAt.seconds * 1000).toLocaleDateString() : "Draft"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={p.published ? "default" : "secondary"}>
                  {p.published ? "Published" : "Draft"}
                </Badge>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
