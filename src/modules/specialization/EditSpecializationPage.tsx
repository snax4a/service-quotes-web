import React, { useContext } from "react";
import router, { useRouter } from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { EditSpecializationForm } from "./EditSpecializationForm";
import { AuthContext } from "../auth/AuthProvider";
import useQueryData from "../../shared-hooks/useQueryData";
import { CenterLoader } from "../../ui/CenterLoader";

interface EditSpecializationPageProps { }

export const EditSpecializationPage: NextPage<EditSpecializationPageProps> =
  () => {
    const { account } = useContext(AuthContext);
    const { query } = useRouter();
    const { data, isLoading } = useQueryData(`specializations/${query.id}`);

    if (!account) return null;

    return (
      <WaitForAuth>
        <HeaderController embed={{}} title="Edit Specialization" />
        <DefaultDesktopLayout>
          <PageHeader
            title="Edit specialization"
            onBackClick={() => router.back()}
          />
          {isLoading && <CenterLoader />}
          {!isLoading && data && (
            <EditSpecializationForm account={account} edit data={data} />
          )}
        </DefaultDesktopLayout>
      </WaitForAuth>
    );
  };