import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { ShowcaseStrip } from "@/components/marketing/showcase-strip";
import { LifestyleScenes } from "@/components/marketing/lifestyle-scenes";
import { BackToTop } from "@/components/marketing/back-to-top";
import { DirectContactCard } from "@/components/marketing/direct-contact-card";
import { FlyerCarousel } from "@/components/marketing/flyer-carousel";
import { routes } from "@/lib/routes";
import type { ShowcaseConfig } from "@/lib/showcase";
import type { HeroSceneConfig, HeroSceneKind } from "@/lib/hero-scenes";

type Props = { wipes: ShowcaseConfig; magnets: ShowcaseConfig; scenes: Record<HeroSceneKind, HeroSceneConfig>; dbBacked: boolean };
const contactEmail = "sales@nunowipes.com";
const contactPhone = "+19546811177";

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

function QuoteLink({ children, outline = false }: { children: React.ReactNode; outline?: boolean }) {
  const href = `mailto:${contactEmail}?subject=${encodeURIComponent("Let's talk about my business")}`;
  return <Link href={href} className={outline
    ? "inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#f06428] px-6 text-sm font-bold text-[#ca4b1c] transition hover:bg-[#fff0e8]"
    : "inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#ee5a24] px-7 text-sm font-bold text-white shadow-[0_8px_18px_rgba(238,90,36,.16)] transition hover:bg-[#d44717]"}>{children}<Icon name="ArrowRight" className="size-4" aria-hidden /></Link>;
}

function PlayfulMarks() {
  return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <svg className="mql-float absolute top-[2%] left-[2%] size-7 text-[#f58a4a]/70 sm:size-9 xl:top-[10%] xl:left-[3%] xl:size-12" viewBox="0 0 48 48" fill="none"><path d="M8 29c8-17 13 4 19-11s13 3 14-5" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></svg>
    <svg className="mql-float-delayed absolute top-[15%] right-[2%] size-7 text-[#ffaf4f]/75 sm:size-10 xl:top-[9%] xl:right-[6%] xl:size-14" viewBox="0 0 56 56" fill="none"><path d="M10 36 26 20M31 37l11-13M15 13l8 3" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></svg>
    <span className="mql-float absolute right-[2%] bottom-[4%] size-6 rounded-full border-[5px] border-[#80b8b2]/65 sm:size-8 xl:bottom-[13%] xl:size-9 xl:border-[8px]" />
    <svg className="mql-float-delayed absolute bottom-[38%] left-[2%] size-7 text-[#ee754a]/65 sm:size-9 xl:bottom-[12%] xl:left-[3%] xl:size-12" viewBox="0 0 48 48" fill="none"><path d="M6 33c10-9 12 5 20-7s9 2 16-9" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></svg>
  </div>;
}

export function HomeConcept({ wipes, magnets, scenes, dbBacked }: Props) {
  const displayedWipes = wipes.items.length === 1 && wipes.items[0]?.id === "village-pizza"
    ? previewWipes : wipes;
  const displayedMagnets = magnets.items.length === 1 && magnets.items[0]?.id === "best-pizza"
    ? previewMagnets : magnets;
  return <div className="overflow-hidden bg-white font-[family-name:var(--font-manrope)] text-[#16283c]">
    <BackToTop />
    <section className="relative bg-[radial-gradient(circle_at_82%_22%,#fff0dc_0,transparent_38%),linear-gradient(135deg,#fffaf5,#fff6eb)] px-5 py-12 sm:px-8 sm:py-18 lg:py-24">
      <span className="pointer-events-none absolute -top-24 right-[20%] size-64 rounded-full bg-[#ffe9d8]/50 blur-3xl" aria-hidden />
      <PlayfulMarks />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-extrabold tracking-[.13em] text-[#c64b1d] uppercase shadow-[0_5px_18px_rgba(127,69,30,.07)]"><span className="size-2 rounded-full bg-[#fa631d]" />Made for local restaurants</p>
          <h1 className="max-w-[680px] text-[clamp(3rem,5vw,4.25rem)] leading-[1.04] font-extrabold tracking-[-.065em]">Your brand,<br /><span className="text-[#ed5b25]">out in the world.</span></h1>
          <p className="mt-5 inline-flex rounded-lg bg-[#ffe5ca] px-3 py-2 text-sm font-extrabold text-[#a9441b] sm:text-base">Production-level pricing. Agency-quality service.</p>
          <p className="mt-4 max-w-[35rem] text-base leading-7 text-[#4c5967] sm:text-lg sm:leading-8">You put your heart into every order. MenuQrLab directly manufactures every product featured on this site, from custom wet wipes and magnets to print pieces for your brand. We also help you reach more customers with digital menus and marketing. From production to promotion, we handle every step.</p>
          <div className="mt-7 flex flex-wrap items-center gap-3"><QuoteLink>Email us for a quote</QuoteLink><a href={`tel:${contactPhone}`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#e9aa8b] px-6 text-sm font-bold text-[#ba4c20] transition hover:bg-white">Just a call away</a></div>
          <p className="mt-4 text-sm font-semibold text-[#596777]">Tell us your goals and budget. We&apos;ll find an option that fits.</p>
          <div className="mt-9 grid max-w-[600px] grid-cols-3 gap-3 border-t border-[#e8dfd8] pt-6 text-xs font-medium text-[#435267] sm:text-sm">
            <span className="flex flex-col items-start gap-2"><span className="flex size-9 items-center justify-center rounded-full bg-white text-[#ed5b25] shadow-sm"><Icon name="Sparkles" className="size-5" aria-hidden /></span>Look like your restaurant</span>
            <span className="flex flex-col items-start gap-2"><span className="flex size-9 items-center justify-center rounded-full bg-white text-[#ed5b25] shadow-sm"><Icon name="Heart" className="size-5" aria-hidden /></span>Stay on their minds</span>
            <span className="flex flex-col items-start gap-2"><span className="flex size-9 items-center justify-center rounded-full bg-white text-[#ed5b25] shadow-sm"><Icon name="Users" className="size-5" aria-hidden /></span>Reach more locals</span>
          </div>
        </div>
        <LifestyleScenes scenes={scenes} dbBacked={dbBacked} />
      </div>
    </section>

    <section className="bg-[linear-gradient(180deg,#fff,#fff9f3)] px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="wipes-title">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-7 grid gap-4 md:grid-cols-2 md:items-end">
          <div><p className="text-xs font-extrabold tracking-[.14em] text-[#d45120] uppercase">Custom printed wet wipes</p><h2 id="wipes-title" className="mt-2 text-[clamp(2rem,4vw,3.2rem)] leading-tight font-extrabold tracking-[-.055em]">Small detail. Big impact.</h2></div>
          <div><p className="max-w-[520px] text-[#4b5967]">A thoughtful detail guests actually use. Put your name in their hands with a wipe designed to feel right at home in your restaurant. Ask us about options shaped around your budget.</p><div className="mt-4"><QuoteLink outline>Email us about wet wipes</QuoteLink></div></div>
        </div>
        <div className="mb-10 grid overflow-hidden rounded-[28px] border border-[#f1dfd0] bg-[#fff4e9] shadow-[0_20px_48px_rgba(77,49,29,.09)] lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative aspect-[4/3] min-h-[260px] overflow-hidden sm:min-h-[360px] lg:aspect-auto">
            <img src="/images/lifestyle/table-parker-feature-v2.webp" alt="Parker Pizza custom wet wipe packets on a pizzeria counter" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <p className="text-xs font-extrabold tracking-[.15em] text-[#c74d1e] uppercase">A detail worth keeping</p>
            <h3 className="mt-3 text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] font-extrabold tracking-[-.05em]">Your brand, in every detail.</h3>
            <p className="mt-4 max-w-[430px] text-sm leading-7 text-[#526070] sm:text-base">A custom wipe adds a thoughtful touch to every order. Both sides can carry your restaurant&apos;s personality, useful details and a quick way for guests to find you again.</p>
            <p className="mt-5 text-sm font-bold text-[#b6522c]">A little extra care, with your name on it.</p>
          </div>
        </div>
        <ShowcaseStrip config={displayedWipes} kind="wet-wipes" dbBacked={dbBacked} title="Made for places like yours" description="Your restaurant could be next." />
      </div>
    </section>

    <section className="bg-[#f6f9fa] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-[1240px] items-center gap-9 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#d9e6e4] shadow-[0_22px_48px_rgba(24,44,49,.12)]">
          <img src="/images/lifestyle/fridge-four-brands-feature.webp" alt="Best Pizza, Palace Pizza, Liberty Pizza and Golden Pizza custom magnets on a kitchen refrigerator" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <span className="absolute right-4 bottom-4 rounded-full bg-white/95 px-4 py-2 text-[10px] font-bold tracking-wider text-[#375064] uppercase shadow-sm sm:right-5 sm:bottom-5">Stay close to home</span>
        </div>
        <div><p className="text-xs font-extrabold tracking-[.14em] text-[#d45120] uppercase">More than a memento</p><h2 className="mt-3 max-w-[560px] text-[clamp(2.2rem,4.3vw,4rem)] leading-[1.08] font-extrabold tracking-[-.06em]">Keep your brand<br />in their homes.</h2><p className="mt-5 max-w-[520px] text-base leading-7 text-[#4b5967]">A guest enjoyed your food today. Make it easy for them to find you the next time hunger strikes. A custom fridge magnet keeps your restaurant and contact details close. We can shape the design and quantity to your needs.</p><div className="mt-6"><QuoteLink outline>Create your magnet</QuoteLink></div><div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#dbe4e7] pt-6 text-xs text-[#4b5967]"><span>Visible at home</span><span>Your own design</span><span>Easy to keep</span></div></div>
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
            <p className="mt-4 text-center text-[10px] font-bold tracking-[.12em] text-[#d2e0e9] uppercase">Your menu, easy to find</p>
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

    <section className="bg-[#f0f5f3] px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="freshener-title">
      <div className="mx-auto grid max-w-[1240px] items-center gap-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[470px] overflow-hidden rounded-[28px] shadow-[0_26px_55px_rgba(32,54,51,.18)]">
          <img src="/images/lifestyle/car-freshener-rinaldis-portrait.webp" alt="Rinaldi’s Pizza custom air freshener hanging from a car rearview mirror" className="block aspect-[2/3] w-full object-cover" loading="lazy" />
          <span className="absolute right-4 bottom-4 rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold text-[#183948] shadow-sm">On the road with them</span>
        </div>
        <div className="py-2">
          <p className="text-xs font-extrabold tracking-[.15em] text-[#bb4c23] uppercase">Custom car air fresheners</p>
          <h2 id="freshener-title" className="mt-3 max-w-[670px] text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.08] font-extrabold tracking-[-.06em]">Go along for<br /><span className="text-[#db5a2b]">the ride.</span></h2>
          <p className="mt-5 max-w-[570px] text-base leading-7 text-[#4b5e63]">A custom air freshener puts your restaurant in a place customers see every day. Make the design your own and give them another easy way to remember you when it&apos;s time to order.</p>
          <div className="mt-7"><QuoteLink>Ask about air fresheners</QuoteLink></div>
          <div className="mt-9 grid max-w-[560px] grid-cols-3 gap-3 border-t border-[#ccddd8] pt-5 text-xs font-semibold text-[#4c6867] sm:text-sm"><span>Made for your brand</span><span>A daily reminder</span><span>Easy to share</span></div>
        </div>
      </div>
    </section>

    <section className="bg-[#fff8f2] px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="flyer-title">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[1.65fr_.85fr] lg:gap-12">
        <div className="grid items-center gap-8 sm:grid-cols-[1fr_.95fr] sm:gap-7">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#c74e20]">Custom printed flyers</p>
            <h2 id="flyer-title" className="mt-3 text-[clamp(2rem,3vw,3rem)] font-extrabold leading-[1.12] tracking-[-.055em]">A great offer,<br /><span className="text-[#e95b27]">in their hands.</span></h2>
            <p className="mt-5 max-w-[440px] text-base leading-7 text-[#4b5e68]">Put your menu and special offers where your neighbors can see them. We take your flyer from design through printing, with production-level pricing and agency-quality creative work tailored to your business.</p>
            <p className="mt-4 text-sm font-bold text-[#ad4c27]">Your brand. Your neighborhood. A plan that fits your budget.</p>
            <div className="mt-6"><QuoteLink>Ask about printed flyers</QuoteLink></div>
          </div>
          <div className="mx-auto w-full max-w-[430px]"><FlyerCarousel /></div>
        </div>
        <aside aria-label="Contact MenuQrLab directly"><DirectContactCard /></aside>
      </div>
    </section>

    <section className="bg-[#fff8f2] px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto max-w-[1240px]"><h2 className="mb-8 text-center text-[clamp(1.8rem,3vw,2.5rem)] leading-tight font-extrabold tracking-[-.05em]">From your idea to their hands. It’s easy.</h2><div className="grid gap-4 md:grid-cols-3">{[
      { n: "1", icon: "MessageCircle", title: "Share your idea", body: "Tell us about your restaurant and the product you have in mind." },
      { n: "2", icon: "Pencil", title: "We prepare your design", body: "We shape the artwork around your brand and review it with you." },
      { n: "3", icon: "PackageCheck", title: "Ready for production", body: "Once approved, we prepare the design for your order." },
    ].map(step => <div key={step.n} className="rounded-2xl border border-[#f0e7df] bg-white p-6 shadow-[0_8px_24px_rgba(26,36,46,.04)]"><div className="flex items-center gap-4"><span className="flex size-12 items-center justify-center rounded-full bg-[#fff0e5] text-xl font-extrabold text-[#e85a24]">{step.n}</span><Icon name={step.icon} className="size-7 text-[#193249]" aria-hidden /></div><h3 className="mt-5 text-lg font-extrabold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#526171]">{step.body}</p></div>)}</div></div></section>

    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="relative mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-7 overflow-hidden rounded-[24px] bg-[#e8f2f5] p-8 sm:p-12 lg:flex-row lg:items-center"><span aria-hidden className="mql-float pointer-events-none absolute -top-10 right-[25%] size-24 rounded-full border-[13px] border-[#f7ad71]/40" /><span aria-hidden className="mql-float-delayed pointer-events-none absolute -bottom-10 left-[40%] size-24 rounded-full border-[13px] border-[#8bc0b8]/45" /><div className="relative"><p className="text-xs font-extrabold tracking-[.14em] text-[#cb4c1f] uppercase">Your next chapter starts here</p><h2 className="mt-2 max-w-[670px] text-[clamp(2rem,4vw,3.4rem)] leading-tight font-extrabold tracking-[-.06em]">More locals should know your name.</h2><p className="mt-3 max-w-[620px] text-[#435466]">Tell us about your restaurant and budget. We&apos;ll suggest a mix of print and digital services that fits your goals.</p></div><div className="relative flex shrink-0 flex-wrap gap-3"><QuoteLink>Get a quote by email</QuoteLink><a href={`tel:${contactPhone}`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#527185] px-6 text-sm font-bold text-[#173c52] transition hover:bg-white">Call us today</a></div></div></section>
  </div>;
}
