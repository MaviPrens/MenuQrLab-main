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
