import Image from "next/image";
import Link from "next/link";
import type { CustomerAction, MenuProduct } from "@/domain/entities";
import { routes } from "@/lib/routes";
import { resolveText } from "@/lib/i18n/locales";
import { formatPrice, cn } from "@/lib/utils";
import { Icon } from "@/components/shared/icon";
import { StatusBadge } from "@/components/shared/status-badge";
import { resolveActionLink } from "./action-link";

interface ProductDetailProps {
  restaurantSlug: string;
  product: MenuProduct;
  /** Configured customer actions, used for Call Order + Online Order links. */
  actions: CustomerAction[];
}

/**
 * Product detail content: image, identity, price, description, variants,
 * dietary/allergen info and the two appropriate actions (Call Order + external
 * Online Order). No add-to-cart — this is a digital menu, not a checkout.
 */
export function ProductDetail({ restaurantSlug, product, actions }: ProductDetailProps) {
  const name = resolveText(product.localizedName, "en");
  const description = resolveText(product.localizedDescription, "en");
  const imageSrc =
    product.image && (product.image.startsWith("/") || product.image.startsWith("http"))
      ? product.image
      : "/placeholders/food.svg";

  const callAction = actions.find((a) => a.enabled && a.type === "call-order");
  const onlineAction = actions.find((a) => a.enabled && a.type === "online-order");
  const callLink = callAction ? resolveActionLink(callAction) : null;
  const onlineLink = onlineAction ? resolveActionLink(onlineAction) : null;

  return (
    <article className="flex flex-col">
      <Link
        href={routes.restaurant.menu(restaurantSlug)}
        className="text-button text-primary focus-visible:outline-primary mb-4 inline-flex items-center gap-1.5 font-bold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Icon name="ArrowLeft" className="size-4" aria-hidden />
        Back to menu
      </Link>

      <div className="border-border bg-surface-container relative h-[260px] w-full overflow-hidden rounded-[16px] border">
        <Image
          src={imageSrc}
          alt={name}
          width={640}
          height={260}
          priority
          className="size-full object-cover"
        />
      </div>

      <div className="mt-5">
        <div className="text-small text-text-secondary flex items-center gap-2">
          {product.availability !== "available" ? (
            <StatusBadge group="availability" value={product.availability} />
          ) : (
            <span className="text-success inline-flex items-center gap-1.5">
              <Icon name="CheckCircle2" className="size-4" aria-hidden />
              Available
            </span>
          )}
        </div>

        <h1 className="font-display text-h1 text-text-primary mt-2 font-extrabold tracking-tight">
          {name}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {product.featured ? (
            <span className="bg-primary/10 text-small text-primary rounded-full px-3 py-1 font-semibold">
              Popular
            </span>
          ) : null}
          {product.dietaryLabels.map((label) => (
            <span
              key={label}
              className="bg-success/10 text-small text-success rounded-full px-3 py-1 font-semibold"
            >
              {label}
            </span>
          ))}
        </div>

        <p className="font-heading text-h2 text-primary mt-4 font-bold">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>

      {description ? (
        <section className="mt-6">
          <h2 className="font-heading text-h3 text-text-primary font-bold">About this dish</h2>
          <p className="text-body text-text-secondary mt-2">{description}</p>
        </section>
      ) : null}

      {product.variants.length > 0 ? (
        <section className="mt-6">
          <h2 className="font-heading text-h3 text-text-primary font-bold">Available sizes</h2>
          <ul className="mt-3 grid grid-cols-2 gap-3">
            {product.variants.map((variant) => (
              <li
                key={variant.id}
                className="border-border bg-canvas flex flex-col rounded-[12px] border p-4"
              >
                <span className="text-body text-text-primary font-semibold">{variant.label}</span>
                <span className="text-body text-text-secondary mt-1">
                  {formatPrice(product.price + variant.priceModifier, product.currency)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {product.allergenNote ? (
        <section className="border-outline-variant bg-surface-warm mt-6 rounded-[16px] border p-4">
          <h2 className="font-heading text-body text-primary-dark flex items-center gap-2 font-bold">
            <Icon name="Info" className="size-5" aria-hidden />
            Dietary &amp; allergen information
          </h2>
          <p className="text-small text-text-secondary mt-2">{product.allergenNote}</p>
          {callLink?.href ? (
            <a
              href={callLink.href}
              className="border-primary text-button text-primary hover:bg-primary/5 focus-visible:outline-primary mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] border px-4 font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Icon name="Phone" className="size-5" aria-hidden />
              Call for allergen details
            </a>
          ) : null}
        </section>
      ) : null}

      <section className="mt-6 flex flex-col gap-3">
        {onlineLink?.href ? (
          <a
            href={onlineLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-button shadow-card hover:bg-primary-dark focus-visible:outline-primary flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[12px] px-5 font-bold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Online Order with Pay
            <Icon name="ExternalLink" className="size-5" aria-hidden />
          </a>
        ) : null}
        {callLink?.href ? (
          <a
            href={callLink.href}
            className="bg-navy text-button hover:bg-navy-deep focus-visible:outline-primary flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[12px] px-5 font-bold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Icon name="Phone" className="size-5" aria-hidden />
            Call Order
          </a>
        ) : null}
      </section>

      <div
        className={cn(
          "border-border bg-surface mt-8 flex items-center justify-between gap-3 rounded-[16px] border p-4",
        )}
      >
        <div className="flex items-center gap-3">
          <span className="border-primary/20 bg-primary/10 text-primary flex size-11 items-center justify-center rounded-full border">
            <Icon name="UtensilsCrossed" className="size-5" aria-hidden />
          </span>
          <p className="font-heading text-body text-text-primary font-bold">Back to full menu</p>
        </div>
        <Link
          href={routes.restaurant.menu(restaurantSlug)}
          className="border-border bg-canvas text-small text-text-primary hover:bg-surface-container focus-visible:outline-primary rounded-[10px] border px-4 py-2 font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          View menu
        </Link>
      </div>
    </article>
  );
}
