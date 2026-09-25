"use client";

import { useId, useMemo, useState } from "react";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  label: string;
}

const ALL = "all";

/**
 * Filterable FAQ list: always-visible question/answer rows (no accordion),
 * narrowed by category chips and a live search — both compose with AND.
 */
export function FaqAccordion({ items, categories }: { items: FaqItem[]; categories: FaqCategory[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const searchId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = activeCategory === ALL || item.category === activeCategory;
      const matchesQuery =
        q.length === 0 ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, query, activeCategory]);

  const tabs: FaqCategory[] = [{ id: ALL, label: "All Questions" }, ...categories];

  return (
    <div>
      <div className="mt-11 flex items-center gap-3 border-b border-mql-hairline-strong pb-3">
        <Icon name="Search" className="size-[17px] text-mql-graphic" strokeWidth={1.5} aria-hidden />
        <label htmlFor={searchId} className="sr-only">
          Search frequently asked questions
        </label>
        <input
          id={searchId}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search frequently asked questions"
          className="flex-1 border-none bg-transparent py-0.5 font-mql-body text-base text-mql-ink outline-none placeholder:text-[rgba(20,20,20,.38)]"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-[26px]" role="group" aria-label="Filter questions by category">
        {tabs.map((tab) => {
          const active = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              aria-pressed={active}
              className={cn(
                "border-b py-[6px] font-mql-mono text-[10.5px] font-medium tracking-[0.1em] uppercase transition-colors",
                active ? "border-mql-graphic text-mql-ink" : "border-transparent text-mql-muted",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-[14px] border-t border-mql-hairline-grid">
        {filtered.length === 0 ? (
          <p className="py-[28px] font-mql-body text-[.97rem] text-mql-secondary">
            No matching questions. Try a different search term or category.
          </p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-10 gap-y-2 border-b border-mql-hairline py-[28px]"
            >
              <h3 className="font-mql-display text-[1.24rem] leading-[1.24] font-[640] text-mql-ink">
                {item.question}
              </h3>
              <p className="font-mql-body text-[.97rem] leading-[1.64] text-mql-secondary [text-wrap:pretty]">
                {item.answer}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
