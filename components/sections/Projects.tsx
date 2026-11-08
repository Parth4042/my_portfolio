"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1100px) rotateY(0) rotateX(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      className="group relative h-full w-full overflow-hidden border border-ash bg-coal transition-transform duration-300 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(225,6,0,0.25), transparent 45%)" }}
      />
      {children}
    </div>
  );
}

export default function Projects() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const el = track.current!;
      const dist = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={section} className="relative overflow-hidden py-24 md:flex md:h-screen md:items-center md:py-0">
      <div ref={track} className="flex flex-col gap-8 px-6 md:w-max md:flex-row md:items-center md:gap-10 md:px-10">
        <div className="shrink-0 md:w-[38vw]">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-smoke">
            <span className="text-blood">04</span> — Selected work
          </p>
          <h2 className="text-6xl font-bold leading-[0.9] tracking-tighter md:text-[8vw]">
            Things
            <br />I <span className="text-outline-red">built</span>
            <span className="text-blood">.</span>
          </h2>
          <p className="mt-6 max-w-sm text-bone/60">Pipelines, platforms and experiments. Keep scrolling →</p>
        </div>

        {projects.map((p, i) => (
          <article key={p.title} className="h-[460px] shrink-0 md:h-[68vh] md:w-[34vw] md:min-w-[380px]">
            <TiltCard>
              <a href={p.link} className="relative flex h-full flex-col justify-between p-8">
                <div className="flex items-start justify-between font-mono text-xs uppercase tracking-[0.25em] text-smoke">
                  <span>{p.category}</span>
                  <span>{p.year}</span>
                </div>
                <div className="pointer-events-none absolute right-6 top-14 select-none text-[9rem] font-bold leading-none text-outline opacity-20 transition-all duration-700 group-hover:text-outline-red group-hover:opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ transform: "translateZ(40px)" }}>
                  <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{p.title}</h3>
                  <p className="mt-4 text-bone/60">{p.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="border border-ash px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-bone/70">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-blood">
                    View project
                    <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </div>
                </div>
              </a>
            </TiltCard>
          </article>
        ))}
        <div className="hidden shrink-0 md:block md:w-[10vw]" />
      </div>
    </section>
  );
}
