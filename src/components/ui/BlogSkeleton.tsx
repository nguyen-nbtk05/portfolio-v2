export function BlogSkeleton() {
  return (
    <div className="flex h-full w-full animate-pulse flex-col rounded-md border border-gray-200 bg-white shadow-sm dark:border-[#1F1F1F] dark:bg-[#0A0A0A]">
      <div className="h-48 w-full rounded-t-md bg-gray-200 dark:bg-gray-800" />
      <div className="flex flex-grow flex-col gap-3 p-4">
        <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mt-auto flex gap-2 pt-2">
          <div className="h-6 w-20 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

export function BlogSkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="w-full">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: count }).map((_, i) => (
          <BlogSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
