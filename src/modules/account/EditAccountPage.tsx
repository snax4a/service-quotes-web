import React, { useContext } from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { EditAccountForm } from "./EditAccountForm";
import { AuthContext } from "../auth/AuthProvider";

interface EditAccountPageProps {}

export const EditAccountPage: NextPage<EditAccountPageProps> = () => {
  const { account } = useContext(AuthContext);

  if (!account) return null;

  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Edit account" />
      <DefaultDesktopLayout>
        <PageHeader title="Edit account" onBackClick={() => router.back()} />
        <EditAccountForm account={account} />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
