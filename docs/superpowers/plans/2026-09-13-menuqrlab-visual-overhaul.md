# MenuQrLab Visual Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recreate the "MenuQrLab Visual Overhaul" design handoff — a flat, orange-led, zero-radius/zero-shadow editorial visual system — on the Home, How It Works, Features, Packages and FAQ pages plus the shared header/footer, without changing IA, copy, routes, or any other surface (admin, restaurant experiences, or the other marketing pages).

**Architecture:** Additive design tokens (new `--color-mql-*` / `--font-mql-*` keys in `globals.css`, three new self-hosted font families) plus a set of new/rewritten **marketing-only** components. Components already shared with out-of-scope pages (`CtaSection`, `FeatureCard`, `SectionHeading`, `SectionDivider`, `Container`, everything in `src/components/ui`) are left completely untouched; new dedicated components (`Mql*`) are added instead so the blast radius never reaches admin, restaurant, or the not-yet-redesigned marketing pages (About, Contact, Templates, Restaurant Examples, legal pages).

**Tech Stack:** Next.js 16 App Router (Server Components by default), React 19, TypeScript strict, Tailwind CSS v4 (`@theme`, arbitrary-value utilities), `next/font/local` (self-hosted Fontsource woff2), the existing `qrcode` package for a real server-rendered QR code.

**Spec:** `_design-overhaul/design_handoff_menuqrlab_visual_overhaul/README.md` (design tokens, copy tables, screen-by-screen layout, interaction spec) and `_design-overhaul/design_handoff_menuqrlab_visual_overhaul/MenuQrLab Home.dc.html` (exact reference markup/CSS for all five pages + header/footer). Both files are already extracted from the user's supplied zip, sitting next to this repo at `../_design-overhaul/`. Read the relevant section of the README before each task below — this plan restates the numbers you need, but the README is the tie-breaker if anything looks ambiguous.

## Global Constraints

- **Visual-only**, with two deliberate, flagged exceptions: the header keeps the language selector (dropping it would regress i18n on every marketing page, contradicting "IA unchanged" — the handoff simply didn't model it) and drops the redundant "View Demo" header button (present nowhere in the handoff's header, and already reachable from the hero and every closing band). The FAQ's interaction model also changes from click-to-expand accordion to always-visible filtered rows — that one is **not** a deviation, it's exactly what the handoff specifies (see Task 13). Do not make any other content/behavior change.
- **Zero radius, zero shadow, everywhere in the new system.** Never add a `rounded-*` or `shadow-*` class in any new/rewritten file in this plan.
- **Do not modify:** `src/components/ui/*` (Button, Badge, Card, Input, Toast), `src/components/shared/container.tsx`, `src/components/shared/section-heading.tsx`, `src/components/shared/section-divider.tsx`, `src/components/marketing/cta-section.tsx`, `src/components/marketing/feature-card.tsx`, `src/components/marketing/examples-grid.tsx`, `src/components/marketing/template-card.tsx`, any `src/app/(marketing)/{about,contact,templates,restaurant-examples,privacy,cookies,terms,campaign-terms}/page.tsx`, and nothing under `src/app/admin` or `src/app/restaurants`. These are shared with pages outside this redesign's scope; touching them regresses pages nobody asked to change.
- **Colors** (add as new root `@theme` tokens in `src/app/globals.css`, never overwrite the existing `--color-primary`/`--color-navy`/etc. used by admin + the old marketing theme):
  | Token | Hex/value |
  |---|---|
  | `--color-mql-ink` | `#141414` |
  | `--color-mql-body` | `#4A4A4A` |
  | `--color-mql-secondary` | `#555555` |
  | `--color-mql-muted` | `#6B6B6B` |
  | `--color-mql-surface-alt` | `#F5F5F4` |
  | `--color-mql-surface-hover` | `#ECECEB` |
  | `--color-mql-tint` | `#FFF3EC` |
  | `--color-mql-graphic` | `#E8541F` (graphic elements only — 3.67:1, fails AA for text) |
  | `--color-mql-text-accent` | `#C4400F` (any small/orange text, incl. white-on-fill) |
  | `--color-mql-on-dark` | `#FF7A33` |
  | `--color-mql-dark-text` | `#D4D4D4` |
  | `--color-mql-hairline` | `rgba(20,20,20,.14)` |
  | `--color-mql-hairline-strong` | `rgba(20,20,20,.28)` |
  | `--color-mql-hairline-light` | `rgba(20,20,20,.12)` |
  | `--color-mql-hairline-grid` | `rgba(20,20,20,.16)` |
  | `--color-mql-outline` | `rgba(20,20,20,.34)` |
  | `--color-mql-scrim` | `rgba(20,20,20,.86)` |
  | `--color-mql-on-dark-border` | `rgba(255,255,255,.40)` |
  | `--color-mql-on-dark-hover` | `rgba(255,255,255,.10)` |
- **Fonts:** Archivo 400/500/600/700 (display/headings), Hanken Grotesk variable 300–800 (body/buttons/nav), JetBrains Mono 400/500/600 (eyebrows/numerals/labels). Self-hosted via `next/font/local` — never `next/font/google` (CLAUDE.md invariant; offline/CI builds). Files are already vendored at `src/app/fonts/{archivo,jetbrains-mono}-latin-{weight}-normal.woff2` and `src/app/fonts/hanken-grotesk-latin-wght-normal.woff2` (done — see Task 1). Headings use `font-weight: 640` (write as Tailwind arbitrary `font-[640]`; the browser auto-resolves to the nearest loaded static weight, 600).
- **Container:** new pages use `mx-auto w-full max-w-[1240px] px-8` (not the shared `Container`, which is 1280px/responsive-padding and used by out-of-scope pages). The FAQ page narrows to `max-w-[1000px]`.
- **Scroll reveal.** Major blocks (Home's "Four Essential Actions" section + closing band; the How It Works step list; the Features grid; the Packages grid) fade+rise into view once, via a shared `ScrollReveal` client component (Task 6) — not per-page reimplementations. Blocks already on-screen at load render visible immediately; a ~1.2s safety timeout force-reveals anything an observer might miss; `prefers-reduced-motion: reduce` skips the animation entirely. The Home hero, capability strip, and every FAQ row are **not** revealed (visible immediately) — matches the handoff exactly.
- **Photography.** No new photography was supplied — the handoff explicitly flags this as required follow-up. Reuse existing checked-in demo-restaurant photos as placeholders (tell the user in the final summary that these should be swapped for real MenuQrLab photography later):
  | Slot | File |
  |---|---|
  | Home hero scene | `/images/restaurants/pizza-house/category-pizzas.jpg` |
  | Home hero dish (menu card) | `/images/restaurants/pizza-house/cover.jpg` |
  | Home closing band | `/images/restaurants/pizza-house/category-pizzas.jpg` |
  | How It Works closing band | `/images/restaurants/anatolia-grill/cover.jpg` |
  | Features closing band | `/images/restaurants/bosphorus-kitchen/cover.jpg` |
  | Features grid photo tile | `/images/restaurants/pizza-house/cover.jpg` |
  | Packages closing band | `/images/restaurants/green-bowl/cover.jpg` |
  | FAQ closing band | `/images/restaurants/cafe-mimoza/cover.jpg` |
- **QR code.** Render a real one with the already-installed `qrcode` package (do not add a new dependency, do not reuse the admin-only `/api/qr-artwork` route — that stays gated). Fixed destination only (the demo restaurant's live URL) — this is decoration, not the forbidden "public QR generator" feature.
- **Verification approach for this plan.** This is a presentational rewrite with no existing unit tests over these components and a loose e2e suite (`e2e/public.spec.ts` only asserts: each marketing route returns 200 with a visible `h1` and zero console errors; a nav link literally named "Features" routes to `/features`; cookie consent persists — unaffected by this work). There is nothing here worth writing new unit tests for (no logic beyond the FAQ filter and the reveal observer, both direct ports of already-specified, already-deterministic behavior). So "test" in each task below means, in order: (1) `pnpm typecheck` and `pnpm lint` clean, (2) load the page in the dev server via the Browser tool and visually diff it against the relevant section of the README, (3) at the end of the plan, run `pnpm test:e2e -- public.spec.ts` and `pnpm build` for a full gate. **Use `npx --yes pnpm@10 <cmd>` for every command** — there is no global `pnpm` binary or corepack shim permission in this environment; `npx --yes pnpm@10 install` has already been run once and `node_modules` exists.
- Dependencies already added and vendored (done, no action needed): `@fontsource/archivo`, `@fontsource/jetbrains-mono`, `@fontsource-variable/hanken-grotesk` in `package.json`; their latin woff2 files copied into `src/app/fonts/`.

---

### Task 1: Design tokens + font registration

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/lib/fonts.ts`
- (Already done — verify only) `src/app/fonts/archivo-latin-{400,500,600,700}-normal.woff2`, `src/app/fonts/jetbrains-mono-latin-{400,500,600}-normal.woff2`, `src/app/fonts/hanken-grotesk-latin-wght-normal.woff2`

**Interfaces:**
- Produces: CSS custom properties `--color-mql-*` and `--font-mql-display` / `--font-mql-body` / `--font-mql-mono` (consumed by every component in Tasks 2–13 as `bg-mql-*`/`text-mql-*`/`border-mql-*`/`font-mql-*` Tailwind utilities). Produces font exports `archivo`, `hankenGrotesk`, `jetbrainsMono` from `src/lib/fonts.ts` and an updated `fontVariables` string (consumed by nothing else — `src/app/layout.tsx` already spreads `fontVariables` onto `<html>` and needs no edit).

- [ ] **Step 1: Confirm the vendored font files are present**

Run: `ls src/app/fonts/`
Expected: alongside the existing `inter-*` and `manrope-*` files, you see `archivo-latin-400-normal.woff2`, `archivo-latin-500-normal.woff2`, `archivo-latin-600-normal.woff2`, `archivo-latin-700-normal.woff2`, `jetbrains-mono-latin-400-normal.woff2`, `jetbrains-mono-latin-500-normal.woff2`, `jetbrains-mono-latin-600-normal.woff2`, `hanken-grotesk-latin-wght-normal.woff2`. If any are missing, copy them from `node_modules/@fontsource/archivo/files/`, `node_modules/@fontsource/jetbrains-mono/files/`, and `node_modules/@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2` respectively (run `npx --yes pnpm@10 add "@fontsource/archivo@^5" "@fontsource/jetbrains-mono@^5" "@fontsource-variable/hanken-grotesk@^5"` first if those packages aren't in `node_modules`).

- [ ] **Step 2: Add font exports to `src/lib/fonts.ts`**

Add these three exports (after the existing `inter` export) and update `fontVariables`:

```ts
export const archivo = localFont({
  variable: "--font-archivo",
  display: "swap",
  src: [
    { path: "../app/fonts/archivo-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/archivo-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/archivo-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../app/fonts/archivo-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

export const hankenGrotesk = localFont({
  variable: "--font-hanken-grotesk",
  display: "swap",
  src: [
    {
      path: "../app/fonts/hanken-grotesk-latin-wght-normal.woff2",
      weight: "300 800",
      style: "normal",
    },
  ],
});

export const jetbrainsMono = localFont({
  variable: "--font-jetbrains-mono",
  display: "swap",
  src: [
    { path: "../app/fonts/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/jetbrains-mono-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

export const fontVariables = `${manrope.variable} ${inter.variable} ${archivo.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`;
```

- [ ] **Step 3: Add the new theme tokens to `src/app/globals.css`**

Inside the existing `@theme { ... }` block, after the `--gradient-warm` declaration (still before the closing `}`), add:

```css
  /* ---- MQL flat redesign tokens (Home/How-it-Works/Features/Packages/FAQ + header/footer) ----
     Additive only — never repurpose --color-primary/--color-navy/etc above, those still drive
     admin, the restaurant experience, and the marketing pages this redesign does not cover
     (About, Contact, Templates, Restaurant Examples, legal pages). See docs/DESIGN_SYSTEM.md. */
  --color-mql-ink: #141414;
  --color-mql-body: #4a4a4a;
  --color-mql-secondary: #555555;
  --color-mql-muted: #6b6b6b;
  --color-mql-surface-alt: #f5f5f4;
  --color-mql-surface-hover: #ececeb;
  --color-mql-tint: #fff3ec;
  --color-mql-graphic: #e8541f;
  --color-mql-text-accent: #c4400f;
  --color-mql-on-dark: #ff7a33;
  --color-mql-dark-text: #d4d4d4;
  --color-mql-hairline: rgba(20, 20, 20, 0.14);
  --color-mql-hairline-strong: rgba(20, 20, 20, 0.28);
  --color-mql-hairline-light: rgba(20, 20, 20, 0.12);
  --color-mql-hairline-grid: rgba(20, 20, 20, 0.16);
  --color-mql-outline: rgba(20, 20, 20, 0.34);
  --color-mql-scrim: rgba(20, 20, 20, 0.86);
  --color-mql-on-dark-border: rgba(255, 255, 255, 0.4);
  --color-mql-on-dark-hover: rgba(255, 255, 255, 0.1);

  --font-mql-display: var(--font-archivo), ui-sans-serif, system-ui, sans-serif;
  --font-mql-body: var(--font-hanken-grotesk), ui-sans-serif, system-ui, sans-serif;
  --font-mql-mono: var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, monospace;
```

- [ ] **Step 4: Verify it compiles**

Run: `npx --yes pnpm@10 typecheck`
Expected: no errors (this step only touches CSS + a data file, but confirms nothing else broke).

Run: `npx --yes pnpm@10 dev` in the background (via the Browser tool's `preview_start`, not a raw terminal — see Task 14 for the full visual-check workflow), then in the browser devtools/console run `getComputedStyle(document.documentElement).getPropertyValue('--color-mql-ink')`.
Expected: returns `#141414`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/fonts.ts src/app/globals.css src/app/fonts/archivo-latin-400-normal.woff2 src/app/fonts/archivo-latin-500-normal.woff2 src/app/fonts/archivo-latin-600-normal.woff2 src/app/fonts/archivo-latin-700-normal.woff2 src/app/fonts/jetbrains-mono-latin-400-normal.woff2 src/app/fonts/jetbrains-mono-latin-500-normal.woff2 src/app/fonts/jetbrains-mono-latin-600-normal.woff2 src/app/fonts/hanken-grotesk-latin-wght-normal.woff2 package.json pnpm-lock.yaml
git commit -m "feat(marketing): add MQL flat design tokens and self-hosted Archivo/Hanken Grotesk/JetBrains Mono"
```

---

### Task 2: `BrandLogo` rewrite

**Files:**
- Modify: `src/components/marketing/brand-logo.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils`.
- Produces: `BrandLogo({ size?: "header" | "footer"; className?: string })` — a two-tone "Menu"/"QrLab" wordmark with a 1px underline rule beneath it. Consumed by Task 7 (`public-header.tsx`, wrapped in a `Link`) and Task 8 (`public-footer.tsx`, unwrapped, `size="footer"`).

- [ ] **Step 1: Replace the file contents**

```tsx
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  /** 23px in the header, 21px in the footer. */
  size?: "header" | "footer";
  className?: string;
}

/** Two-tone "Menu"/"QrLab" wordmark with a letterhead-style underline rule. */
export function BrandLogo({ size = "header", className }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex flex-col items-start gap-[5px]", className)}>
      <span
        className={cn(
          "font-mql-display leading-none font-bold tracking-[0.015em] text-mql-ink",
          size === "header" ? "text-[23px]" : "text-[21px]",
        )}
      >
        Menu<span className="text-mql-text-accent">QrLab</span>
      </span>
      <span className="block h-px w-full bg-mql-hairline-strong" />
    </span>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx --yes pnpm@10 typecheck`
Expected: no errors from this file (header/footer will still reference the old props until Tasks 7–8 land — that's fine, `size` defaults and the old `tone` prop is simply gone, so this step will show type errors in `public-header.tsx`/`public-footer.tsx` until those tasks run; confirm the *only* errors are in those two files).

- [ ] **Step 3: Commit**

```bash
git add src/components/marketing/brand-logo.tsx
git commit -m "feat(marketing): flat two-tone BrandLogo wordmark"
```

---

### Task 3: `QrMark` (new) — real server-rendered QR code

**Files:**
- Create: `src/components/marketing/qr-mark.tsx`

**Interfaces:**
- Consumes: `qrcode` (already a dependency), `appConfig.baseUrl` from `@/lib/config/app-config`, `routes.restaurant.home` from `@/lib/routes`.
- Produces: `async function QrMark({ className }: { className?: string })` — an async Server Component rendering the QR card. Consumed by Task 9 (`hero.tsx`).

- [ ] **Step 1: Create the file**

```tsx
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
```

- [ ] **Step 2: Typecheck**

Run: `npx --yes pnpm@10 typecheck`
Expected: no errors (file isn't imported anywhere yet, but should still type-check standalone).

- [ ] **Step 3: Commit**

```bash
git add src/components/marketing/qr-mark.tsx
git commit -m "feat(marketing): add QrMark, a real server-rendered QR code for the hero"
```

---

### Task 4: `MenuCardPreview` (new) — hero's floating "Table 12 / Pizza House" card

**Files:**
- Create: `src/components/marketing/menu-card-preview.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils`, `next/image`.
- Produces: `function MenuCardPreview()` — absolutely positioned card (assumes a `position: relative` ancestor). Consumed by Task 9 (`hero.tsx`).

- [ ] **Step 1: Create the file**

```tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

const ACTION_ROWS = ["Call Order", "Pick Your Meal", "Online Order", "Visit Us"];

/** The hero's floating restaurant-menu-card visual: table label, dish photo, 4 tap rows. */
export function MenuCardPreview() {
  return (
    <div className="absolute right-[-6px] bottom-[34px] w-[min(236px,44%)] border border-[rgba(20,20,20,.22)] bg-white">
      <div className="border-b border-mql-hairline px-4 pt-4 pb-[13px] text-center">
        <div className="mb-[7px] font-mql-mono text-[8.5px] font-medium tracking-[0.14em] text-mql-text-accent uppercase">
          Table 12
        </div>
        <div className="font-mql-display text-[17px] leading-[1.15] font-bold text-mql-ink">
          Pizza House
        </div>
      </div>
      <div className="relative h-[104px] border-b border-mql-hairline">
        <Image
          src="/images/restaurants/pizza-house/cover.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="236px"
        />
      </div>
      <div className="px-[14px] pt-[6px] pb-[14px]">
        {ACTION_ROWS.map((label, index) => (
          <div
            key={label}
            className={cn(
              "flex items-baseline gap-2 py-[10px]",
              index < ACTION_ROWS.length - 1 && "border-b border-[rgba(20,20,20,.10)]",
            )}
          >
            <span className="font-mql-body text-[12.5px] font-medium text-mql-ink">{label}</span>
            <span className="-translate-y-[3px] flex-1 border-b border-mql-hairline" />
            <span className="font-mql-mono text-[8.5px] font-medium tracking-[0.08em] text-mql-text-accent">
              TAP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx --yes pnpm@10 typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/marketing/menu-card-preview.tsx
git commit -m "feat(marketing): add MenuCardPreview, the hero's floating menu-card visual"
```

---

### Task 5: Shared section-header building blocks (`MqlPageHeader`, `MqlSectionIntro`, `MqlClosingBand`)

**Files:**
- Create: `src/components/marketing/mql-page-header.tsx`
- Create: `src/components/marketing/mql-section-intro.tsx`
- Create: `src/components/marketing/mql-closing-band.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils`, `next/link`, `next/image`.
- Produces: `MqlPageHeader({ eyebrow, title, titleMaxWidth?, description?, descriptionMaxWidth? })` (interior page H1 block — used by Tasks 10–13). `MqlSectionIntro({ numeral, eyebrow, title, description })` (two-column numbered section header — used by Task 9, Home's "Four Essential Actions"). `MqlClosingBand({ size?: "home" | "interior", image: {src, alt}, eyebrow?, title, description, primary: {label, href}, secondary?: {label, href} })` (dark full-bleed CTA band with photo + scrim — used by Tasks 9–13, replacing `CtaSection` on these five pages only).

- [ ] **Step 1: Create `mql-page-header.tsx`**

```tsx
interface MqlPageHeaderProps {
  eyebrow: string;
  title: string;
  /** CSS max-width value, e.g. "22em" — per-page, so passed as inline style. */
  titleMaxWidth?: string;
  description?: string;
  descriptionMaxWidth?: string;
}

/** Interior-page header: eyebrow rule, H1, optional lead paragraph. */
export function MqlPageHeader({
  eyebrow,
  title,
  titleMaxWidth,
  description,
  descriptionMaxWidth,
}: MqlPageHeaderProps) {
  return (
    <div>
      <div className="mb-[26px] flex items-center gap-[14px]">
        <span className="block h-px w-[34px] bg-mql-graphic" />
        <span className="font-mql-mono text-[11px] font-medium tracking-[0.12em] text-mql-text-accent uppercase">
          {eyebrow}
        </span>
      </div>
      <h1
        style={titleMaxWidth ? { maxWidth: titleMaxWidth } : undefined}
        className="font-mql-display text-[clamp(2.3rem,4.4vw,3.7rem)] font-[640] leading-[1.06] tracking-[-0.012em] text-mql-ink [text-wrap:pretty]"
      >
        {title}
      </h1>
      {description ? (
        <p
          style={descriptionMaxWidth ? { maxWidth: descriptionMaxWidth } : undefined}
          className="mt-6 font-mql-body text-[1.06rem] leading-[1.64] text-mql-body"
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: Create `mql-section-intro.tsx`**

```tsx
interface MqlSectionIntroProps {
  numeral: string;
  eyebrow: string;
  title: string;
  description: string;
}

/** Two-column numbered section header (numeral + rule + eyebrow + H2 / lead paragraph). */
export function MqlSectionIntro({ numeral, eyebrow, title, description }: MqlSectionIntroProps) {
  return (
    <div className="mb-[clamp(40px,4vw,60px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-10">
      <div>
        <div className="mb-6 flex items-center gap-[14px]">
          <span className="font-mql-mono text-[12px] tracking-[0.08em] text-mql-text-accent">
            {numeral}
          </span>
          <span className="block h-px w-[26px] bg-[rgba(20,20,20,.30)]" />
          <span className="font-mql-mono text-[11px] font-medium tracking-[0.12em] text-mql-text-accent uppercase">
            {eyebrow}
          </span>
        </div>
        <h2 className="font-mql-display text-[clamp(2rem,3.6vw,3.05rem)] font-[640] leading-[1.08] tracking-[-0.01em] text-mql-ink [text-wrap:pretty]">
          {title}
        </h2>
      </div>
      <p className="max-w-[32em] font-mql-body text-[1.02rem] leading-[1.66] text-mql-body [text-wrap:pretty]">
        {description}
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Create `mql-closing-band.tsx`**

```tsx
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BandCta {
  label: string;
  href: string;
}

interface MqlClosingBandProps {
  /** "home" gets the eyebrow row and the larger vertical rhythm; "interior" (default) omits it. */
  size?: "home" | "interior";
  image: { src: string; alt: string };
  eyebrow?: string;
  title: string;
  description: string;
  primary: BandCta;
  secondary?: BandCta;
}

/** Full-bleed dark CTA band: photo at low opacity under a flat dark scrim. */
export function MqlClosingBand({
  size = "interior",
  image,
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: MqlClosingBandProps) {
  const home = size === "home";
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-mql-ink",
        home ? "mt-[clamp(64px,7vw,110px)]" : "mt-[clamp(64px,7vw,104px)]",
      )}
    >
      <div className={cn("absolute inset-0", home ? "opacity-30" : "opacity-[0.28]")}>
        <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-mql-scrim" />
      <div
        className={cn(
          "relative mx-auto w-full max-w-[1240px] px-8",
          home ? "py-[clamp(72px,8vw,128px)]" : "py-[clamp(64px,7vw,108px)]",
        )}
      >
        <div className={home ? "max-w-[46rem]" : undefined}>
          {home && eyebrow ? (
            <div className="mb-[26px] flex items-center gap-[14px]">
              <span className="block h-px w-[34px] bg-mql-on-dark" />
              <span className="font-mql-mono text-[11px] font-medium tracking-[0.12em] text-mql-dark-text uppercase">
                {eyebrow}
              </span>
            </div>
          ) : null}
          <h2
            className={cn(
              "font-mql-display font-[640] text-white [text-wrap:pretty]",
              home
                ? "text-[clamp(2rem,4vw,3.4rem)] leading-[1.07] tracking-[-0.01em]"
                : "max-w-[28em] text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.08]",
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "max-w-[32em] font-mql-body text-mql-dark-text",
              home ? "mt-6 text-[1.08rem] leading-[1.62]" : "mt-[22px] text-[1.06rem] leading-[1.6]",
            )}
          >
            {description}
          </p>
          <div className={cn("flex flex-wrap gap-[14px]", home ? "mt-[38px]" : "mt-[34px]")}>
            <Link
              href={primary.href}
              className="border border-white bg-white px-[30px] py-[19px] font-mql-body text-[11.5px] font-bold tracking-[0.16em] text-mql-ink uppercase transition-colors hover:border-mql-on-dark hover:bg-mql-on-dark"
            >
              {primary.label}
            </Link>
            {secondary ? (
              <Link
                href={secondary.href}
                className="border border-mql-on-dark-border px-[30px] py-[19px] font-mql-body text-[11.5px] font-bold tracking-[0.16em] text-white uppercase transition-colors hover:border-white hover:bg-mql-on-dark-hover"
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Typecheck**

Run: `npx --yes pnpm@10 typecheck`
Expected: no errors (none of these three files are imported yet, but each type-checks standalone).

- [ ] **Step 5: Commit**

```bash
git add src/components/marketing/mql-page-header.tsx src/components/marketing/mql-section-intro.tsx src/components/marketing/mql-closing-band.tsx
git commit -m "feat(marketing): add MqlPageHeader, MqlSectionIntro, MqlClosingBand building blocks"
```

---

### Task 6: `ScrollReveal` (new) — the fade/rise-on-scroll behavior

**Files:**
- Create: `src/components/marketing/scroll-reveal.tsx`

**Interfaces:**
- Consumes: nothing beyond React/DOM APIs.
- Produces: `"use client"` component `ScrollReveal({ children: React.ReactNode })`, wrapping its children in a `<div>` that fades/rises into place once. Consumed by Task 9 (Home's "Four Essential Actions" section and closing band), Task 10 (How It Works step list), Task 11 (Features grid), Task 12 (Packages grid). **Not** used on the FAQ page or on the Home hero/capability strip — the handoff never reveals those.

Per the README's "Scroll reveal" spec: check the block's bounding rect synchronously before attaching any observer (so already-visible content never waits on a callback), animate `opacity 0→1` + `translateY(16px)→none` over `0.8s ease` on both properties, keep a single ~1.2s safety timeout that force-reveals anything still hidden, and skip the animation entirely under `prefers-reduced-motion: reduce`. Each Next.js route is a fresh mount, so the prototype's "skip re-hide on route change" concern doesn't apply here — nothing to replicate there.

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades and rises a block into place the first time it scrolls into view (or
 * immediately, if it's already on-screen on load). Respects
 * prefers-reduced-motion and force-reveals after a short safety timeout so a
 * missed observer callback can never leave content invisible. One-way: once
 * revealed, a block never re-hides.
 */
export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setVisible(true);
      return;
    }

    // Synchronous check first — anything already in view must render visible
    // immediately, never waiting on the observer's first callback.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );
    observer.observe(node);

    const safety = window.setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(16px)",
        transition: "opacity .8s ease, transform .8s ease",
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx --yes pnpm@10 typecheck`
Expected: no errors (not imported anywhere yet).

- [ ] **Step 3: Commit**

```bash
git add src/components/marketing/scroll-reveal.tsx
git commit -m "feat(marketing): add ScrollReveal, the shared fade/rise-on-scroll wrapper"
```

---

### Task 7: `PublicHeader` rewrite

**Files:**
- Modify: `src/components/marketing/public-header.tsx`

**Interfaces:**
- Consumes: `BrandLogo` (Task 2), `primaryMarketingNav`/`marketingNav` from `@/lib/navigation`, `routes` from `@/lib/routes`, `LanguageSelector` from `@/components/shared/language-selector` (unchanged, kept for i18n — see note below), `Icon` from `@/components/shared/icon`.
- Produces: `PublicHeader()` — rendered by `src/app/(marketing)/layout.tsx` (no change needed there; it already imports `{ PublicHeader }` from this same path).

**Deliberate, flagged deviation from the handoff:** the handoff's header has no language selector (it wasn't modeled) and no "View Demo" button (only 4 nav links + one CTA). Dropping the language selector would be a real i18n regression on *every* marketing page (this component is shared site-wide), which contradicts "IA is unchanged" — so it's kept, right-aligned before the CTA. "View Demo" is dropped from the header only (it's redundant with the identical link already present in the hero and every closing band) — flag both of these to the user when this task is reported done.

- [ ] **Step 1: Replace the file contents**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { marketingNav, primaryMarketingNav } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import { appConfig } from "@/lib/config/app-config";
import { BrandLogo } from "@/components/marketing/brand-logo";
import { Icon } from "@/components/shared/icon";
import { LanguageSelector } from "@/components/shared/language-selector";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-mql-hairline bg-white">
      <div className="mx-auto flex h-[78px] w-full max-w-[1240px] items-center gap-10 px-8">
        <Link href={routes.marketing.home()} aria-label={`${appConfig.appName} — home`}>
          <BrandLogo />
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-[34px] lg:flex">
          {primaryMarketingNav.map((item) => {
            const active = pathname === item.href;
            return (
              <div key={item.href} className="flex flex-col items-center gap-[6px]">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="font-mql-body text-[11px] font-semibold tracking-[0.17em] text-mql-ink uppercase"
                >
                  {item.label}
                </Link>
                <span
                  className={cn("block h-px w-full", active ? "bg-mql-graphic" : "bg-transparent")}
                  aria-hidden
                />
              </div>
            );
          })}
          <LanguageSelector className="hidden xl:inline-flex" />
          <Link
            href={routes.marketing.contact()}
            className="border border-mql-ink bg-mql-ink px-[22px] py-[14px] font-mql-body text-[11px] font-bold tracking-[0.17em] text-white uppercase transition-colors hover:border-mql-text-accent hover:bg-mql-text-accent"
          >
            Request a Quote
          </Link>
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex size-11 items-center justify-center text-mql-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "X" : "Menu"} className="size-6" aria-hidden />
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-mql-hairline bg-white lg:hidden">
          <nav aria-label="Mobile" className="mx-auto flex w-full max-w-[1240px] flex-col px-8 py-3">
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 font-mql-body text-[13px] font-semibold tracking-[0.08em] text-mql-ink uppercase"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-mql-hairline pt-3">
              <Link
                href={routes.marketing.contact()}
                onClick={() => setOpen(false)}
                className="border border-mql-ink bg-mql-ink px-[22px] py-[14px] text-center font-mql-body text-[11px] font-bold tracking-[0.17em] text-white uppercase"
              >
                Request a Quote
              </Link>
              <LanguageSelector className="px-1 pt-1" />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `npx --yes pnpm@10 typecheck && npx --yes pnpm@10 lint`
Expected: both clean.

- [ ] **Step 3: Visual check**

Start the dev server (Browser tool `preview_start` against the `dev` npm script — see Task 14 setup) and open `/`. Confirm: sticky white header, 78px tall, hairline bottom border, "Menu"/"QrLab" two-tone wordmark with underline, 4 uppercase nav links with the active route showing a full-width orange underline, ink-filled "Request a Quote" button that turns `#C4400F` on hover, language selector still present and working.

- [ ] **Step 4: Commit**

```bash
git add src/components/marketing/public-header.tsx
git commit -m "feat(marketing): flat sticky header with underline nav and ink CTA"
```

---

### Task 8: `PublicFooter` rewrite

**Files:**
- Modify: `src/components/marketing/public-footer.tsx`

**Interfaces:**
- Consumes: `BrandLogo` (Task 2, `size="footer"`), `footerNav` from `@/lib/navigation` (unchanged shape), `routes`, `appConfig`/`displayValue` from `@/lib/config/app-config`.
- Produces: `PublicFooter()` — rendered by `src/app/(marketing)/layout.tsx` (no change needed there).

- [ ] **Step 1: Replace the file contents**

```tsx
import Link from "next/link";
import { footerNav } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import { appConfig, displayValue } from "@/lib/config/app-config";
import { BrandLogo } from "@/components/marketing/brand-logo";

const COLUMNS: { heading: string; key: keyof typeof footerNav }[] = [
  { heading: "Platform", key: "platform" },
  { heading: "Company", key: "company" },
  { heading: "Legal", key: "legal" },
];

export function PublicFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-mql-hairline-grid bg-mql-surface-alt">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-11 px-8 pt-[clamp(52px,5vw,76px)]">
        <div>
          <BrandLogo size="footer" className="mb-[18px]" />
          <p className="mb-[22px] max-w-[26em] font-mql-body text-[.9rem] leading-[1.6] text-mql-secondary">
            Professionally managed digital menus and QR infrastructure for modern restaurants.
          </p>
          <p className="mb-[6px] font-mql-body text-[.82rem] leading-[1.5] text-mql-muted">
            Support: {displayValue(appConfig.support.email)}
          </p>
          <a
            href="sms:+19546811177"
            className="inline-block font-mql-mono text-base font-medium text-mql-ink transition-colors hover:text-mql-text-accent"
          >
            (954) 681-1177
          </a>
          <p className="mt-[5px] font-mql-body text-[.78rem] leading-[1.5] text-mql-muted">
            Text only — no calls
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.key}>
            <h2 className="mb-[18px] font-mql-mono text-[10.5px] font-medium tracking-[0.1em] text-mql-text-accent uppercase">
              {col.heading}
            </h2>
            <ul className="flex flex-col gap-[11px]">
              {footerNav[col.key].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mql-body text-[.9rem] text-mql-secondary transition-colors hover:text-mql-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-8">
        <div className="mt-[clamp(40px,4vw,60px)] flex flex-wrap items-center gap-x-[26px] gap-y-[10px] border-t border-mql-hairline-grid py-[22px] pb-[30px]">
          <span className="text-[.78rem] tracking-[0.02em] text-mql-muted">
            © {year} MenuQrLab. All rights reserved.
          </span>
          <a
            href="https://paksoft.com.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-[5px] text-[.78rem] text-mql-muted transition-colors hover:text-mql-ink"
          >
            <span>Developed by</span>
            <span className="font-semibold text-mql-text-accent">PakSoft</span>
          </a>
          <span className="min-w-[20px] flex-1" aria-hidden />
          <span className="text-[.78rem] tracking-[0.02em] text-mql-muted">
            Managed service · No restaurant-owner accounts
          </span>
          <Link
            href={routes.admin.login()}
            className="border border-[rgba(20,20,20,.24)] px-[13px] py-[9px] font-mql-mono text-[9.5px] font-medium tracking-[0.1em] text-mql-text-accent uppercase transition-colors hover:border-mql-ink hover:text-mql-ink"
          >
            Staff access
          </Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `npx --yes pnpm@10 typecheck && npx --yes pnpm@10 lint`
Expected: both clean.

- [ ] **Step 3: Visual check**

Open `/` and scroll to the footer. Confirm: `#F5F5F4` background, hairline top border, 4-column layout (brand + Platform/Company/Legal), phone number as a tappable `sms:` link, bottom bar with copyright / PakSoft credit / "Managed service..." note / boxed "Staff access" link.

- [ ] **Step 4: Commit**

```bash
git add src/components/marketing/public-footer.tsx
git commit -m "feat(marketing): flat footer matching the MQL design system"
```

---

### Task 9: Home page — `Hero`, `PrimaryActions`, `page.tsx`

**Files:**
- Modify: `src/components/marketing/hero.tsx`
- Modify: `src/components/marketing/primary-actions.tsx`
- Modify: `src/app/(marketing)/page.tsx`
- Delete: `src/components/marketing/phone-preview.tsx` (only consumer is the old `page.tsx`, which this task rewrites; confirm with `grep -rn "phone-preview" src` before deleting — expect zero remaining hits after this task's `page.tsx` edit)

**Interfaces:**
- Consumes: `MenuCardPreview` (Task 4), `QrMark` (Task 3), `MqlSectionIntro`/`MqlClosingBand` (Task 5), `ScrollReveal` (Task 6), `cn`, `next/link`, `next/image`, `Icon` from `@/components/shared/icon`, `routes`, `appConfig`, `loadWebsiteCopy`.
- Produces: `Hero({ eyebrow, title, description, primaryCta, secondaryCta, assurances })` and `PrimaryActions({ actions })` / `PrimaryAction { icon, title, description }` — both consumed only by this page.

- [ ] **Step 1: Replace `hero.tsx`**

```tsx
import Link from "next/link";
import Image from "next/image";
import { MenuCardPreview } from "@/components/marketing/menu-card-preview";
import { QrMark } from "@/components/marketing/qr-mark";

export interface HeroCta {
  label: string;
  href: string;
}

interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  assurances: string[];
}

/** Home hero: eyebrow, H1, lead, CTAs, assurance line, and an in-scene photo with overlaid cards. */
export function Hero({ eyebrow, title, description, primaryCta, secondaryCta, assurances }: HeroProps) {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-8">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] items-center gap-[56px] pt-[clamp(48px,6vw,92px)]">
        <div>
          <div className="mb-[30px] flex items-center gap-[14px]">
            <span className="block h-px w-[34px] bg-mql-graphic" />
            <span className="font-mql-mono text-[11px] font-medium tracking-[0.12em] text-mql-text-accent uppercase">
              {eyebrow}
            </span>
          </div>
          <h1 className="font-mql-display text-[clamp(2.55rem,5vw,4.35rem)] font-[640] leading-[1.035] tracking-[-0.012em] text-mql-ink [text-wrap:pretty]">
            {title}
          </h1>
          <p className="mt-[26px] max-w-[34em] font-mql-body text-[clamp(1.02rem,1.35vw,1.16rem)] leading-[1.62] text-mql-body">
            {description}
          </p>
          <div className="mt-9 flex flex-wrap gap-[14px]">
            <Link
              href={primaryCta.href}
              className="border border-mql-text-accent bg-mql-text-accent px-[30px] py-[19px] font-mql-body text-[11.5px] font-bold tracking-[0.16em] text-white uppercase transition-colors hover:border-mql-ink hover:bg-mql-ink"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="border border-mql-outline px-[30px] py-[19px] font-mql-body text-[11.5px] font-bold tracking-[0.16em] text-mql-ink uppercase transition-colors hover:border-mql-ink hover:bg-[rgba(20,20,20,.05)]"
            >
              {secondaryCta.label}
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-[30px] border-t border-mql-hairline pt-[18px]">
            {assurances.map((item) => (
              <span
                key={item}
                className="flex items-center gap-[9px] text-[13.5px] tracking-[0.01em] text-mql-body"
              >
                <span className="block h-[5px] w-[5px] bg-mql-graphic" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[min(620px,78vh)]">
          <div className="relative min-h-[520px] flex-1 bg-mql-surface-alt">
            <Image
              src="/images/restaurants/pizza-house/category-pizzas.jpg"
              alt="Table setting with fresh pizzas"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 90vw"
              priority
            />
          </div>
          <MenuCardPreview />
          <QrMark className="absolute top-[44px] left-[-10px] z-10 border border-[rgba(20,20,20,.22)] bg-white px-[13px] pt-[13px] pb-[10px]" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace `primary-actions.tsx`**

```tsx
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

export interface PrimaryAction {
  icon: string;
  title: string;
  description: string;
}

/** The four primary restaurant actions as a flat, shared-hairline tile row. */
export function PrimaryActions({ actions }: { actions: PrimaryAction[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(248px,1fr))] border border-mql-hairline-grid bg-mql-surface-alt">
      {actions.map((action, index) => (
        <div
          key={action.title}
          className={cn(
            "flex flex-col gap-[18px] p-[clamp(26px,2.6vw,36px)] transition-colors hover:bg-mql-surface-hover",
            index < actions.length - 1 && "border-r border-mql-hairline",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-mql-mono text-[13px] tracking-[0.06em] text-mql-text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Icon name={action.icon} className="size-[26px] text-mql-graphic" strokeWidth={1.25} />
          </div>
          <h3 className="font-mql-display text-[1.42rem] leading-[1.16] font-[640] text-mql-ink">
            {action.title}
          </h3>
          <span className="block h-px w-[38px] bg-[rgba(20,20,20,.20)]" />
          <p className="font-mql-body text-[.95rem] leading-[1.62] text-mql-secondary [text-wrap:pretty]">
            {action.description}
          </p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Replace `src/app/(marketing)/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { PrimaryActions, type PrimaryAction } from "@/components/marketing/primary-actions";
import { MqlSectionIntro } from "@/components/marketing/mql-section-intro";
import { MqlClosingBand } from "@/components/marketing/mql-closing-band";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { routes } from "@/lib/routes";
import { appConfig } from "@/lib/config/app-config";
import { loadWebsiteCopy } from "@/lib/website-content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${appConfig.appName} — Managed QR Restaurant Experiences`,
  description:
    "We manage the technology so you can manage the food. A fully branded digital menu and ordering experience for restaurants, powered by managed QR.",
};

const capabilityStrip = ["Branded Page", "Digital Menu", "Custom QR Codes", "Fully Managed"];

const primaryActions: PrimaryAction[] = [
  {
    icon: "Phone",
    title: "Call Order",
    description: "A direct line to your front desk. One tap to dial and place an order.",
  },
  {
    icon: "UtensilsCrossed",
    title: "Pick Your Meal",
    description:
      "High-resolution, appetizing digital menus that load instantly — no app download required.",
  },
  {
    icon: "ShoppingBag",
    title: "Online Order with Pay",
    description: "Links directly to your existing external ordering and delivery platforms.",
  },
  {
    icon: "MapPin",
    title: "Visit Us",
    description: "Integrated maps, directions and live operating hours.",
  },
];

// Reflect admin-published content without a rebuild.
export const revalidate = 30;

export default async function HomePage() {
  const copy = await loadWebsiteCopy();
  return (
    <main>
      <Hero
        eyebrow="Managed Digital Experience"
        title={copy("home", "hero", "Turn Every QR Scan Into a Better Restaurant Experience")}
        description="We manage the technology so you can manage the food. A fully branded, high-speed digital menu and ordering experience built for modern restaurants."
        primaryCta={{ label: "Request Your QR Package", href: routes.marketing.contact() }}
        secondaryCta={{
          label: "View Demo Restaurant",
          href: routes.restaurant.home("pizza-house"),
        }}
        assurances={["No fixed setup fees", "Custom-tailored pricing"]}
      />

      <div className="mx-auto w-full max-w-[1240px] px-8">
        <div className="mt-[clamp(44px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] border-t border-b border-mql-hairline">
          {capabilityStrip.map((label, index) => (
            <span
              key={label}
              className={cn(
                "px-2 py-[22px] text-center font-mql-mono text-[10.5px] font-medium tracking-[0.1em] text-mql-body uppercase",
                index < capabilityStrip.length - 1 && "border-r border-mql-hairline-light",
              )}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <ScrollReveal>
        <section className="mx-auto w-full max-w-[1240px] px-8 pt-[clamp(64px,7vw,110px)]">
          <MqlSectionIntro
            numeral="01"
            eyebrow="Four Essential Actions"
            title="Everything Your Customer Needs, Instantly"
            description="A streamlined interface designed for fast, confident decisions from the moment a guest sits down."
          />
          <PrimaryActions actions={primaryActions} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <MqlClosingBand
          size="home"
          image={{ src: "/images/restaurants/pizza-house/category-pizzas.jpg", alt: "" }}
          eyebrow="Managed end to end"
          title={copy("home", "cta", "Ready to upgrade your restaurant's digital experience?")}
          description="Let our team handle the technical details while you run the floor."
          primary={{ label: "Request a Quote", href: routes.marketing.contact() }}
          secondary={{ label: "View Demo", href: routes.restaurant.home("pizza-house") }}
        />
      </ScrollReveal>
    </main>
  );
}
```

- [ ] **Step 4: Delete the now-unused `phone-preview.tsx`**

Run: `grep -rn "phone-preview" src`
Expected: no matches (the only import was in the `page.tsx` just replaced).

Run: `rm src/components/marketing/phone-preview.tsx`

- [ ] **Step 5: Typecheck + lint**

Run: `npx --yes pnpm@10 typecheck && npx --yes pnpm@10 lint`
Expected: both clean.

- [ ] **Step 6: Visual check**

Open `/`. Confirm: two-column hero with the pizza photo + floating menu card (bottom-right) + floating QR card (top-left, and it actually scans to `/restaurants/pizza-house` — check with a phone or the browser's own decode), 4-cell capability strip, "Four Essential Actions" numbered section that fades/rises in as you scroll to it (or is already visible if the viewport is tall enough), dark closing band with the pizza photo at 30% opacity under the scrim that also fades/rises in.

- [ ] **Step 7: Commit**

```bash
git add src/components/marketing/hero.tsx src/components/marketing/primary-actions.tsx "src/app/(marketing)/page.tsx"
git rm src/components/marketing/phone-preview.tsx
git commit -m "feat(marketing): rebuild the home page hero and four-actions section in the MQL system"
```

---

### Task 10: How It Works page — `Steps`, `page.tsx`

**Files:**
- Modify: `src/components/marketing/steps.tsx`
- Modify: `src/app/(marketing)/how-it-works/page.tsx`

**Interfaces:**
- Consumes: `MqlPageHeader`/`MqlClosingBand` (Task 5), `ScrollReveal` (Task 6).
- Produces: `Steps({ steps })` / `Step { title, description }` (icon field removed — this design has no per-step icon).

- [ ] **Step 1: Replace `steps.tsx`**

```tsx
export interface Step {
  title: string;
  description: string;
}

/** Numbered process list: giant numeral, title, body, full hairline rows. */
export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="mt-[clamp(44px,5vw,72px)] grid list-none grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-x-[56px] border-t border-mql-hairline-grid p-0">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-[26px] border-b border-mql-hairline py-[30px]">
          <span className="flex-[0_0_2.4rem] font-mql-display text-[2.1rem] leading-none font-bold text-mql-text-accent">
            {index + 1}
          </span>
          <div>
            <h3 className="mb-[9px] font-mql-display text-[1.34rem] leading-[1.2] font-[640] text-mql-ink">
              {step.title}
            </h3>
            <p className="font-mql-body text-[.95rem] leading-[1.6] text-mql-secondary [text-wrap:pretty]">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 2: Replace `src/app/(marketing)/how-it-works/page.tsx`**

```tsx
import type { Metadata } from "next";
import { MqlPageHeader } from "@/components/marketing/mql-page-header";
import { Steps, type Step } from "@/components/marketing/steps";
import { MqlClosingBand } from "@/components/marketing/mql-closing-band";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How MenuQrLab's fully managed service takes a restaurant from first enquiry to a live, QR-ready digital experience — and keeps it updated.",
};

const steps: Step[] = [
  {
    title: "Restaurant enquiry",
    description: "You tell us about your restaurant and goals. No accounts, no setup work on your side.",
  },
  {
    title: "Information collection",
    description: "Our team gathers your menu, brand assets, contact details and locations.",
  },
  {
    title: "Design & setup",
    description: "We build your branded restaurant page in one of five managed visual directions.",
  },
  {
    title: "Menu preparation",
    description: "We structure categories, products, prices, photos and dietary labels for you.",
  },
  { title: "QR configuration", description: "We configure QR codes that open your live experience." },
  { title: "Review", description: "You review a private preview. Nothing goes live until you approve it." },
  { title: "Publication", description: "We publish your experience and hand over the QR products." },
  {
    title: "Managed updates",
    description: "Send changes anytime — we keep menus, hours and campaigns up to date.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1240px] px-8 pt-[clamp(52px,6vw,92px)]">
        <MqlPageHeader
          eyebrow="How It Works"
          title="From first enquiry to a live, QR-ready experience"
          titleMaxWidth="24em"
          description="How MenuQrLab's fully managed service takes a restaurant from first enquiry to a live, QR-ready digital experience — and keeps it updated."
          descriptionMaxWidth="36em"
        />
        <ScrollReveal>
          <Steps steps={steps} />
        </ScrollReveal>
      </section>

      <MqlClosingBand
        image={{ src: "/images/restaurants/anatolia-grill/cover.jpg", alt: "" }}
        eyebrow="Managed end to end"
        title="Ready to start your restaurant's setup?"
        description="Send an enquiry and our team will prepare a tailored plan."
        primary={{ label: "Request a Quote", href: routes.marketing.contact() }}
        secondary={{ label: "View Demo", href: routes.restaurant.home("pizza-house") }}
      />
    </>
  );
}
```

Note: `eyebrow` is passed to `MqlClosingBand` here even though `size` defaults to `"interior"` (which never renders the eyebrow row per Task 5's component) — harmless (the prop is simply ignored), kept for symmetry/clarity with the Home usage. Feel free to drop it.

- [ ] **Step 3: Typecheck + lint**

Run: `npx --yes pnpm@10 typecheck && npx --yes pnpm@10 lint`
Expected: both clean.

- [ ] **Step 4: Visual check**

Open `/how-it-works`. Confirm: eyebrow+H1+lead header, 8-step numbered list in a 2-column layout on desktop collapsing to 1 column narrow, the list fades/rises in on scroll, dark closing band with the grill photo.

- [ ] **Step 5: Commit**

```bash
git add src/components/marketing/steps.tsx "src/app/(marketing)/how-it-works/page.tsx"
git commit -m "feat(marketing): rebuild the How It Works page in the MQL system"
```

---

### Task 11: Features page — `MqlFeatureTile` (new), `page.tsx`

**Files:**
- Create: `src/components/marketing/mql-feature-tile.tsx`
- Modify: `src/app/(marketing)/features/page.tsx`

**Interfaces:**
- Consumes: `MqlPageHeader`/`MqlClosingBand` (Task 5), `ScrollReveal` (Task 6). Deliberately does **not** touch `feature-card.tsx` — that stays serving `about/page.tsx` unchanged.
- Produces: `MqlFeatureTile({ numeral, title, description })`.

**Note:** the handoff's Features header has no lead paragraph (only eyebrow + H1) — confirmed against the reference markup, not an oversight. `MqlPageHeader`'s `description` is optional for exactly this reason; don't pass one here.

- [ ] **Step 1: Create `mql-feature-tile.tsx`**

```tsx
export function MqlFeatureTile({
  numeral,
  title,
  description,
}: {
  numeral: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-r border-b border-mql-hairline p-[30px_28px] transition-colors hover:bg-mql-surface-hover">
      <span className="font-mql-mono text-[12.5px] tracking-[0.08em] text-mql-text-accent">
        {numeral}
      </span>
      <h3 className="mt-3 mb-2.5 font-mql-display text-[1.26rem] leading-[1.2] font-[640] text-mql-ink">
        {title}
      </h3>
      <span className="mb-3 block h-px w-[34px] bg-[rgba(20,20,20,.22)]" />
      <p className="font-mql-body text-[.93rem] leading-[1.6] text-mql-secondary [text-wrap:pretty]">
        {description}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Replace `src/app/(marketing)/features/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { MqlPageHeader } from "@/components/marketing/mql-page-header";
import { MqlFeatureTile } from "@/components/marketing/mql-feature-tile";
import { MqlClosingBand } from "@/components/marketing/mql-closing-band";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { routes } from "@/lib/routes";
import { loadWebsiteCopy } from "@/lib/website-content";

export const metadata: Metadata = {
  title: "Platform Features",
  description:
    "Branded restaurant homepage, digital menu, product detail, contact & location, external ordering, QR, campaigns, languages, analytics and managed updates.",
};

const features = [
  { title: "Restaurant homepage", description: "A branded landing page built around your four key customer actions." },
  { title: "Digital menu", description: "Searchable categories, products, prices, photos and dietary labels." },
  { title: "Product detail", description: "Rich product pages with variants, allergen notes and availability." },
  { title: "Contact & location", description: "Phone, WhatsApp, email, address, map directions and opening hours." },
  { title: "External ordering", description: "Link directly to your existing online ordering and delivery platforms." },
  { title: "QR codes", description: "Custom QR codes for tables, windows, stickers and printed cards." },
  { title: "Campaigns", description: "Promotions and reward mechanics like Scan & Win, managed end to end." },
  { title: "Languages", description: "Multi-language experiences with a primary and additional languages." },
  { title: "Analytics", description: "Interaction reporting on scans, taps, menu views and action clicks." },
  { title: "Managed updates", description: "Send changes anytime — our team keeps everything accurate." },
  { title: "Reviewed publishing", description: "Nothing goes live without your review and approval." },
];

// Reflect admin-published content without a rebuild.
export const revalidate = 30;

export default async function FeaturesPage() {
  const copy = await loadWebsiteCopy();
  return (
    <>
      <section className="mx-auto w-full max-w-[1240px] px-8 pt-[clamp(52px,6vw,92px)]">
        <MqlPageHeader
          eyebrow="Platform Features"
          title={copy("features", "lead", "Everything we build, configure and maintain for you")}
          titleMaxWidth="22em"
        />
        <ScrollReveal>
          <div className="mt-[clamp(44px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(268px,1fr))] border-t border-l border-mql-hairline-grid bg-mql-surface-alt">
            {features.map((f, index) => (
              <MqlFeatureTile
                key={f.title}
                numeral={String(index + 1).padStart(2, "0")}
                title={f.title}
                description={f.description}
              />
            ))}
            <div className="relative min-h-[210px] border-r border-b border-mql-hairline">
              <Image
                src="/images/restaurants/pizza-house/cover.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, 90vw"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      <MqlClosingBand
        image={{ src: "/images/restaurants/bosphorus-kitchen/cover.jpg", alt: "" }}
        title="See the features in a live demo"
        description="Explore the Pizza House demo, then request a tailored quote."
        primary={{ label: "View Demo", href: routes.restaurant.home("pizza-house") }}
        secondary={{ label: "Request a Quote", href: routes.marketing.contact() }}
      />
    </>
  );
}
```

- [ ] **Step 3: Typecheck + lint**

Run: `npx --yes pnpm@10 typecheck && npx --yes pnpm@10 lint`
Expected: both clean.

- [ ] **Step 4: Visual check**

Open `/features`. Confirm: eyebrow+H1 header with no lead paragraph, a 12-cell grid (11 numbered text tiles + 1 photo tile) with shared 1px borders and no gaps that fades/rises in on scroll, hover state on text tiles, dark closing band with "View Demo" (light/filled) first and "Request a Quote" (ghost) second.

- [ ] **Step 5: Commit**

```bash
git add src/components/marketing/mql-feature-tile.tsx "src/app/(marketing)/features/page.tsx"
git commit -m "feat(marketing): rebuild the Features page as a numbered hairline grid"
```

---

### Task 12: Packages page — `PackageCard`, `page.tsx`

**Files:**
- Modify: `src/components/marketing/package-card.tsx`
- Modify: `src/app/(marketing)/packages/page.tsx`

**Interfaces:**
- Consumes: `MqlPageHeader`/`MqlClosingBand` (Task 5), `ScrollReveal` (Task 6), `getRepositories().content.packages()` (unchanged data source/shape).
- Produces: `PackageCard({ numeral, name, summary, features, ctaHref, ctaLabel?, highlighted?, badge? })`.

- [ ] **Step 1: Replace `package-card.tsx`**

```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  numeral: string;
  name: string;
  summary: string;
  features: string[];
  ctaHref: string;
  ctaLabel?: string;
  highlighted?: boolean;
  badge?: string;
}

/**
 * Package card. Shows a "Request a Quote" CTA — never invented prices, since
 * pricing is custom-tailored by the managed service.
 */
export function PackageCard({
  numeral,
  name,
  summary,
  features,
  ctaHref,
  ctaLabel = "Request a Quote",
  highlighted = false,
  badge,
}: PackageCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col border-r border-b border-mql-hairline-grid p-[34px_30px_30px]",
        highlighted ? "bg-mql-tint" : "bg-mql-surface-alt",
      )}
    >
      <div className="flex min-h-[22px] items-start justify-between gap-[10px]">
        <span className="font-mql-mono text-[12.5px] tracking-[0.08em] text-mql-text-accent">
          {numeral}
        </span>
        {badge ? (
          <span className="bg-mql-text-accent px-[10px] py-[6px] font-mql-body text-[9px] font-bold tracking-[0.18em] text-white uppercase">
            {badge}
          </span>
        ) : null}
      </div>
      <h3 className="mt-[14px] mb-3 font-mql-display text-[1.55rem] leading-[1.14] font-[640] text-mql-ink">
        {name}
      </h3>
      <p className="mb-5 font-mql-body text-[.93rem] leading-[1.6] text-mql-secondary [text-wrap:pretty]">
        {summary}
      </p>
      <div className="mb-5 border-t border-b border-mql-hairline-grid py-4">
        <span className="font-mql-mono text-[.98rem] leading-[1.3] tracking-[-0.01em] text-mql-ink">
          Custom-tailored pricing
        </span>
      </div>
      <ul className="mb-[26px] flex flex-1 flex-col gap-[11px]">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex gap-[11px] font-mql-body text-[.9rem] leading-[1.5] text-mql-secondary"
          >
            <span className="flex-none text-mql-text-accent">—</span>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={cn(
          "px-5 py-[17px] text-center font-mql-body text-[11px] font-bold tracking-[0.16em] uppercase transition-colors",
          highlighted
            ? "border border-mql-text-accent bg-mql-text-accent text-white hover:border-mql-ink hover:bg-mql-ink"
            : "border border-mql-outline text-mql-ink hover:border-mql-ink hover:bg-mql-ink hover:text-white",
        )}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Replace `src/app/(marketing)/packages/page.tsx`**

```tsx
import type { Metadata } from "next";
import { MqlPageHeader } from "@/components/marketing/mql-page-header";
import { PackageCard } from "@/components/marketing/package-card";
import { MqlClosingBand } from "@/components/marketing/mql-closing-band";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { routes } from "@/lib/routes";
import { getRepositories } from "@/data/repositories";

export const metadata: Metadata = {
  title: "Packages & Pricing",
  description:
    "Managed packages: Digital Starter, QR Business, Complete Restaurant Experience, and Multi-Location & Custom. Pricing is tailored — request a quote.",
};

// Reflect admin-published content without a rebuild.
export const revalidate = 30;

export default async function PackagesPage() {
  const packages = await getRepositories().content.packages();
  return (
    <>
      <section className="mx-auto w-full max-w-[1240px] px-8 pt-[clamp(52px,6vw,92px)]">
        <MqlPageHeader
          eyebrow="Packages"
          title="Managed packages, tailored pricing"
          titleMaxWidth="20em"
          description="Every restaurant is different, so pricing is custom-tailored. Tell us what you need and we'll prepare a quote — no fixed setup fees."
          descriptionMaxWidth="38em"
        />
        <ScrollReveal>
          <div className="mt-[clamp(44px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(272px,1fr))] border-t border-l border-mql-hairline-grid">
            {packages.map((p, index) => (
              <PackageCard
                key={p.id}
                numeral={String(index + 1).padStart(2, "0")}
                name={p.name}
                summary={p.summary}
                features={p.features}
                ctaHref={routes.marketing.contact()}
                highlighted={p.highlighted}
                badge={p.badge ?? undefined}
              />
            ))}
          </div>
        </ScrollReveal>
      </section>

      <MqlClosingBand
        image={{ src: "/images/restaurants/green-bowl/cover.jpg", alt: "" }}
        title="Tell us what your restaurant needs"
        description="Share your goals and we'll recommend the right package with clear pricing."
        primary={{ label: "Request a Quote", href: routes.marketing.contact() }}
      />
    </>
  );
}
```

- [ ] **Step 3: Typecheck + lint**

Run: `npx --yes pnpm@10 typecheck && npx --yes pnpm@10 lint`
Expected: both clean.

- [ ] **Step 4: Visual check**

Open `/packages`. Confirm: 4-card grid with shared hairline borders that fades/rises in on scroll, card 2 ("QR Business") tinted `#FFF3EC` with a filled "Most popular" badge and filled CTA, cards 1/3/4 with outline CTAs that invert to ink-filled on hover, single "Request a Quote" closing band.

- [ ] **Step 5: Commit**

```bash
git add src/components/marketing/package-card.tsx "src/app/(marketing)/packages/page.tsx"
git commit -m "feat(marketing): rebuild the Packages page cards in the MQL system"
```

---

### Task 13: FAQ page — `FaqAccordion` (behavior change), `page.tsx`

**Files:**
- Modify: `src/components/marketing/faq-accordion.tsx`
- Modify: `src/app/(marketing)/faq/page.tsx`

**Interfaces:**
- Consumes: `MqlPageHeader`/`MqlClosingBand` (Task 5), `Icon` from `@/components/shared/icon`, `getRepositories().content.faq()` (unchanged data source/shape). Not wrapped in `ScrollReveal` — the handoff never reveals the FAQ rows.
- Produces: `FaqAccordion({ items, categories })` / `FaqItem { id, category, question, answer }` — same prop shape as before, but the component now renders always-visible question/answer rows instead of a collapsible `<details>` accordion (the handoff's FAQ screen has no expand/collapse — every row shows its answer, and category chips + search just filter which rows render). Flag this behavior change to the user.

- [ ] **Step 1: Replace `faq-accordion.tsx`**

```tsx
"use client";

import { useId, useMemo, useState } from "react";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  label: string;
}

const ALL = "all";

/**
 * Filterable FAQ list: always-visible question/answer rows (no accordion),
 * narrowed by category chips and a live search — both compose with AND.
 */
export function FaqAccordion({ items, categories }: { items: FaqItem[]; categories: FaqCategory[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const searchId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = activeCategory === ALL || item.category === activeCategory;
      const matchesQuery =
        q.length === 0 ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, query, activeCategory]);

  const tabs: FaqCategory[] = [{ id: ALL, label: "All Questions" }, ...categories];

  return (
    <div>
      <div className="mt-11 flex items-center gap-3 border-b border-mql-hairline-strong pb-3">
        <Icon name="Search" className="size-[17px] text-mql-graphic" strokeWidth={1.5} aria-hidden />
        <label htmlFor={searchId} className="sr-only">
          Search frequently asked questions
        </label>
        <input
          id={searchId}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search frequently asked questions"
          className="flex-1 border-none bg-transparent py-0.5 font-mql-body text-base text-mql-ink outline-none placeholder:text-[rgba(20,20,20,.38)]"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-[26px]" role="group" aria-label="Filter questions by category">
        {tabs.map((tab) => {
          const active = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              aria-pressed={active}
              className={cn(
                "border-b py-[6px] font-mql-mono text-[10.5px] font-medium tracking-[0.1em] uppercase transition-colors",
                active ? "border-mql-graphic text-mql-ink" : "border-transparent text-mql-muted",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-[14px] border-t border-mql-hairline-grid">
        {filtered.length === 0 ? (
          <p className="py-[28px] font-mql-body text-[.97rem] text-mql-secondary">
            No matching questions. Try a different search term or category.
          </p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-10 gap-y-2 border-b border-mql-hairline py-[28px]"
            >
              <h3 className="font-mql-display text-[1.24rem] leading-[1.24] font-[640] text-mql-ink">
                {item.question}
              </h3>
              <p className="font-mql-body text-[.97rem] leading-[1.64] text-mql-secondary [text-wrap:pretty]">
                {item.answer}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace `src/app/(marketing)/faq/page.tsx`**

```tsx
import type { Metadata } from "next";
import { MqlPageHeader } from "@/components/marketing/mql-page-header";
import { FaqAccordion, type FaqItem } from "@/components/marketing/faq-accordion";
import { MqlClosingBand } from "@/components/marketing/mql-closing-band";
import { routes } from "@/lib/routes";
import { getRepositories } from "@/data/repositories";
import { titleCase } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about MenuQrLab's managed QR restaurant service — how it works, products, languages, updates and ordering.",
};

// Friendly labels for known category slugs; unknown ones fall back to title case.
const CATEGORY_LABELS: Record<string, string> = {
  general: "General",
  managed: "Managed service",
  qr: "QR",
  menu: "Menu & ordering",
  updates: "Updates & support",
};

// Reflect admin-published content without a rebuild.
export const revalidate = 30;

export default async function FaqPage() {
  const entries = await getRepositories().content.faq();
  const items: FaqItem[] = entries.map((e) => ({
    id: e.id,
    category: e.category,
    question: e.question,
    answer: e.answer,
  }));
  const categories = Array.from(new Set(entries.map((e) => e.category))).map((id) => ({
    id,
    label: CATEGORY_LABELS[id] ?? titleCase(id),
  }));

  return (
    <>
      <section className="mx-auto w-full max-w-[1000px] px-8 pt-[clamp(52px,6vw,92px)]">
        <MqlPageHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Search or browse by category. Can't find an answer? Get in touch and we'll help."
          descriptionMaxWidth="36em"
        />
        <FaqAccordion items={items} categories={categories} />
      </section>

      <MqlClosingBand
        image={{ src: "/images/restaurants/cafe-mimoza/cover.jpg", alt: "" }}
        title="Still have a question?"
        description="Our team is happy to help with anything not covered here."
        primary={{ label: "Contact us", href: routes.marketing.contact() }}
      />
    </>
  );
}
```

- [ ] **Step 3: Typecheck + lint**

Run: `npx --yes pnpm@10 typecheck && npx --yes pnpm@10 lint`
Expected: both clean.

- [ ] **Step 4: Visual check**

Open `/faq`. Confirm: 1000px-wide column, underline search field with a magnifier icon, category chips where the active one shows an orange underline, all questions visible with answers alongside (no click-to-expand), typing in the search box and clicking a category both filter instantly with AND logic, the empty state message appears when a search matches nothing.

- [ ] **Step 5: Commit**

```bash
git add src/components/marketing/faq-accordion.tsx "src/app/(marketing)/faq/page.tsx"
git commit -m "feat(marketing): rebuild FAQ as always-visible filtered rows in the MQL system"
```

---

### Task 14: Full verification pass + design-docs note

**Files:**
- Modify: `docs/DESIGN_SYSTEM.md` (append a short section — do not touch the existing "canonical" content above it, which still describes the admin/restaurant + not-yet-redesigned-marketing-pages system)

**Interfaces:** none — this task only verifies and documents.

- [ ] **Step 1: Append a note to `docs/DESIGN_SYSTEM.md`**

Add at the end of the file:

```markdown

## Marketing visual overhaul (2026-09-13)

Home, How It Works, Features, Packages, FAQ, and the shared header/footer use a second,
additive token set — flat, zero-radius, zero-shadow, orange-led — defined alongside the
tokens above in `src/app/globals.css` (`--color-mql-*`, `--font-mql-*`) and consumed only by
`src/components/marketing/{public-header,public-footer,brand-logo,hero,primary-actions,
steps,package-card,faq-accordion,menu-card-preview,qr-mark,scroll-reveal,mql-*}.tsx` plus the
five page files under `src/app/(marketing)/`. The canonical tokens above are unchanged and
still drive admin, the restaurant experience, and the marketing pages this pass did not cover
(About, Contact, Templates, Restaurant Examples, the legal pages) — those pages now sit under
the new flat header/footer with their old-system body content, which will look inconsistent
until they get their own redesign pass. Full design spec:
`_design-overhaul/design_handoff_menuqrlab_visual_overhaul/README.md`.

Known follow-ups (not done in this pass): swap the reused demo-restaurant photography for
real MenuQrLab photography in each slot (see the README's Assets table); redesign the
remaining marketing pages (About, Contact, Templates, Restaurant Examples, legal) to match.
```

- [ ] **Step 2: Full local gate**

Run: `npx --yes pnpm@10 lint`
Expected: clean.

Run: `npx --yes pnpm@10 typecheck`
Expected: clean.

Run: `npx --yes pnpm@10 test`
Expected: existing unit tests pass unchanged (this plan added no unit-testable logic beyond the FAQ filter and the reveal observer, both direct ports of already-covered, deterministic behavior — no new test files needed).

Run: `npx --yes pnpm@10 build`
Expected: production build succeeds (this also catches any Server/Client Component boundary mistakes, e.g. `QrMark` being `async` — it must only ever be rendered from a Server Component tree, which it is: `Hero` → Home `page.tsx`, no `"use client"` in between; and `ScrollReveal` being a Client Component that receives Server Component children as `props.children`, which Next.js explicitly supports).

- [ ] **Step 3: Playwright e2e gate**

Run: `npx --yes pnpm@10 exec playwright install --with-deps chromium` (only if this is the first Playwright run in this environment)
Run: `npx --yes pnpm@10 test:e2e -- public.spec.ts`
Expected: all pass, in particular: every marketing route still renders one visible `h1` with zero console errors, and the header's "Features" link still navigates to `/features`.

- [ ] **Step 4: Manual visual pass across breakpoints**

Using the Browser tool: open `/`, `/how-it-works`, `/features`, `/packages`, `/faq` at desktop width, then use `resize_window` with `preset: "mobile"` and re-check each — confirm the `auto-fit`/`minmax` grids collapse to one column, the header's hamburger menu opens/closes and lists all `marketingNav` items plus the CTA and language selector, no horizontal scrollbar appears on any page, and the scroll-reveal sections fade/rise in correctly on both viewport sizes. Reset the viewport to `preset: "desktop"` when done.

- [ ] **Step 5: Commit**

```bash
git add docs/DESIGN_SYSTEM.md
git commit -m "docs: note the marketing visual overhaul's additive token set and follow-ups"
```

---

## Summary for the PR/handoff message

When this plan is complete, tell the user explicitly:
1. Home, How It Works, Features, Packages, FAQ, and the shared header/footer now match the supplied design (flat orange system, zero radius/shadow, Archivo/Hanken Grotesk/JetBrains Mono, scroll-reveal on the specified sections).
2. About, Contact, Templates, Restaurant Examples, and the legal pages were **not** touched — they now sit under the new header/footer with their old-system body content, which will look inconsistent until a follow-up pass.
3. Two deliberate deviations from the handoff: the header keeps the language selector (dropping it would regress i18n site-wide) and drops the redundant "View Demo" header button.
4. The FAQ changed from a click-to-expand accordion to always-visible filtered rows, matching the handoff exactly.
5. All photography is placeholder (reused existing demo-restaurant photos) — real MenuQrLab photography is still needed per the handoff's Assets table.
6. This environment has no global `pnpm`; every command must go through `npx --yes pnpm@10 <cmd>`.
