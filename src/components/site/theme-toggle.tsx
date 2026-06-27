"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  // Stateless: the icons swap via CSS `dark:` variants, so we only need to
  // read + flip the current theme at click time.
  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex size-9 items-center justify-center rounded-base border border-border bg-surface text-muted transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  );
}
