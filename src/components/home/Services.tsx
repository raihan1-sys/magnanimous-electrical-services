import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceCategories } from "@/lib/site-config";

export function Services() {
  return (
    <section id="services" className="bg-obsidian text-off-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            What we service.
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-off-white/55">
            Five areas of work, one workshop. Pick what matches your problem
            below.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {serviceCategories.map((service) => (
            <Link
              key={service.id}
              href={`/services#${service.id}`}
              className="group grid grid-cols-1 gap-4 py-8 transition-colors hover:bg-white/[0.03] md:grid-cols-[100px_1fr_1fr_auto] md:items-center md:gap-8 md:py-10"
            >
              <span className="font-mono text-xs text-blue-bright/80">
                {service.eyebrow}
              </span>
              <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                {service.title}
              </h3>
              <div>
                <p className="text-sm leading-relaxed text-off-white/55">
                  {service.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-off-white/35">
                  {service.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <ArrowUpRight
                size={22}
                className="hidden shrink-0 text-off-white/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-blue-bright md:block"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
