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
          <div className="w-full h-7 bg-blue-50 rounded-3xl se-2" />
          <div className="w-full h-7 bg-blue-50 rounded-3xl se-3" />
        </>
      )}
    </div>
  );
};
