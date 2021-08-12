import React, { useContext } from "react";
import router, { useRouter } from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { CustomerForm, CustomerAddressForm } from "./CustomerForm";
import { AuthContext } from "../auth/AuthProvider";
import useQueryData from "../../shared-hooks/useQueryData";
import { CenterLoader } from "../../ui/CenterLoader";

interface EditCustomerPageProps { }

export const EditCustomerPage: NextPage<EditCustomerPageProps> = () => {
  const { account } = useContext(AuthContext);
  const { query } = useRouter();
  const { data, isLoading, fetch } = useQueryData(`customers/${query.id}`, {
    enabled: !!query.id,
  });

  if (!account) return null;

  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Edit Customer" />
      <DefaultDesktopLayout>
        <PageHeader title="Edit customer" onBackClick={() => router.back()} />
        <CustomerForm edit data={data} fetch={fetch} />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
