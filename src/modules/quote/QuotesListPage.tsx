import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { QuotesList } from "./QuotesList";

interface QuotesListPageProps {}

export const QuotesListPage: NextPage<QuotesListPageProps> = () => {
  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Quotes List" />
      <DefaultDesktopLayout>
        <PageHeader title="Quotes list" onBackClick={() => router.back()} />
        <QuotesList />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
