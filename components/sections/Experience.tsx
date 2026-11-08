"use client";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { experience } from "@/lib/data";
import Reveal, { SectionLabel } from "@/components/ui/Reveal";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });

  return (
    <section id="experience" className="px-6 py-32 md:px-10 md:py-48">
      <SectionLabel index="05">Experience</SectionLabel>
      <h2 className="mb-20 text-5xl font-bold tracking-tighter md:text-7xl">
        The <span className="text-outline">timeline</span>
        <span className="text-blood">.</span>
      </h2>
      <div ref={ref} className="relative ml-2 md:ml-[20%]">
        <div className="absolute left-0 top-0 h-full w-px bg-ash" />
        <motion.div style={{ scaleY: scrollYProgress }} className="absolute left-0 top-0 h-full w-px origin-top bg-blood" />
        <div className="space-y-20">
          {experience.map((e, i) => (
            <Reveal key={i} delay={0.05} className="relative pl-10 md:pl-16">
              <span className="absolute -left-[6px] top-2 h-3 w-3 rounded-full border-2 border-blood bg-ink" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-blood">{e.period}</p>
              <h3 className="mt-2 text-3xl font-bold md:text-4xl">{e.role}</h3>
              <p className="mt-1 text-bone/50">{e.org}</p>
              <ul className="mt-5 space-y-2">
                {e.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-bone/75">
                    <span className="mt-2 h-px w-4 shrink-0 bg-blood" />
                    {pt}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
