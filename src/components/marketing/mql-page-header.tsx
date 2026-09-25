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
