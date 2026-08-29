"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const headlineLines = [
  { text: "POWERING.", accent: false },
  { text: "REPAIRING.", accent: true },
  { text: "RESTORING.", accent: false },
];

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 48]);
  const ringsY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -32]);

  const lineVariants = {
    hidden: { y: reduce ? 0 : 34, opacity: 0 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.15 + i * 0.11, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section className="relative min-h-[calc(100svh-64px)] overflow-hidden bg-obsidian text-off-white">
      {/* Background — faint warm grid, no neon glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-aurora absolute inset-0" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.05]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#EFE8D8" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-64px)] max-w-7xl grid-cols-1 px-5 pt-10 md:grid-cols-2 md:items-center md:px-8 md:pt-6 lg:pt-0">
        {/* Left — headline + copy */}
        <div className="relative z-10 py-10 md:py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-blue-bright"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            A.T.U Campus, Old Hostel · Accra — Electrical &amp; Electronics
          </motion.div>

          <h1 className="font-display text-[13vw] leading-[0.95] font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {headlineLines.map((line, i) => (
              <motion.span
                key={line.text}
                custom={i}
                initial="hidden"
                animate="show"
                variants={lineVariants}
                className={`block ${line.accent ? "text-blue-bright" : "text-off-white"}`}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6 }}
            className="mt-7 max-w-md font-body text-base leading-relaxed text-off-white/65 md:text-lg"
          >
            Electrical repairs, appliance servicing, motor rewinding, AC
            servicing, device repairs and quality electronics — all under one
            roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.76, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className="luxury-button group inline-flex items-center gap-2 rounded-sm bg-blue px-6 py-3.5 font-body text-sm font-medium text-white"
            >
              Book a Service
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/[.03] px-6 py-3.5 font-body text-sm font-medium text-off-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-lime/60 hover:bg-white/[.08]"
            >
              Explore Products
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 font-mono text-xs text-off-white/50"
          >
            <a href={siteConfig.phoneHref} className="hover:text-off-white">
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-lime"
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
            <span className="hidden sm:inline">{siteConfig.email}</span>
          </motion.div>
        </div>

        {/* Right — technician portrait, oversized, breaking the grid */}
        <div className="relative z-10 mx-auto flex h-[62vw] max-h-[560px] w-full max-w-[420px] items-end justify-center md:h-[86vh] md:max-h-none md:max-w-none lg:items-end">
          {/* signature ring motif echoing the logo's circular seal */}
          <motion.div
            aria-hidden="true"
            style={{ y: ringsY }}
            className="absolute right-[8%] top-[8%] hidden aspect-square w-[86%] rounded-full border border-white/10 md:block"
          />
          <div
            aria-hidden="true"
            className="absolute right-[16%] top-[16%] hidden aspect-square w-[68%] rounded-full border border-white/[0.06] bg-white/[0.02] md:block"
          />

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: portraitY }}
            className="relative h-full w-full"
          >
            <Image
              src={siteConfig.technicianPortrait}
              alt="Magnanimous Electrical Services technician"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 90vw"
              className="object-contain object-bottom"
            />
          </motion.div>

          {/* architectural annotation labels */}
          <div className="absolute left-0 top-[18%] hidden font-mono text-[10px] uppercase tracking-[0.15em] text-blue-bright/80 md:block">
            <div className="tick-frame px-3 py-2">Certified Repairs</div>
          </div>
          <div className="absolute bottom-[8%] right-0 hidden font-mono text-[10px] uppercase tracking-[0.15em] text-off-white/60 md:block">
            <div className="tick-frame px-3 py-2">On-Site &amp; Workshop</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-obsidian to-transparent" />
      <motion.div aria-hidden="true" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[9px] uppercase tracking-[.28em] text-off-white/35 lg:flex"><span className="h-9 w-px bg-gradient-to-b from-transparent via-blue-bright to-transparent"/>Scroll to explore</motion.div>
    </section>
  );
}
