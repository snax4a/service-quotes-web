import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { PaymentMethodSelection } from "./PaymentMethodSelection";

interface PaymentMethodSelectionPageProps {}

export const PaymentMethodSelectionPage: NextPage<PaymentMethodSelectionPageProps> =
  () => {
    return (
      <WaitForAuth roles={["Customer"]}>
        <HeaderController embed={{}} title="Pay for the service" />
        <DefaultDesktopLayout>
          <PageHeader
            title="Pay for the service"
            onBackClick={() => router.back()}
          />
          <PaymentMethodSelection />
        </DefaultDesktopLayout>
      </WaitForAuth>
    );
  };
