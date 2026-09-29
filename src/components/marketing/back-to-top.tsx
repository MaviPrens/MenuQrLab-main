"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 480);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!visible) return null;

  return <button type="button" aria-label="Go up" title="Go up"
    onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}
    className="group fixed bottom-24 left-1/2 z-[100] flex size-11 -translate-x-1/2 items-center justify-center rounded-full border border-[#f3c7ae] bg-white/95 text-[#d65320] shadow-[0_8px_25px_rgba(38,42,45,.16)] backdrop-blur transition hover:-translate-y-1 hover:bg-[#fff2e8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d65320]">
    <span className="absolute bottom-full mb-2 rounded-md bg-[#16283c] px-2.5 py-1 text-xs font-bold whitespace-nowrap text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">Go up</span>
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 5 3 19h18L12 5Z" /></svg>
  </button>;
}
