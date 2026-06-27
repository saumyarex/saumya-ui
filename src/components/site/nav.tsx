import Link from "next/link";

import { SITE } from "@/lib/site";
import { Button } from "@/registry/ui/button";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { CommandMenu } from "@/components/site/command-menu";

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <Logo className="size-6 text-foreground" />
            <span>
              Saumya <span className="text-muted">UI</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 text-sm sm:flex">
            <Link
              href="/components"
              className="rounded-md px-3 py-1.5 text-muted transition-colors hover:text-foreground"
            >
              Components
            </Link>
            <Link
              href="/blocks"
              className="rounded-md px-3 py-1.5 text-muted transition-colors hover:text-foreground"
            >
              Blocks
            </Link>
            <Link
              href="/templates"
              className="rounded-md px-3 py-1.5 text-muted transition-colors hover:text-foreground"
            >
              Templates
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <CommandMenu />
          <Button asChild variant="ghost" size="icon" aria-label="X (Twitter)">
            <a href={SITE.x} target="_blank" rel="noreferrer">
              <XIcon className="size-4" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
