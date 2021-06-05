import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";
import { Spinner } from "./Spinner";

const sizeClassnames = {
  big: "py-2 px-6 text-sm rounded-lg",
  bigRounded: "py-3 px-6 text-sm rounded-xl",
  small: "px-2 py-1 text-sm rounded-md",
  tiny: "px-1 text-sm rounded-5",
};

const colorClassnames = {
  primary: "text-white bg-blue hover:bg-blue-200 disabled:text-primary-300",
  secondary: "text-white bg-primary-800 hover:bg-primary-700",
  "secondary-800":
    "text-white bg-primary-800 hover:bg-primary-600 disabled:text-primary-300",
  white: "text-primary-800 bg-white hover:bg-orange-600 hover:text-white",
  transparent: "text-primary-600 bg-transparent",
  "accent-secondary":
    "text-white bg-secondary hover:bg-secondary-washed-out disabled:text-secondary-washed-out",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizeClassnames;
  color?: keyof typeof colorClassnames;
  loading?: boolean;
  icon?: ReactNode;
  transition?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "big",
  color = "primary",
  disabled,
  loading,
  icon,
  className = "",
  transition,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`flex outline-none focus:ring-4 focus:ring-${color} ${
        sizeClassnames[size]
      } ${transition ? `transition duration-200 ease-in-out` : ``} ${
        colorClassnames[color]
      } font-semibold flex items-center justify-center ${className}`}
      data-testid="button"
      {...props}
    >
      <span className={loading ? "opacity-0" : `flex items-center`}>
        {icon ? <span className={`mr-2 items-center`}>{icon}</span> : null}
        {children}
      </span>
      {loading ? (
        <span className={`absolute`}>
          <Spinner size={size === "small" ? "2" : "4"} />
        </span>
      ) : null}
    </button>
  );
};
