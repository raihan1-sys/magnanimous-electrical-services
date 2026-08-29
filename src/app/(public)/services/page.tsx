import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageCircle, Wrench } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { serviceCategories, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Appliance repair, electrical services, motor rewinding, AC servicing and device repair in Accra.",
};

const serviceImages: Record<string, string> = {
  "appliance-repair": "/images/services/appliance-repair.jpg",
  "electrical-services": "/images/services/electrical-services.jpg",
  "motor-mechanical": "/images/services/motor-rewinding.jpg",
  "ac-cooling": "/images/services/ac-repair.jpg",
  "phone-laptop": "/images/services/device-repair.jpg",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Technical services"
        index="03"
        title="Find the fault. Fix the right thing."
        description="From everyday appliances to motors and personal devices, our services are organised around the equipment people actually bring to us."
        action={{
          label: "Book a service",
          href: "/contact",
        }}
      />

      <section className="bg-off-white">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
          {serviceCategories.map((service, index) => {
            const reversed = index % 2 === 1;

            return (
              <article
                key={service.id}
                id={service.id}
                className="group scroll-mt-28 border-b border-obsidian/10 py-10 last:border-0 md:py-14"
              >
                <div
                  className={`grid gap-6 lg:grid-cols-[0.9fr_1.4fr] lg:items-stretch ${
                    reversed
                      ? "lg:[&>.service-copy]:order-2"
                      : ""
                  }`}
                >
                  {/* SERVICE INFORMATION */}
                  <div className="service-copy flex flex-col justify-center py-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue">
                      {service.eyebrow}
                    </span>

                    <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-obsidian md:text-5xl">
                      {service.title}
                    </h2>

                    <div className="mt-4 h-px w-12 bg-blue transition-all duration-500 group-hover:w-20" />

                    <p className="mt-5 max-w-lg text-sm leading-relaxed text-obsidian/60 md:text-base">
                      {service.description}
                    </p>

                    <a
                      href={siteConfig.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue transition-colors hover:text-blue-bright"
                    >
                      <MessageCircle size={16} />
                      Ask about this service
                      <ArrowUpRight size={15} />
                    </a>
                  </div>

                  {/* IMAGE + COMMON WORK */}
                  <div className="grid min-h-[300px] grid-cols-[minmax(0,1.5fr)_minmax(170px,0.72fr)] gap-2">
                    {/* SERVICE IMAGE */}
                    <div className="group/image relative min-h-[300px] overflow-hidden bg-obsidian">
                      <Image
                        src={serviceImages[service.id]}
                        alt={`${service.title} at Magnanimous Electrical Services`}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover/image:opacity-0" />

                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

                      <span className="absolute bottom-4 left-4 border border-white/20 bg-black/30 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                        Magnanimous / {service.eyebrow}
                      </span>
                    </div>

                    {/* COMMON WORK */}
                    <div className="relative overflow-hidden bg-obsidian p-5 text-off-white transition-transform duration-500 group-hover:-translate-y-1 md:p-6">
                      <div className="absolute right-0 top-0 h-20 w-20 border-b border-l border-blue/20" />

                      <div className="mb-5 flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-off-white/45">
                          Common work
                        </span>

                        <Wrench
                          size={15}
                          className="text-blue-bright transition-transform duration-500 group-hover:rotate-12"
                        />
                      </div>

                      <ul className="divide-y divide-white/10">
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className="py-3 text-xs leading-relaxed text-off-white/65 transition-colors duration-300 first:pt-0 last:pb-0 group-hover:text-off-white/90"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-blue-bright transition-all duration-700 group-hover:w-full" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* NOT LISTED */}
      <section className="bg-navy">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-14 text-off-white md:flex-row md:items-center md:justify-between md:px-8 md:py-18">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-off-white/60">
              Not listed?
            </div>

            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Tell us what needs fixing.
            </h2>
          </div>

          <Link
            href="/contact"
            className="luxury-button inline-flex w-fit items-center gap-2 bg-blue px-6 py-4 text-sm font-semibold text-white"
          >
            Send a service request
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}