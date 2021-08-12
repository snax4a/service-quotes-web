import React, { useContext } from "react";
import router, { useRouter } from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { EmployeeForm } from "./EmployeeForm";
import { AuthContext } from "../auth/AuthProvider";
import useQueryData from "../../shared-hooks/useQueryData";
import { CenterLoader } from "../../ui/CenterLoader";

interface EditEmployeePageProps {}

export const EditEmployeePage: NextPage<EditEmployeePageProps> = () => {
  const { account } = useContext(AuthContext);
  const { query } = useRouter();
  const { data, isLoading, fetch } = useQueryData(`employees/${query.id}`, {
    enabled: !!query.id,
  });

  if (!account) return null;

  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Edit Employee" />
      <DefaultDesktopLayout>
        <PageHeader title="Edit employee" onBackClick={() => router.back()} />
        {isLoading && <CenterLoader />}
        {!isLoading && data && (
          <EmployeeForm account={account} edit data={data} fetch={fetch} />
        )}
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
