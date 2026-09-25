import Image from "next/image";
import Link from "next/link";
import type { MenuProduct } from "@/domain/entities";
import { routes } from "@/lib/routes";
import { resolveText } from "@/lib/i18n/locales";
import { formatPrice } from "@/lib/utils";
import { Icon } from "@/components/shared/icon";
import { StatusBadge } from "@/components/shared/status-badge";

interface MenuProductCardProps {
  restaurantSlug: string;
  product: MenuProduct;
  /** Show a "Popular" flag for featured items. */
  showFeatured?: boolean;
}

/**
 * Image-led product card linking to the product detail page. No add-to-cart —
 * this is a digital menu, not a checkout.
 */
export function MenuProductCard({
  restaurantSlug,
  product,
  showFeatured = true,
}: MenuProductCardProps) {
  const name = resolveText(product.localizedName, "en");
  const description = resolveText(product.localizedDescription, "en");
  const imageSrc =
    product.image && (product.image.startsWith("/") || product.image.startsWith("http"))
      ? product.image
      : "/placeholders/food.svg";

  return (
    <Link
      href={routes.restaurant.product(restaurantSlug, product.slug)}
      className="group border-border bg-canvas shadow-card hover:bg-surface focus-visible:outline-primary flex gap-4 rounded-[16px] border p-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <div className="bg-surface-container relative size-24 shrink-0 overflow-hidden rounded-[12px]">
        <Image
          src={imageSrc}
          alt={name}
          width={96}
          height={96}
          className="size-full object-cover"
        />
        {showFeatured && product.featured ? (
          <span className="bg-primary absolute top-1 left-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white uppercase">
            Popular
          </span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-text-primary text-[17px] font-bold">{name}</h3>
          </div>
          {description ? (
            <p className="text-small text-text-secondary mt-0.5 line-clamp-2">{description}</p>
          ) : null}
          {product.dietaryLabels.length > 0 ? (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {product.dietaryLabels.map((label) => (
                <span
                  key={label}
                  className="bg-success/10 text-success rounded-full px-2 py-0.5 text-[11px] font-semibold"
                >
                  {label}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="font-body text-body text-primary font-semibold">
            {formatPrice(product.price, product.currency)}
          </span>
          <div className="flex items-center gap-2">
            {product.availability !== "available" ? (
              <StatusBadge group="availability" value={product.availability} />
            ) : null}
            <Icon
              name="ChevronRight"
              className="text-text-secondary size-5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
