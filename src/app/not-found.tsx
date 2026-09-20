"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiArrowLeftLine } from "@remixicon/react";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-8 py-32 text-center text-black dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex w-full max-w-md flex-col items-center gap-8"
      >
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="relative w-full overflow-hidden rounded-2xl border border-solid border-gray-200 bg-white shadow-xl dark:border-[#1F1F1F] dark:bg-[#0D0D0D]"
        >
          <div className="flex items-center justify-between border-b border-solid border-gray-200 bg-gray-50 px-4 py-2.5 dark:border-[#1F1F1F] dark:bg-[#080808]">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
              </span>
              Coder: Busy Coding
            </div>
          </div>

          <img
            src="https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif"
            alt="Coder is busy coding"
            loading="lazy"
            className="h-48 w-full select-none object-cover filter dark:brightness-90 md:h-52"
          />
        </motion.div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white md:text-2xl">Developer is in the Zone</h2>
          <p className="px-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400 md:text-base">
            The coder is currently locked in, writing clean code and shipping features. Meanwhile, you&apos;ve taken a wrong turn and landed in the void!
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-md border border-transparent bg-black px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-neutral-900 dark:border-white/10 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
          >
            <RiArrowLeftLine size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
