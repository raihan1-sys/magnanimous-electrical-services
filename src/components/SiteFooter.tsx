import Image from "next/image";
import Link from "next/link";
import { Lock, MessageCircle } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-obsidian text-off-white">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={siteConfig.logo}
                alt={`${siteConfig.businessName} logo`}
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <div className="leading-tight">
                <div className="font-display text-sm font-semibold uppercase tracking-[0.08em]">
                  {siteConfig.businessName}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-bright">
                  {siteConfig.tagline}
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-off-white/60">
              Electrical repairs, appliance servicing and quality electronics —
              all under one roof at A.T.U Campus.
            </p>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-blue-bright/40 px-4 py-2.5 font-body text-sm text-blue-bright transition-colors hover:bg-white/[0.06]"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-off-white/40">
              Navigate
            </div>
            <nav className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-off-white/75 hover:text-off-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-off-white/40">
              Contact
            </div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-off-white/75">
              <a href={siteConfig.phoneHref} className="hover:text-off-white">
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-off-white break-all">
                {siteConfig.email}
              </a>
              <span>
                {siteConfig.location}
                <br />
                {siteConfig.locationLine2}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-off-white/40 md:flex-row md:items-center md:justify-between">
  <span>
    © {new Date().getFullYear()} {siteConfig.businessName}. All rights
    reserved.
  </span>

  <div className="flex items-center gap-6">
    <span className="font-mono uppercase tracking-[0.15em]">
      Service Beyond Tools
    </span>

    <Link
      href="/admin/login"
      className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.12em] text-off-white/35 transition-colors hover:text-blue-bright"
    >
      <Lock size={12} />
      Admin Login
    </Link>
  </div>
</div>
      </div>
    </footer>
  );
}
