"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "./animated-theme-toggler";
import Magnetic from "./Magnetic";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Magnetic>
      <AnimatedThemeToggler
        theme={mounted && resolvedTheme === "dark" ? "dark" : "light"}
        onThemeChange={setTheme}
        disabled={!mounted}
        aria-pressed={mounted && resolvedTheme === "dark"}
        className="flex h-full min-h-11 min-w-11 items-center justify-center rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-gray-600 backdrop-blur-sm transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 dark:border-[#1F1F1F] dark:bg-black/90 dark:text-gray-300 dark:hover:text-white sm:bg-white/50 sm:dark:bg-black/50 [&_svg]:h-5 [&_svg]:w-5"
        aria-label="Toggle Dark Mode"
      />
    </Magnetic>
  );
}
