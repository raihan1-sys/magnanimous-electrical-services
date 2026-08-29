const reasons = [
  {
    title: "Diagnosed, not guessed",
    copy: "Every repair starts with finding the actual fault — so you're not paying to replace parts that were never broken.",
  },
  {
    title: "One place for repair and supply",
    copy: "Need a replacement instead of a repair? The same shop that fixes appliances also sells them.",
  },
  {
    title: "Practical, straight answers",
    copy: "You'll know what's wrong, what it costs to fix, and whether it's worth fixing at all.",
  },
];

export function WhyMagnanimous() {
  return (
    <section className="bg-obsidian text-off-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <h2 className="max-w-lg font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Service beyond tools.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-off-white/55">
          The tagline isn&apos;t decoration — it&apos;s how the shop is run.
        </p>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {reasons.map((reason) => (
            <div key={reason.title}>
              <h3 className="font-display text-lg font-medium tracking-tight">
                {reason.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-off-white/55">
                {reason.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
