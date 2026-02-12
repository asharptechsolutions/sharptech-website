import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code, Wrench, BarChart3, Shield, Lightbulb } from "lucide-react";

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
    </div>
  );
}
