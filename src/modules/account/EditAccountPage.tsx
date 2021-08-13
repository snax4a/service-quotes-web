import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PageHeader } from "../../ui/PageHeader";
import { EditAccountForm } from "./EditAccountForm";
import { Account, AuthContext } from "../auth/AuthProvider";
import { privateClient } from "../../lib/queryClient";
import { CenterLoader } from "../../ui/CenterLoader";

interface EditAccountPageProps {}

export const EditAccountPage: NextPage<EditAccountPageProps> = () => {
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

  if (!account || !accountDetails || loading) return <CenterLoader />;

  return (
    <WaitForAuth>
      <HeaderController embed={{}} title="Edit account" />
      <DefaultDesktopLayout>
        <PageHeader title="Edit account" onBackClick={() => router.back()} />
        <EditAccountForm account={accountDetails} variant={account.role} />
      </DefaultDesktopLayout>
    </WaitForAuth>
  );
};
