import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Code, Wrench, BarChart3, Shield, Lightbulb, MessageSquare, FileSearch, Rocket, Repeat, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "AI consulting, custom app development, and rapid MVP deployment. SharpTech.ai builds AI-powered solutions for businesses ready to move fast.",
};

const services = [
  {
    icon: Brain,
    title: "AI Consulting",
    desc: "Strategic guidance on implementing AI in your business. We identify high-impact use cases, evaluate tools, and build a roadmap tailored to your goals.",
    features: ["AI readiness assessment", "Tool & model selection", "Implementation roadmap", "ROI analysis"],
  },
  {
    icon: Code,
    title: "Custom App Development",
    desc: "Full-stack web and mobile applications built with modern tech stacks. From MVP to production-ready, we move fast without cutting corners.",
    features: ["React / Next.js / TypeScript", "Firebase & cloud backends", "Payment integrations", "Mobile-first design"],
  },
  {
    icon: Wrench,
    title: "AI Integration",
    desc: "Add AI capabilities to your existing products. Chatbots, content generation, data analysis, automation — we wire it in so it just works.",
    features: ["LLM integration", "Custom AI agents", "Workflow automation", "API development"],
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    desc: "Turn your data into actionable insights with custom dashboards, reporting tools, and automated analysis pipelines.",
    features: ["Custom dashboards", "Automated reporting", "Data pipeline design", "Predictive analytics"],
  },
  {
    icon: Lightbulb,
    title: "Rapid Prototyping",
    desc: "Got an idea? We can have a working prototype in your hands within days. Test fast, learn fast, iterate fast.",
    features: ["Concept → prototype in days", "User testing support", "Iterative refinement", "Go/no-go validation"],
  },
  {
    icon: Shield,
    title: "Technical Advisory",
    desc: "Need a sharp second opinion? We review architectures, audit code, and help you make better technical decisions.",
    features: ["Architecture review", "Code audits", "Tech stack guidance", "Security review"],
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground">
          We help businesses build, integrate, and leverage AI — from strategy to shipped product.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((s) => (
          <Card key={s.title} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>{s.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{s.desc}</p>
              <ul className="text-sm space-y-1">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How We Work */}
      <div className="max-w-4xl mx-auto mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How We Work</h2>
          <p className="text-muted-foreground">
            A straightforward process designed to move fast and deliver results.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", icon: MessageSquare, title: "Discovery Call", desc: "30-minute call to understand your goals, challenges, and timeline." },
            { step: "02", icon: FileSearch, title: "Scope & Proposal", desc: "We define deliverables, timeline, and pricing — no surprises." },
            { step: "03", icon: Rocket, title: "Build & Ship", desc: "Rapid development with regular check-ins. You see progress weekly." },
            { step: "04", icon: Repeat, title: "Iterate & Support", desc: "Launch, gather feedback, and refine. We stick around until it's right." },
          ].map((s) => (
            <div key={s.step} className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-xs font-bold text-primary">STEP {s.step}</div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Models */}
      <div className="max-w-5xl mx-auto mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Engagement Models</h2>
          <p className="text-muted-foreground">
            Flexible options to match how you work and what you need.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Project-Based",
              price: "Starting at $2,500",
              desc: "Defined scope, fixed price. Best for MVPs, prototypes, and one-off builds.",
              features: ["Clear deliverables & timeline", "Fixed price — no surprises", "Includes 2 weeks of post-launch support", "Ideal for MVPs & new products"],
              highlight: false,
            },
            {
              title: "Monthly Retainer",
              price: "From $3,000/mo",
              desc: "Ongoing development, maintenance, and strategic support. Best for growing products.",
              features: ["Dedicated development hours", "Priority support & fast turnaround", "Regular strategy check-ins", "Scale up or down as needed"],
              highlight: true,
            },
            {
              title: "Advisory & Consulting",
              price: "$200/hr",
              desc: "Expert guidance without the build commitment. Architecture reviews, AI strategy, and technical decisions.",
              features: ["No minimum commitment", "Architecture & code reviews", "AI strategy & tool selection", "Async support between sessions"],
              highlight: false,
            },
          ].map((plan) => (
            <Card key={plan.title} className={plan.highlight ? "border-primary shadow-lg relative" : ""}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.title}</CardTitle>
                <div className="text-2xl font-bold text-primary mt-2">{plan.price}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">{plan.desc}</p>
                <ul className="text-sm space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Not sure which model fits? Let&apos;s talk.</p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
