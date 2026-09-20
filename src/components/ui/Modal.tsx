"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { RiCloseLine } from "@remixicon/react";

type ModalProps = {
  label: string;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
};

export default function Modal({ label, onClose, children, maxWidth = "max-w-5xl" }: ModalProps) {
  const lenis = useLenis();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, [lenis]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        const activeEl = document.activeElement;
        const isInsideModal = activeEl && activeEl.closest("[role='dialog']");
        if (!isInsideModal) event.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ willChange: "opacity" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 md:bg-black/60 md:backdrop-blur-sm"
        onClick={onClose}
        data-lenis-prevent
      >
        <motion.div
          initial={isMobile ? { y: 8, opacity: 0 } : { scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={isMobile ? { y: 8, opacity: 0 } : { scale: 0.95, y: 15, opacity: 0 }}
          transition={{ duration: isMobile ? 0.2 : 0.3, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className={`relative flex max-h-[85vh] w-full ${maxWidth} flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-[#1F1F1F] dark:bg-[#0A0A0A]`}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="absolute right-4 top-4 z-50 rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition hover:bg-white hover:text-gray-900 dark:border-white/10 dark:bg-[#0A0A0A] dark:text-gray-300 dark:hover:bg-[#111111] dark:hover:text-white md:bg-white/80 md:backdrop-blur-md dark:md:bg-[#0A0A0A]/80"
            aria-label="Close dialog"
          >
            <RiCloseLine size={24} />
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
