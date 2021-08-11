import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { ServiceRequestDetails } from "./ServiceRequestDetails";

interface ServiceRequestDetailsPageProps {}

export const ServiceRequestDetailsPage: NextPage<ServiceRequestDetailsPageProps> =
  () => {
    return (
      <WaitForAuth>
        <HeaderController embed={{}} title="Service request details" />
        <DefaultDesktopLayout>
          <PageHeader
            title="Service request details"
            onBackClick={() => router.back()}
          />
          <ServiceRequestDetails />
        </DefaultDesktopLayout>
      </WaitForAuth>
    );
  };
