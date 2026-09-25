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
