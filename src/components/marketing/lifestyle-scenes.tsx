import { WipePacket } from "@/components/marketing/wipe-packet";

export function LifestyleScenes() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4" aria-label="Custom products in everyday places">
      <div className="relative col-span-2 aspect-[1.75] overflow-hidden rounded-[22px] bg-[#e6d0b5] shadow-[0_18px_36px_rgba(54,39,26,.14)]">
        <img src="/images/lifestyle/table.webp" alt="Restaurant table with a custom wet wipe" className="absolute inset-0 h-full w-full object-cover" />
        <WipePacket src="/images/showcase/wipe-fronts/village-pizza.webp" alt="Village Pizza wet wipe packet" eager className="absolute bottom-[17%] left-[34%] w-[45%] rotate-[-8deg] shadow-[0_22px_22px_rgba(60,38,23,.34)]" />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-[#273b47] shadow-sm sm:bottom-4 sm:left-4 sm:text-xs">On their table</span>
      </div>
      <div className="relative aspect-[.92] overflow-hidden rounded-[20px] bg-[#d7d8d2] shadow-[0_14px_28px_rgba(32,40,43,.12)]">
        <img src="/images/lifestyle/fridge.webp" alt="Custom magnet on a kitchen refrigerator" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute top-[34%] left-[31%] w-[58%] -rotate-6 overflow-hidden rounded-[5px] shadow-[4px_12px_13px_rgba(0,0,0,.32)]">
          <img src="/images/showcase/magnet-fronts/best-pizza.webp" alt="Best Pizza fridge magnet" className="aspect-[3/2] w-full object-cover" />
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-[#273b47] shadow-sm sm:text-xs">On their fridge</span>
      </div>
      <div className="relative aspect-[.92] overflow-hidden rounded-[20px] bg-[#c1cbd0] shadow-[0_14px_28px_rgba(32,40,43,.12)]">
        <img src="/images/lifestyle/car.webp" alt="Custom air freshener hanging inside a car" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute top-[32%] left-1/2 h-[11%] w-px -translate-x-1/2 bg-[#343536] shadow-sm" aria-hidden="true" />
        <img src="/images/lifestyle/rinaldis-air-freshener.webp" alt="Rinaldi’s Pizza car air freshener" className="absolute top-[42%] left-1/2 aspect-[5.5/9] w-[24%] -translate-x-1/2 rotate-3 rounded-[10%] object-cover shadow-[5px_12px_12px_rgba(0,0,0,.35)]" />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-[#273b47] shadow-sm sm:text-xs">On the road</span>
      </div>
    </div>
  );
}
