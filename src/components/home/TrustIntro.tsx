import { Reveal } from "@/components/PremiumMotion";
export function TrustIntro() {
  return (
    <section className="border-b border-black/[0.06] bg-off-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal><div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-blue">
            About the Shop
          </div>
          <div className="max-w-3xl">
            <p className="text-balance font-display text-2xl font-medium leading-snug tracking-tight text-obsidian sm:text-3xl md:text-4xl">
              Magnanimous Electrical Services repairs, services and supplies —
              the appliance in your kitchen, the fan in your room, the AC in
              your office, the phone and laptop in your hand.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-obsidian/60">
              If it runs on electricity and it&apos;s stopped working, bring
              it in. If it&apos;s still working and needs a check-up, we
              service it. And if you need something new, we stock it —
              straight from A.T.U Campus, Old Hostel.
            </p>
          </div>
        </div></Reveal>
      </div>
    </section>
  );
}
