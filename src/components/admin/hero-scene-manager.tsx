"use client";

import { useEffect, useState } from "react";
import { demoStore, DEMO_STORE_EVENT } from "@/lib/storage/demo-store";
import { uploadImage } from "@/lib/uploads/upload-image";
import { createId } from "@/lib/utils";
import { DEFAULT_HERO_SCENES, HERO_SCENE_SECTIONS, parseHeroScenes, type HeroSceneConfig, type HeroSceneKind } from "@/lib/hero-scenes";
import type { WebsiteContentBlock } from "@/domain/entities";

const categories: { kind: HeroSceneKind; title: string; hint: string }[] = [
  { kind: "wipes", title: "Hero · wet wipes", hint: "Upload complete pizzeria scenes with a finished wet wipe packet." },
  { kind: "magnets", title: "Hero · magnets", hint: "Upload complete refrigerator scenes with your magnet designs." },
  { kind: "fresheners", title: "Hero · air fresheners", hint: "Upload complete car scenes with a finished air freshener." },
];

export function HeroSceneManager() {
  const [blocks, setBlocks] = useState<WebsiteContentBlock[]>([]);
  const [drafts, setDrafts] = useState<Record<HeroSceneKind, HeroSceneConfig>>(DEFAULT_HERO_SCENES);
  const [busy, setBusy] = useState<HeroSceneKind | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = () => {
      const all = demoStore.websiteContent.all();
      setBlocks(all);
      setDrafts({
        wipes: parseHeroScenes(all.find(b => b.page === "home" && b.section === HERO_SCENE_SECTIONS.wipes && b.status === "published")?.body, "wipes"),
        magnets: parseHeroScenes(all.find(b => b.page === "home" && b.section === HERO_SCENE_SECTIONS.magnets && b.status === "published")?.body, "magnets"),
        fresheners: parseHeroScenes(all.find(b => b.page === "home" && b.section === HERO_SCENE_SECTIONS.fresheners && b.status === "published")?.body, "fresheners"),
      });
    };
    load();
    window.addEventListener(DEMO_STORE_EVENT, load);
    return () => window.removeEventListener(DEMO_STORE_EVENT, load);
  }, []);

  const update = (kind: HeroSceneKind, next: HeroSceneConfig) => {
    setDrafts(current => ({ ...current, [kind]: next }));
    setMessage("Unsaved changes. Select Save & publish when ready.");
  };

  const addImage = async (kind: HeroSceneKind, file: File) => {
    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {
      setMessage("Choose an image smaller than 10 MB.");
      return;
    }
    setBusy(kind);
    const image = await uploadImage(file, `hero-scenes/${kind}`);
    setBusy(null);
    if (!image) {
      setMessage("Upload failed. Configure image storage and try again; no temporary image was added.");
      return;
    }
    update(kind, { ...drafts[kind], items: [...drafts[kind].items, { id: createId("scene"), image, alt: file.name.replace(/\.[^.]+$/, "") }] });
  };

  const save = (kind: HeroSceneKind) => {
    const section = HERO_SCENE_SECTIONS[kind];
    const existing = blocks.find(b => b.page === "home" && b.section === section);
    const body = JSON.stringify(drafts[kind]);
    if (existing) {
      demoStore.websiteContent.update(existing.id, { body, status: "published", updatedAt: new Date().toISOString() });
    } else {
      demoStore.websiteContent.create({ id: createId("wc"), page: "home", section, title: `Hero ${kind} scenes`, body, status: "published", updatedAt: new Date().toISOString() });
    }
    setMessage(`${kind} scenes saved and published.`);
  };

  return <section className="space-y-5" aria-label="Homepage hero scenes">
    <div><h2 className="text-xl font-bold text-text-primary">Homepage hero scenes</h2>
      <p className="text-sm text-text-secondary">Each product rotates automatically, with no visible arrows or dots. Upload a finished scene, arrange its order, then publish it. One image stays still.</p></div>
    <div className="grid gap-5 xl:grid-cols-3">{categories.map(({ kind, title, hint }) => {
      const config = drafts[kind];
      return <div key={kind} className="rounded-xl border border-border bg-white p-5">
        <h3 className="font-semibold text-text-primary">{title}</h3><p className="mt-1 text-sm text-text-secondary">{hint}</p>
        <label htmlFor={`hero-speed-${kind}`} className="mt-4 block text-sm font-medium text-text-primary">Time per image: {config.seconds} seconds</label>
        <input id={`hero-speed-${kind}`} type="range" min="2" max="15" step="1" value={config.seconds} className="mt-2 w-full" onChange={e => update(kind, { ...config, seconds: Number(e.target.value) })} />
        <ul className="mt-4 space-y-3">{config.items.map((item, index) => <li key={item.id} className="flex items-center gap-2 rounded border border-border p-2">
          <img src={item.image} alt="" className="h-16 w-16 shrink-0 rounded object-cover" />
          <input aria-label={`Description for image ${index + 1} in ${title}`} value={item.alt} className="min-w-0 flex-1 rounded border border-border p-2 text-sm" onChange={e => update(kind, { ...config, items: config.items.map(x => x.id === item.id ? { ...x, alt: e.target.value } : x) })} />
          <div className="flex flex-col gap-1 text-xs"><button type="button" disabled={index === 0} onClick={() => { const items = [...config.items]; [items[index - 1], items[index]] = [items[index], items[index - 1]]; update(kind, { ...config, items }); }}>↑</button>
            <button type="button" disabled={index === config.items.length - 1} onClick={() => { const items = [...config.items]; [items[index + 1], items[index]] = [items[index], items[index + 1]]; update(kind, { ...config, items }); }}>↓</button>
            <button type="button" className="text-red-700" onClick={() => update(kind, { ...config, items: config.items.filter(x => x.id !== item.id) })}>Remove</button></div>
        </li>)}</ul>
        <label htmlFor={`hero-add-${kind}`} className="mt-4 block text-sm font-medium text-text-primary">Add a finished scene</label>
        <input id={`hero-add-${kind}`} type="file" accept="image/png,image/jpeg,image/webp,image/avif" disabled={busy !== null || config.items.length >= 20} className="mt-2 block w-full text-sm" onChange={e => { const file = e.target.files?.[0]; if (file) void addImage(kind, file); e.target.value = ""; }} />
        <button type="button" disabled={busy !== null} onClick={() => save(kind)} className="mt-5 min-h-11 rounded bg-primary px-5 font-semibold text-white disabled:opacity-50">{busy === kind ? "Uploading…" : "Save & publish"}</button>
      </div>;
    })}</div>
    {message && <p role="status" className="text-sm text-text-secondary">{message}</p>}
  </section>;
}
