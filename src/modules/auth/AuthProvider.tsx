import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTokenStore } from "./useTokenStore";
import { apiBaseUrl } from "../../lib/constants";
import { useRouter } from "next/router";

interface AuthProviderProps {}

export declare type UUID = string;

export interface Account {
  id: UUID;
  email: string;
  role: string;
  created: Date;
  updated?: Date;
  jwtToken: string;
}

export const AuthContext = React.createContext<{
  setAccount: (a: Account) => void;
}>({
  setAccount: () => {},
});

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const hasToken = useTokenStore((s) => s.accessToken);
//   const { replace } = useRouter();
//   const isConnecting = useRef(false);

//   useEffect(() => {
//     if (!conn && shouldConnect && hasToken && !isConnecting.current) {
//       isConnecting.current = true;

//         })
//         .then((x) => {
//           setAccount(x);
//         })
//         .catch((err) => {
//           if (err.code === 4001) {
//             replace(`/?next=${window.location.pathname}`);
//           }
//         })
//         .finally(() => {
//           isConnecting.current = false;
//         });
//     }
//   }, [hasToken, replace]);

//   return (
//     <WebSocketContext.Provider
//       value={useMemo(
//         () => ({
//           setAccount: (u: User) => {
//           },
//         }),
//         []
//       )}
//     >
//       {children}
//     </WebSocketContext.Provider>
//   );
// };
