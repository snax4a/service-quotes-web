import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { SpecializationList } from "./SpecializationList";

interface SpecializationListPageProps {}

export const SpecializationListPage: NextPage<SpecializationListPageProps> =
  () => {
    return (
      <WaitForAuth roles={["Manager"]}>
        <HeaderController embed={{}} title="Specialization List" />
        <DefaultDesktopLayout>
          <PageHeader
            title="Specialization list"
            onBackClick={() => router.back()}
          />
          <SpecializationList />
        </DefaultDesktopLayout>
      </WaitForAuth>
    );
  };
