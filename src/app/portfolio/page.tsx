"use client";

import { ExternalLink, Github, Calendar, Users, Briefcase, Brain, TrendingUp, BookOpen, Lightbulb, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    name: "SpotBookie",
    tagline: "Multi-tenant booking & scheduling SaaS",
    description:
      "A full-featured appointment booking platform with Stripe Connect payments, phone auth for clients, automated review requests, and real-time check-in flow. Built for salons, barbershops, and service businesses.",
    tech: ["React", "Firebase", "Stripe Connect", "Tailwind CSS"],
    icon: Calendar,
    liveUrl: "https://asharptechsolutions.github.io/stylist-scheduler/",
    repoUrl: "https://github.com/asharptechsolutions/stylist-scheduler",
    highlights: ["Multi-tenant architecture", "Stripe Connect payments", "Phone auth", "Now Serving dashboard"],
    status: "Production",
  },
  {
    name: "JobFinder",
    tagline: "AI-powered job search & resume builder",
    description:
      "Aggregates jobs from Google, JSearch, RemoteOK, and TheMuse. AI parses resumes, generates tailored cover letters, and scores skill matches. PDF export and location-based search included.",
    tech: ["Next.js", "Firebase", "Anthropic AI", "Tailwind CSS"],
    icon: Briefcase,
    liveUrl: "https://asharptechsolutions.github.io/job-finder/",
    repoUrl: "https://github.com/asharptechsolutions/job-finder",
    highlights: ["Multi-source job aggregation", "AI resume parsing", "Skill matching with synonyms", "PDF export"],
    status: "Production",
  },
  {
    name: "BetBuddy",
    tagline: "Private prediction markets for friends",
    description:
      "Create private prediction markets in seconds. Invite friends, place bets, track real-time odds, and compete on the leaderboard. Features market resolution, shareable links, and accuracy stats.",
    tech: ["Next.js", "Firebase", "Tailwind CSS", "shadcn/ui"],
    icon: TrendingUp,
    liveUrl: "https://asharptechsolutions.github.io/prediction-market/",
    repoUrl: "https://github.com/asharptechsolutions/prediction-market",
    highlights: ["Real-time odds display", "Market resolution & payouts", "Shareable invite links", "Leaderboard & stats"],
    status: "Production",
  },
  {
    name: "HireArena",
    tagline: "Hiring through skill-based contests",
    description:
      "Companies create coding challenges, design contests, and skill assessments. Candidates submit entries with file uploads. Rubric-based scoring with weighted criteria and countdown timers.",
    tech: ["Next.js", "Firebase", "Tailwind CSS", "shadcn/ui"],
    icon: Award,
    liveUrl: "https://asharptechsolutions.github.io/hiring-contests/",
    repoUrl: "https://github.com/asharptechsolutions/hiring-contests",
    highlights: ["File upload submissions", "Rubric-based scoring", "Contest timers", "Company dashboards"],
    status: "Production",
  },
  {
    name: "HomeschoolAI",
    tagline: "AI-powered homeschool curriculum planner",
    description:
      "Parents onboard by entering their child's age, learning style, and availability. AI generates personalized curriculum plans aligned with state standards. Progress tracking and milestone indicators.",
    tech: ["Next.js", "Firebase", "Anthropic AI", "shadcn/ui"],
    icon: BookOpen,
    liveUrl: "https://asharptechsolutions.github.io/homeschool-ai/",
    repoUrl: "https://github.com/asharptechsolutions/homeschool-ai",
    highlights: ["Personalized curriculum", "Multi-child support", "Progress tracking", "State standards alignment"],
    status: "Production",
  },
  {
    name: "Idea Vault",
    tagline: "Capture and validate startup ideas with AI",
    description:
      "Drop your idea via text, voice, or screenshot. AI-powered research validates market size, analyzes competitors, and scores feasibility. Turn raw inspiration into actionable plans.",
    tech: ["Next.js", "Firebase", "Tailwind CSS", "shadcn/ui"],
    icon: Lightbulb,
    liveUrl: "https://asharptechsolutions.github.io/idea-vault/",
    repoUrl: "https://github.com/asharptechsolutions/idea-vault",
    highlights: ["Quick idea capture", "AI validation", "Market research", "Feasibility scoring"],
    status: "Production",
  },
  {
    name: "Accelemate",
    tagline: "AI agent for accelerator applications",
    description:
      "Streamlines the accelerator application process. AI generates application drafts based on your startup profile, parses program requirements, and tracks applications through every stage.",
    tech: ["Next.js", "Firebase", "Anthropic AI", "shadcn/ui"],
    icon: Brain,
    liveUrl: "https://asharptechsolutions.github.io/accelemate/",
    repoUrl: "https://github.com/asharptechsolutions/accelemate",
    highlights: ["AI application drafts", "Program discovery", "Application tracking", "Founder profiles"],
    status: "Production",
  },
];

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Our <span className="text-primary">Portfolio</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real products, built and deployed. From SaaS platforms to AI-powered tools — here&apos;s what we&apos;ve shipped.
        </p>
        <div className="flex items-center justify-center gap-8 mt-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{projects.length}</p>
            <p className="text-sm text-muted-foreground">Apps Deployed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">100%</p>
            <p className="text-sm text-muted-foreground">AI-Integrated</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">Full Stack</p>
            <p className="text-sm text-muted-foreground">End to End</p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <Card key={project.name} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <CardDescription className="text-sm">{project.tagline}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 gap-4">
                <p className="text-sm text-muted-foreground">{project.description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5">
                  {project.highlights.map((h) => (
                    <Badge key={h} variant="outline" className="text-xs font-normal">
                      {h}
                    </Badge>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge key={t} className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2 mt-auto pt-2">
                  <Button asChild size="sm" className="flex-1">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1.5" />
                      Live Demo
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1.5" />
                      Source
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-16 p-8 rounded-2xl bg-muted/50">
        <h2 className="text-2xl font-bold mb-2">Want something built?</h2>
        <p className="text-muted-foreground mb-6">
          We ship fast. From concept to deployed MVP in days, not months.
        </p>
        <Button asChild size="lg">
          <a href="/sharptech-website/contact">Get in Touch</a>
        </Button>
      </div>
    </div>
  );
}
