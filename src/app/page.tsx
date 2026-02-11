import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Code, Rocket, ArrowRight, Sparkles, Cpu, BarChart3, Quote, Star } from "lucide-react";

const highlights = [
  { icon: Brain, title: "AI Strategy", desc: "We help you identify where AI creates real value — not hype." },
  { icon: Code, title: "Custom Apps", desc: "Full-stack applications built fast with modern tech stacks." },
  { icon: Rocket, title: "Rapid Deployment", desc: "From concept to production in weeks, not months." },
];

const stats = [
  { icon: Sparkles, value: "5+", label: "Apps Deployed" },
  { icon: Cpu, value: "AI-First", label: "Development" },
  { icon: BarChart3, value: "Fast", label: "Turnaround" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium bg-background">
              <Sparkles className="h-4 w-4 text-primary" />
              AI-Powered Development
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Build Smarter.<br />
              <span className="text-primary">Ship Faster.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              SharpTech.ai builds AI-powered solutions and custom applications for businesses
              that want to move at the speed of innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            {stats.map((s) => (
              <div key={s.label} className="space-y-1">
                <s.icon className="h-6 w-6 mx-auto text-primary mb-2" />
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What We Do</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From strategy to deployment, we handle the full stack.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {highlights.map((h) => (
            <Card key={h.title} className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8 pb-6 space-y-3">
                <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <h.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{h.title}</h3>
                <p className="text-sm text-muted-foreground">{h.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials / Social Proof */}
      <section className="bg-muted/30 border-y">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What People Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real feedback from founders and teams we&apos;ve worked with.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: "SharpTech took our booking idea from napkin sketch to live product in under two weeks. The AI-powered features they suggested made all the difference.",
                name: "Salon Owner",
                role: "SpotBookie Early Adopter",
                stars: 5,
              },
              {
                quote: "Their autonomous development pipeline is unlike anything I've seen. We got a polished MVP with auth, payments, and a real UI — not a hackathon prototype.",
                name: "Startup Founder",
                role: "App Factory Client",
                stars: 5,
              },
              {
                quote: "Fast, opinionated, and they actually ship. No endless meetings or scope creep. Just working software, deployed and ready to go.",
                name: "Solo Entrepreneur",
                role: "Custom App Build",
                stars: 5,
              },
            ].map((t) => (
              <Card key={t.name} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6 pb-6 space-y-4">
                  <Quote className="h-8 w-8 text-primary/30" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.quote}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-10 gap-8 opacity-40">
            {["Next.js", "Firebase", "Stripe", "Tailwind CSS", "TypeScript"].map((tech) => (
              <span key={tech} className="text-sm font-medium tracking-wide">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center space-y-4">
          <h2 className="text-3xl font-bold">Ready to Build Something?</h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto">
            Whether you need an AI strategy, a custom app, or both — let&apos;s talk.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact">Contact Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
