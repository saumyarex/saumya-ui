import { Activity, Globe, Layers, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

const cells = [
  {
    Icon: Zap,
    title: "Real-time everything",
    body: "Changes propagate instantly across every client with sub-100ms sync.",
    className: "sm:col-span-2",
  },
  {
    Icon: Globe,
    title: "Global edge",
    body: "Served from 300+ locations, close to every user.",
    className: "",
  },
  {
    Icon: Layers,
    title: "Versioned history",
    body: "Roll back any change.",
    className: "",
  },
  {
    Icon: Activity,
    title: "Observability built in",
    body: "Traces, logs, and metrics for every request — no extra agents, no extra bill.",
    className: "sm:col-span-2",
  },
];

export function BentoFeatures() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Built for scale, designed for humans
        </h2>
        <p className="mt-3 text-muted">
          The power of an enterprise platform with the ergonomics of a weekend
          project.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-4 px-6 sm:grid-cols-3">
        {cells.map((c) => (
          <div
            key={c.title}
            className={cn(
              "flex flex-col justify-between rounded-2xl border border-border bg-surface p-7",
              c.className,
            )}
          >
            <div className="grid size-10 place-items-center rounded-lg border border-border bg-background">
              <c.Icon className="size-5 text-foreground" />
            </div>
            <div className="mt-10">
              <h3 className="font-medium">{c.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
