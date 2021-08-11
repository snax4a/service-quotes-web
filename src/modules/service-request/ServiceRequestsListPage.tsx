import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { ServiceRequestsList } from "./ServiceRequestsList";

interface ServiceRequestsListPageProps {}

export const ServiceRequestsListPage: NextPage<ServiceRequestsListPageProps> =
  () => {
    return (
      <WaitForAuth>
        <HeaderController embed={{}} title="Service Requests List" />
        <DefaultDesktopLayout>
          <PageHeader
            title="Service requests list"
            onBackClick={() => router.back()}
          />
          <ServiceRequestsList />
        </DefaultDesktopLayout>
      </WaitForAuth>
    );
  };
