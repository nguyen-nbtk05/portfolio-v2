"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";

export default function GithubGraph() {
  const { resolvedTheme } = useTheme();
  const calendarRef = useCallback((calendar: HTMLElement | null) => {
    if (!calendar) return;

    // This ref is attached once GitHubCalendar has loaded the contributions.
    const scrollContainer = calendar.querySelector<HTMLElement>(
      ".react-activity-calendar__scroll-container",
    );
    if (!scrollContainer) return;

    let pinnedToEnd = true;
    let previousWidth = scrollContainer.clientWidth;
    let previousScrollWidth = scrollContainer.scrollWidth;
    const scrollToEnd = () => {
      if (pinnedToEnd) scrollContainer.scrollLeft = scrollContainer.scrollWidth;
    };
    const updatePinnedPosition = () => {
      // A resize can dispatch a pending scroll event before ResizeObserver runs.
      if (
        scrollContainer.clientWidth !== previousWidth ||
        scrollContainer.scrollWidth !== previousScrollWidth
      ) return;

      pinnedToEnd =
        scrollContainer.scrollWidth -
          scrollContainer.clientWidth -
          scrollContainer.scrollLeft <=
        2;
    };

    scrollToEnd();
    scrollContainer.addEventListener("scroll", updatePinnedPosition, { passive: true });
    const resizeObserver = new ResizeObserver(() => {
      previousWidth = scrollContainer.clientWidth;
      previousScrollWidth = scrollContainer.scrollWidth;
      scrollToEnd();
    });
    resizeObserver.observe(scrollContainer);

    return () => {
      resizeObserver.disconnect();
      scrollContainer.removeEventListener("scroll", updatePinnedPosition);
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-2 p-4 text-black dark:text-white md:px-8">
      <div className="mb-4 flex items-center gap-4">
        <h1 className="text-lg font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">Github Activities</h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]" />
      </div>

      <div className="flex w-full items-center justify-center overflow-hidden rounded-md border-2 border-solid border-gray-200 bg-white p-4 dark:border-[#1F1F1F] dark:bg-transparent">
        <div className="flex w-full justify-center overflow-x-auto">
          <GitHubCalendar
            ref={calendarRef}
            username="nguyen-nbtk05"
            blockSize={14}
            blockMargin={4}
            fontSize={15}
            colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
          />
        </div>
      </div>
    </div>
  );
}
