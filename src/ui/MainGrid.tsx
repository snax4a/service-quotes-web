import React from "react";
import { useScreenType } from "../shared-hooks/useScreenType";

interface DashboardGridProps {
  className?: string;
}

export const MainInnerGrid: React.FC<DashboardGridProps> = ({
  children,
  className = "",
}) => {
  const screenType = useScreenType();

  let gridTemplateColumns = "235px 1fr 325px";

  if (screenType === "2-cols") {
    gridTemplateColumns = "80px 1fr 325px";
  } else if (screenType === "1-cols") {
    gridTemplateColumns = "80px 1fr";
  } else if (screenType === "fullscreen") {
    gridTemplateColumns = "1fr";
  }

  return (
    <div
      id="main"
      className={`relative w-full ${className}`}
      style={{
        display: screenType === "fullscreen" ? "flex" : "grid",
        gridTemplateColumns,
        columnGap: 30,
      }}
    >
      {children}
    </div>
  );
};

export const MainGrid: React.FC<DashboardGridProps> = ({ children }) => {
  return (
    <div
      className={`flex justify-center w-full min-h-screen bg-primary-900`}
      data-testid="main-grid"
    >
      <MainInnerGrid>{children}</MainInnerGrid>
    </div>
  );
};
