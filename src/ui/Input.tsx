import React, { forwardRef } from "react";

const paddings = {
  default: "py-3 px-4",
  md: "py-1.8 px-3",
  lg: "py-2.5 px-4",
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
    const bg = transparent
      ? `bg-transparent`
      : `bg-primary-325 border-1 border-shadow-200`;
    const ring = error ? `ring-1 ring-red` : "";
    const cn = `w-full rounded-xl text-primary-900 placeholder-primary-600 cursor-pointer focus:outline-none ${paddings[padding]} ${bg} ${ring} ${className} `;

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
