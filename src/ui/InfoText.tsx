import React from "react";

interface InfoTextProps {
  className?: string;
}

export const InfoText: React.FC<InfoTextProps> = ({ className, children }) => {
  return <div className={`text-primary-500 ${className}`}>{children}</div>;
};
