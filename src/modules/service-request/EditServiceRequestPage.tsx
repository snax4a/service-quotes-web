import React, { useContext } from "react";
import router, { useRouter } from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { ServiceRequestForm } from "./ServiceRequestForm";
import { AuthContext } from "../auth/AuthProvider";
import useQueryData from "../../shared-hooks/useQueryData";
import { CenterLoader } from "../../ui/CenterLoader";

interface EditServiceRequestPageProps {}

export const EditServiceRequestPage: NextPage<EditServiceRequestPageProps> =
  () => {
    const { account } = useContext(AuthContext);
    const { query } = useRouter();
    const { data, isLoading } = useQueryData(`servicerequests/${query.id}`, {
      enabled: !!query.id,
    });

    if (!account) return null;

    return (
      <WaitForAuth roles={["Customer", "Manager"]}>
        <HeaderController embed={{}} title="Edit service request" />
        <DefaultDesktopLayout>
          <PageHeader
            title="Edit service request"
            onBackClick={() => router.back()}
          />
          {isLoading && <CenterLoader />}
          {!isLoading && data && (
            <ServiceRequestForm account={account} edit data={data} />
          )}
        </DefaultDesktopLayout>
      </WaitForAuth>
    );
  };
