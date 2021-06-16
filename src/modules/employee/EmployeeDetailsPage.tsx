import React from "react";
import router from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { EmployeeDetails } from "./EmployeeDetails";

interface EmployeeDetailsPageProps {}

export const EmployeeDetailsPage: NextPage<EmployeeDetailsPageProps> = () => {
  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Employee details" />
      <DefaultDesktopLayout>
        <PageHeader title="Employee details" onBackClick={() => router.back()} />
        <EmployeeDetails />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
