import React from "react";
import { CenterLoader } from "../CenterLoader";

const paddingSizes = {
  default: "p-4",
  medium: "p-5",
  big: "p-7",
};

export type WhiteCardProps = {
  padding?: keyof typeof paddingSizes;
  className?: string;
  showContentLoader?: boolean;
  onClick?: () => void;
};

export const WhiteCard: React.FC<WhiteCardProps> = ({
  children,
  padding = "default",
  className = "",
  showContentLoader = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex rounded-3xl transition duration-200 ease-in-out bg-white hover:shadow-lg shadow-md ${className} ${paddingSizes[padding]}`}
    >
      {showContentLoader ? <CenterLoader /> : children}
    </div>
  );
};
