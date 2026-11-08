"use client";
import dynamic from "next/dynamic";
import { lab } from "@/lib/data";
import Reveal, { SectionLabel } from "@/components/ui/Reveal";

const LabScene = dynamic(() => import("@/components/canvas/LabScene"), { ssr: false });

export default function Lab() {
  return (
    <section id="lab" className="relative overflow-hidden bg-bone px-6 py-32 text-ink md:px-10">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 h-[420px] bg-ink md:h-[600px] lg:order-1">
          <LabScene />
          <span className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/60">
            Custom GLSL · hover to distort
          </span>
        </div>
        <div className="order-1 lg:order-2">
          <SectionLabel index="06">Playground</SectionLabel>
          <Reveal>
            <h2 className="text-6xl font-bold leading-[0.9] tracking-tighter md:text-8xl">
              {lab.title.split(" ")[0]}
              <br />
              <span className="text-blood">{lab.title.split(" ").slice(1).join(" ")}.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-lg text-lg text-ink/70">{lab.text}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              {lab.tools.map((t) => (
                <span key={t} className="bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-bone">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
