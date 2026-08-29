import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { siteConfig } from "@/lib/site-config";
import { ArrowUpRight, CheckCircle2, Wrench } from "lucide-react";
import { Reveal } from "@/components/PremiumMotion";

export const metadata: Metadata = { title:"About", description:"Meet Magnanimous Electrical Services, an Accra-based repair, service and electronics supply business." };

export default function AboutPage(){return <>
  <PageHero eyebrow="About Magnanimous" index="02" title="We work on the things people depend on." description="From the appliance in your kitchen to the laptop in your bag, Magnanimous is built around practical technical work: diagnose the fault, explain the problem and do the work properly." image="/images/about/pexels-castorlystock-4276183.jpg" action={{label:"Talk to the technician",href:"/contact"}} />
  <section className="bg-off-white"><Reveal><div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-[1.05fr_.95fr] md:px-8 md:py-28">
    <div><div className="section-kicker">Our approach</div><h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">Technical skill is only useful when it solves the real problem.</h2></div>
    <div className="space-y-6 pt-2 text-base leading-relaxed text-obsidian/65"><p>Magnanimous Electrical Services is based at <strong className="text-obsidian">A.T.U Campus, Old Hostel, Accra</strong>. We combine electrical and electronics repair, servicing and product supply so customers do not have to treat every breakdown as a reason to replace what they own.</p><p>We work across appliances, fans, motors, air conditioning, phones and laptops, while also supplying electronics and household appliances when a new item is the better option.</p><a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-b border-blue pb-1 font-semibold text-blue">Message us about a repair <ArrowUpRight size={16}/></a></div>
  </div></Reveal></section>
  <section className="bg-navy text-off-white"><div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28"><div className="grid gap-12 md:grid-cols-3">{[
    ["01","Diagnose before deciding","We start by understanding the fault instead of treating every problem as the same repair."],
    ["02","Explain the work clearly","The customer should understand what needs attention and why before the work moves forward."],
    ["03","Repair, service or supply","Sometimes the answer is repair. Sometimes it is maintenance. Sometimes a replacement makes more sense."],
  ].map(([n,t,c])=><div key={n} className="border-t border-white/15 pt-6"><div className="flex items-center justify-between"><span className="font-mono text-xs text-lime">{n}</span>{n==="01"&&<Wrench size={18} className="text-blue-bright"/>}{n==="02"&&<CheckCircle2 size={18} className="text-blue-bright"/>}</div><h3 className="mt-8 font-display text-2xl font-medium">{t}</h3><p className="mt-4 text-sm leading-relaxed text-off-white/60">{c}</p></div>)}</div></div></section>
</>}