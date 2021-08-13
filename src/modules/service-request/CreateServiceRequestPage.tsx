import React, { useContext } from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { ServiceRequestForm } from "./ServiceRequestForm";
import { AuthContext } from "../auth/AuthProvider";

interface CreateServiceRequestPageProps {}

export const CreateServiceRequestPage: NextPage<CreateServiceRequestPageProps> =
  () => {
    const { account } = useContext(AuthContext);

    if (!account) return null;

    return (
      <WaitForAuth roles={["Manager", "Customer"]}>
        <HeaderController embed={{}} title="Create service request" />
        <DefaultDesktopLayout>
          <PageHeader
            title="Create service request"
            onBackClick={() => router.back()}
          />
          <ServiceRequestForm account={account} />
        </DefaultDesktopLayout>
      </WaitForAuth>
    );
  };
