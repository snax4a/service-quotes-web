import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useScreenType } from "../shared-hooks/useScreenType";
import { OutlineCog } from "../icons";
import { AuthContext } from "../modules/auth/AuthProvider";
import { Avatar } from "./Avatar";

export const UserAccount: React.FC = () => {
  const { account } = useContext(AuthContext);
  const screenType = useScreenType();
  const isDesktop = screenType === "3-cols";
  const router = useRouter();
  const isActive = router ? router.asPath.includes("account/") : false;

  if (!account) return null;

  const username = account.companyName
    ? account.companyName
    : `${account.firstName} ${account.lastName}`;

  return (
    <div className="flex items-center p-3 w-full h-10 group">
      <div className="flex items-center pr-3">
        <Avatar src={account.image || ""} username={username} />
      </div>
      {isDesktop ? (
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col items-start font-semibold">
            <div className="text-sm whitespace-nowrap text-primary-800">
              {username.length < 15
                ? username
                : username.substring(0, 13) + "..."}
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
        </div>
      ) : null}
    </div>
  );
};
