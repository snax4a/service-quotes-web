import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { PaymentsList } from "./PaymentsList";

interface PaymentsListPageProps {}

export const PaymentsListPage: NextPage<PaymentsListPageProps> = () => {
  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Payments List" />
      <DefaultDesktopLayout>
        <PageHeader title="Payments list" onBackClick={() => router.back()} />
        <PaymentsList />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
