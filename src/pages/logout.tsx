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
      <div className="flex m-auto flex-col p-7 bg-white shadow-outlineLg sm:rounded-30 z-10 sm:w-600 w-full">
        <div className="flex gap-2 flex-col"></div>
        <ButtonLink onClick={() => setTokens({ accessToken: "" })}>
          click here if you are not automatically redirected
        </ButtonLink>
      </div>
    </>
  );
};

export default Logout;
