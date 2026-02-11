"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await addDoc(collection(db, "st_contacts"), {
        ...form,
        createdAt: serverTimestamp(),
        read: false,
      });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Have a project in mind? Want to explore what AI can do for your business? Drop us a line.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Send us a message
            </CardTitle>
          </CardHeader>
          <CardContent>
            {status === "sent" ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                <h3 className="text-xl font-semibold">Message Sent!</h3>
                <p className="text-muted-foreground">We&apos;ll get back to you soon.</p>
                <Button variant="outline" onClick={() => setStatus("idle")}>Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Tell us about your project or question..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : <><Send className="h-4 w-4 mr-2" /> Send Message</>}
                </Button>
                {status === "error" && (
                  <p className="text-sm text-destructive text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Or email us directly at{" "}
          <a href="mailto:aaron.sharp2011@gmail.com" className="text-primary hover:underline">
            aaron.sharp2011@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
