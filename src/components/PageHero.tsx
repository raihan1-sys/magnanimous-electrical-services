"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type PageHeroProps = { eyebrow: string; title: string; description: string; image?: string; imageAlt?: string; index?: string; action?: { label: string; href: string } };

export function PageHero({ eyebrow, title, description, image, imageAlt, index = "01", action }: PageHeroProps) {
  const reduce = useReducedMotion();
  const words = title.split(" ");
  return <section className="relative isolate overflow-hidden bg-obsidian text-off-white">
    <div className="absolute inset-0 hero-aurora" />
    <div className="absolute inset-0 blueprint-grid opacity-[.16]" />
    <div className="absolute -right-28 top-[-20%] h-[40rem] w-[40rem] rounded-full border border-white/10" />
    <div className="relative mx-auto grid min-h-[520px] max-w-7xl items-end gap-8 px-5 py-16 md:grid-cols-[1.05fr_.95fr] md:px-8 md:py-20 lg:min-h-[620px]">
      <div className="relative z-10 max-w-3xl">
        <motion.div initial={{opacity:0,x:reduce?0:-20}} animate={{opacity:1,x:0}} transition={{duration:.65}} className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.24em] text-blue-bright"><span className="flex h-8 w-8 items-center justify-center border border-white/20 text-lime">{index}</span>{eyebrow}</motion.div>
        <h1 className="mt-8 max-w-4xl font-display text-5xl font-semibold leading-[.9] tracking-[-.06em] sm:text-6xl md:text-7xl lg:text-[5.6rem]">
          {words.map((word,i)=><motion.span key={`${word}-${i}`} className="mr-[.22em] inline-block last:mr-0" initial={{opacity:0,y:reduce?0:48,rotate:reduce?0:2}} animate={{opacity:1,y:0,rotate:0}} transition={{delay:.12+i*.07,duration:.75,ease:[.16,1,.3,1]}}>{word}</motion.span>)}
        </h1>
        <motion.p initial={{opacity:0,y:reduce?0:22}} animate={{opacity:1,y:0}} transition={{delay:.48,duration:.65}} className="mt-7 max-w-xl text-base leading-relaxed text-off-white/68 md:text-lg">{description}</motion.p>
        <motion.div initial={{opacity:0,y:reduce?0:18}} animate={{opacity:1,y:0}} transition={{delay:.62,duration:.65}} className="mt-9 flex flex-wrap items-center gap-4">
          {action && <Link href={action.href} className="luxury-button group inline-flex items-center gap-2 bg-blue px-5 py-3.5 text-sm font-semibold text-white">{action.label}<ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>}
          <a href={siteConfig.mapsHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/15 bg-white/[.03] px-5 py-3.5 text-sm text-off-white/80 transition hover:border-white/45 hover:text-white"><MapPin size={15} /> A.T.U Campus, Accra</a>
        </motion.div>
      </div>
      <motion.div initial={{opacity:0,x:reduce?0:36,scale:reduce?1:.97}} animate={{opacity:1,x:0,scale:1}} transition={{delay:.22,duration:.9,ease:[.16,1,.3,1]}} className="relative min-h-[330px] md:min-h-[500px]">
        <div className="absolute inset-0 overflow-hidden border border-white/10 bg-navy shadow-[0_24px_60px_rgba(0,0,0,.32)]">
          {image ? <><Image src={image} alt={imageAlt ?? "Magnanimous Electrical Services"} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-tr from-obsidian/60 via-transparent to-blue-bright/10" /></> : <><div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_24%,rgba(205,171,112,.14),transparent_34%),linear-gradient(145deg,#2a2416,#16120c)]" /><Image src={siteConfig.technicianPortrait} alt="Magnanimous technician" fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-contain object-bottom" /></>}
        </div>
        <div className="absolute -left-3 top-7 hidden border border-white/15 bg-obsidian/90 px-4 py-3 font-mono text-[10px] uppercase tracking-[.16em] text-off-white/75 md:block">{siteConfig.tagline}</div>
        <div className="absolute bottom-5 right-5 border border-white/10 bg-obsidian/90 px-4 py-3 font-mono text-[10px] uppercase tracking-[.16em] text-blue-bright">Accra · Ghana</div>
      </motion.div>
    </div>
  </section>;
}
