import type { Metadata } from "next";
import { Hanken_Grotesk, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { SITE } from "@/lib/site";

// Hanken Grotesk — a tight, confident neutral grotesk (Söhne/Aeonik family).
// Display weight reaches 800 for carved, editorial headlines.
const sans = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
// Mono is a deliberate, recurring accent — eyebrows, labels, the install
// command — the technical fingerprint of a UI library.
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Saumya UI — accessible React components, blocks & templates",
    template: "%s — Saumya UI",
  },
  description:
    "An open library of accessible, beautifully-crafted React components, blocks, and templates. Copy-paste or install with the shadcn CLI. Built by Saumya, design engineer.",
  openGraph: {
    type: "website",
    title: "Saumya UI — accessible React components, blocks & templates",
    description:
      "Accessible, beautifully-crafted React components, blocks & templates. Copy-paste or shadcn install.",
  },
};

// Set the theme before paint to avoid a flash. "system" (and no stored value)
// follow the OS preference; "light"/"dark" are explicit overrides.
const themeScript = `
(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark', t==='dark' || (t!=='light' && d));}catch(e){document.documentElement.classList.add('dark');}})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
