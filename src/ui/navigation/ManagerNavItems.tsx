import React from "react";
import { SideNavItemProps } from "./SideNav";
import { useScreenType } from "../../shared-hooks/useScreenType";
import {
  OutlineActivity,
  OutlineBriefcase,
  OutlineDollar,
  OutlineNotepad,
  OutlinePeople,
  OutlineStar,
  OutlineThunderbolt,
} from "../../icons";

export interface ManagerNavItemsProps {
  NavItem: React.ComponentType<SideNavItemProps>;
}

const ManagerNavItems: React.FC<ManagerNavItemsProps> = ({ NavItem }) => {
  const screenType = useScreenType();
  const items = [
    { icon: <OutlineActivity />, name: "Dashboard", targetPath: "/dashboard" },
    { icon: <OutlineNotepad />, name: "Quotes", targetPath: "/quotes" },
    { icon: <OutlineDollar />, name: "Payments", targetPath: "/payments" },
    {
      icon: <OutlineThunderbolt />,
      name: "Service Requests",
      targetPath: "/service-requests",
    },
    { icon: <OutlineBriefcase />, name: "Employees", targetPath: "/employees" },
    { icon: <OutlineStar />, name: "Customers", targetPath: "/customers" },
    { icon: <OutlinePeople />, name: "Accounts", targetPath: "/accounts" },
  ];

  return (
    <>
      {items.map((item) => {
        return (
          <NavItem key={item.targetPath} targetPath={item.targetPath}>
            {item.icon}
            {screenType === "3-cols" && (
              <span className="ml-3">{item.name}</span>
            )}
          </NavItem>
        );
      })}
    </>
  );
};

export default ManagerNavItems;
