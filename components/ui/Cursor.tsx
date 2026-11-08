"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let hover = false;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const t = e.target as HTMLElement;
      hover = !!t.closest("a, button, [data-cursor='hover']");
    };
    const loop = () => {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;
      if (dot.current) dot.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
      if (ring.current) {
        ring.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${hover ? 2.2 : 1})`;
        ring.current.style.backgroundColor = hover ? "rgba(225,6,0,0.15)" : "transparent";
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-el pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-blood" />
      <div
        ref={ring}
        className="cursor-el pointer-events-none fixed left-0 top-0 z-[199] h-9 w-9 rounded-full border border-bone/60 transition-[background-color] duration-300"
        style={{ transitionProperty: "background-color" }}
      />
    </>
  );
}
