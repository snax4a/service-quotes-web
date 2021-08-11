import React from "react";

interface TitleTextProps {
  className?: string;
  size?: keyof typeof sizes;
}

const sizes = {
  base: "text-base font-semibold",
  sm: "text-sm font-medium",
  md: "text-lg2 font-bold",
};

export const TitleText: React.FC<TitleTextProps> = ({
  size = "base",
  className,
  children,
}) => {
  return (
    <div className={`text-primary-800 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
};
