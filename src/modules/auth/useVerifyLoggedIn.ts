import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTokenStore } from "./useTokenStore";

export const useVerifyLoggedIn = () => {
  const { replace, asPath } = useRouter();
  const hasToken = useTokenStore((s) => !!s.accessToken);

  useEffect(() => {
    if (!hasToken) {
      replace(`/?next=${asPath}`);
    }
  }, [hasToken, asPath, replace]);

  return hasToken;
};
