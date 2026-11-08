"use client";
import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { about } from "@/lib/data";
import Reveal, { SectionLabel } from "@/components/ui/Reveal";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="relative mr-[0.25em] mt-1">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = about.intro.split(" ");

  return (
    <section id="about" className="relative px-6 py-32 md:px-10 md:py-48">
      <SectionLabel index="01">About</SectionLabel>
      <p ref={ref} className="flex max-w-6xl flex-wrap text-3xl font-medium leading-tight tracking-tight md:text-6xl">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </p>

      <div className="mt-24 grid gap-px overflow-hidden border border-ash bg-ash md:grid-cols-3">
        {about.pillars.map((p, i) => (
          <Reveal key={p.k} delay={i * 0.1} className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-blood md:p-10">
            <span className="font-mono text-sm text-blood transition-colors group-hover:text-ink">{p.k}</span>
            <h3 className="mt-16 text-2xl font-bold md:text-3xl">{p.title}</h3>
            <p className="mt-4 text-bone/60 transition-colors group-hover:text-bone">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
