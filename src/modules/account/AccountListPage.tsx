import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { AccountList } from "./AccountList";

interface AccountListPageProps {}

export const AccountListPage: NextPage<AccountListPageProps> = () => {
  return (
    <WaitForAuth roles={["Manager"]}>
      <HeaderController embed={{}} title="Account List" />
      <DefaultDesktopLayout>
        <PageHeader title="Account list" onBackClick={() => router.back()} />
        <AccountList />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
