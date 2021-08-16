import React, { useContext } from "react";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { AuthContext } from "../auth/AuthProvider";
import { StatsController } from "./StatsController";

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
      <h2 className="font-medium text-2xls">{title}</h2>
      <h1 className="text-2xl font-semibold md:text-5xl">{subtitle}</h1>
      {children}
    </div>
  );
};

interface DashboardPageProps {}

export const DashboardPage: NextPage<DashboardPageProps> = () => {
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
