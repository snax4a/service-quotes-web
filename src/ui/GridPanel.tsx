import React from "react";
import { useScreenType } from "../shared-hooks/useScreenType";

export const GridPanel: React.FC = ({ children }) => {
  return <div className={`flex flex-col flex-1 w-full`}>{children}</div>;
};

export interface FixedGridPanelProps {
  className?: string;
}

export const FixedGridPanel: React.FC<FixedGridPanelProps> = ({
  children,
  className,
}) => {
  const screenType = useScreenType();

  return (
    <div
      className={`flex pt-6.5 flex-col flex-1 sticky top-0 h-screen ${className} ${
        screenType !== "3-cols" ? "items-center" : ""
      }`}
    >
      {children}
    </div>
  );
};
