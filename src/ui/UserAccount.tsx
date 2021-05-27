import React, { useContext } from "react";
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
  const isActive = router ? router.asPath.includes("account/details") : false;

  if (!account) return null;

  return (
    <div className="flex items-center space-x-3 p-3 h-10 group">
      <Avatar src={account.image} />
      {isDesktop ? (
        <>
          <div className="flex flex-col pr-4 font-semibold">
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
