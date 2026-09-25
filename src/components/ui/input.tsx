import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "border-input-border bg-canvas text-body text-text-primary placeholder:text-text-tertiary focus-visible:border-primary focus-visible:outline-primary aria-[invalid=true]:border-danger h-11 w-full rounded-[12px] border px-3.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "border-input-border bg-canvas text-body text-text-primary placeholder:text-text-tertiary focus-visible:border-primary focus-visible:outline-primary aria-[invalid=true]:border-danger min-h-24 w-full rounded-[12px] border px-3.5 py-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "border-input-border bg-canvas text-body text-text-primary focus-visible:border-primary focus-visible:outline-primary aria-[invalid=true]:border-danger h-11 w-full rounded-[12px] border px-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Select.displayName = "Select";

export function Label({
  className,
  required,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label className={cn("text-small text-text-primary font-semibold", className)} {...props}>
      {children}
      {required ? <span className="text-danger ml-0.5">*</span> : null}
    </label>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

/** Label + control + visible error/hint, wired for accessibility. */
export function Field({ label, htmlFor, error, hint, required, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      {hint && !error ? (
        <p id={`${htmlFor}-hint`} className="text-text-secondary text-xs">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-danger text-xs font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Checkbox({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={cn(
        "border-input-border text-primary accent-primary focus-visible:outline-primary size-5 shrink-0 rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-1",
        className,
      )}
      {...props}
    />
  );
}
