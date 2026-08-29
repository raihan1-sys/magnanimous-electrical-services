"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { CartLink } from "@/components/cart/CartLink";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-obsidian/95 backdrop-blur-xl"
          : "bg-obsidian"
      }`}
    >
      {/* Desktop top information bar */}
      <div className="hidden border-b border-white/10 bg-obsidian text-off-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-off-white/55">
          <span>
            Electrical · Electronics · Appliance Service
          </span>

          <div className="flex items-center gap-6">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 text-lime hover:text-white"
            >
              <Phone size={12} />
              {siteConfig.phone}
            </a>

            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              WhatsApp us →
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
        >
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.businessName} logo`}
            width={48}
            height={48}
            className="h-11 w-11 object-contain"
            priority
          />

          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-off-white">
              Magnanimous
            </span>

            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-blue-bright">
              Electrical Services
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm transition ${
                  active
                    ? "text-white"
                    : "text-off-white/60 hover:text-white"
                }`}
              >
                {link.label}

                {active && (
                  <span className="absolute inset-x-3 bottom-0 h-px bg-lime" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex">
            <CartLink />
          </span>

          <Link
            href="/contact"
            className="luxury-button hidden items-center gap-2 bg-blue px-5 py-3 text-sm font-semibold text-white md:inline-flex"
          >
            Book a Service
          </Link>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/10 text-off-white lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {open && (
        <div className="border-t border-white/10 bg-obsidian px-5 py-5 lg:hidden">
          <nav className="grid gap-1">
            {navLinks.map((link) => (
  <Link
    key={link.href}
    href={link.href}
    onClick={() => setOpen(false)}
    className={`border-b border-white/10 px-3 py-3 font-display text-xl ${
      pathname === link.href
        ? "text-lime"
        : "text-off-white"
    }`}
  >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="mt-5 flex items-center justify-center bg-blue px-5 py-3.5 text-sm font-semibold text-white"
          >
            Book a Service
          </Link>
        </div>
      )}
    </header>
  );
}