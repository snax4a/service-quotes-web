import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { CustomersList } from "./CustomersList";

interface CustomersListPageProps {}

export const CustomersListPage: NextPage<CustomersListPageProps> = () => {
  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Customer List" />
      <DefaultDesktopLayout>
        <PageHeader title="Customer list" onBackClick={() => router.back()} />
        <CustomersList />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
