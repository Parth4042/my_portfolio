"use client";
import { useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { scrollToId } from "@/lib/lenis";
import { profile } from "@/lib/data";

const LINKS = [
  { id: "#about", label: "About" },
  { id: "#skills", label: "Skills" },
  { id: "#pipeline", label: "Pipeline" },
  { id: "#work", label: "Work" },
  { id: "#lab", label: "Lab" },
  { id: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.div style={{ scaleX }} className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-blood" />
      <header className="fixed inset-x-0 top-0 z-[65] flex items-center justify-between px-6 py-5 mix-blend-difference md:px-10">
        <button onClick={() => go("#top")} className="text-lg font-bold tracking-tight text-bone">
          {profile.firstName[0]}
          {profile.lastName[0]}
          <span className="text-blood">.</span>
        </button>
        <nav className="hidden gap-8 md:flex">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className="group relative font-mono text-xs uppercase tracking-[0.2em] text-bone">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-bone transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>
        <button onClick={() => setOpen((o) => !o)} className="font-mono text-xs uppercase tracking-[0.2em] text-bone md:hidden">
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[64] flex flex-col justify-center gap-4 bg-blood px-8"
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                onClick={() => go(l.id)}
                className="text-left text-5xl font-bold text-ink"
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
