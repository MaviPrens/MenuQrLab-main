const scenes = [
  { src: "/images/lifestyle/table-rinaldis-product.webp", alt: "Rinaldi’s Pizza wet wipe packet on a restaurant table", label: "On their table", wide: true },
  { src: "/images/lifestyle/fridge-product.webp", alt: "Best Pizza magnet on a refrigerator", label: "On their fridge" },
  { src: "/images/lifestyle/car-product.webp", alt: "Rinaldi’s Pizza air freshener hanging in a car", label: "On the road" },
] as const;

export function LifestyleScenes() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4" aria-label="Custom products in everyday places">
      {scenes.map((scene) => (
        <div key={scene.src} className={`relative overflow-hidden rounded-[20px] bg-[#ddd4c8] shadow-[0_14px_28px_rgba(32,40,43,.12)] ${"wide" in scene ? "col-span-2 aspect-[1.75]" : "aspect-[.92]"}`}>
          <img src={scene.src} alt={scene.alt} className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-[#273b47] shadow-sm sm:text-xs">{scene.label}</span>
        </div>
      ))}
    </div>
  );
}
