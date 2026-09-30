import { Icon } from "@/components/shared/icon";

export function DirectContactCard() {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[#f36b28] p-6 text-white shadow-[0_18px_40px_rgba(193,76,24,.22)] sm:p-8">
      <span aria-hidden className="pointer-events-none absolute -right-8 -top-10 size-36 rounded-full border-[18px] border-white/15" />
      <p className="relative text-[11px] font-extrabold uppercase tracking-[.16em] text-white/80">We&apos;re here to help</p>
      <h2 className="relative mt-2 text-2xl font-extrabold leading-tight tracking-[-.04em] sm:text-[1.75rem]">To contact us immediately</h2>
      <p className="relative mt-2 text-sm leading-6 text-white/90">Tell us what you need. We&apos;ll help you find a solution that fits your business and budget.</p>
      <ul className="relative mt-6 space-y-3 text-sm font-semibold">
        <li><a className="flex min-h-11 items-center gap-3 rounded-xl bg-white/15 px-4 transition hover:bg-white/25" href="mailto:sales@nunowipes.com"><Icon name="Mail" className="size-5 shrink-0" aria-hidden /><span className="break-all">sales@nunowipes.com</span></a></li>
        <li><a className="flex min-h-11 items-center gap-3 rounded-xl bg-white/15 px-4 transition hover:bg-white/25" href="tel:+19546811177"><Icon name="Phone" className="size-5 shrink-0" aria-hidden />(954) 681-1177</a></li>
        <li><a className="flex min-h-11 items-center gap-3 rounded-xl bg-white/15 px-4 transition hover:bg-white/25" href="https://wa.me/19546811177" target="_blank" rel="noopener noreferrer"><Icon name="MessageCircle" className="size-5 shrink-0" aria-hidden />Message us on WhatsApp</a></li>
      </ul>
    </div>
  );
}
