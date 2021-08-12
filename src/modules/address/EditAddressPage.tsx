import React, { useContext } from "react";
import router, { useRouter } from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { AddressForm } from "./AddressForm";
import { AuthContext } from "../auth/AuthProvider";
import useQueryData from "../../shared-hooks/useQueryData";
import { CenterLoader } from "../../ui/CenterLoader";

interface EditAddressPageProps {}

export const EditAddressPage: NextPage<EditAddressPageProps> = () => {
  const { account } = useContext(AuthContext);
  const { query } = useRouter();
  const { data, isLoading } = useQueryData(
    `customers/${account?.customerId}/address/${query.id}`,
    {
      enabled: !!query.id && !!account?.customerId,
    }
  );

  if (!account) return null;

  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Edit address" />
      <DefaultDesktopLayout>
        <PageHeader title="Edit address" onBackClick={() => router.back()} />
        {isLoading && <CenterLoader />}
        {!isLoading && data && (
          <AddressForm account={account} edit data={data} />
        )}
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
