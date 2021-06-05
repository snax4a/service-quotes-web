import React, { forwardRef } from "react";

const paddings = {
  default: "py-3 px-4",
  md: "py-1.8 px-2",
};

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  textarea?: boolean;
  rows?: number;
  error?: string;
  transparent?: boolean;
  padding?: keyof typeof paddings;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, textarea, error, transparent, padding = "default", ...props },
    ref
  ) => {
    const bg = transparent ? `bg-transparent` : `bg-primary-300`;
    const ring = error ? `ring-1 ring-red` : "";
    const cn = `w-full rounded-8 text-primary-900 placeholder-primary-600 focus:outline-none ${paddings[padding]} ${bg} ${ring} ${className} `;

    return textarea ? (
      <textarea
        ref={ref as any}
        className={cn}
        data-testid="textarea"
        {...(props as any)}
      />
    ) : (
      <input ref={ref} className={cn} data-testid="input" {...props} />
    );
  }
);

Input.displayName = "Input";
