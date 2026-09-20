import { BlogSkeletonGrid } from "@/components/ui/BlogSkeleton";

export default function BlogsLoading() {
  return (
    <div className="flex w-full flex-col gap-4 px-8 pb-24 pt-20">
      <div className="mb-2 flex items-center gap-4">
        <h1 className="text-lg font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">Latest Blogs</h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]" />
      </div>
      <BlogSkeletonGrid count={4} />
    </div>
  );
}
