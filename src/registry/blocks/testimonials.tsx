const testimonials = [
  {
    quote:
      "We replaced three tools with this and shipped our redesign two weeks early. The team actually enjoys using it.",
    name: "Maya Chen",
    role: "Head of Product, Northwind",
    initials: "MC",
  },
  {
    quote:
      "The attention to detail is unreal. Keyboard shortcuts, dark mode, the little animations — it all just feels right.",
    name: "Diego Alvarez",
    role: "Founder, Loop",
    initials: "DA",
  },
  {
    quote:
      "Onboarding took an afternoon. By the next morning the whole engineering org had migrated.",
    name: "Priya Nair",
    role: "Staff Engineer, Cobalt",
    initials: "PN",
  },
  {
    quote:
      "Support is fast and honest, the API is a joy, and the docs are the best I've read in years.",
    name: "Sam Whitfield",
    role: "CTO, Harbor",
    initials: "SW",
  },
];

export function Testimonials() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Loved by teams that ship
        </h2>
        <p className="mt-3 text-muted">
          Thousands of fast-moving teams build on the platform every day.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-5 px-6 sm:grid-cols-2">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-7"
          >
            <blockquote className="text-pretty text-foreground">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-surface-2 text-sm font-semibold text-foreground">
                {t.initials}
              </span>
              <span>
                <span className="block text-sm font-medium">{t.name}</span>
                <span className="block text-sm text-muted">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
