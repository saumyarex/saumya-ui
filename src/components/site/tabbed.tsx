"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
}

/** Minimal tabbed panel. Content nodes may be server-rendered (passed as props). */
export function Tabbed({ tabs, className }: { tabs: Tab[]; className?: string }) {
  const [active, setActive] = React.useState(tabs[0]?.value);

  return (
    <div className={className}>
      <div className="mb-3 inline-flex items-center gap-1 rounded-base border border-border bg-surface p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActive(tab.value)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
              active === tab.value
                ? "bg-accent text-accent-fg"
                : "text-muted hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.value} hidden={active !== tab.value}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}
