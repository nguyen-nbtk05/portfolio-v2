"use client";

import { useRef, useState, type ReactNode } from "react";
import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute right-3 top-3 z-10 rounded-md border border-gray-800 bg-[#161616]/80 p-1.5 text-gray-400 opacity-0 transition-opacity duration-200 hover:bg-[#202020]/90 hover:text-white focus:opacity-100 group-hover:opacity-100 dark:border-white/5"
      title="Copy to clipboard"
      aria-label="Copy code to clipboard"
    >
      {copied ? <RiCheckLine size={16} className="text-emerald-400" /> : <RiFileCopyLine size={16} />}
    </button>
  );
}

export function CodeBlock({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = ref.current?.textContent ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-md border border-gray-200 dark:border-[#1F1F1F]">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 rounded-md border border-gray-800 bg-[#161616]/80 p-1.5 text-gray-400 opacity-0 transition-opacity duration-200 hover:bg-[#202020]/90 hover:text-white focus:opacity-100 group-hover:opacity-100 dark:border-white/5"
        title="Copy to clipboard"
        aria-label="Copy code to clipboard"
      >
        {copied ? <RiCheckLine size={16} className="text-emerald-400" /> : <RiFileCopyLine size={16} />}
      </button>
      <pre ref={ref} className="overflow-x-auto p-5 text-sm leading-relaxed">
        {children}
      </pre>
    </div>
  );
}
