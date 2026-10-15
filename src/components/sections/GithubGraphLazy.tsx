"use client";

import dynamic from "next/dynamic";

const GithubGraph = dynamic(() => import("./GithubGraph"), {
  ssr: false,
  loading: () => <div className="px-4 py-4 text-sm text-gray-400 sm:px-8">Loading Github Activities...</div>,
});

export default function GithubGraphLazy() {
  return <GithubGraph />;
}
