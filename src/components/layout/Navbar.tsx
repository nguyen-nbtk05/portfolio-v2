import Link from "next/link";
import Magnetic from "../ui/Magnetic";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed right-5 top-5 z-40 flex gap-3 transition-all duration-300 sm:right-6 sm:gap-4 md:right-40">
      <Magnetic>
        <Link
          href="/"
          className="flex min-h-11 items-center rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-sm font-semibold text-gray-600 backdrop-blur-sm transition-colors hover:text-black dark:border-[#1F1F1F] dark:bg-black/90 dark:text-gray-300 dark:hover:text-white sm:bg-white/50 sm:px-4 sm:text-lg sm:dark:bg-black/50"
        >
          <span>Home</span>
        </Link>
      </Magnetic>

      <Magnetic>
        <Link
          href="/blogs"
          className="flex min-h-11 items-center rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-sm font-semibold text-gray-600 backdrop-blur-sm transition-colors hover:text-black dark:border-[#1F1F1F] dark:bg-black/90 dark:text-gray-300 dark:hover:text-white sm:bg-white/50 sm:px-4 sm:text-lg sm:dark:bg-black/50"
        >
          <span>Blogs</span>
        </Link>
      </Magnetic>

      <ThemeToggle />
    </nav>
  );
}
