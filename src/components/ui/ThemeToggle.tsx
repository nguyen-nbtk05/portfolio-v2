"use client";

import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import Magnetic from "./Magnetic";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Magnetic>
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="flex h-full min-h-11 min-w-11 items-center justify-center rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-gray-600 backdrop-blur-sm transition-colors hover:text-black dark:border-[#1F1F1F] dark:bg-black/90 dark:text-gray-300 dark:hover:text-white sm:bg-white/50 sm:dark:bg-black/50"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
      </button>
    </Magnetic>
  );
}
