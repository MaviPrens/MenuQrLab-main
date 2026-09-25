import { cn } from "@/lib/utils";

/** Centered page container at the design's max content width. */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("max-w-page mx-auto w-full px-5 md:px-8", className)} {...props} />;
}
