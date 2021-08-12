import React, { useContext } from "react";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";
import { AuthContext } from "./AuthProvider";
import { Role } from "../../types";
import { useRouter } from "next/router";

interface ContainerProps {}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-1 justify-center items-center">{children}</div>
  );
};

interface WaitForAuthProps {
  roles?: Role[];
}

export const WaitForAuth: React.FC<WaitForAuthProps> = ({
  roles = [],
  children,
}) => {
  const { account } = useContext(AuthContext);
  const { replace } = useRouter();

  if (!useVerifyLoggedIn()) {
    return null;
  }

  if (!account) {
    return <Container>loading...</Container>;
  }

  if (roles.length && !roles.includes(account.role)) {
    replace("/");
    return null;
  }

  return <>{children}</>;
};
