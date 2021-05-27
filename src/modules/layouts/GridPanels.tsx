import React, { FC } from "react";
import { useRouter } from "next/router";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { DropdownController } from "../../ui/DropdownController";
import { FixedGridPanel, GridPanel } from "../../ui/GridPanel";
import { Logo } from "../../ui/Logo";
import { UserAccount } from "../../ui/UserAccount";
import { SettingsDropdown } from "../../ui/SettingsDropdown";
import { modalConfirm } from "../../shared-components/ConfirmModal";
import { useTokenStore } from "../auth/useTokenStore";

interface LeftPanelProps {}

const HeaderWrapper: FC = ({ children }) => (
  <div className={`flex mb-7 h-6 items-center`}>{children}</div>
);

export const LeftPanel: React.FC<LeftPanelProps> = ({ children }) => {
  const { push } = useRouter();

  return (
    <FixedGridPanel className="border-r-1 border-primary-200">
      <Logo />
      {children}
      <DropdownController
        zIndex={20}
        className="bottom-5l left-265 2xl:left-400 fixed"
        innerClassName="fixed transform -translate-x-full"
        overlay={(close) => (
          <SettingsDropdown
            onActionButtonClicked={() => {
              modalConfirm("Are you sure you want to logout?", () => {
                useTokenStore.getState().setTokens({ accessToken: "" });
                push("/logout");
              });
            }}
            onCloseDropdown={close}
          />
        )}
      >
        <UserAccount />
      </DropdownController>
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
