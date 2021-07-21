import React, { useContext } from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { CreateAccountForm } from "./CreateAccountForm";
import { AuthContext } from "../auth/AuthProvider";

interface CreateAccountPageProps {}

export const CreateAccountPage: NextPage<CreateAccountPageProps> = () => {
  const { account } = useContext(AuthContext);

  if (!account) return null;

  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Create account" />
      <DefaultDesktopLayout>
        <PageHeader title="Create account" onBackClick={() => router.back()} />
        <CreateAccountForm />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
