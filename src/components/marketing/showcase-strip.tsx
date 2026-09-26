"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/shared/icon";
import { WipePacket } from "@/components/marketing/wipe-packet";
import { demoStore, DEMO_STORE_EVENT } from "@/lib/storage/demo-store";
import { parseShowcase, SHOWCASE_SECTIONS, type ShowcaseConfig, type ShowcaseKind } from "@/lib/showcase";

type Props = { config: ShowcaseConfig; kind: ShowcaseKind; dbBacked: boolean; title: string; description: string };

export function ShowcaseStrip({ config, kind, dbBacked, title, description }: Props) {
  const [visibleConfig, setVisibleConfig] = useState(config);
  const [manual, setManual] = useState(false);
  const [repeatCount, setRepeatCount] = useState(8);
  const viewport = useRef<HTMLDivElement>(null);
  const firstGroup = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<number | null>(null);

  useEffect(() => {
    if (dbBacked) return;
    const updateFromDemo = () => {
      const block = demoStore.websiteContent.all().find((b) => b.page === "home" && b.section === SHOWCASE_SECTIONS[kind]);
      setVisibleConfig(block ? parseShowcase(block.body, kind) : config);
    };
    window.addEventListener(DEMO_STORE_EVENT, updateFromDemo);
    const timer = window.setTimeout(updateFromDemo, 0);
    return () => { window.clearTimeout(timer); window.removeEventListener(DEMO_STORE_EVENT, updateFromDemo); };
  }, [dbBacked, kind, config]);

  useEffect(() => () => {
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
  }, []);

  useEffect(() => {
    const container = viewport.current;
    const group = firstGroup.current;
    if (!container || !group) return;
    const ensureFilled = () => {
      const image = group.querySelector("img");
      const card = group.querySelector<HTMLElement>(".showcase-product");
      if (!image?.naturalWidth || !card) return;
      const gap = parseFloat(getComputedStyle(group).gap) || 0;
      const requiredWidth = container.clientWidth + card.offsetWidth + gap;
      const groupWidth = group.getBoundingClientRect().width;
      if (groupWidth > 0 && groupWidth < requiredWidth) {
        setRepeatCount((current) => Math.min(200, Math.max(current + 1, Math.ceil(current * requiredWidth / groupWidth) + 1)));
      }
    };
    const observer = new ResizeObserver(ensureFilled);
    observer.observe(container);
    observer.observe(group);
    const frame = requestAnimationFrame(ensureFilled);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [repeatCount, visibleConfig.items]);

  if (visibleConfig.items.length === 0) return null;
  // A full copy must be wider than the viewport, or the animation exposes empty space.
  const items = Array.from(
    { length: Math.max(repeatCount, visibleConfig.items.length) },
    (_, index) => visibleConfig.items[index % visibleConfig.items.length],
  );

  const step = (direction: number) => {
    setManual(true);
    const first = viewport.current?.querySelector<HTMLElement>(".showcase-product");
    const gap = first?.parentElement ? parseFloat(getComputedStyle(first.parentElement).gap) || 0 : 0;
    viewport.current?.scrollBy({ left: direction * ((first?.offsetWidth ?? 280) + gap), behavior: "smooth" });
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setManual(false), 4500);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 md:mb-7 md:flex-row md:items-end md:justify-between">
        <h3 className="font-serif text-[clamp(1.95rem,3.8vw,2.9rem)] font-normal leading-[1.08] tracking-[-.035em] text-mql-ink">{title}</h3>
        <div className="flex flex-wrap items-center justify-between gap-4 md:justify-end md:gap-6">
          <p className="text-sm text-mql-body md:text-base">{description}</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => step(-1)} aria-label={`Previous ${title}`}
              className="flex size-11 items-center justify-center rounded-full border border-mql-hairline text-mql-ink transition-colors hover:bg-mql-surface-alt">
              <Icon name="ChevronLeft" className="size-5" aria-hidden />
            </button>
            <button type="button" onClick={() => step(1)} aria-label={`Next ${title}`}
              className="flex size-11 items-center justify-center rounded-full border border-mql-hairline text-mql-ink transition-colors hover:bg-mql-surface-alt">
              <Icon name="ChevronRight" className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
      <div ref={viewport} className="showcase-viewport overflow-x-auto overscroll-x-contain py-4"
        aria-label={title} onTouchStart={() => setManual(true)}
        onTouchEnd={() => {
          if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
          resumeTimer.current = window.setTimeout(() => setManual(false), 4500);
        }}>
        <div className="showcase-track flex w-max" data-manual={manual}
          style={{ "--showcase-duration": `${visibleConfig.seconds}s` } as CSSProperties}>
          {[0, 1].map((copy) => (
            <div key={copy} ref={copy === 0 ? firstGroup : undefined}
              className="flex shrink-0 items-center gap-6 pr-6 md:gap-9 md:pr-9" aria-hidden={copy === 1}>
              {items.map((item, index) => (
                <div key={`${copy}-${item.id}-${index}`}
                  className="showcase-product flex h-[154px] shrink-0 items-center justify-center md:h-[210px]">
                  {kind === "wet-wipes" ? (
                    <WipePacket src={item.image} alt={copy === 0 && index < visibleConfig.items.length ? item.alt : ""}
                      className="h-full w-auto shrink-0" eager />
                  ) : (
                    <div className="aspect-[3/2] h-full shrink-0 overflow-hidden rounded-[8px] shadow-[0_12px_20px_rgba(20,20,20,.19)]">
                      <img src={item.image} alt={copy === 0 && index < visibleConfig.items.length ? item.alt : ""}
                        loading="eager" className="h-full w-full scale-[1.018] object-cover" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-2" aria-hidden="true">
        {visibleConfig.items.slice(0, 8).map((item, index) => (
          <span key={item.id} className={`size-2 rounded-full ${index === 0 ? "bg-mql-text-accent" : "bg-mql-hairline"}`} />
        ))}
      </div>
      <style jsx>{`
        .showcase-track { animation: showcase-flow var(--showcase-duration) linear infinite; }
        .showcase-viewport { scrollbar-width: none; }
        .showcase-viewport::-webkit-scrollbar { display: none; }
        .showcase-viewport:hover .showcase-track, .showcase-viewport:focus-within .showcase-track,
        .showcase-track[data-manual="true"] { animation-play-state: paused; }
        @keyframes showcase-flow { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .showcase-track { animation: none; } }
      `}</style>
    </div>
  );
}
