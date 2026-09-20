"use client";

import dynamic from "next/dynamic";

const GithubGraph = dynamic(() => import("./GithubGraph"), {
  ssr: false,
  loading: () => <div className="px-8 py-10 text-sm text-gray-400">Loading Github Activities...</div>,
});

export default function GithubGraphLazy() {
  return <GithubGraph />;
}
