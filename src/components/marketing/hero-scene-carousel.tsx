"use client";

import { useEffect, useState } from "react";
import { demoStore, DEMO_STORE_EVENT } from "@/lib/storage/demo-store";
import { HERO_SCENE_SECTIONS, parseHeroScenes, type HeroSceneConfig, type HeroSceneKind } from "@/lib/hero-scenes";

type Props = { kind: HeroSceneKind; config: HeroSceneConfig; dbBacked: boolean; className?: string; imageClassName?: string };

export function HeroSceneCarousel({ kind, config, dbBacked, className = "", imageClassName = "" }: Props) {
  const [visibleConfig, setVisibleConfig] = useState(config);
  const [active, setActive] = useState(0);
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (dbBacked) return;
    const update = () => {
      const block = demoStore.websiteContent.all().find(b => b.page === "home" && b.section === HERO_SCENE_SECTIONS[kind] && b.status === "published");
      setVisibleConfig(block ? parseHeroScenes(block.body, kind) : config);
    };
    update();
    window.addEventListener(DEMO_STORE_EVENT, update);
    return () => window.removeEventListener(DEMO_STORE_EVENT, update);
  }, [config, dbBacked, kind]);

  useEffect(() => { setActive(0); }, [visibleConfig.items]);

  useEffect(() => {
    if (!motionAllowed || visibleConfig.items.length < 2) return;
    const timer = window.setInterval(() => setActive(i => (i + 1) % visibleConfig.items.length), visibleConfig.seconds * 1000);
    return () => window.clearInterval(timer);
  }, [motionAllowed, visibleConfig]);

  if (visibleConfig.items.length === 0) return <div className={`bg-[#e5e7e5] ${className}`} />;

  return <div className={`relative overflow-hidden ${className}`} aria-label={`${kind} in everyday places`}>
    {visibleConfig.items.map((scene, index) => <div key={scene.id}
      aria-hidden={index !== active}
      className={`absolute inset-0 transition-opacity duration-700 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <img src={scene.image} alt={scene.magnets?.length ? "" : index === active ? scene.alt : ""}
        className={`h-full w-full object-cover ${imageClassName}`} loading={index === 0 ? "eager" : "lazy"} />
      {scene.magnets?.length ? <div role="img" aria-label={index === active ? scene.alt : undefined}
        className="absolute top-[24%] left-[20%] grid w-[72%] grid-cols-2 gap-x-[9%] gap-y-3 sm:gap-y-4">
        {scene.magnets.map(magnet => <img key={magnet.image} src={magnet.image} alt=""
          className="aspect-[3/2] w-full rounded-[3px] bg-white object-cover shadow-[1px_5px_8px_rgba(18,22,25,.42),0_0_1px_rgba(0,0,0,.55)]"
          loading="lazy" />)}
      </div> : null}
    </div>)}
  </div>;
}
