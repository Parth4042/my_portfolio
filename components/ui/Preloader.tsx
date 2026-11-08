"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getLenis } from "@/lib/lenis";

const WORDS = ["EXTRACT", "TRANSFORM", "LOAD", "RENDER"];

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("is-loading");
    window.scrollTo(0, 0);
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 7));
      setCount(n);
      if (n >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 350);
      }
    }, 45);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!done) return;
    document.documentElement.classList.remove("is-loading");
    getLenis()?.start();
    (window as unknown as { __appReady?: boolean }).__appReady = true;
    window.dispatchEvent(new Event("app:ready"));
  }, [done]);

  const word = WORDS[Math.min(WORDS.length - 1, Math.floor(count / 26))];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 md:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between font-mono text-xs uppercase tracking-[0.3em] text-smoke">
            <span>Portfolio © {new Date().getFullYear()}</span>
            <span className="text-blood">● Booting pipeline</span>
          </div>
          <div className="overflow-hidden">
            <motion.p
              key={word}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              className="font-mono text-sm tracking-[0.5em] text-bone/70"
            >
              {word}
            </motion.p>
          </div>
          <div className="flex items-end justify-between">
            <div className="h-[2px] w-1/2 bg-ash">
              <div className="h-full bg-blood transition-[width] duration-100" style={{ width: `${count}%` }} />
            </div>
            <span className="text-[22vw] font-bold leading-[0.8] tracking-tighter md:text-[14vw]">
              {count}
              <span className="text-blood">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
