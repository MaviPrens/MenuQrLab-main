type Props = { src: string; alt: string; className?: string; eager?: boolean };

/** A slim 12:7 sachet around the customer's original, uncropped front artwork. */
export function WipePacket({ src, alt, className = "", eager = false }: Props) {
  return (
    <div className={`relative isolate aspect-[12/7] overflow-hidden rounded-[7px] bg-white shadow-[0_13px_22px_rgba(28,39,47,.17),0_2px_5px_rgba(28,39,47,.09)] ${className}`}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"}
        className="absolute inset-y-[2.5%] left-[3.5%] h-[95%] w-[93%] object-contain" />
      <span className="pointer-events-none absolute inset-y-0 left-0 w-[3.5%] border-r border-black/10 bg-[repeating-linear-gradient(0deg,#f1f2f0_0px,#fafafa_2px,#e6e8e6_3px,#f5f5f3_5px)] opacity-80" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-[3.5%] border-l border-black/10 bg-[repeating-linear-gradient(0deg,#f1f2f0_0px,#fafafa_2px,#e6e8e6_3px,#f5f5f3_5px)] opacity-80" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2.5%] border-b border-black/5 bg-white/50" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2.5%] border-t border-black/5 bg-white/50" aria-hidden="true" />
    </div>
  );
}
