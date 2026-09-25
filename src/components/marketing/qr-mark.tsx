import QRCode from "qrcode";
import { appConfig } from "@/lib/config/app-config";
import { routes } from "@/lib/routes";

/**
 * Real, scannable QR code for the hero's "QR card" overlay — fixed destination
 * (the live demo restaurant page), not a public QR generator. Server-rendered
 * SVG from a hardcoded URL, so injecting it as markup is safe.
 */
export async function QrMark({ className }: { className?: string }) {
  const target = `${appConfig.baseUrl}${routes.restaurant.home("pizza-house")}`;
  const svg = await QRCode.toString(target, {
    type: "svg",
    margin: 0,
    width: 108,
    errorCorrectionLevel: "M",
    color: { dark: "#141414", light: "#0000" },
  });
  return (
    <div className={className}>
      <div className="h-[108px] w-[108px]" dangerouslySetInnerHTML={{ __html: svg }} />
      <div className="mt-[9px] text-center font-mql-mono text-[8px] font-medium tracking-[0.12em] text-mql-text-accent uppercase">
        Scan
      </div>
    </div>
  );
}
