import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Zap,
  Target,
  Lightbulb,
  Users,
  ArrowRight,
  Code,
  Brain,
  Rocket,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Speed Without Sacrifice",
    desc: "We ship fast — but never cut corners. Modern tooling and AI-assisted development let us deliver in weeks what used to take months.",
  },
  {
    icon: Target,
    title: "Results Over Hype",
    desc: "We don't chase trends. Every technology choice is grounded in whether it actually moves the needle for your business.",
  },
  {
    icon: Lightbulb,
    title: "Builder Mentality",
    desc: "We're makers at heart. We think like founders, not contractors — always looking for the simplest path to real value.",
  },
  {
    icon: Users,
    title: "Transparent Partnership",
    desc: "No black boxes. You'll understand what we build, why we built it, and how to maintain it. Your code is yours.",
  },
];

const milestones = [
  { value: "6+", label: "Apps Deployed" },
  { value: "2026", label: "Founded" },
  { value: "AI-First", label: "Approach" },
  { value: "100%", label: "Remote" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              About <span className="text-primary">SharpTech.ai</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re a lean, AI-powered development studio that turns ideas into
              production-ready software — fast.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              SharpTech.ai started with a simple observation: building software is
              still too slow and too expensive for most businesses. The tools have
              gotten better, AI has changed what&apos;s possible, but the industry
              hasn&apos;t caught up.
            </p>
            <p>
              Founded by Aaron Sharp, SharpTech.ai combines deep technical
              expertise with an AI-first development workflow. We use the latest in
              AI-assisted coding, automated testing, and rapid prototyping to
              deliver polished applications at a fraction of the traditional
              timeline and cost.
            </p>
            <p>
              We&apos;ve already shipped multiple production apps — from booking
              platforms to job finders to prediction markets — and we&apos;re just
              getting started. Our autonomous build pipeline can take an idea from
              concept to deployed MVP in hours, not months.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
            {milestones.map((m) => (
              <div key={m.label}>
                <p className="text-3xl md:text-4xl font-bold text-primary">{m.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            What We Believe
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="border bg-card">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2.5">
                      <v.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{v.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Meet the Team
            </h2>
            <div className="max-w-md mx-auto">
              <Card className="border bg-card overflow-hidden">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Code className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Aaron Sharp</h3>
                    <p className="text-primary font-medium">Founder & Lead Developer</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Full-stack developer and entrepreneur with a passion for
                    building useful software. Aaron combines hands-on coding
                    expertise with AI-powered development workflows to ship
                    products at startup speed.
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href="https://github.com/asharptechsolutions"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href="mailto:aaron.sharp2011@gmail.com">
                        <Mail className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold">How We Build</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our stack is modern, proven, and optimized for speed. Every project
            gets the same battle-tested foundation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Code, label: "Next.js + TypeScript" },
              { icon: Brain, label: "AI-Assisted Dev" },
              { icon: Rocket, label: "Firebase Backend" },
              { icon: Zap, label: "Tailwind CSS" },
              { icon: Target, label: "Stripe Payments" },
              { icon: Users, label: "GitHub CI/CD" },
            ].map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-3 rounded-lg border p-4 bg-card"
              >
                <t.icon className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-16 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to Build Something?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Whether you have a fully formed idea or just a hunch, we&apos;d love to
            hear about it.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Let&apos;s Talk <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
