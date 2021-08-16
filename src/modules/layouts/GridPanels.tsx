import React, { FC } from "react";
import { useRouter } from "next/router";
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
    <FixedGridPanel className="z-10 border-r-1 border-primary-200 left-sidebar">
      <Logo />
      {children}
      <DropdownController
        portal={false}
        zIndex={20}
        className="fixed bottom-5l left-265 2xl:left-400"
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
> = ({ children }) => {
  return <GridPanel>{children}</GridPanel>;
};

export const RightPanel: React.FC<LeftPanelProps> = ({ children }) => {
  return <FixedGridPanel>{children}</FixedGridPanel>;
};
