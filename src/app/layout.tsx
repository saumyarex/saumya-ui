import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { SITE } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
