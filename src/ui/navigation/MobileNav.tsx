import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "../../modules/auth/AuthProvider";
import ManagerNavItems from "./ManagerNavItems";
import CustomerNavItems from "./CustomerNavItems";
import EmployeeNavItems from "./EmployeeNavItems";

export interface MobileNavContainerProps {
  className?: string;
}

export const MobileNavContainer: React.FC<MobileNavContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`flex fixed inset-x-0 justify-around items-center bottom-0 w-full h-7 bg-primary-900 border-t border-primary-700 ${className}`}
    >
      {children}
    </div>
  );
};

export interface MobileNavItemProps {
  targetPath: string;
}

export const MobileNavItem: React.FC<MobileNavItemProps> = ({
  children,
  targetPath,
}) => {
  const router = useRouter();
  const isActive = router ? router.asPath.includes(targetPath) : false;

  return (
    <Link href={targetPath}>
      <div className="flex cursor-pointer h-full w-7 justify-center items-center group">
        {children &&
          React.Children.map(children, (child) => {
            if (!child) return;
            return React.cloneElement(child as React.ReactElement, {
              className: isActive
                ? "text-orange"
                : "text-primary-100 group-hover:text-orange",
            });
          })}
      </div>
    </Link>
  );
};

export interface NavItem {}

export interface MobileNavProps {}

export const MobileNav: React.FC<MobileNavProps> = () => {
  const { account } = React.useContext(AuthContext);

  if (!account || !account.role) return null;

  return (
    <MobileNavContainer>
      {account.role === "Customer" && (
        <CustomerNavItems NavItem={MobileNavItem} />
      )}
      {account.role === "Employee" && (
        <EmployeeNavItems NavItem={MobileNavItem} />
      )}
      {account.role === "Manager" && (
        <ManagerNavItems NavItem={MobileNavItem} />
      )}
    </MobileNavContainer>
  );
};
