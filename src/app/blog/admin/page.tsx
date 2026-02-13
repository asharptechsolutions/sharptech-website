"use client";

import { useState, useEffect, useRef } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, serverTimestamp, query, orderBy, getDocs, deleteDoc, doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, LogIn, FileText, Pencil, X, Eye, EyeOff, BookOpen, ImagePlus, Upload, Copy, Loader2, Wand2, AlertTriangle } from "lucide-react";
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

interface BlogImage {
  id: string;
  url: string;
  prompt?: string;
  filename: string;
  createdAt?: Timestamp;
  source: "generated" | "uploaded";
}

const FAL_API_KEY = "b250e348-b4f2-4761-8c05-7144a54bdc51:1cffb9b0115ab17ed1acae0f43cafea3";

export default function BlogAdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);

  // Image state
  const [images, setImages] = useState<BlogImage[]>([]);
  const [genPrompt, setGenPrompt] = useState("");
  const FAL_MODELS = [
    { id: "fal-ai/flux-pro/v1.1", name: "FLUX Pro v1.1", desc: "Best quality" },
    { id: "fal-ai/flux-pro/v1.1-ultra", name: "FLUX Pro Ultra", desc: "Highest resolution" },
    { id: "fal-ai/flux-pro", name: "FLUX Pro", desc: "Original Pro" },
    { id: "fal-ai/flux/dev", name: "FLUX Dev", desc: "Development model" },
    { id: "fal-ai/flux/schnell", name: "FLUX Schnell", desc: "Fast & cheap" },
    { id: "fal-ai/flux-realism", name: "FLUX Realism", desc: "Photorealistic" },
    { id: "fal-ai/recraft-v3", name: "Recraft V3", desc: "Design & illustration" },
    { id: "fal-ai/stable-diffusion-v35-large", name: "SD 3.5 Large", desc: "Stability AI latest" },
    { id: "fal-ai/aura-flow", name: "AuraFlow", desc: "Open source, fast" },
    { id: "fal-ai/kolors", name: "Kolors", desc: "Kwai, vibrant colors" },
    { id: "fal-ai/flux-lora", name: "FLUX LoRA", desc: "Custom fine-tuned" },
  ];
  const [genModel, setGenModel] = useState("fal-ai/flux-pro/v1.1");
  const [genSize, setGenSize] = useState("landscape_16_9");
  const [generating, setGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [savingToLibrary, setSavingToLibrary] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (u) {
        loadPosts();
        loadImages();
      }
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

  const loadImages = async () => {
    const q = query(collection(db, "st_blog_images"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setImages(snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogImage)));
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
      ...(!currentlyPublished ? { publishedAt: serverTimestamp() } : {}),
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

  // Image generation
  const handleGenerate = async () => {
    if (!genPrompt.trim()) return;
    setGenerating(true);
    setGeneratedImageUrl(null);
    try {
      const endpoint = `https://fal.run/${genModel}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Key ${FAL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: genPrompt,
          image_size: genSize,
          num_images: 1,
        }),
      });
      const data = await res.json();
      if (data.images && data.images.length > 0) {
        setGeneratedImageUrl(data.images[0].url);
        setGeneratedPrompt(genPrompt);
      }
    } catch (err) {
      console.error("Generation failed:", err);
    }
    setGenerating(false);
  };

  const handleSaveToLibrary = async () => {
    if (!generatedImageUrl) return;
    setSavingToLibrary(true);
    try {
      // Use canvas to convert image to blob (avoids CORS issues with direct fetch)
      const img = new Image();
      img.crossOrigin = "anonymous";
      const blob = await new Promise<Blob>((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("No canvas context"));
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((b) => {
            if (b) resolve(b);
            else reject(new Error("Canvas toBlob failed"));
          }, "image/png");
        };
        img.onerror = () => {
          // Fallback: try direct fetch if canvas fails
          fetch(generatedImageUrl).then(r => r.blob()).then(resolve).catch(reject);
        };
        img.src = generatedImageUrl;
      });
      const filename = `${Date.now()}-generated.png`;
      const storageRef = ref(storage, `st_blog/library/${filename}`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db, "st_blog_images"), {
        url,
        prompt: generatedPrompt,
        filename,
        createdAt: serverTimestamp(),
        source: "generated",
      });
      setGeneratedImageUrl(null);
      setGenPrompt("");
      loadImages();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save image. The generated image URL may have expired — try generating again.");
    }
    setSavingToLibrary(false);
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const filename = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `st_blog/library/${filename}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db, "st_blog_images"), {
        url,
        filename,
        createdAt: serverTimestamp(),
        source: "uploaded",
      });
      loadImages();
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteImage = async (img: BlogImage) => {
    if (!confirm("Delete this image?")) return;
    try {
      const storageRef = ref(storage, `st_blog/library/${img.filename}`);
      await deleteObject(storageRef).catch(() => {});
      await deleteDoc(doc(db, "st_blog_images", img.id));
      loadImages();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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

      <Tabs defaultValue="posts">
        <TabsList className="mb-6">
          <TabsTrigger value="posts" className="gap-2"><FileText className="h-4 w-4" /> Posts</TabsTrigger>
          <TabsTrigger value="images" className="gap-2"><ImagePlus className="h-4 w-4" /> Images</TabsTrigger>
        </TabsList>

        {/* ==================== POSTS TAB ==================== */}
        <TabsContent value="posts">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" /> Posts ({posts.length})
            </h2>
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
                  {editingId ? (<><Pencil className="h-5 w-5" /> Edit Post</>) : (<><Plus className="h-5 w-5" /> New Post</>)}
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
                      <BookOpen className="h-4 w-4" />
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
        </TabsContent>

        {/* ==================== IMAGES TAB ==================== */}
        <TabsContent value="images">
          {/* Generate Image Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" /> Generate Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Tip: AI-generated images with text look bad. Use abstract visuals only.</span>
              </div>
              <Input
                placeholder="Describe the image you want to generate..."
                value={genPrompt}
                onChange={(e) => setGenPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !generating && handleGenerate()}
              />
              <div className="flex flex-wrap gap-3">
                <Select value={genModel} onValueChange={setGenModel}>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FAL_MODELS.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name} — {m.desc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={genSize} onValueChange={setGenSize}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landscape_16_9">Landscape 16:9</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="portrait_4_3">Portrait 4:3</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleGenerate} disabled={generating || !genPrompt.trim()}>
                  {generating ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : <><Wand2 className="h-4 w-4 mr-2" /> Generate</>}
                </Button>
              </div>

              {generatedImageUrl && (
                <div className="space-y-3 pt-4">
                  <img src={generatedImageUrl} alt="Generated" className="rounded-lg max-h-96 w-auto" />
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleSaveToLibrary} disabled={savingToLibrary}>
                      {savingToLibrary ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</> : <><Upload className="h-4 w-4 mr-2" /> Save to Library</>}
                    </Button>
                    <Button variant="outline" onClick={() => copyToClipboard(generatedImageUrl)}>
                      <Copy className="h-4 w-4 mr-2" /> Copy URL
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Image Library Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ImagePlus className="h-5 w-5" /> Image Library ({images.length})
                </CardTitle>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadImage}
                  />
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                    {uploading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading...</> : <><Upload className="h-4 w-4 mr-2" /> Upload Image</>}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {images.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No images yet. Generate or upload one above.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((img) => (
                    <Card key={img.id} className="overflow-hidden">
                      <div className="aspect-video relative bg-muted">
                        <img src={img.url} alt={img.prompt || img.filename} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-3 space-y-2">
                        {img.prompt && (
                          <p className="text-xs text-muted-foreground line-clamp-2">{img.prompt}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Badge variant="secondary" className="text-xs">
                              {img.source === "generated" ? "AI" : "Upload"}
                            </Badge>
                            {img.createdAt && (
                              <span className="text-xs text-muted-foreground">
                                {new Date(img.createdAt.seconds * 1000).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7" title="Copy URL" onClick={() => copyToClipboard(img.url)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" title="Delete" onClick={() => handleDeleteImage(img)}>
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Modal */}
      {previewPost && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center overflow-y-auto p-4 pt-8" onClick={() => setPreviewPost(null)}>
          <div className="bg-background rounded-lg max-w-3xl w-full p-6 md:p-10 my-8 relative" onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => setPreviewPost(null)}>
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
                  <img src={previewPost.coverImage} alt={previewPost.title} className="w-full h-full object-cover" />
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
