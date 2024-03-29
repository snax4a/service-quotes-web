import { QueryClient } from "react-query";
import { showErrorToast } from "./toasts";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { apiBaseUrl } from "./constants";
import { decodeToken, isBefore } from "./helpers";
import ky, { NormalizedOptions } from "ky";

export const publicClient = ky.extend({
  prefixUrl: apiBaseUrl,
  throwHttpErrors: true,
  credentials: "include",
  retry: 0,
  hooks: {
    afterResponse: [
      async (
        request: Request,
        options: NormalizedOptions,
        response: Response
      ) => {
        if ([400, 404, 500].includes(response.status)) {
          const data = await response.json();

          if ("message" in (data as Error)) {
            showErrorToast((data as Error).message);
          }
        }
      },
    ],
  },
});

export const privateClient = publicClient.extend({
  hooks: {
    beforeRequest: [
      async () => {
        const { accessToken } = useTokenStore.getState();

        if (accessToken) {
          const { exp } = decodeToken(accessToken);
          const isAccessTokenExpired = isBefore(
            // exp is formatted as seconds
            new Date(exp * 1000),
            new Date()
          );

          if (isAccessTokenExpired) {
            console.log("Refresing auth token...");
            const r = await publicClient.post("accounts/refresh-token", {});
            if (r.status === 200) {
              const d = await r.json();
              useTokenStore.getState().setTokens({
                accessToken: d.jwtToken,
              });
            } else {
              useTokenStore.getState().setTokens({ accessToken: "" });
              showErrorToast("Logged out...");
            }
          }
        }
      },
      (request: Request) => {
        const { accessToken } = useTokenStore.getState();

        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (e) => {
        if ("message" in (e as Error)) {
          showErrorToast((e as Error).message);
        }
      },
    },
    queries: {
      retry: false,
      staleTime: 60 * 1000 * 5,
      onError: (e) => {
        if ("message" in (e as Error)) {
          showErrorToast((e as Error).message);
        }
      },
      queryFn: privateClient as any,
    },
  },
});
