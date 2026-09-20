"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";

const SPLASH_ID = "splash-screen";

function hasSeenSplash(): boolean {
  try {
    return sessionStorage.getItem("hasLoadedBefore") === "true";
  } catch {
    return false;
  }
}

function markSplashSeen(): void {
  try {
    sessionStorage.setItem("hasLoadedBefore", "true");
  } catch {

  }
}

const SPLASH_GATE_SCRIPT = `try{if(sessionStorage.getItem("hasLoadedBefore")){var s=document.getElementById("${SPLASH_ID}");if(s)s.style.display="none";}}catch(e){}`;
export default function SplashScreen() {
  const lenis = useLenis();
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (hasSeenSplash()) {
      setShow(false);
      return;
    }
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return Math.min(prev + Math.floor(Math.random() * 12) + 4, 100);
      });
    }, 180);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (show) lenis.stop();
    else lenis.start();
    return () => {
      lenis.start();
    };
  }, [show, lenis]);

  useEffect(() => {
    if (progress === 100 && show) {
      const timeoutId = setTimeout(() => {
        markSplashSeen();
        setShow(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [progress, show]);

  return (
    <>
      <div id={SPLASH_ID} suppressHydrationWarning>
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-colors duration-300 dark:bg-[#0A0A0A]"
          data-lenis-prevent
        >
          <div className="flex w-full max-w-md flex-col gap-4 px-8">
            <div className="flex items-end justify-between">
              <span className="font-mono text-4xl font-bold text-gray-900 dark:text-white">{progress}%</span>
              <span className="pb-1 text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Loading
              </span>
            </div>

            <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div
                className="h-full bg-black transition-all duration-300 ease-out dark:bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
      </div>
      <script dangerouslySetInnerHTML={{ __html: SPLASH_GATE_SCRIPT }} />
    </>
  );
}
