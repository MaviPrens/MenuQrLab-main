import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { ShowcaseStrip } from "@/components/marketing/showcase-strip";
import { WipePacket } from "@/components/marketing/wipe-packet";
import { routes } from "@/lib/routes";
import type { ShowcaseConfig } from "@/lib/showcase";

type Props = { wipes: ShowcaseConfig; magnets: ShowcaseConfig; dbBacked: boolean };

const wipeNames = [
  ["best-pizza", "Best Pizza"], ["boston-road-pizza", "Boston Road Pizza"],
  ["empire-pizza", "Empire Pizza"], ["golden-pizza", "Golden Pizza"],
  ["holyoke-pizza", "Holyoke Pizza"], ["husky-pizza", "Husky Pizza"],
  ["liberty-pizza", "Liberty Pizza"], ["ludlow-pizza", "Ludlow Pizza"],
  ["palace-pizza", "Palace Pizza"], ["parker-pizza", "Parker Pizza"],
  ["pizza-house", "Pizza House"], ["pizza-palace-granby", "Pizza Palace Granby"],
  ["pizza-works", "Pizza Works"], ["rinaldis-pizza", "Rinaldi’s Pizza"],
  ["roka", "Roka"], ["village-pizza", "Village Pizza"],
] as const;

const previewWipes: ShowcaseConfig = {
  seconds: 80,
  items: wipeNames.map(([id, name]) => ({
    id,
    image: `/images/showcase/wipe-fronts/${id}.webp`,
    alt: `${name} custom wet wipe design`,
  })),
};

const magnetNames = [
  ["best-pizza", "Best Pizza"], ["boston-bay", "Boston Bay Pizza"],
  ["boston-road", "Boston Road Pizza"], ["empire-pizza", "Empire Pizza"],
  ["golden-pizza", "Golden Pizza"], ["husky-coventry", "Husky Pizza Coventry"],
  ["husky-manchester", "Husky Pizza Manchester"], ["liberty-pizza", "Liberty Pizza"],
  ["ludlow-pizza", "Ludlow Pizza"], ["palace-pizza", "Palace Pizza"],
  ["parker-pizza", "Parker Pizza"], ["pizza-works", "Pizza Works"],
  ["pizza-house", "Pizza House Route 75"], ["pizza-palace-granby", "Pizza Palace Granby"],
  ["rinaldis-pizza", "Rinaldi’s Pizza"], ["village-pizza", "Village Pizza"],
] as const;

const previewMagnets: ShowcaseConfig = {
  seconds: 80,
  items: magnetNames.map(([id, name]) => ({
    id,
    image: `/images/showcase/magnet-fronts/${id}.webp`,
    alt: `${name} custom fridge magnet design`,
  })),
};

const featuredMagnets = [
  { src: "/images/showcase/magnet-fronts/palace-pizza.webp", alt: "Palace Pizza custom fridge magnet" },
  { src: "/images/showcase/magnet-fronts/liberty-pizza.webp", alt: "Liberty Pizza custom fridge magnet" },
  { src: "/images/showcase/magnet-fronts/best-pizza.webp", alt: "Best Pizza custom fridge magnet" },
];

function SampleProduct({ index, kind, className = "" }: { index: number; kind: "wipe" | "magnet"; className?: string }) {
  if (kind === "wipe") {
    const fronts = [
      { src: "/images/showcase/wipe-fronts/roka.webp", alt: "Roka custom wet wipe" },
      { src: "/images/showcase/wipe-fronts/best-pizza.webp", alt: "Best Pizza custom wet wipe" },
      { src: "/images/showcase/wipe-fronts/pizza-works.webp", alt: "Pizza Works custom wet wipe" },
    ];
    const front = fronts[index % fronts.length];
    return <WipePacket src={front.src} alt={front.alt} className={className} eager />;
  }
  const magnet = featuredMagnets[index % featuredMagnets.length];
  return (
    <div className={`aspect-[3/2] overflow-hidden rounded-[10px] bg-[#e7e5e0] shadow-[0_14px_22px_rgba(20,32,42,.19)] ${className}`}>
      <img src={magnet.src} alt={magnet.alt} className="h-full w-full object-cover" />
    </div>
  );
}

function QuoteLink({ children, outline = false }: { children: React.ReactNode; outline?: boolean }) {
  return <Link href={routes.marketing.contact()} className={outline
    ? "inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#f06428] px-6 text-sm font-bold text-[#ca4b1c] transition hover:bg-[#fff0e8]"
    : "inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#ee5a24] px-7 text-sm font-bold text-white shadow-[0_8px_18px_rgba(238,90,36,.16)] transition hover:bg-[#d44717]"}>{children}<Icon name="ArrowRight" className="size-4" aria-hidden /></Link>;
}

export function HomeConcept({ wipes, magnets, dbBacked }: Props) {
  const displayedWipes = wipes.items.length === 1 && wipes.items[0]?.id === "village-pizza"
    ? previewWipes : wipes;
  const displayedMagnets = magnets.items.length === 1 && magnets.items[0]?.id === "best-pizza"
    ? previewMagnets : magnets;
  return <div className="overflow-hidden bg-white font-[family-name:var(--font-manrope)] text-[#16283c]">
    <section className="relative bg-[radial-gradient(circle_at_82%_22%,#fff0dc_0,transparent_38%),linear-gradient(135deg,#fffaf5,#fff6eb)] px-5 py-12 sm:px-8 sm:py-18 lg:py-24">
      <span className="pointer-events-none absolute -top-24 right-[20%] size-64 rounded-full bg-[#ffe9d8]/50 blur-3xl" aria-hidden />
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-extrabold tracking-[.13em] text-[#c64b1d] uppercase shadow-[0_5px_18px_rgba(127,69,30,.07)]"><span className="size-2 rounded-full bg-[#fa631d]" />Made for local restaurants</p>
          <h1 className="max-w-[680px] text-[clamp(3rem,5vw,4.25rem)] leading-[1.04] font-extrabold tracking-[-.065em]">Your brand,<br /><span className="text-[#ed5b25]">out in the world.</span></h1>
          <p className="mt-6 max-w-[35rem] text-base leading-7 text-[#4c5967] sm:text-lg sm:leading-8">You put your heart into every order. Let&apos;s make sure people remember your restaurant with custom wet wipes, fridge magnets and a stronger presence online.</p>
          <div className="mt-7 flex flex-wrap items-center gap-4"><QuoteLink>Let&apos;s talk about your business</QuoteLink><span className="text-sm font-semibold text-[#596777]">Tell us what you need. We&apos;ll help you get started.</span></div>
          <div className="mt-9 grid max-w-[600px] grid-cols-3 gap-3 border-t border-[#e8dfd8] pt-6 text-xs font-medium text-[#435267] sm:text-sm">
            <span className="flex flex-col items-start gap-2"><span className="flex size-9 items-center justify-center rounded-full bg-white text-[#ed5b25] shadow-sm"><Icon name="Sparkles" className="size-5" aria-hidden /></span>Look like your restaurant</span>
            <span className="flex flex-col items-start gap-2"><span className="flex size-9 items-center justify-center rounded-full bg-white text-[#ed5b25] shadow-sm"><Icon name="Heart" className="size-5" aria-hidden /></span>Stay on their minds</span>
            <span className="flex flex-col items-start gap-2"><span className="flex size-9 items-center justify-center rounded-full bg-white text-[#ed5b25] shadow-sm"><Icon name="Users" className="size-5" aria-hidden /></span>Reach more locals</span>
          </div>
        </div>
        <div className="relative grid grid-cols-2 items-center gap-3 sm:gap-5" aria-label="Customer wet wipe and fridge magnet designs">
          <span className="absolute -top-5 right-0 rotate-12 text-4xl font-bold text-[#ed5b25]" aria-hidden>✳</span><span className="absolute -left-4 top-[34%] rotate-[-15deg] text-3xl font-black text-[#ff9b35] sm:-left-8" aria-hidden>✦</span>
          <div className="space-y-4 sm:space-y-6"><SampleProduct index={0} kind="wipe" className="-rotate-6" /><SampleProduct index={1} kind="wipe" className="rotate-2" /><SampleProduct index={2} kind="wipe" className="-rotate-3" /></div>
          <div className="space-y-4 pt-12 sm:space-y-6 sm:pt-16"><SampleProduct index={0} kind="magnet" className="rotate-5" /><SampleProduct index={1} kind="magnet" className="-rotate-3" /><SampleProduct index={2} kind="magnet" className="rotate-2" /></div>
          <span className="absolute -right-2 -bottom-8 rotate-[-7deg] rounded-full bg-[#ffdf9b] px-4 py-2 text-[11px] font-extrabold text-[#744327] shadow-md sm:right-3">Made to be remembered ✳</span>
        </div>
      </div>
    </section>

    <section className="bg-[linear-gradient(180deg,#fff,#fff9f3)] px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="wipes-title">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-7 grid gap-4 md:grid-cols-2 md:items-end">
          <div><p className="text-xs font-extrabold tracking-[.14em] text-[#d45120] uppercase">Custom printed wet wipes</p><h2 id="wipes-title" className="mt-2 text-[clamp(2rem,4vw,3.2rem)] leading-tight font-extrabold tracking-[-.055em]">Small detail. Big impact.</h2></div>
          <div><p className="max-w-[520px] text-[#4b5967]">A thoughtful detail guests actually use. Put your name in their hands with a wipe designed to feel right at home in your restaurant.</p><div className="mt-4"><QuoteLink outline>Make it yours</QuoteLink></div></div>
        </div>
        <ShowcaseStrip config={displayedWipes} kind="wet-wipes" dbBacked={dbBacked} title="Made for places like yours" description="Your restaurant could be next." />
      </div>
    </section>

    <section className="bg-[#f6f9fa] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-[1240px] items-center gap-9 lg:grid-cols-2 lg:gap-16">
        <div className="relative flex min-h-[300px] items-end overflow-hidden rounded-[24px] bg-[#d9e6e4] bg-cover bg-center p-7 sm:min-h-[420px] sm:p-10" style={{ backgroundImage: "url('/images/showcase/restaurant-table-sample.webp')" }}>
          <div className="relative w-[48%] min-w-[165px] max-w-[300px] rotate-[-7deg] drop-shadow-[0_20px_16px_rgba(0,0,0,.25)]"><SampleProduct index={1} kind="magnet" /></div>
          <span className="absolute right-5 bottom-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#375064] uppercase">Customer magnet design</span>
        </div>
        <div><p className="text-xs font-extrabold tracking-[.14em] text-[#d45120] uppercase">More than a memento</p><h2 className="mt-3 max-w-[560px] text-[clamp(2.2rem,4.3vw,4rem)] leading-[1.08] font-extrabold tracking-[-.06em]">Keep your brand<br />in their homes.</h2><p className="mt-5 max-w-[520px] text-base leading-7 text-[#4b5967]">A guest enjoyed your food today. Make it easy for them to find you the next time hunger strikes. A custom fridge magnet keeps your restaurant and contact details close.</p><div className="mt-6"><QuoteLink outline>Create your magnet</QuoteLink></div><div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#dbe4e7] pt-6 text-xs text-[#4b5967]"><span>Visible at home</span><span>Your own design</span><span>Easy to keep</span></div></div>
      </div>
    </section>

    <section className="px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="magnets-title"><div className="mx-auto max-w-[1240px]"><div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-extrabold tracking-[.14em] text-[#d45120] uppercase">Custom printed fridge magnets</p><h2 id="magnets-title" className="mt-2 text-[clamp(2rem,4vw,3.2rem)] leading-tight font-extrabold tracking-[-.055em]">Real restaurants. Lasting connections.</h2></div><QuoteLink outline>Put your brand here</QuoteLink></div><ShowcaseStrip config={displayedMagnets} kind="magnets" dbBacked={dbBacked} title="A place on their fridge" description="Picture your restaurant here." /></div></section>

    <section className="relative bg-[#fff2e7] px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="visibility-title">
      <div className="pointer-events-none absolute top-10 right-[9%] text-6xl text-[#ffad67]/50" aria-hidden>✳</div>
      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid items-center gap-9 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div>
            <p className="text-xs font-extrabold tracking-[.15em] text-[#c94c1d] uppercase">Beyond the table</p>
            <h2 id="visibility-title" className="mt-3 max-w-[730px] text-[clamp(2.3rem,4.6vw,4.1rem)] leading-[1.08] font-extrabold tracking-[-.06em]">Your next customer is <span className="text-[#ed5b25]">looking online.</span></h2>
            <p className="mt-5 max-w-[650px] text-base leading-7 text-[#4b5967]">The way people find a place to eat has changed. They discover local spots on Instagram and Facebook, check Google reviews and look for a website before they visit. Let&apos;s help them find yours and give them a reason to choose you.</p>
            <div className="mt-7"><QuoteLink>Let&apos;s make your business visible</QuoteLink></div>
          </div>
          <div className="relative mx-auto grid w-full max-w-[440px] grid-cols-2 gap-3 rounded-[28px] border border-white/80 bg-white/70 p-4 shadow-[0_22px_50px_rgba(123,67,39,.12)] sm:gap-4 sm:p-6" aria-label="Ways customers discover local restaurants">
            <span className="absolute -top-4 right-4 rotate-6 rounded-full bg-[#ffcf6f] px-4 py-2 text-[11px] font-extrabold text-[#5d3d22] shadow-sm">Be the place they find ✦</span>
            {[{ icon: "Instagram", label: "Discover you", color: "#ffe0d5" }, { icon: "Search", label: "Find you", color: "#e3f0ee" }, { icon: "Star", label: "Trust you", color: "#fff0c8" }, { icon: "MousePointerClick", label: "Choose you", color: "#e2e8f6" }].map(item => <div key={item.label} className="flex min-h-[120px] flex-col justify-between rounded-2xl p-4 shadow-[0_8px_18px_rgba(34,47,57,.06)] sm:min-h-[145px] sm:p-5" style={{ backgroundColor: item.color }}><Icon name={item.icon} className="size-8 text-[#172f46]" aria-hidden /><span className="text-base font-extrabold tracking-tight sm:text-lg">{item.label}<span className="text-[#ed5b25]">.</span></span></div>)}
          </div>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "Instagram", title: "Instagram & Facebook", body: "Social media management that keeps your restaurant in the conversation." },
            { icon: "MessageCircle", title: "Google reviews", body: "Help customers hear from happy guests and stay on top of feedback." },
            { icon: "ChartNoAxesCombined", title: "Google Analytics", body: "Understand how people find and use your website." },
            { icon: "Monitor", title: "Website design", body: "A clear, welcoming site that makes it easy to see your menu and get in touch." },
            { icon: "PanelTop", title: "Printed brochures", body: "Take your offers into the neighborhood with a design that feels like your brand." },
            { icon: "QrCode", title: "QR & online menus", body: "Give guests a quick path from a scan to your menu and useful links." },
          ].map(service => <div key={service.title} className="rounded-2xl border border-[#f2dac9] bg-white p-5 shadow-[0_10px_22px_rgba(124,70,38,.05)] sm:p-6"><span className="flex size-11 items-center justify-center rounded-full bg-[#fff0df] text-[#e95a21]"><Icon name={service.icon} className="size-6" aria-hidden /></span><h3 className="mt-4 text-lg font-extrabold tracking-tight">{service.title}</h3><p className="mt-2 text-sm leading-6 text-[#536273]">{service.body}</p></div>)}
        </div>
      </div>
    </section>

    <section className="bg-[#132d42] px-5 py-16 text-white sm:px-8 sm:py-20" aria-labelledby="qr-service-title">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <div>
            <p className="text-xs font-extrabold tracking-[.16em] text-[#ffb77e] uppercase">QR codes &amp; online menus</p>
            <h2 id="qr-service-title" className="mt-3 max-w-[700px] text-[clamp(2.3rem,4.7vw,4.4rem)] leading-[1.06] font-extrabold tracking-[-.06em]">One scan. Everything your guests need.</h2>
            <p className="mt-5 max-w-[640px] text-base leading-7 text-[#d2e0e9]">Give a hungry customer a simple next step. We create your branded online menu and connect it to a QR experience with the links guests need. Our team handles the design, setup and updates.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={routes.marketing.howItWorks()} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#f06428] px-6 text-sm font-bold text-white transition hover:bg-[#d94d17]">How it works <Icon name="ArrowRight" className="size-4" aria-hidden /></Link>
              <Link href={routes.marketing.features()} className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/40 px-6 text-sm font-bold text-white transition hover:bg-white/10">Explore digital features</Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[450px] rounded-[30px] bg-[#24465c] p-5 shadow-[0_25px_60px_rgba(0,0,0,.18)] sm:p-8" aria-label="Illustrative online menu preview">
            <div className="absolute -top-7 -right-4 flex size-20 rotate-12 items-center justify-center rounded-2xl bg-white text-[#172d3f] shadow-xl sm:size-24"><Icon name="QrCode" className="size-12 sm:size-14" strokeWidth={1.7} aria-hidden /></div>
            <div className="overflow-hidden rounded-2xl bg-[#fffaf5] text-[#172d3f]">
              <div className="flex items-center justify-between bg-[#f8ddbd] px-5 py-4"><span className="text-sm font-extrabold">Your restaurant</span><span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase">Online menu</span></div>
              <div className="grid grid-cols-3 gap-2 p-4 text-center text-[11px] font-bold sm:gap-3 sm:p-5"><span className="rounded-xl bg-[#fbe7d4] p-4">Menu</span><span className="rounded-xl bg-[#e5efe7] p-4">Offers</span><span className="rounded-xl bg-[#e4ecf5] p-4">Contact</span></div>
              <div className="mx-5 mb-5 rounded-lg border border-[#e7e0d9] px-4 py-3 text-xs text-[#607184]">Your brand, menu and useful links in one place.</div>
            </div>
            <p className="mt-4 text-center text-[10px] font-bold tracking-[.12em] text-[#d2e0e9] uppercase">Illustrative preview</p>
          </div>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { n: "1", icon: "Phone", title: "Call to Order", body: "A direct way to reach your restaurant." },
            { n: "2", icon: "UtensilsCrossed", title: "Pick Your Meal", body: "Browse your branded online menu." },
            { n: "3", icon: "ShoppingBag", title: "Online Order with Pay", body: "Connect to your existing ordering platform." },
            { n: "4", icon: "MapPin", title: "Visit Us", body: "Find your location, directions and opening hours." },
          ].map(action => <div key={action.n} className="rounded-2xl border border-white/15 bg-white/[.08] p-5"><div className="flex items-center justify-between"><span className="text-2xl font-extrabold text-[#ffb77e]">{action.n}</span><Icon name={action.icon} className="size-6 text-[#ffb77e]" aria-hidden /></div><h3 className="mt-4 text-base font-extrabold">{action.title}</h3><p className="mt-1 text-sm leading-6 text-[#d2e0e9]">{action.body}</p></div>)}
        </div>
      </div>
    </section>

    <section className="bg-[#fff8f2] px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-[1240px]"><h2 className="mb-8 text-center text-[clamp(1.8rem,3vw,2.5rem)] leading-tight font-extrabold tracking-[-.05em]">From your idea to their hands. It’s easy.</h2><div className="grid gap-4 md:grid-cols-3">{[
      { n: "1", icon: "MessageCircle", title: "Share your idea", body: "Tell us about your restaurant and the product you have in mind." },
      { n: "2", icon: "Pencil", title: "We prepare your design", body: "We shape the artwork around your brand and review it with you." },
      { n: "3", icon: "PackageCheck", title: "Ready for production", body: "Once approved, we prepare the design for your order." },
    ].map(step => <div key={step.n} className="rounded-2xl border border-[#f0e7df] bg-white p-6 shadow-[0_8px_24px_rgba(26,36,46,.04)]"><div className="flex items-center gap-4"><span className="flex size-12 items-center justify-center rounded-full bg-[#fff0e5] text-xl font-extrabold text-[#e85a24]">{step.n}</span><Icon name={step.icon} className="size-7 text-[#193249]" aria-hidden /></div><h3 className="mt-5 text-lg font-extrabold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#526171]">{step.body}</p></div>)}</div></div></section>

    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-7 rounded-[24px] bg-[#e8f2f5] p-8 sm:p-12 lg:flex-row lg:items-center"><div><p className="text-xs font-extrabold tracking-[.14em] text-[#cb4c1f] uppercase">Your next chapter starts here</p><h2 className="mt-2 max-w-[670px] text-[clamp(2rem,4vw,3.4rem)] leading-tight font-extrabold tracking-[-.06em]">More locals should know your name.</h2><p className="mt-3 max-w-[620px] text-[#435466]">Tell us about your restaurant. We&apos;ll help you choose the print and digital services that make sense for your business.</p></div><div className="shrink-0"><QuoteLink>Get a Quote</QuoteLink></div></div></section>
  </div>;
}
