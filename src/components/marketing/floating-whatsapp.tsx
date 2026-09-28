import { Icon } from "@/components/shared/icon";

const message = encodeURIComponent("Hi MenuQrLab! I'd like to talk about custom products for my business.");

export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/19546811177?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MenuQrLab on WhatsApp"
      className="fixed right-4 bottom-[calc(6.5rem+env(safe-area-inset-bottom))] z-[80] flex min-h-12 items-center gap-2 rounded-full bg-[#168b62] px-4 py-3 text-sm font-bold text-white shadow-[0_10px_26px_rgba(10,75,53,.28)] transition hover:bg-[#107650] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#168b62] sm:right-6 sm:bottom-[calc(6rem+env(safe-area-inset-bottom))]"
    >
      <Icon name="MessageCircle" className="size-5" aria-hidden />
      <span>WhatsApp</span>
    </a>
  );
}
