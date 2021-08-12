import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { CustomerAddressesList } from "./AddressesList";

interface AddressesListPageProps {}

export const AddressesListPage: NextPage<AddressesListPageProps> = () => {
  return (
    <WaitForAuth roles={["Customer"]}>
      <HeaderController embed={{}} title="Addresses List" />
      <DefaultDesktopLayout>
        <PageHeader title="Addresses list" onBackClick={() => router.back()} />
        <CustomerAddressesList />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
