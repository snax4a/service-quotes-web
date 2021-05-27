import React from "react";
import { WaitForAuth } from "../modules/auth/WaitForAuth";
import { HeaderController } from "../modules/display/HeaderController";
import { DefaultDesktopLayout } from "../modules/layouts/DefaultDesktopLayout";

const DashboardPage: React.FC = () => {
  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Dashboard" />
      <DefaultDesktopLayout>This is main section</DefaultDesktopLayout>
    </WaitForAuth>
  );
};

export default DashboardPage;
