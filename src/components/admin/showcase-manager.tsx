"use client";

import { useEffect, useState } from "react";
import { demoStore, DEMO_STORE_EVENT } from "@/lib/storage/demo-store";
import { uploadImage } from "@/lib/uploads/upload-image";
import { createId } from "@/lib/utils";
import {
  DEFAULT_SHOWCASES, SHOWCASE_SECTIONS, parseShowcase,
  type ShowcaseConfig, type ShowcaseKind,
} from "@/lib/showcase";
import type { WebsiteContentBlock } from "@/domain/entities";

const KINDS: { kind: ShowcaseKind; title: string }[] = [
  { kind: "wet-wipes", title: "Wet wipe strip" },
  { kind: "magnets", title: "Magnet strip" },
];

export function ShowcaseManager() {
  const [blocks, setBlocks] = useState<WebsiteContentBlock[]>([]);
  const [drafts, setDrafts] = useState<Record<ShowcaseKind, ShowcaseConfig>>(DEFAULT_SHOWCASES);
  const [busy, setBusy] = useState<ShowcaseKind | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = () => {
      const all = demoStore.websiteContent.all();
      setBlocks(all);
      setDrafts({
        "wet-wipes": parseShowcase(all.find((b) => b.page === "home" && b.section === SHOWCASE_SECTIONS["wet-wipes"])?.body, "wet-wipes"),
        magnets: parseShowcase(all.find((b) => b.page === "home" && b.section === SHOWCASE_SECTIONS.magnets)?.body, "magnets"),
      });
    };
    load();
    window.addEventListener(DEMO_STORE_EVENT, load);
    return () => window.removeEventListener(DEMO_STORE_EVENT, load);
  }, []);

  const update = (kind: ShowcaseKind, next: ShowcaseConfig) => {
    setDrafts((current) => ({ ...current, [kind]: next }));
    setMessage("Unsaved changes. Select Save & publish when ready.");
  };

  const addImage = async (kind: ShowcaseKind, file: File) => {
    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {
      setMessage("Choose an image smaller than 10 MB.");
      return;
    }
    setBusy(kind);
    const url = await uploadImage(file, `showcase/${kind}`);
    setBusy(null);
    if (!url) {
      setMessage("Upload failed. Configure image storage and try again; no temporary image was added.");
      return;
    }
    update(kind, {
      ...drafts[kind],
      items: [...drafts[kind].items, { id: createId("showcase"), image: url, alt: file.name.replace(/\.[^.]+$/, "") }],
    });
  };

  const save = (kind: ShowcaseKind) => {
    const section = SHOWCASE_SECTIONS[kind];
    const existing = blocks.find((b) => b.page === "home" && b.section === section);
    const body = JSON.stringify(drafts[kind]);
    if (existing) {
      demoStore.websiteContent.update(existing.id, { body, status: "published", updatedAt: new Date().toISOString() });
    } else {
      demoStore.websiteContent.create({
        id: createId("wc"), page: "home", section,
        title: kind === "wet-wipes" ? "Wet wipe showcase" : "Magnet showcase",
        body, status: "published", updatedAt: new Date().toISOString(),
      });
    }
    setMessage(`${kind === "wet-wipes" ? "Wet wipe" : "Magnet"} strip saved and published.`);
  };

  return (
    <section className="space-y-5" aria-label="Homepage product strips">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Homepage product strips</h2>
        <p className="text-sm text-text-secondary">Manage the two strips independently. Changes appear on the homepage after Save & publish.</p>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {KINDS.map(({ kind, title }) => {
          const config = drafts[kind];
          return (
            <div key={kind} className="rounded-xl border border-border bg-white p-5">
              <h3 className="font-semibold text-text-primary">{title}</h3>
              <p className="mt-1 text-sm text-text-secondary">{config.items.length} images · the strip keeps the same height as the other strip.</p>
              <label className="mt-4 block text-sm font-medium text-text-primary" htmlFor={`speed-${kind}`}>
                Full-loop time: {config.seconds} seconds
              </label>
              <input id={`speed-${kind}`} type="range" min="12" max="80" step="1"
                value={config.seconds} className="mt-2 w-full" onChange={(e) => update(kind, { ...config, seconds: Number(e.target.value) })} />
              <ul className="mt-4 space-y-3">
                {config.items.map((item, index) => (
                  <li key={item.id} className="flex items-center gap-3 rounded border border-border p-2">
                    <img src={item.image} alt="" className="h-16 w-20 shrink-0 object-contain" />
                    <input aria-label={`Description for image ${index + 1} in ${title}`} value={item.alt}
                      className="min-w-0 flex-1 rounded border border-border p-2 text-sm"
                      onChange={(e) => update(kind, { ...config, items: config.items.map((x) => x.id === item.id ? { ...x, alt: e.target.value } : x) })} />
                    <div className="flex flex-col gap-1 text-xs">
                      <button type="button" disabled={index === 0} onClick={() => {
                        const items = [...config.items]; [items[index - 1], items[index]] = [items[index], items[index - 1]];
                        update(kind, { ...config, items });
                      }}>↑ Up</button>
                      <button type="button" disabled={index === config.items.length - 1} onClick={() => {
                        const items = [...config.items]; [items[index + 1], items[index]] = [items[index], items[index + 1]];
                        update(kind, { ...config, items });
                      }}>↓ Down</button>
                      <button type="button" className="text-red-700" onClick={() => update(kind, { ...config, items: config.items.filter((x) => x.id !== item.id) })}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
              <label className="mt-4 block text-sm font-medium text-text-primary" htmlFor={`add-${kind}`}>Add an image</label>
              <input id={`add-${kind}`} type="file" accept="image/png,image/jpeg,image/webp,image/avif" disabled={busy !== null || config.items.length >= 40}
                className="mt-2 block w-full text-sm" onChange={(e) => {
                  const file = e.target.files?.[0]; if (file) void addImage(kind, file);
                  e.target.value = "";
                }} />
              <button type="button" onClick={() => save(kind)} disabled={busy !== null}
                className="mt-5 min-h-11 rounded bg-primary px-5 font-semibold text-white disabled:opacity-50">
                {busy === kind ? "Uploading…" : "Save & publish"}
              </button>
            </div>
          );
        })}
      </div>
      {message && <p role="status" className="text-sm text-text-secondary">{message}</p>}
    </section>
  );
}
