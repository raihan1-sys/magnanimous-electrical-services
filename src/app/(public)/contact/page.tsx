import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, Navigation } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/PremiumMotion";
export const metadata: Metadata={title:"Contact",description:"Contact Magnanimous Electrical Services at A.T.U Campus, Old Hostel, Accra, Ghana."};
export default function ContactPage(){return <><PageHero
  eyebrow="Contact the workshop"
  index="06"
  title="Bring it in. Tell us what happened."
  description="Call, send a WhatsApp message or use the service request form. The clearer the problem, the easier it is to point you in the right direction."
  image="/images/contact/markus-winkler-q3QPw37J6Xs-unsplash.jpg"
  imageAlt="Electrical equipment and workshop"
  action={{ label: "Start a service request", href: "#request" }}
/>
<section className="bg-off-white"><Reveal><div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-[.85fr_1.15fr] md:px-8 md:py-28"><div><div className="section-kicker">Find us</div><h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">Talk to a real person.</h2><div className="mt-10 space-y-0">{[
[<Phone key="p" size={18}/>,"Phone",<a key="a" href={siteConfig.phoneHref}>{siteConfig.phone}</a>],
[<MessageCircle key="m" size={18}/>,"WhatsApp",<a key="a" href={siteConfig.whatsappHref} target="_blank" rel="noreferrer">{siteConfig.whatsapp}</a>],
[<Mail key="e" size={18}/>,"Email",<a key="a" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>],
[<MapPin key="l" size={18}/>,"Workshop",<span key="a">{siteConfig.location}<br/>{siteConfig.locationLine2}</span>]
].map(([icon,label,content],i)=><div key={i} className="flex gap-4 border-b border-obsidian/10 py-5"><span className="mt-1 text-blue">{icon}</span><div><div className="font-mono text-[10px] uppercase tracking-[.18em] text-obsidian/40">{label}</div><div className="mt-2 text-sm text-obsidian/80">{content}</div></div></div>)}</div>
<a href={siteConfig.mapsHref} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 bg-obsidian px-5 py-3.5 text-sm font-semibold text-white"><Navigation size={16}/> Open in Google Maps</a></div>
<div id="request" className="scroll-mt-28 border border-obsidian/10 bg-white p-6 md:p-10"><div className="flex items-start justify-between gap-5"><div><div className="section-kicker">Service request</div><h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">What needs attention?</h2><p className="mt-2 text-sm text-obsidian/55">Tell us the appliance or device and describe the problem.</p></div><span className="hidden h-12 w-12 items-center justify-center border border-obsidian/10 md:flex"><MessageCircle className="text-blue"/></span></div><div className="mt-8"><ContactForm/></div></div></div></Reveal></section></>}