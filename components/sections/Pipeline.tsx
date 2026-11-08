"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pipelineStages } from "@/lib/data";

const PipelineScene = dynamic(() => import("@/components/canvas/PipelineScene"), { ssr: false });

export default function Pipeline() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [stage, setStage] = useState(0);
  const pctRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const n = pipelineStages.length;
    const st = ScrollTrigger.create({
      trigger: section.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
        const s = Math.round(self.progress * (n - 1));
        setStage((prev) => (prev === s ? prev : s));
        if (pctRef.current) pctRef.current.textContent = String(Math.round(self.progress * 100)).padStart(2, "0");
      },
    });
    return () => st.kill();
  }, []);

  const s = pipelineStages[stage];

  return (
    <section id="pipeline" ref={section} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <PipelineScene progress={progress} />
        </div>

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 pt-24 md:p-10 md:pt-28">
          <div className="flex items-start justify-between">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-smoke">
              <span className="text-blood">03</span> — The Medallion Journey
            </div>
            <div className="text-right font-mono text-xs text-smoke">
              <div ref={pctRef} className="text-4xl font-bold text-bone md:text-6xl">00</div>
              % processed
            </div>
          </div>

          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-mono text-sm tracking-[0.4em] text-blood">
                  0{stage + 1} / {s.name}
                </p>
                <h3 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">{s.title}</h3>
                <p className="mt-4 text-lg text-bone/70">{s.text}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex gap-2">
              {pipelineStages.map((p, i) => (
                <div key={p.name} className={`h-1 flex-1 transition-colors duration-500 ${i <= stage ? "bg-blood" : "bg-ash"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
