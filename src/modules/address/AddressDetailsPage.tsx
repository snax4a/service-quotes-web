import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { AddressDetails } from "./AddressDetails";

interface AddressDetailsPageProps {}

export const AddressDetailsPage: NextPage<AddressDetailsPageProps> = () => {
  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Address Details" />
      <DefaultDesktopLayout>
        <PageHeader title="Address details" onBackClick={() => router.back()} />
        <AddressDetails />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
