import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { EmployeesList } from "./EmployeesList";

interface EmployeesListPageProps {}

export const EmployeesListPage: NextPage<EmployeesListPageProps> = () => {
  return (
    <WaitForAuth roles={["Manager"]}>
      <HeaderController embed={{}} title="Employee List" />
      <DefaultDesktopLayout>
        <PageHeader title="Employee list" onBackClick={() => router.back()} />
        <EmployeesList />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
