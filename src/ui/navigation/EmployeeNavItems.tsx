import React from "react";
import { SideNavItemProps } from "./SideNav";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { OutlineActivity, OutlineThunderbolt } from "../../icons";

export interface EmployeeNavItemsProps {
  NavItem: React.ComponentType<SideNavItemProps>;
}

const EmployeeNavItems: React.FC<EmployeeNavItemsProps> = ({ NavItem }) => {
  const screenType = useScreenType();
  const items = [
    { icon: <OutlineActivity />, name: "Dashboard", targetPath: "/dashboard" },
    {
      icon: <OutlineThunderbolt />,
      name: "Service Requests",
      targetPath: "/service-requests",
    },
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

export default EmployeeNavItems;
