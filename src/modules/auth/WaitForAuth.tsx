import React, { useContext } from "react";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";
import { AuthContext } from "./AuthProvider";

interface WaitForAndAuthProps {}

export const WaitForAndAuth: React.FC<WaitForAndAuthProps> = ({ children }) => {
  const { account } = useContext(AuthContext);

  if (!useVerifyLoggedIn()) {
    return null;
  }

  if (!account) {
    // @todo make this better
    return <div className="flex">loading...</div>;
  }

  return <>{children}</>;
};
