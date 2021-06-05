import React from "react";

interface RoundedButtonProps {
  className?: string;
  onClick?: () => void;
}

export const RoundedButton: React.FC<RoundedButtonProps> = ({
  onClick,
  children,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-0.8 rounded-full border-1 border-primary-400 text-primary-400 transform hover:scale-110 ${className}`}
    >
      {children}
    </div>
  );
};
