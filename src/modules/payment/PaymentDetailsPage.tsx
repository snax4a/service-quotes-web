import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { PaymentDetails } from "./PaymentDetails";

interface PaymentDetailsPageProps {}

export const PaymentDetailsPage: NextPage<PaymentDetailsPageProps> = () => {
  return (
    <WaitForAuth roles={["Manager", "Customer"]}>
      <HeaderController embed={{}} title="Payment Details" />
      <DefaultDesktopLayout>
        <PageHeader title="Payment details" onBackClick={() => router.back()} />
        <PaymentDetails />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
