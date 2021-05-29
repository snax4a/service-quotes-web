import React from "react";
import { SideNav } from "../../ui/navigation/SideNav";
import { WaitForAuth } from "../auth/WaitForAuth";
import { MainLayout } from "./MainLayout";

interface DefaultDesktopLayoutProps {
  mobileHeader?: React.ReactNode;
}

export const DefaultDesktopLayout: React.FC<DefaultDesktopLayoutProps> = ({
  children,
}) => {
  return (
    <WaitForAuth>
      <MainLayout leftPanel={<SideNav />}>{children}</MainLayout>
    </WaitForAuth>
  );
};
