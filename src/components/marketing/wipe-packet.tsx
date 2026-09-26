type Props = { src: string; alt: string; className?: string; eager?: boolean };

/** A slim 12:7 sachet around the customer's original, uncropped front artwork. */
export function WipePacket({ src, alt, className = "", eager = false }: Props) {
  return (
    <div className={`relative isolate aspect-[12/7] overflow-hidden rounded-[6px] bg-white ring-1 ring-black/10 shadow-[0_14px_23px_rgba(28,39,47,.17),0_2px_5px_rgba(28,39,47,.1)] ${className}`}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full scale-[1.065] object-contain" />
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(102deg,rgba(255,255,255,.16),transparent_24%,transparent_75%,rgba(0,0,0,.055))]" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-y-0 left-0 w-[3%] border-r border-black/10 bg-[repeating-linear-gradient(0deg,#f2f3f0_0px,#fff_2px,#e4e7e4_3px,#f7f8f6_5px)] shadow-[2px_0_3px_rgba(0,0,0,.12)]" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-[3%] border-l border-black/10 bg-[repeating-linear-gradient(0deg,#f2f3f0_0px,#fff_2px,#e4e7e4_3px,#f7f8f6_5px)] shadow-[-2px_0_3px_rgba(0,0,0,.12)]" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[1.5%] bg-white/35 shadow-[0_1px_2px_rgba(0,0,0,.08)]" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5%] bg-white/35 shadow-[0_-1px_2px_rgba(0,0,0,.08)]" aria-hidden="true" />
    </div>
  );
}
