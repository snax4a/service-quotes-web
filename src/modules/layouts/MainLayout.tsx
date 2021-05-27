import React from "react";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { MainInnerGrid } from "../../ui/MainGrid";
import { MobileNav } from "../../ui/navigation/MobileNav";
import { LeftPanel, RightPanel } from "./GridPanels";

interface MainLayoutProps {
  tabletSidebar?: React.ReactNode;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  mobileHeader?: React.ReactNode /** This is an optional parameter in-case you want a custom mobile header (e.g a search header) */;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  leftPanel = <div />,
  rightPanel = <div />,
}) => {
  const screenType = useScreenType();

  let middle = null;
  let prepend = null;

  switch (screenType) {
    case "3-cols":
      middle = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      );
      break;
    case "2-cols":
      middle = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      );
      break;
    case "1-cols":
      middle = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
        </>
      );
      break;
    case "fullscreen":
      prepend = (
        <>
          <MobileNav />
        </>
      );
      middle = <>{children}</>;
  }

  return (
    <>
      <div className={`fixed left-0 w-full z-10`}>{prepend}</div>
      <div
        className={`default-desktop-layout flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700 ${
          prepend ? "mb-7" : ""
        }`}
      >
        <MainInnerGrid>{middle}</MainInnerGrid>
      </div>
    </>
  );
};
