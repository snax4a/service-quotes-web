import React, { useContext } from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { SpecializationForm } from "./SpecializationForm";
import { AuthContext } from "../auth/AuthProvider";

interface CreateSpecializationPageProps {}

export const CreateSpecializationPage: NextPage<CreateSpecializationPageProps> = () => {
    const { account } = useContext(AuthContext);
    if (!account) return null;

    return (
      <WaitForAuth roles={["Manager"]}>
        <HeaderController embed={{}} title="Create Specialization" />
        <DefaultDesktopLayout>
          <PageHeader
            title="Create specialization"
            onBackClick={() => router.back()}
          />
          <SpecializationForm account={account} />
        </DefaultDesktopLayout>
      </WaitForAuth>
    );
  };
