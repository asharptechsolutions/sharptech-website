"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, serverTimestamp, query, orderBy, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, LogIn, FileText, Pencil, X, Eye, EyeOff } from "lucide-react";
import { MarkdownEditor } from "@/components/markdown-editor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
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
  const [showForm, setShowForm] = useState(false);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);

  const emptyForm = {
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    author: "",
    published: false,
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
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(false);
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
      setShowForm(false);
      loadPosts();
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const handleTogglePublish = async (id: string, currentlyPublished: boolean) => {
    await updateDoc(doc(db, "st_blog_posts", id), { 
      published: !currentlyPublished,
      ...(!currentlyPublished ? { publishedAt: serverTimestamp() } : {})
    });
    loadPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await deleteDoc(doc(db, "st_blog_posts", id));
    if (editingId === id) cancelEdit();
    loadPosts();
  };

  const handlePreview = async (id: string) => {
    const snap = await getDoc(doc(db, "st_blog_posts", id));
    if (snap.exists()) {
      setPreviewPost({ id, ...snap.data() } as BlogPost);
    }
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Blog Admin</h1>
        {!showForm && (
          <Button onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}>
            <Plus className="h-4 w-4 mr-2" /> Create Post
          </Button>
        )}
      </div>

      {showForm && (
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
                  {saving ? "Saving..." : editingId ? "Update Post" : "Save Draft"}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                {saved && <span className="text-sm text-green-500">{editingId ? "Updated!" : "Saved!"}</span>}
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {!showForm && <Separator className="my-8" />}

      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5" /> Posts ({posts.length})
      </h2>
      <div className="space-y-3">
        {posts.map((p) => (
          <Card key={p.id} className={editingId === p.id ? "ring-2 ring-primary" : ""}>
            <CardContent className="flex items-center justify-between py-4">
              <div className="min-w-0 flex-1 mr-4">
                <div className="font-medium truncate">{p.title}</div>
                <div className="text-xs text-muted-foreground">
                  {p.publishedAt ? new Date(p.publishedAt.seconds * 1000).toLocaleDateString() : "Draft"}
                  {p.author && <span> • {p.author}</span>}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Badge variant={p.published ? "default" : "secondary"} className="mr-1">
                  {p.published ? "Published" : "Draft"}
                </Badge>
                <Button variant="ghost" size="icon" title="Preview" onClick={() => handlePreview(p.id)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title={p.published ? "Unpublish" : "Publish"} onClick={() => handleTogglePublish(p.id, p.published)}>
                  {p.published ? <EyeOff className="h-4 w-4 text-amber-500" /> : <Eye className="h-4 w-4 text-green-600" />}
                </Button>
                <Button variant="ghost" size="icon" title="Edit" onClick={() => handleEdit(p.id)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Delete" onClick={() => handleDelete(p.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No posts yet. Click &quot;Create Post&quot; to get started.</p>
        )}
      </div>

      {/* Preview Modal */}
      {previewPost && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center overflow-y-auto p-4 pt-8" onClick={() => setPreviewPost(null)}>
          <div className="bg-background rounded-lg max-w-3xl w-full p-6 md:p-10 my-8 relative" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setPreviewPost(null)}
            >
              <X className="h-5 w-5" />
            </Button>

            <article className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  {previewPost.publishedAt && new Date(previewPost.publishedAt.seconds * 1000).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                  {previewPost.author && <span>• {previewPost.author}</span>}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{previewPost.title}</h1>
                {previewPost.tags && previewPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {previewPost.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>

              {previewPost.coverImage && (
                <div className="relative w-full rounded-lg overflow-hidden max-h-96">
                  <img
                    src={previewPost.coverImage}
                    alt={previewPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <Separator />

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {previewPost.coverImage
                    ? (previewPost.content || "").replace(
                        new RegExp(`!\\[[^\\]]*\\]\\(${previewPost.coverImage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)\\n*`),
                        ''
                      )
                    : previewPost.content || ""}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );
}
