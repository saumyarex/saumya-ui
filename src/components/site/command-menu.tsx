"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { registry, hrefFor } from "@/registry/registry";
import { cn } from "@/lib/utils";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return registry;
    return registry.filter((e) =>
      [e.title, e.name, e.category, e.description].some((field) =>
        field.toLowerCase().includes(q),
      ),
    );
  }, [query]);

  // Clamp the highlighted index to the current results during render.
  const activeIndex = Math.min(active, Math.max(0, results.length - 1));

  function openMenu() {
    setQuery("");
    setActive(0);
    setOpen(true);
  }

  // Open / toggle on ⌘K / Ctrl+K from anywhere.
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        // Resetting on close too is harmless and avoids reading current state.
        setQuery("");
        setActive(0);
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus the input when the menu opens (DOM side effect only).
  React.useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  function select(index: number) {
    const entry = results[index];
    if (!entry) return;
    setOpen(false);
    router.push(hrefFor(entry));
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(Math.min(activeIndex + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(Math.max(activeIndex - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(activeIndex);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openMenu}
        className="inline-flex h-9 items-center gap-2 rounded-base border border-border bg-surface px-3 text-sm text-muted transition-colors hover:bg-surface-2 sm:w-56"
      >
        <Search className="size-4 shrink-0" />
        <span className="hidden flex-1 text-left sm:inline">Search components…</span>
        <kbd className="hidden rounded border border-border bg-background px-1.5 font-mono text-[10px] text-muted sm:inline">
          ⌘K
        </kbd>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Search components"
          >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-base border border-border bg-surface shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border px-4">
              <Search className="size-4 shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search components…"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted">
                  No components found.
                </p>
              ) : (
                results.map((entry, i) => (
                  <button
                    key={entry.name}
                    type="button"
                    onMouseMove={() => setActive(i)}
                    onClick={() => select(i)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                      activeIndex === i ? "bg-surface-2 text-foreground" : "text-muted",
                    )}
                  >
                    <span className="font-medium text-foreground">{entry.title}</span>
                    <span className="shrink-0 text-xs text-muted">{entry.category}</span>
                  </button>
                ))
              )}
            </div>
          </div>
          </div>,
          document.body,
        )}
    </>
  );
}
