"use client";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

export default function Contact() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      setTime(new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date()));
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="contact" className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-8 pt-32 md:px-10">
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-blood/20 blur-[120px]" />
      <div>
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-smoke">
          <span className="text-blood">07</span> — Contact
        </p>
        <Reveal>
          <h2 className="text-[16vw] font-bold leading-[0.85] tracking-tighter md:text-[11vw]">
            Let&apos;s build
            <br />
            <span className="text-outline">something</span> <span className="text-blood">loud.</span>
          </h2>
        </Reveal>
        <div className="mt-14 flex flex-wrap items-center gap-8">
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="red-glow h-40 w-40 rounded-full bg-blood text-center font-mono text-xs uppercase tracking-[0.25em] text-bone hover:bg-bone hover:text-ink md:h-48 md:w-48"
          >
            Get in
            <br />
            touch →
          </MagneticButton>
          <a href={`mailto:${profile.email}`} className="text-xl text-bone/70 underline decoration-blood underline-offset-8 hover:text-bone md:text-3xl">
            {profile.email}
          </a>
        </div>
      </div>

      <footer className="mt-24 flex flex-col gap-6 border-t border-ash pt-6 font-mono text-xs uppercase tracking-[0.2em] text-smoke md:flex-row md:items-center md:justify-between">
        <div className="flex gap-6">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-blood">
              {s.label} ↗
            </a>
          ))}
        </div>
        <span>
          {profile.location} · <span className="text-bone">{time}</span> IST
        </span>
        <span>
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
        </span>
      </footer>
    </section>
  );
}
