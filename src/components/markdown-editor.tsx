"use client";

import { useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Link,
  List,
  ListOrdered,
  Code,
  Quote,
  Image,
  Eye,
  Edit3,
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function MarkdownEditor({ value, onChange, placeholder, rows = 12 }: MarkdownEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wrap = useCallback(
    (before: string, after: string = before) => {
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = value.slice(start, end);
      const newVal = value.slice(0, start) + before + (selected || "text") + after + value.slice(end);
      onChange(newVal);
      setTimeout(() => {
        ta.focus();
        const newStart = start + before.length;
        const newEnd = selected ? newStart + selected.length : newStart + 4;
        ta.setSelectionRange(newStart, newEnd);
      }, 0);
    },
    [value, onChange]
  );

  const prefix = useCallback(
    (pre: string) => {
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const newVal = value.slice(0, lineStart) + pre + value.slice(lineStart);
      onChange(newVal);
      setTimeout(() => {
        ta.focus();
        ta.setSelectionRange(start + pre.length, start + pre.length);
      }, 0);
    },
    [value, onChange]
  );

  const tools = [
    { icon: Bold, action: () => wrap("**"), title: "Bold" },
    { icon: Italic, action: () => wrap("*"), title: "Italic" },
    { icon: Heading1, action: () => prefix("# "), title: "Heading 1" },
    { icon: Heading2, action: () => prefix("## "), title: "Heading 2" },
    { icon: Heading3, action: () => prefix("### "), title: "Heading 3" },
    { icon: Link, action: () => wrap("[", "](url)"), title: "Link" },
    { icon: Image, action: () => wrap("![alt](", ")"), title: "Image" },
    { icon: List, action: () => prefix("- "), title: "Bullet list" },
    { icon: ListOrdered, action: () => prefix("1. "), title: "Numbered list" },
    { icon: Code, action: () => wrap("`"), title: "Inline code" },
    { icon: Quote, action: () => prefix("> "), title: "Blockquote" },
  ];

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex items-center gap-1 px-2 py-1.5 bg-muted/50 border-b flex-wrap">
        {tools.map((t, i) => (
          <Button
            key={i}
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={t.action}
            title={t.title}
          >
            <t.icon className="h-3.5 w-3.5" />
          </Button>
        ))}
        <div className="flex-1" />
        <Button
          type="button"
          variant={mode === "write" ? "secondary" : "ghost"}
          size="sm"
          className="h-7 text-xs"
          onClick={() => setMode("write")}
        >
          <Edit3 className="h-3 w-3 mr-1" /> Write
        </Button>
        <Button
          type="button"
          variant={mode === "preview" ? "secondary" : "ghost"}
          size="sm"
          className="h-7 text-xs"
          onClick={() => setMode("preview")}
        >
          <Eye className="h-3 w-3 mr-1" /> Preview
        </Button>
      </div>

      {mode === "write" ? (
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="border-0 rounded-none focus-visible:ring-0 resize-y font-mono text-sm"
        />
      ) : (
        <div
          className="prose dark:prose-invert max-w-none p-3 min-h-[200px] text-sm"
          style={{ minHeight: rows * 24 }}
        >
          {value ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <p className="text-muted-foreground italic">Nothing to preview</p>
          )}
        </div>
      )}
    </div>
  );
}
