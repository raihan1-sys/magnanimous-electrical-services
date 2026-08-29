import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/PremiumMotion";

export function ContactCTA() {
  return (
    <section className="bg-off-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal><div className="tick-frame flex flex-col gap-8 border border-obsidian/15 p-8 text-obsidian md:flex-row md:items-end md:justify-between md:p-14">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-blue">
              Get In Touch
            </div>
            <h2 className="mt-3 max-w-md text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Bring it in, or tell us what&apos;s wrong.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-obsidian/60">
              {siteConfig.location}, {siteConfig.locationLine2}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 luxury-button rounded-sm bg-blue px-6 py-3.5 font-body text-sm font-medium text-white transition-colors hover:bg-blue-bright"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-sm border border-obsidian/20 px-6 py-3.5 font-body text-sm font-medium text-obsidian transition-colors hover:border-obsidian/40"
            >
              Service Request Form
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div></Reveal>
      </div>
    </section>
  );
}
