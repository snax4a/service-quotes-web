import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "../../modules/auth/AuthProvider";
import ManagerNavItems from "./ManagerNavItems";
import CustomerNavItems from "./CustomerNavItems";
import EmployeeNavItems from "./EmployeeNavItems";
import { useScreenType } from "../../shared-hooks/useScreenType";

export interface SideNavContainerProps {
  className?: string;
}

export const SideNavContainer: React.FC<SideNavContainerProps> = ({
  className,
  children,
}) => {
  const screenType = useScreenType();
  const isDestkop = screenType === "3-cols";

  return (
    <div
      className={`flex flex-grow flex-col items-center w-full ${className} ${
        isDestkop ? "pr-5.5" : ""
      }`}
    >
      {children}
    </div>
  );
};

export interface SideNavItemProps {
  targetPath: string;
}

export const SideNavItem: React.FC<SideNavItemProps> = ({
  children,
  targetPath,
}) => {
  const router = useRouter();
  const isActive = router ? router.asPath.includes(targetPath) : false;
  const screenType = useScreenType();

  return (
    <Link href={targetPath}>
      <div
        className={`flex items-center cursor-pointer h-6.7 px-4 space-x-3 w-full group ${
          isActive ? "bg-blue" : ""
        } ${screenType === "3-cols" ? "rounded-r-xl" : "justify-center"}`}
      >
        {children &&
          React.Children.map(children, (child) => {
            if (!child) return;
            return React.cloneElement(child as React.ReactElement, {
              className: `text-sm ${
                isActive
                  ? "text-white"
                  : "text-primary-500 group-hover:text-primary-900"
              }`,
            });
          })}
      </div>
    </Link>
  );
};

export interface SideNavProps {}

export const SideNav: React.FC<SideNavProps> = () => {
  const { account } = React.useContext(AuthContext);

  if (!account || !account.role) return null;

  return (
    <SideNavContainer>
      {account.role === "Customer" && (
        <CustomerNavItems NavItem={SideNavItem} />
      )}
      {account.role === "Employee" && (
        <EmployeeNavItems NavItem={SideNavItem} />
      )}
      {account.role === "Manager" && <ManagerNavItems NavItem={SideNavItem} />}
    </SideNavContainer>
  );
};
