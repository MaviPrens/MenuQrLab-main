import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { ShowcaseStrip } from "@/components/marketing/showcase-strip";
import { routes } from "@/lib/routes";
import type { ShowcaseConfig } from "@/lib/showcase";

type Props = { wipes: ShowcaseConfig; magnets: ShowcaseConfig; dbBacked: boolean };

const samples = [
  { label: "Fresh ideas", note: "GOOD FOOD · GOOD DAYS", color: "#e8f0da", ink: "#24564a", motif: "✿" },
  { label: "Good food", note: "MADE WITH A SMILE", color: "#ffc64e", ink: "#603029", motif: "☀" },
  { label: "Made to stay", note: "COME BACK SOON", color: "#0e5959", ink: "#fff4d4", motif: "✳" },
  { label: "Your place", note: "EVERYDAY MOMENTS", color: "#f9d5c5", ink: "#923d31", motif: "♥" },
  { label: "Hello again", note: "GOOD TIMES AHEAD", color: "#f16a46", ink: "#fff5df", motif: "✽" },
  { label: "The little things", note: "ALWAYS REMEMBERED", color: "#cee9f3", ink: "#164564", motif: "✦" },
];

function SampleProduct({ index, kind, className = "" }: { index: number; kind: "wipe" | "magnet"; className?: string }) {
  const sample = samples[index % samples.length];
  return (
    <div className={`relative isolate flex items-center justify-center overflow-hidden border border-black/5 shadow-[0_14px_22px_rgba(20,32,42,.17)] ${kind === "wipe" ? "aspect-[12/7] rounded-[10px]" : "aspect-[9/6] rounded-[12px]"} ${className}`}
      style={{ backgroundColor: sample.color, color: sample.ink }} aria-label={`${kind === "wipe" ? "Wet wipe" : "Magnet"} placeholder sample artwork`}>
      {kind === "wipe" && <><span className="absolute inset-y-0 left-0 w-[5%] border-r border-current/20 bg-white/15 [background-image:repeating-linear-gradient(0deg,transparent_0_4px,rgba(255,255,255,.4)_4px_6px)]" aria-hidden /><span className="absolute inset-y-0 right-0 w-[5%] border-l border-current/20 bg-white/15 [background-image:repeating-linear-gradient(0deg,transparent_0_4px,rgba(255,255,255,.4)_4px_6px)]" aria-hidden /></>}
      <span className="absolute -top-[38%] -right-[12%] size-[75%] rounded-full border-[10px] border-current opacity-[.09]" aria-hidden />
      <span className="absolute -bottom-[45%] -left-[12%] size-[65%] rounded-full border-[8px] border-current opacity-[.1]" aria-hidden />
      <span className="absolute top-[8%] right-[9%] rotate-12 text-[clamp(1.7rem,4vw,3.6rem)] leading-none opacity-90" aria-hidden>{sample.motif}</span>
      <span className="absolute bottom-[8%] left-[10%] -rotate-12 text-[clamp(1.4rem,3vw,2.5rem)] leading-none opacity-50" aria-hidden>{sample.motif}</span>
      <div className="relative z-10 max-w-[74%] -rotate-2 text-center">
        <strong className="block font-[family-name:var(--font-manrope)] text-[clamp(1rem,2.1vw,2rem)] leading-tight font-extrabold tracking-[-.06em]">{sample.label}</strong>
        <span className="mt-2 inline-block border-t border-current/40 pt-1.5 text-[clamp(7px,.7vw,10px)] font-bold tracking-[.12em] uppercase">{sample.note}</span>
      </div>
      <span className="absolute bottom-[6%] right-[8%] text-[7px] font-bold tracking-wider uppercase opacity-70">Concept sample</span>
    </div>
  );
}

function QuoteLink({ children, outline = false }: { children: React.ReactNode; outline?: boolean }) {
  return <Link href={routes.marketing.contact()} className={outline
    ? "inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#f06428] px-6 text-sm font-bold text-[#ca4b1c] transition hover:bg-[#fff0e8]"
    : "inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#ee5a24] px-7 text-sm font-bold text-white shadow-[0_8px_18px_rgba(238,90,36,.16)] transition hover:bg-[#d44717]"}>{children}<Icon name="ArrowRight" className="size-4" aria-hidden /></Link>;
}

export function HomeConcept({ wipes, magnets, dbBacked }: Props) {
  return <div className="overflow-hidden bg-white font-[family-name:var(--font-manrope)] text-[#16283c]">
    <section className="relative bg-[#fffaf5] px-5 py-12 sm:px-8 sm:py-18 lg:py-24">
      <span className="pointer-events-none absolute -top-24 right-[20%] size-64 rounded-full bg-[#ffe9d8]/50 blur-3xl" aria-hidden />
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
        <div>
          <p className="mb-4 text-xs font-extrabold tracking-[.15em] text-[#cd481c] uppercase">Custom wet wipes &amp; fridge magnets</p>
          <h1 className="max-w-[680px] text-[clamp(3.1rem,6vw,5.6rem)] leading-[.99] font-extrabold tracking-[-.07em]">Your brand,<br /><span className="text-[#ed5b25]">out in the world.</span></h1>
          <p className="mt-6 max-w-[35rem] text-base leading-7 text-[#4c5967] sm:text-lg sm:leading-8">Turn everyday moments into lasting impressions with custom printed wet wipes and fridge magnets made for your restaurant.</p>
          <div className="mt-7"><QuoteLink>Get a Quote</QuoteLink></div>
          <div className="mt-9 grid max-w-[600px] grid-cols-3 gap-3 border-t border-[#e8dfd8] pt-6 text-xs font-medium text-[#435267] sm:text-sm">
            <span><Icon name="Sparkles" className="mb-2 size-5 text-[#ed5b25]" aria-hidden />Made for your brand</span>
            <span><Icon name="Heart" className="mb-2 size-5 text-[#ed5b25]" aria-hidden />Useful every day</span>
            <span><Icon name="Users" className="mb-2 size-5 text-[#ed5b25]" aria-hidden />Keep guests connected</span>
          </div>
        </div>
        <div className="relative grid grid-cols-2 items-center gap-3 sm:gap-5" aria-label="Illustrative product samples; customer artwork will be added later">
          <span className="absolute -top-5 right-0 rotate-12 text-4xl font-bold text-[#ed5b25]" aria-hidden>✳</span>
          <div className="space-y-3 sm:space-y-5"><SampleProduct index={0} kind="wipe" /><SampleProduct index={2} kind="magnet" /><SampleProduct index={4} kind="wipe" /></div>
          <div className="space-y-3 pt-12 sm:space-y-5 sm:pt-16"><SampleProduct index={1} kind="magnet" /><SampleProduct index={3} kind="wipe" /><SampleProduct index={5} kind="magnet" /></div>
        </div>
      </div>
    </section>

    <section className="px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="wipes-title">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-7 grid gap-4 md:grid-cols-2 md:items-end">
          <div><p className="text-xs font-extrabold tracking-[.14em] text-[#d45120] uppercase">Custom printed wet wipes</p><h2 id="wipes-title" className="mt-2 text-[clamp(2rem,4vw,3.2rem)] leading-tight font-extrabold tracking-[-.055em]">Small detail. Big impact.</h2></div>
          <div><p className="max-w-[520px] text-[#4b5967]">A thoughtful touch your guests can use. Designed around your restaurant and made to keep your name in their hands.</p><div className="mt-4"><QuoteLink outline>Ask about wet wipes</QuoteLink></div></div>
        </div>
        <ShowcaseStrip config={wipes} kind="wet-wipes" dbBacked={dbBacked} title="Wet wipe designs" description="Selected work · more designs coming soon" />
      </div>
    </section>

    <section className="bg-[#f6f9fa] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-[1240px] items-center gap-9 lg:grid-cols-2 lg:gap-16">
        <div className="relative flex min-h-[300px] items-end overflow-hidden rounded-[24px] bg-[#d9e6e4] bg-cover bg-center p-7 sm:min-h-[420px] sm:p-10" style={{ backgroundImage: "url('/images/showcase/restaurant-table-sample.webp')" }}>
          <div className="relative w-[48%] min-w-[165px] max-w-[300px] rotate-[-7deg] drop-shadow-[0_20px_16px_rgba(0,0,0,.25)]"><SampleProduct index={1} kind="magnet" /></div>
          <span className="absolute right-5 bottom-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#375064] uppercase">Illustrative sample</span>
        </div>
        <div><p className="text-xs font-extrabold tracking-[.14em] text-[#d45120] uppercase">More than a memento</p><h2 className="mt-3 max-w-[560px] text-[clamp(2.2rem,4.3vw,4rem)] leading-[1.08] font-extrabold tracking-[-.06em]">Keep your brand<br />in their homes.</h2><p className="mt-5 max-w-[520px] text-base leading-7 text-[#4b5967]">A fridge magnet makes it easy for guests to remember your restaurant after the meal. We turn your brand into something worth keeping.</p><div className="mt-6"><QuoteLink outline>Ask about magnets</QuoteLink></div><div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#dbe4e7] pt-6 text-xs text-[#4b5967]"><span>Visible at home</span><span>Your own design</span><span>Easy to keep</span></div></div>
      </div>
    </section>

    <section className="px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="magnets-title"><div className="mx-auto max-w-[1240px]"><div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-extrabold tracking-[.14em] text-[#d45120] uppercase">Custom printed fridge magnets</p><h2 id="magnets-title" className="mt-2 text-[clamp(2rem,4vw,3.2rem)] leading-tight font-extrabold tracking-[-.055em]">Real restaurants. Lasting connections.</h2></div><QuoteLink outline>Explore more designs</QuoteLink></div><ShowcaseStrip config={magnets} kind="magnets" dbBacked={dbBacked} title="Magnet designs" description="Selected work · more designs coming soon" /></div></section>

    <section className="bg-[#fff8f2] px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-[1240px]"><h2 className="mb-8 text-center text-[clamp(1.8rem,3vw,2.5rem)] leading-tight font-extrabold tracking-[-.05em]">From your idea to their hands. It’s easy.</h2><div className="grid gap-4 md:grid-cols-3">{[
      { n: "1", icon: "MessageCircle", title: "Share your idea", body: "Tell us about your restaurant and the product you have in mind." },
      { n: "2", icon: "Pencil", title: "We prepare your design", body: "We shape the artwork around your brand and review it with you." },
      { n: "3", icon: "PackageCheck", title: "Ready for production", body: "Once approved, we prepare the design for your order." },
    ].map(step => <div key={step.n} className="rounded-2xl border border-[#f0e7df] bg-white p-6 shadow-[0_8px_24px_rgba(26,36,46,.04)]"><div className="flex items-center gap-4"><span className="flex size-12 items-center justify-center rounded-full bg-[#fff0e5] text-xl font-extrabold text-[#e85a24]">{step.n}</span><Icon name={step.icon} className="size-7 text-[#193249]" aria-hidden /></div><h3 className="mt-5 text-lg font-extrabold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#526171]">{step.body}</p></div>)}</div></div></section>

    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-7 rounded-[24px] bg-[#e8f2f5] p-8 sm:p-12 lg:flex-row lg:items-center"><div><p className="text-xs font-extrabold tracking-[.14em] text-[#cb4c1f] uppercase">Ready to get started?</p><h2 className="mt-2 max-w-[670px] text-[clamp(2rem,4vw,3.4rem)] leading-tight font-extrabold tracking-[-.06em]">Ready to bring your brand to more tables?</h2><p className="mt-3 max-w-[620px] text-[#435466]">Tell us what you need. We’ll help you find the right design for your restaurant.</p></div><div className="shrink-0"><QuoteLink>Get a Quote</QuoteLink></div></div></section>
  </div>;
}
