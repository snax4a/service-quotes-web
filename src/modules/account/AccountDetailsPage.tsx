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
import { WhiteCard } from "../../ui/card/WhiteCard";

interface AccountDetailsPageProps {}

export const AccountDetailsPage: NextPage<AccountDetailsPageProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { account } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
          .catch((err) => {
            console.error(err);
            setError(true);
          })
          .finally(() => setLoading(false));
      } else {
        // eslint-disable-next-line no-lonely-if
        if (id && id !== account.id) {
          router.replace("/");
        } else {
          setAccountDetails(account);
          setLoading(false);
        }
      }
    }
  }, [account, id, router]);

  if (loading || !account || (!accountDetails && !error)) {
    return <CenterLoader />;
  }

  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Account details" />
      <DefaultDesktopLayout>
        <PageHeader title="Account details" onBackClick={() => router.back()} />
        {error && <WhiteCard padding={"big"}>Account not found.</WhiteCard>}
        {!error && accountDetails && (
          <AccountDetails account={accountDetails} variant={account.role} />
        )}
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
