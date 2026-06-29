import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageTransition } from "@/components/site/page-transition";

/** The public site shell — nav + footer. Excludes isolated routes like /preview.
 *  Page content is wrapped in <PageTransition> so route changes crossfade up;
 *  the nav and footer are anchored (see globals.css) so they stay put. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-full flex-col">
      <Nav />
      <PageTransition>
        <main className="flex-1">{children}</main>
      </PageTransition>
      <Footer />
    </div>
  );
}
