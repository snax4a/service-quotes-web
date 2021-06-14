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
    <WaitForAuth>
      <HeaderController embed={{}} title="Employees List" />
      <DefaultDesktopLayout>
        <PageHeader title="Employees list" onBackClick={() => router.back()} />
        <EmployeesList />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
