import Link from "next/link";

import { SITE } from "@/lib/site";
import { Wordmark } from "@/components/site/logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Wordmark className="text-base" />
            <p className="mt-3 text-sm text-muted">
              Accessible React components, blocks &amp; templates. Copy-paste or
              install with the shadcn CLI.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <span className="font-medium text-foreground">Library</span>
              <Link href="/components" className="text-muted hover:text-foreground">
                Components
              </Link>
              <Link href="/blocks" className="text-muted hover:text-foreground">
                Blocks
              </Link>
              <Link href="/templates" className="text-muted hover:text-foreground">
                Templates
              </Link>
              <Link href="/changelog" className="text-muted hover:text-foreground">
                Changelog
              </Link>
              {SITE.github && (
                <a
                  href={`${SITE.github}/blob/main/CONTRIBUTING.md`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-foreground"
                >
                  Contribute
                </a>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-medium text-foreground">Saumya</span>
              <a href={SITE.studioUrl} className="text-muted hover:text-foreground">
                Studio
              </a>
              <a
                href={SITE.x}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-foreground"
              >
                X / Twitter
              </a>
              {SITE.github && (
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-foreground"
                >
                  GitHub
                </a>
              )}
            </div>
            <div className="col-span-2 flex flex-col gap-2 sm:col-span-1">
              <span className="font-medium text-foreground">Need it built?</span>
              <p className="text-muted">
                I design &amp; ship landing pages and MVPs through{" "}
                <a
                  href={SITE.studioUrl}
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Saumya Studio
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <p>
            Built by{" "}
            <a
              href={SITE.x}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Saumya
            </a>
            <span>.</span>
          </p>
          <p>MIT licensed. Open source. Copy, paste, ship.</p>
        </div>
      </div>
    </footer>
  );
}
