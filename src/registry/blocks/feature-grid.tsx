import { Gauge, Lock, Plug, Puzzle, Sparkles, Workflow } from "lucide-react";

const features = [
  {
    Icon: Gauge,
    title: "Blazing fast",
    body: "Static-first architecture and edge delivery keep every interaction under a frame.",
  },
  {
    Icon: Lock,
    title: "Secure by default",
    body: "SOC 2 Type II, SSO, and granular role-based access come standard on every plan.",
  },
  {
    Icon: Plug,
    title: "Integrates with everything",
    body: "Native connectors for the tools your team already lives in — plus a typed API.",
  },
  {
    Icon: Workflow,
    title: "Automate the busywork",
    body: "Build flows that move data and trigger actions without writing a line of glue code.",
  },
  {
    Icon: Puzzle,
    title: "Composable",
    body: "Start with a template and reshape it. Every piece is a building block you control.",
  },
  {
    Icon: Sparkles,
    title: "Delightful details",
    body: "Thoughtful motion, keyboard support, and dark mode — polish your users can feel.",
  },
];

export function FeatureGrid() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need to ship
        </h2>
        <p className="mt-3 text-muted">
          A complete toolkit so your team can move from idea to launch without the
          usual friction.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-border bg-border px-6 sm:grid-cols-2 sm:px-0 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="bg-surface p-7">
            <div className="grid size-10 place-items-center rounded-lg border border-border bg-background">
              <f.Icon className="size-5 text-foreground" />
            </div>
            <h3 className="mt-4 font-medium">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
