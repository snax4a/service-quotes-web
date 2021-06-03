import React from "react";

const paddingSizes = {
  default: "p-4",
  medium: "p-5",
  big: "p-7",
};

export type WhiteCardProps = {
  padding?: keyof typeof paddingSizes;
  className?: string;
  onClick?: () => void;
};

export const WhiteCard: React.FC<WhiteCardProps> = ({
  children,
  padding = "default",
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex rounded-3xl transition duration-200 ease-in-out bg-white hover:shadow-lg shadow-md ${className} ${paddingSizes[padding]}`}
    >
      {children}
    </div>
  );
};
