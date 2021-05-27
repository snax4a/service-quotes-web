import React, { FC } from "react";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { FixedGridPanel, GridPanel } from "../../ui/GridPanel";
import { Logo } from "../../ui/Logo";
import { UserAccount } from "../../ui/UserAccount";

interface LeftPanelProps {}

const HeaderWrapper: FC = ({ children }) => (
  <div className={`flex mb-7 h-6 items-center`}>{children}</div>
);

export const LeftPanel: React.FC<LeftPanelProps> = ({ children }) => {
  return (
    <FixedGridPanel className="border-r-1 border-primary-200">
      <Logo />
      {children}
      <UserAccount />
    </FixedGridPanel>
  );
};

export const MiddlePanel: React.FC<
  LeftPanelProps & { stickyChildren?: React.ReactNode }
> = ({ stickyChildren, children }) => {
  const screenType = useScreenType();

  return (
    <GridPanel>
      <div
        className={
          !(screenType === "fullscreen" && !stickyChildren)
            ? `flex sticky w-full flex-col z-10 bg-primary-900 pt-5`
            : ""
        }
      >
        {screenType !== "fullscreen" ? (
          <HeaderWrapper>{/* <MiddleHeader /> */}</HeaderWrapper>
        ) : (
          ""
        )}
        {stickyChildren}
      </div>
      {children}
    </GridPanel>
  );
};

export const RightPanel: React.FC<LeftPanelProps> = ({ children }) => {
  return <FixedGridPanel>{children}</FixedGridPanel>;
};
