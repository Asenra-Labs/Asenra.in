import { ArrowRight, Code2, Cpu, Layout, Sparkles, Shield } from "lucide-react";

import { ApplyButton } from "@/components/careers/ApplyButton";
import { CtaButton } from "@/components/ui/CtaButton";
import { CtaSection } from "@/components/ui/CtaSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel, PanelLabel } from "@/components/ui/Panel";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = [
  {
    title: "Real Business Impact",
    desc: "We don't ship code for vanity or tech stack points. Every line of software we write must unlock tangible operational value or revenue growth for our clients.",
  },
  {
    title: "High Agency & Autonomy",
    desc: "We give engineers and designers complete ownership over outcomes. No micromanagement, no artificial bureaucracy—just talented builders shipping great software.",
  },
  {
    title: "Uncompromising Quality",
    desc: "Craftsmanship matters. From 60fps animations to sub-50ms API response times and robust fail-safes, we hold ourselves to global engineering standards.",
  },
  {
    title: "Continuous Learning",
    desc: "We operate on the bleeding edge of enterprise AI, vector databases, and system automation. You'll expand your technical depth faster here than anywhere else.",
  },
];

const openRoles = [
  {
    title: "Senior AI Systems Engineer",
    department: "Engineering",
    type: "Full-Time · Remote / On-Site",
    description: "Architect private RAG pipelines, fine-tune domain LLMs, and build resilient multi-agent swarms for enterprise clients.",
    skills: ["Python", "PyTorch", "LangChain/LlamaIndex", "Vector DBs", "PostgreSQL"],
  },
  {
    title: "Full-Stack Software Engineer",
    department: "Engineering",
    type: "Full-Time · Remote / On-Site",
    description: "Build high-performance internal tools and enterprise web platforms with Next.js Edge, TypeScript, and modern database backends.",
    skills: ["TypeScript", "Next.js", "Tailwind", "Supabase", "Node.js"],
  },
  {
    title: "Enterprise Solutions Architect",
    department: "Client Engineering",
    type: "Full-Time · Remote / On-Site",
    description: "Partner directly with enterprise executive teams to audit business processes, design AI integration blueprints, and lead technical implementation.",
    skills: ["System Architecture", "API Integration", "Process Automation", "Client Leadership"],
  },
  {
    title: "Software Engineering Intern",
    department: "Early Career",
    type: "Internship · Remote / Hybrid",
    description: "Work directly alongside senior engineers shipping production code, building high-impact products, and learning enterprise AI architecture.",
    skills: ["React/Next.js", "TypeScript", "Python Basics", "Git", "Problem Solving"],
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-black">
      <PageHeader
        eyebrow="Careers & engineering culture"
        title={
          <>
            Build with people who believe software should create real business
            impact.
          </>
        }
        lede="We're a team of engineers, designers, and AI architects building the next generation of enterprise systems. We value craftsmanship, high agency, and tangible results over corporate politics."
        actions={
          <CtaButton href="/hiring/verify" variant="secondary" size="md">
            <Shield className="size-4" />
            <span>Verify credentials</span>
          </CtaButton>
        }
      />

      <section className="relative isolate bg-black pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <SectionHeading eyebrow="Our culture & ethos" title="How we work." />

          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2">
            {values.map((value) => (
              <RevealItem key={value.title} className="flex">
                <Panel className="w-full p-8 sm:p-10">
                  <h3 className="text-xl font-medium tracking-tight text-white">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/45 text-pretty">
                    {value.desc}
                  </p>
                </Panel>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="relative isolate border-t border-white/5 bg-black py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <SectionHeading eyebrow="Open roles" title="Where we need people." />

          <RevealGroup as="ul" className="mt-12 space-y-4 md:mt-16">
            {openRoles.map((role) => (
              <RevealItem key={role.title} as="li">
                <Panel className="flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <PanelLabel>{role.department}</PanelLabel>
                      <span className="font-mono text-[11px] text-white/25">
                        {role.type}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-medium tracking-tight text-white">
                      {role.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/45 text-pretty">
                      {role.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {role.skills.map((skill: string) => (
                        <li
                          key={skill}
                          className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ApplyButton
                    roleTitle={role.title}
                    variant="primary"
                    size="md"
                    className="shrink-0"
                  >
                    Apply
                  </ApplyButton>
                </Panel>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaSection
        title="Don't see your specific role?"
        lede="We are always looking for exceptional engineers, AI researchers, and designers. Send us your work and let's talk."
        actions={
          <ApplyButton roleTitle="General Application" variant="primary" size="lg">
            <span>Submit a general application</span>
            <ArrowRight className="size-4" />
          </ApplyButton>
        }
      />
    </main>
  );
}
