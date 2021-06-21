import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { AccountDetails } from "./AccountDetails";

interface AccountDetailsPageProps {}

export const AccountDetailsPage: NextPage<AccountDetailsPageProps> = () => {
  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Account details" />
      <DefaultDesktopLayout>
        <PageHeader title="Account details" onBackClick={() => router.back()} />
        <AccountDetails />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
