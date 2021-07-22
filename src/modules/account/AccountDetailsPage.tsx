import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { AccountDetails } from "./AccountDetails";
import { AuthContext, Account } from "../auth/AuthProvider";
import { privateClient } from "../../lib/queryClient";
import { CenterLoader } from "../../ui/CenterLoader";

interface AccountDetailsPageProps {}

export const AccountDetailsPage: NextPage<AccountDetailsPageProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { account } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [accountDetails, setAccountDetails] = useState<Account>();

  useEffect(() => {
    if (account) {
      if (id && account.role === "Manager") {
        privateClient
          .get(`accounts/${id}`)
          .then(async (res) => {
            const data: Account = await res.json();
            setAccountDetails(data);
          })
          .catch((err) => console.error(err))
          .finally(() => setLoading(false));
      } else {
        setAccountDetails(account);
        setLoading(false);
      }
    }
  }, [account, id]);

  if (!account || !accountDetails || loading) return <CenterLoader />;

  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Account details" />
      <DefaultDesktopLayout>
        <PageHeader title="Account details" onBackClick={() => router.back()} />
        <AccountDetails account={accountDetails} variant={account.role} />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
