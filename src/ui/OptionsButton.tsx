import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { DotsHorizontal } from "../icons";

interface OptionsButtonProps {
  className?: string;
}

export const OptionsButton: React.FC<OptionsButtonProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`p-0.8 rounded-full border-1 border-primary-400 text-primary-400 transform hover:scale-110 ${className}`}
    >
      <DotsHorizontal height={17} width={17} />
      {children}
    </div>
  );
};
