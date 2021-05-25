import { showErrorToast } from "./showErrorToast";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { apiBaseUrl } from "./constants";
import { decodeToken, isBefore } from "./helpers";
import ky from 'ky';
import { Account } from "../modules/auth/AuthProvider";

export const publicClient = ky.extend({
  prefixUrl: apiBaseUrl,
})

export const privateClient = publicClient.extend({
  hooks: {
    beforeRequest: [
      async () => {
        const { accessToken } = useTokenStore.getState();

        if (accessToken) {
          const { exp } = decodeToken(accessToken)
          const isAccessTokenExpired = isBefore(
            // exp is formatted as seconds
            new Date(exp * 1000),
            new Date()
          )

          if (isAccessTokenExpired) {
            const r = await publicClient.post('/refresh-token', {});
            if (r.status !== 200) {
              showErrorToast('Logged out...');
              useTokenStore.getState().setTokens({ accessToken: "" });
            }
            const d = await r.json();
            useTokenStore.getState().setTokens({
              accessToken: d.jwtToken
            });
          }
        }
      },
      (request) => {
        const { accessToken } = useTokenStore.getState();

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`)
        }
      },
    ],
  },
})
