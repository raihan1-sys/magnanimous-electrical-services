"use client";

import { Phone, MessageCircle, Wrench } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function MobileActionBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 grid grid-cols-3 border-t border-white/10 bg-obsidian md:hidden">
      <a
        href={siteConfig.phoneHref}
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-off-white/85 active:bg-white/5"
      >
        <Phone size={17} />
        <span className="font-mono text-[10px] uppercase tracking-wide">Call</span>
      </a>
      <a
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1 border-x border-white/10 py-2.5 text-lime active:bg-white/5"
      >
        <MessageCircle size={17} />
        <span className="font-mono text-[10px] uppercase tracking-wide">WhatsApp</span>
      </a>
      <Link
        href="/contact"
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-off-white/85 active:bg-white/5"
      >
        <Wrench size={17} />
        <span className="font-mono text-[10px] uppercase tracking-wide">Book</span>
      </Link>
    </div>
  );
}
