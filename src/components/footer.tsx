import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <Zap className="h-5 w-5 text-primary" />
              SharpTech<span className="text-primary">.ai</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI consulting and custom application development for businesses ready to move fast.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/sharptech-website/services" className="hover:text-primary transition-colors">Services</Link>
              <Link href="/sharptech-website/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link href="/sharptech-website/contact" className="hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>aaron.sharp2011@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SharpTech.ai — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
