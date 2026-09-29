export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/19546811177"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="floating-whatsapp group fixed right-5 z-[100] flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_26px_rgba(17,91,46,.32)] ring-2 ring-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#168c47] sm:right-7"
    >
      <svg viewBox="0 0 32 32" fill="none" className="size-8" aria-hidden="true">
        <path d="M16 3.5a12 12 0 0 0-10.2 18.3L4.2 28l6.4-1.7A12 12 0 1 0 16 3.5Z" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
        <path d="M11.3 9.7c-.4-.8-.8-.8-1.2-.8-.6 0-1.3.7-1.3 1.8 0 3.2 5.4 8.6 8.7 8.6 1.1 0 2-.8 2-1.5 0-.3-.2-.6-.6-.8l-2.1-.9c-.4-.2-.7-.1-1 .3l-.8.9c-1.5-.7-3.1-2.3-3.8-3.8l.9-.8c.4-.3.5-.6.3-1l-.9-2.1Z" fill="currentColor" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 hidden rounded-lg bg-[#14344a] px-3 py-2 text-xs font-bold whitespace-nowrap text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">Chat on WhatsApp</span>
    </a>
  );
}
