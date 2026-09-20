import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  RiArrowLeftLine,
  RiAwardLine,
  RiCalendarLine,
  RiCodeSSlashLine,
  RiExternalLinkLine,
  RiGithubLine,
  RiPriceTag3Line,
  RiTimeLine,
  RiUserStarLine,
} from "@remixicon/react";
import { getBlog, getBlogSlugs } from "@/lib/content";
import { mdxComponents, mdxOptions } from "@/lib/mdx";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) return { title: "Blog not found" };
  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.excerpt,
      ...(blog.thumbnail ? { images: [{ url: blog.thumbnail }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      ...(blog.thumbnail ? { images: [blog.thumbnail] } : {}),
    },
  };
}

function formatDate(dateValue: string) {
  const date = new Date(dateValue);
  return isNaN(date.getTime()) ? dateValue : date.toLocaleDateString();
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) notFound();

  const isProjectShowcase = blog.category === "Project Showcase";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-24 text-black transition-colors duration-300 dark:text-white md:px-8">
      <Link href="/blogs" className="inline-flex w-fit items-center gap-2 text-gray-500 transition-colors hover:text-black dark:hover:text-white">
        <RiArrowLeftLine size={20} />
        <span>Back to Blogs</span>
      </Link>

      <div className="flex flex-col gap-6 overflow-hidden rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-[#1F1F1F] dark:bg-[#0A0A0A] md:p-8">
        {blog.thumbnail ? (
          <div className="relative h-60 w-full overflow-hidden rounded-md border border-gray-100 shadow-sm dark:border-white/5 md:h-96">
            <Image src={blog.thumbnail} alt={blog.title} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" priority />
          </div>
        ) : null}

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:border-blue-900/30 dark:bg-blue-950/30 dark:text-blue-400">
              {isProjectShowcase ? <RiAwardLine size={14} /> : <RiPriceTag3Line size={14} />}
              {blog.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <RiCalendarLine size={16} />
              {formatDate(blog.date)}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-4xl">{blog.title}</h1>
          <p className="max-w-4xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">{blog.excerpt}</p>

          {isProjectShowcase && (
            <div className="mt-2 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 dark:border-white/5 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <RiUserStarLine size={14} /> Role &amp; Responsibility
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{blog.role || "Lead Developer"}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <RiTimeLine size={14} /> Timeline
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{blog.timeline || "4 weeks"}</span>
              </div>
            </div>
          )}

          {(blog.githubUrl || blog.liveDemoUrl) && (
            <div className="mt-4 flex flex-wrap gap-3">
              {blog.githubUrl && (
                <a href={blog.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-[#2A2A2A] dark:text-gray-200 dark:hover:bg-[#141414]">
                  <RiGithubLine size={18} />
                  GitHub Repository
                </a>
              )}
              {blog.liveDemoUrl && (
                <a href={blog.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black">
                  <RiExternalLinkLine size={18} />
                  Open Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {blog.techStack.length > 0 && (
        <div className="flex flex-col gap-4 rounded-md border border-gray-200 bg-white p-6 dark:border-[#1F1F1F] dark:bg-[#0A0A0A]">
          <h2 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-400">
            <RiCodeSSlashLine size={16} /> Tech Stack Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {blog.techStack.map((tech) => (
              <span key={tech} className="rounded-md border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800 dark:border-white/5 dark:bg-[#121212] dark:text-gray-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <article className="prose max-w-none leading-relaxed text-gray-700 dark:prose-invert dark:text-gray-300">
        {/* @ts-expect-error next-mdx-remote/rsc types vs React 19 */}
        <MDXRemote source={blog.body} options={mdxOptions} components={mdxComponents} />
      </article>
    </div>
  );
}
