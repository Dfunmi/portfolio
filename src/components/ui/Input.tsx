import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn, focusRing } from "@/lib/utils";

interface FieldChromeProps {
  label?: string;
  helperText?: string;
  error?: string;
  id: string;
  required?: boolean;
  /** Applied to the field's outer wrapper (layout only — e.g. grid span), not the input surface itself. */
  wrapperClassName?: string;
}

const fieldSurfaceStyles = cn(
  "w-full rounded-md border bg-surface px-3.5 py-2.5 text-sm text-foreground",
  "placeholder:text-muted-foreground/70",
  "transition-colors duration-(--duration-fast)",
  "disabled:cursor-not-allowed disabled:opacity-50"
);

function FieldLabel({ label, id, required }: Pick<FieldChromeProps, "label" | "id" | "required">) {
  if (!label) return null;
  return (
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
      {label}
      {required && (
        <span className="ml-0.5 text-danger" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

function FieldMessage({
  id,
  helperText,
  error,
}: Pick<FieldChromeProps, "id" | "helperText" | "error">) {
  if (!helperText && !error) return null;
  return (
    <p
      id={`${id}-message`}
      role={error ? "alert" : undefined}
      className={cn("mt-1.5 text-xs", error ? "text-danger" : "text-muted-foreground")}
    >
      {error ?? helperText}
    </p>
  );
}

interface InputProps
  extends FieldChromeProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> {
  icon?: ReactNode;
}

/**
 * Single-line text input. `error` (a message string) drives both the
 * red border and an `aria-invalid`/`role="alert"` announcement — pass
 * it and the accessible error state comes for free. Forwards its ref
 * to the native <input> so form libraries like React Hook Form can
 * register it directly.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helperText, error, id, required, icon, wrapperClassName, ...props },
  ref
) {
  const describedBy = helperText || error ? `${id}-message` : undefined;

  return (
    <div className={wrapperClassName}>
      <FieldLabel label={label} id={id} required={required} />
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted-foreground">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            fieldSurfaceStyles,
            focusRing,
            "focus-visible:outline-offset-0",
            icon && "pl-10",
            error ? "border-danger" : "border-border hover:border-ink-300"
          )}
          {...props}
        />
      </div>
      <FieldMessage id={id} helperText={helperText} error={error} />
    </div>
  );
});

interface TextareaProps
  extends FieldChromeProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className"> {}

/** Multi-line text input, sharing the same visual and accessibility contract as Input. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, helperText, error, id, required, rows = 4, wrapperClassName, ...props },
  ref
) {
  const describedBy = helperText || error ? `${id}-message` : undefined;

  return (
    <div className={wrapperClassName}>
      <FieldLabel label={label} id={id} required={required} />
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          fieldSurfaceStyles,
          focusRing,
          "resize-y focus-visible:outline-offset-0",
          error ? "border-danger" : "border-border hover:border-ink-300"
        )}
        {...props}
      />
      <FieldMessage id={id} helperText={helperText} error={error} />
    </div>
  );
});
