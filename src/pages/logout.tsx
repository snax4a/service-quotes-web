import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { HeaderController } from "../modules/display/HeaderController";
import { ButtonLink } from "../ui/ButtonLink";

interface logoutProps {}

// purpose of this page is to wait for token store to be cleared
// should be done by the component sending the user here
// then it should redirect to landing page
const Logout: React.FC<logoutProps> = ({}) => {
  const [hasToken, setTokens] = useTokenStore((s) => [
    !!s.accessToken,
    s.setTokens,
  ]);
  const { replace } = useRouter();
  useEffect(() => {
    if (!hasToken) {
      replace("/");
    }
  }, [hasToken, replace]);

  return (
    <>
      <HeaderController embed={{}} title="Logout" />
      <div className="flex z-10 flex-col p-7 m-auto w-full bg-white shadow-md sm:rounded-30 sm:w-600">
        <div className="flex flex-col gap-2"></div>
        <ButtonLink onClick={() => setTokens({ accessToken: "" })}>
          click here if you are not automatically redirected
        </ButtonLink>
      </div>
    </>
  );
};

export default Logout;
