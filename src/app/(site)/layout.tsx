import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";

/** The public site shell — nav + footer. Excludes isolated routes like /preview. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-full flex-col">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
