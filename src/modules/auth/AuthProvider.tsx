import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTokenStore } from "./useTokenStore";
import { useRouter } from "next/router";
import { privateClient } from "../../lib/queryClient";
import { decodeToken } from "../../lib/helpers";
import { Role, UUID } from "../../types";

interface AuthProviderProps {}

export interface Account {
  id: UUID;
  employeeId?: UUID;
  customerId?: UUID;
  email: string;
  role: Role;
  image: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  vatNumber?: string;
  created: Date;
  updated?: Date;
  jwtToken: string;
}

export const AuthContext = React.createContext<{
  account: Account | null;
  setAccount: (a: Account) => void;
}>({
  account: null,
  setAccount: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const hasToken = useTokenStore((s) => !!s.accessToken);
  const [account, setAccount] = useState<Account | null>(null);
  const isFetching = useRef(false);
  const { replace } = useRouter();

  useEffect(() => {
    if (hasToken) {
      isFetching.current = true;
      const { accessToken } = useTokenStore.getState();
      const { id } = decodeToken(accessToken);

      privateClient
        .get(`accounts/${id}`)
        .then(async (res) => {
          const data = await res.json();
          setAccount(data);
        })
        .catch((err) => {
          console.error("getAccountData:", err);
          useTokenStore.getState().setTokens({ accessToken: "" });
          replace("/logout");
        })
        .finally(() => {
          isFetching.current = false;
        });
    }
  }, [hasToken, replace]);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          account,
          setAccount,
        }),
        [account]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};
