"use client";

import { useEffect, type ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

function ScrollManager() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ReactLenis root>
        <ScrollManager />
        {children}
      </ReactLenis>
    </ThemeProvider>
  );
}
