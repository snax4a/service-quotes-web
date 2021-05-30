import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useScreenType } from "../shared-hooks/useScreenType";
import { OutlineCog } from "../icons";
import { AuthContext } from "../modules/auth/AuthProvider";
import { Avatar } from "./Avatar";

export const UserAccount: React.FC = () => {
  const { account } = useContext(AuthContext);
  const [isError, setError] = useState(false);
  const screenType = useScreenType();
  const isDesktop = screenType === "3-cols";
  const router = useRouter();
  const isActive = router ? router.asPath.includes("account/details") : false;

  if (!account) return null;

  const username = account.companyName
    ? account.companyName
    : `${account.firstName}+${account.lastName}`;

  return (
    <div className="flex items-center space-x-3 p-3 h-10 group">
      <Avatar
        onError={() => setError(true)}
        isBase64={!isError}
        src={
          isError
            ? `https://ui-avatars.com/api/${
                username ? `?name=${username}` : "&name"
              }&rounded=true&background=3f8cff&bold=true&color=FFFFFF`
            : account.image
        }
      />
      {isDesktop ? (
        <>
          <div className="flex flex-col items-start pr-4 font-semibold">
            <div className="text-sm text-primary-800 ">
              {account.role === "Customer"
                ? account.companyName
                : `${account.firstName} ${account.lastName}`}
            </div>
            <div className="text-sm2 text-primary-500 font-inter">
              {account.role}
            </div>
          </div>
          <OutlineCog
            className={
              isActive ? "text-blue" : "text-primary-500 group-hover:text-blue"
            }
          />
        </>
      ) : null}
    </div>
  );
};
