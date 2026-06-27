import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Can I use this in a commercial project?",
    a: "Yes. Everything is MIT licensed — use it in personal and commercial projects without attribution.",
  },
  {
    q: "Do I need a design background?",
    a: "Not at all. Each block is ready to drop in and looks good out of the box. Tweak the copy and you're done.",
  },
  {
    q: "How do updates work?",
    a: "Because the code lives in your repo, nothing changes underneath you. Pull new versions only when you want them.",
  },
  {
    q: "Is it accessible?",
    a: "Components are built on Radix primitives with keyboard support and ARIA wired up, and blocks follow the same standards.",
  },
  {
    q: "Can I customize the styling?",
    a: "Completely. It's plain Tailwind and CSS variables — restyle a token or a class and the whole system follows.",
  },
];

export function Faq() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-muted">
            Everything else you might be wondering. Still stuck? Reach out any time.
          </p>
        </div>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-pretty text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
