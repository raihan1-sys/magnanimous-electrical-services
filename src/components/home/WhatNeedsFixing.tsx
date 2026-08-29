import Link from "next/link";
import { fixingFinder } from "@/lib/site-config";

export function WhatNeedsFixing() {
  return (
    <section className="bg-off-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-blue">
          Quick Start
        </div>
        <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold tracking-tight text-obsidian sm:text-4xl">
          What needs fixing?
        </h2>

        <div className="mt-9 flex flex-wrap gap-3">
          {fixingFinder.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="tick-frame border border-obsidian/15 px-5 py-3 font-body text-sm text-obsidian transition-all hover:border-obsidian hover:bg-obsidian hover:text-off-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
