import { marqueeWords } from "@/lib/data";

export default function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <div className="relative z-10 -rotate-2 border-y border-blood bg-blood py-4">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="mx-6 flex items-center gap-12 text-3xl font-bold uppercase tracking-tight text-ink md:text-5xl">
            {w} <span className="text-bone">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
