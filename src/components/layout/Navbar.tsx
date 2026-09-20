import Link from "next/link";
import Magnetic from "../ui/Magnetic";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed right-6 top-14 z-50 flex gap-4 transition-all duration-300 md:right-48 md:top-5">
      <Magnetic>
        <Link
          href="/"
          className="block rounded-md border border-gray-200 bg-white/50 px-4 py-2 text-lg font-semibold text-gray-600 backdrop-blur-sm transition-colors hover:text-black dark:border-[#1F1F1F] dark:bg-black/50 dark:text-gray-300 dark:hover:text-white"
        >
          <span>Home</span>
        </Link>
      </Magnetic>

      <Magnetic>
        <Link
          href="/blogs"
          className="block rounded-md border border-gray-200 bg-white/50 px-4 py-2 text-lg font-semibold text-gray-600 backdrop-blur-sm transition-colors hover:text-black dark:border-[#1F1F1F] dark:bg-black/50 dark:text-gray-300 dark:hover:text-white"
        >
          <span>Blogs</span>
        </Link>
      </Magnetic>

      <ThemeToggle />
    </nav>
  );
}
