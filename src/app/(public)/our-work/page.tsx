import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/PremiumMotion";
export const metadata: Metadata={title:"Our Work",description:"A look at the repair, service and technical work behind Magnanimous Electrical Services."};
const categories=["Motor Rewinding","Appliance Repair","Fan & Cooling","Phone & Laptop","Electrical Work"];
// Real equipment from the shop — each image genuinely matches the work area it illustrates.
const visuals=[
  {src:siteConfig.technicianPortrait,label:"The workshop bench",work:"Repair & Service",span:"md:col-span-7",tall:"md:min-h-[500px]",contain:false},
  {src:"/images/products/fans/fan-1.jpeg",label:"Fan & cooling units",work:"Servicing",span:"md:col-span-5",tall:"",contain:true},
  {src:"/images/products/laptops/laptop-1.jpeg",label:"Laptops & phones",work:"Device repair",span:"md:col-span-4",tall:"",contain:true},
  {src:"/images/products/kettles/kettle-1.jpeg",label:"Kitchen appliances",work:"Appliance repair",span:"md:col-span-4",tall:"",contain:true},
  {src:"/images/products/extensions/extension-1.jpeg",label:"Sockets & extensions",work:"Electrical work",span:"md:col-span-4",tall:"",contain:true},
];
export default function OurWorkPage(){return <><PageHero eyebrow="Inside the workshop" index="05" title="The work behind the fix." description="A growing view into the kinds of appliances, equipment and electronics that pass through Magnanimous. Every job begins with a problem worth understanding." image="/images/our-work/workshop.jpg" action={{label:"Ask about your repair",href:"/contact"}}/>
<section className="bg-off-white"><Reveal><div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28"><div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><div className="section-kicker">Workshop focus</div><h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl">Work that starts with a real fault.</h2></div><p className="max-w-md text-sm leading-relaxed text-obsidian/55">A look at the kind of equipment that moves through the workshop. Each image stands for the real products and appliances we service and repair.</p></div>
<div className="grid gap-4 md:grid-cols-12">{visuals.map(v=><div key={v.src} className={`group relative min-h-[250px] overflow-hidden bg-navy ${v.span} ${v.tall}`}><Image src={v.src} alt={v.label} fill sizes="(min-width:768px) 50vw,100vw" className={v.contain?"object-contain bg-white p-5 transition duration-700 group-hover:scale-[1.03]":"object-contain object-bottom transition duration-700 group-hover:scale-[1.03]"}/><div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/85 to-transparent p-6"><div className="font-mono text-[10px] uppercase tracking-[.18em] text-lime">{v.work}</div><div className="mt-1 font-display text-lg text-off-white">{v.label}</div></div></div>)}</div>
<div className="mt-16 grid gap-px bg-obsidian/10 md:grid-cols-5">{categories.map((c,i)=><Link href="/services" key={c} className="group bg-white p-5 hover:bg-obsidian hover:text-white"><span className="font-mono text-[10px] text-blue">0{i+1}</span><div className="mt-8 flex items-end justify-between font-display text-lg"><span>{c}</span><ArrowUpRight size={16} className="text-blue"/></div></Link>)}</div></div></Reveal></section></>}