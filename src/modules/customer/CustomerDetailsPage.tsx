import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { CustomerDetails } from "./CustomerDetails";

interface CustomerDetailsPageProps {}

export const CustomerDetailsPage: NextPage<CustomerDetailsPageProps> = () => {
  return (
    <WaitForAuth roles={["Manager"]}>
      <HeaderController embed={{}} title="Customer Details" />
      <DefaultDesktopLayout>
        <PageHeader
          title="Customer details"
          onBackClick={() => router.back()}
        />
        <CustomerDetails />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
