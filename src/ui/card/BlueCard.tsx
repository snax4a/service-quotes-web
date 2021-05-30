import React from "react";

export type BlueCardProps = {
  className?: string;
  shadowEffect?: boolean;
};

export const BlueCard: React.FC<BlueCardProps> = ({
  children,
  className = "",
  shadowEffect = false,
}) => {
  return (
    <div className={`flex ${shadowEffect ? "shadow-effect" : ""}`}>
      <div
        className={`flex w-full rounded-3xl bg-blue text-white ${className} ${
          shadowEffect ? "se-1" : ""
        }`}
      >
        {children}
      </div>
      {shadowEffect && (
        <>
          <div className="se-2 bg-blue-50 rounded-3xl h-7 w-full" />
          <div className="se-3 bg-blue-50 rounded-3xl h-7 w-full" />
        </>
      )}
    </div>
  );
};
