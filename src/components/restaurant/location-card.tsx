import type { RestaurantLocation } from "@/domain/entities";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

interface LocationCardProps {
  location: RestaurantLocation | null;
  /** Optional map destination from a configured "Visit Us" action. */
  mapActionUrl?: string | null;
  className?: string;
}

/** Build a readable, multi-line address from the available fields. */
function addressLines(location: RestaurantLocation): string[] {
  const lines: string[] = [];
  if (location.address) lines.push(location.address);
  const cityLine = [location.district, location.city, location.postalCode]
    .filter(Boolean)
    .join(", ");
  if (cityLine) lines.push(cityLine);
  if (location.country) lines.push(location.country);
  return lines;
}

/** Build a maps URL. Prefer explicit mapUrl, then coordinates, then address. */
function resolveMapUrl(
  location: RestaurantLocation | null,
  mapActionUrl?: string | null,
): string | null {
  if (location?.mapUrl) return location.mapUrl;
  if (location && location.latitude !== null && location.longitude !== null) {
    return `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
  }
  if (mapActionUrl) return mapActionUrl;
  if (location) {
    const query = addressLines(location).join(", ");
    if (query) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    }
  }
  return null;
}

/**
 * Address + "Open in Maps". When coordinates are present we show a static map
 * preview; when they're missing we deliberately do NOT fabricate a map — we
 * show the address and an "Open in Maps" link only.
 */
export function LocationCard({ location, mapActionUrl, className }: LocationCardProps) {
  if (!location) {
    return (
      <div
        className={cn(
          "border-border bg-canvas text-small text-text-secondary shadow-card rounded-[16px] border p-5",
          className,
        )}
      >
        Location to be confirmed.
      </div>
    );
  }

  const lines = addressLines(location);
  const mapUrl = resolveMapUrl(location, mapActionUrl);
  const hasCoords = location.latitude !== null && location.longitude !== null;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {hasCoords ? (
        <a
          href={mapUrl ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border bg-surface-container focus-visible:outline-primary relative flex h-[180px] items-center justify-center overflow-hidden rounded-[16px] border focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label="Open location in Maps"
        >
          <span className="text-primary flex flex-col items-center gap-1">
            <Icon name="MapPin" className="size-10" aria-hidden />
            <span className="text-small text-text-secondary font-semibold">
              {[location.district, location.city].filter(Boolean).join(", ")}
            </span>
          </span>
        </a>
      ) : null}

      <div className="border-border bg-canvas shadow-card rounded-[16px] border p-5">
        <h3 className="font-heading text-h3 text-text-primary flex items-center gap-2 font-bold">
          <Icon name="MapPin" className="text-primary size-5" aria-hidden />
          Address
        </h3>
        {lines.length > 0 ? (
          <address className="text-body text-text-secondary mt-2 not-italic">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        ) : (
          <p className="text-small text-text-secondary mt-2">Address to be confirmed.</p>
        )}
      </div>

      {mapUrl ? (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-button shadow-card hover:bg-primary-dark focus-visible:outline-primary flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[12px] px-5 font-bold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Icon name="Navigation" className="size-5" aria-hidden />
          Open in Maps
        </a>
      ) : null}
    </div>
  );
}
