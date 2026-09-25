"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades and rises a block into place the first time it scrolls into view (or
 * immediately, if it's already on-screen on load). Respects
 * prefers-reduced-motion and force-reveals after a short safety timeout so a
 * missed observer callback can never leave content invisible. One-way: once
 * revealed, a block never re-hides.
 */
export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setVisible(true);
      return;
    }

    // Synchronous check first — anything already in view must render visible
    // immediately, never waiting on the observer's first callback.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );
    observer.observe(node);

    const safety = window.setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(16px)",
        transition: "opacity .8s ease, transform .8s ease",
      }}
    >
      {children}
    </div>
  );
}
