import Link from "next/link";
import { Zap, Github, Linkedin, Twitter, Mail, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <Zap className="h-5 w-5 text-primary" />
              SharpTech<span className="text-primary">.ai</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              AI consulting and custom application development for businesses ready to move fast.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/asharptechsolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/sharptech_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/sharptech-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-primary transition-colors">About</Link>
              <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <a
                href="https://github.com/asharptechsolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                Open Source <ArrowUpRight className="h-3 w-3" />
              </a>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Get in Touch</h4>
            <div className="text-sm text-muted-foreground space-y-3">
              <a
                href="mailto:aaron.sharp2011@gmail.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                aaron.sharp2011@gmail.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                United States
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SharpTech.ai — All rights reserved.</p>
          <p>Built with AI, shipped with speed.</p>
        </div>
      </div>
    </footer>
  );
}
