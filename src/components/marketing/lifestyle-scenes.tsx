import { HeroSceneCarousel } from "@/components/marketing/hero-scene-carousel";
import type { HeroSceneConfig, HeroSceneKind } from "@/lib/hero-scenes";

type Props = { scenes: Record<HeroSceneKind, HeroSceneConfig>; dbBacked: boolean };

export function LifestyleScenes({ scenes, dbBacked }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4" aria-label="Custom products in everyday places">
      {(["wipes", "magnets", "fresheners"] as const).map((kind) => (
        <div key={kind} className={`relative overflow-hidden rounded-[20px] bg-[#ddd4c8] shadow-[0_14px_28px_rgba(32,40,43,.12)] ${kind === "wipes" ? "col-span-2 aspect-[1.75]" : "aspect-[.92]"}`}>
          <HeroSceneCarousel kind={kind} config={scenes[kind]} dbBacked={dbBacked} className="h-full w-full" />
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-[#273b47] shadow-sm sm:text-xs">
            {kind === "wipes" ? "On their table" : kind === "magnets" ? "On their fridge" : "On the road"}
          </span>
        </div>
      ))}
    </div>
  );
}
