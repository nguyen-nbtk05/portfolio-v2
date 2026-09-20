import type { Metadata } from "next";
import { getBlogs } from "@/lib/content";
import Cards from "@/components/ui/Cards";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Tutorials, technical deep dives, and project updates by Shaurya Upadhyay.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  const blogs = getBlogs();

  return (
    <div id="blogs" className="flex w-full flex-col gap-4 px-8 pb-24 pt-20 text-black transition-colors duration-300 dark:text-white">
      <div className="mb-2 flex items-center gap-4">
        <h1 className="text-lg font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">Latest Blogs</h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]" />
      </div>

      {blogs.length === 0 && (
        <div className="flex w-full animate-fade-in-up flex-col items-center justify-center rounded-md border-2 border-solid border-gray-200 bg-gray-50/50 py-10 text-center dark:border-[#1F1F1F] dark:bg-[#161b22]/50">
          <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">No Blogs Found</h3>
          <p className="mx-auto max-w-md leading-relaxed text-gray-500 dark:text-gray-400">
            I have not published any articles just yet. <br />
            Check back soon for tutorials, technical deep dives, and project updates!
          </p>
        </div>
      )}

      {blogs.length > 0 && (
        <div className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
          {blogs.map((blog) => (
            <Cards
              key={blog.slug}
              title={blog.title}
              description={blog.excerpt}
              techStack={blog.category ? [blog.category] : []}
              image={blog.thumbnail}
              to={`/blogs/${blog.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
