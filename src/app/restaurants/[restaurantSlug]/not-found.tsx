import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export default function RestaurantNotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <span className="bg-surface-container text-text-secondary flex size-14 items-center justify-center rounded-full">
        <Icon name="SearchX" className="size-7" aria-hidden />
      </span>
      <h1 className="font-heading text-h2 text-text-primary font-bold">
        We couldn&apos;t find that
      </h1>
      <p className="text-body text-text-secondary max-w-md">
        This restaurant, menu item or campaign doesn&apos;t exist or may have been moved.
      </p>
      <Button asChild>
        <Link href={routes.marketing.home()}>Back to home</Link>
      </Button>
    </Container>
  );
}
