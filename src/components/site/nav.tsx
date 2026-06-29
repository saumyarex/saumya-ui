import Link from "next/link";

import { SITE } from "@/lib/site";
import { Button } from "@/registry/ui/button";
import { Wordmark } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { CommandMenu } from "@/components/site/command-menu";

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function GithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="Saumya UI — home">
            <Wordmark className="text-base" />
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
            <Link
              href="/changelog"
              className="rounded-md px-3 py-1.5 text-muted transition-colors hover:text-foreground"
            >
              Changelog
            </Link>
            {SITE.github && (
              <a
                href={`${SITE.github}/blob/main/CONTRIBUTING.md`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md px-3 py-1.5 text-muted transition-colors hover:text-foreground"
              >
                Contribute
              </a>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <CommandMenu />
          {SITE.github && (
            <Button asChild variant="ghost" size="icon" aria-label="GitHub">
              <a href={SITE.github} target="_blank" rel="noreferrer">
                <GithubIcon className="size-4" />
              </a>
            </Button>
          )}
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
