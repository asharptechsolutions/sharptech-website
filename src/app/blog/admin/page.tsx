"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, serverTimestamp, query, orderBy, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, LogIn, FileText, Pencil, X } from "lucide-react";
import { MarkdownEditor } from "@/components/markdown-editor";

interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
  author?: string;
  published: boolean;
  publishedAt?: { seconds: number };
}

export default function BlogAdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const emptyForm = {
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    author: "",
    published: true,
  };

  const [form, setForm] = useState(emptyForm);
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
    setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost)));
  };

  const handleEdit = async (id: string) => {
    const snap = await getDoc(doc(db, "st_blog_posts", id));
    if (!snap.exists()) return;
    const data = snap.data();
    setForm({
      title: data.title || "",
      excerpt: data.excerpt || "",
      content: data.content || "",
      tags: (data.tags || []).join(", "),
      author: data.author || "",
      published: data.published ?? true,
    });
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const postData = {
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        author: form.author || "SharpTech Team",
        published: form.published,
      };

      if (editingId) {
        await updateDoc(doc(db, "st_blog_posts", editingId), postData);
        setEditingId(null);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        await addDoc(collection(db, "st_blog_posts"), {
          ...postData,
          publishedAt: serverTimestamp(),
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
      setForm(emptyForm);
      loadPosts();
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await deleteDoc(doc(db, "st_blog_posts", id));
    if (editingId === id) cancelEdit();
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
            {editingId ? (
              <>
                <Pencil className="h-5 w-5" /> Edit Post
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" /> New Post
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <Input placeholder="Author (optional)" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            <Input placeholder="Excerpt (short summary)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required />
            <MarkdownEditor
              value={form.content}
              onChange={(val) => setForm({ ...form, content: val })}
              placeholder="Write your post content in Markdown..."
              rows={14}
            />
            <Input placeholder="Tags (comma-separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            <div className="flex items-center gap-4">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update Post" : "Publish"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
              )}
              {saved && <span className="text-sm text-green-500">{editingId ? "Updated!" : "Published!"}</span>}
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
          <Card key={p.id} className={editingId === p.id ? "ring-2 ring-primary" : ""}>
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
                <Button variant="ghost" size="icon" onClick={() => handleEdit(p.id)}>
                  <Pencil className="h-4 w-4" />
                </Button>
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
