const columns = [
  {
    heading: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog", "Docs"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Customers", "Brand"],
  },
  {
    heading: "Resources",
    links: ["Community", "Support", "Status", "Terms", "Privacy"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="grid size-6 place-items-center rounded-md bg-accent text-xs font-bold text-accent-fg">
                A
              </span>
              Acme
            </a>
            <p className="mt-3 text-sm text-muted">
              The platform that helps teams design, build, and launch — without the
              busywork.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-medium text-foreground">{col.heading}</h3>
              <ul className="mt-3 space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted transition-colors hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-sm text-muted sm:flex-row">
          <p>© 2026 Acme, Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-foreground">
              Twitter
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
