import React from "react";
import { SideNavItemProps } from "./SideNav";
import { useScreenType } from "../../shared-hooks/useScreenType";
import {
  OutlineActivity,
  OutlineCog,
  OutlineDollar,
  OutlineNotepad,
  OutlineThunderbolt,
} from "../../icons";

export interface CustomerNavItemsProps {
  NavItem: React.ComponentType<SideNavItemProps>;
}

const CustomerNavItems: React.FC<CustomerNavItemsProps> = ({ NavItem }) => {
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
    { icon: <OutlineCog />, name: "Addresses", targetPath: "/addresses" },
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

export default CustomerNavItems;
