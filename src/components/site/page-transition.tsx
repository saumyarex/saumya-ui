"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";

/**
 * Animates page content on route changes. The (site) layout persists across
 * navigations, so keying the <ViewTransition> by pathname makes each route a
 * distinct enter/exit — without the key, a route swap is an "update" and the
 * enter/exit animations never fire. CSS lives in globals.css (.page-in/.page-out).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} enter="page-in" exit="page-out">
      {children}
    </ViewTransition>
  );
}
