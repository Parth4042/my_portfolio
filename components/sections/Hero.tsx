"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { useAppReady } from "@/lib/useAppReady";
import { scrollToId } from "@/lib/lenis";

const HeroScene = dynamic(() => import("@/components/canvas/HeroScene"), { ssr: false });

function SplitWord({ text, ready, delay = 0, className = "" }: { text: string; ready: boolean; delay?: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%" }}
          animate={ready ? { y: 0 } : { y: "110%" }}
          transition={{ duration: 1, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ready = useAppReady();
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />

      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-smoke"
        >
          <span className="text-blood">●</span> {profile.role} · AI/ML · 3D Creator — {profile.location}
        </motion.p>

        <h1 className="text-[17vw] font-bold leading-[0.82] tracking-tighter md:text-[11vw]">
          <SplitWord text={profile.firstName} ready={ready} />
          <br />
          <SplitWord text={profile.lastName} ready={ready} delay={0.25} className="text-outline" />
          <SplitWord text="." ready={ready} delay={0.6} className="text-blood" />
        </h1>

        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-md text-lg text-bone/70 md:text-xl"
          >
            {profile.tagline}
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 1.1 }}
            onClick={() => scrollToId("#about")}
            className="pointer-events-auto flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-bone/70 hover:text-blood"
          >
            <span className="relative flex h-10 w-6 justify-center rounded-full border border-bone/40 pt-2">
              <span className="h-2 w-1 animate-scrollDot rounded-full bg-blood" />
            </span>
            Scroll to explore
          </motion.button>
        </div>
      </div>
    </section>
  );
}
