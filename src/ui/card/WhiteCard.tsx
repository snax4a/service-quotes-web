import React from "react";

export type WhiteCardProps = {
  className?: string;
  onClick?: () => void;
};

export const WhiteCard: React.FC<WhiteCardProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col p-4 rounded-3xl transition duration-200 ease-in-out bg-white hover:shadow-lg shadow-md ${className}`}
    >
      {children}
    </button>
  );
};
