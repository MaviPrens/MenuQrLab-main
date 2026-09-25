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
