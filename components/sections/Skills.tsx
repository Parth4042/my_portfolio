"use client";
import dynamic from "next/dynamic";
import { skillGroups } from "@/lib/data";
import Reveal, { SectionLabel } from "@/components/ui/Reveal";

const SkillsSphere = dynamic(() => import("@/components/canvas/SkillsSphere"), { ssr: false });

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden px-6 py-32 md:px-10">
      <SectionLabel index="02">Toolkit</SectionLabel>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="text-5xl font-bold leading-none tracking-tighter md:text-7xl">
              Tools I <span className="text-outline-red">wield</span>
              <span className="text-blood">.</span>
            </h2>
          </Reveal>
          <div className="mt-12 space-y-8">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.06}>
                <div className="border-t border-ash pt-4">
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-blood">{g.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="rounded-full border border-ash px-4 py-1.5 text-sm text-bone/80 transition-all duration-300 hover:border-blood hover:bg-blood hover:text-bone"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="relative h-[420px] md:h-[620px]">
          <div className="absolute inset-0 rounded-full bg-blood/10 blur-3xl" />
          <SkillsSphere />
        </div>
      </div>
    </section>
  );
}
