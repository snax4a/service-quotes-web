import React, { useContext } from "react";
import { WaitForAuth } from "../modules/auth/WaitForAuth";
import { HeaderController } from "../modules/display/HeaderController";
import { DefaultDesktopLayout } from "../modules/layouts/DefaultDesktopLayout";
import { PageHeader } from "../ui/PageHeader";
import { AuthContext } from "../modules/auth/AuthProvider";
import { StatsController } from "../modules/dashboard/StatsController";

export interface DashboardTitleProps {}

export const DashboardTitle: React.FC<DashboardTitleProps> = ({ children }) => {
  const { account } = useContext(AuthContext);

  if (!account || !account.role) return null;

  const title = `Hi ${
    account.role === "Customer" ? account.companyName : account.firstName
  },`;
  let subtitle = "";

  switch (account?.role) {
    case "Manager":
      subtitle = "What will you be managing?";
      break;
    case "Employee":
      subtitle = "What will you be fixing?";
      break;
    case "Customer":
      subtitle = "Your business needs help?";
      break;
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-2xls font-medium">{title}</h2>
      <h1 className="text-2xl md:text-5xl font-semibold">{subtitle}</h1>
      {children}
    </div>
  );
};

const DashboardPage: React.FC = () => {
  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Dashboard" />
      <DefaultDesktopLayout>
        <PageHeader>
          <DashboardTitle />
        </PageHeader>
        <StatsController />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};

export default DashboardPage;
