import React, { useContext } from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { AddressForm } from "./AddressForm";
import { AuthContext } from "../auth/AuthProvider";

interface CreateAddressPageProps {}

export const CreateAddressPage: NextPage<CreateAddressPageProps> = () => {
  const { account } = useContext(AuthContext);

  if (!account) return null;

  return (
    <WaitForAuth roles={["Customer"]}>
      <HeaderController embed={{}} title="Create address" />
      <DefaultDesktopLayout>
        <PageHeader title="Create address" onBackClick={() => router.back()} />
        <AddressForm account={account} />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
