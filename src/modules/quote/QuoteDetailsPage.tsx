import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { QuoteDetails } from "./QuoteDetails";

interface QuoteDetailsPageProps {}

export const QuoteDetailsPage: NextPage<QuoteDetailsPageProps> = () => {
  return (
    <WaitForAuth roles={["Manager", "Customer"]}>
      <HeaderController embed={{}} title="Quote details" />
      <DefaultDesktopLayout>
        <PageHeader title="Quote details" onBackClick={() => router.back()} />
        <QuoteDetails />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
