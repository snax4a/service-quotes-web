import React from "react";
import { Employee } from "../types";
import { Avatar } from "./Avatar";
import { OptionsPopover } from "./OptionsPopover";

interface AssignedEmployeesProps {
  employees: Employee[];
}

export const AssignedEmployees: React.FC<AssignedEmployeesProps> = ({
  employees,
}) => {
  return (
    <div className="flex">
      {employees.map((employee: Employee) => {
        return (
          <OptionsPopover
            key={employee.id}
            className="text-center text-primary-500 text-sm2 w-190"
            button={
              <div className="mr-2 transform cursor-pointer hover:scale-110">
                <Avatar
                  size="sm"
                  src={employee.image || ""}
                  username={`${employee.firstName} ${employee.lastName}`}
                />
              </div>
            }
          >
            <p className="font-semibold">
              {employee.firstName} {employee.lastName}
            </p>
            <hr className="my-2 mx-auto w-12 border-[#ddd]" />
            <div className="flex flex-wrap justify-center space-x-1">
              {!employee.specializations?.length && "no specializations"}
              {employee.specializations?.map((spec) => (
                <div key={spec.id} className="flex items-center">
                  <div className="mr-1 w-1 h-1 rounded-full bg-blue" />
                  <span className="text-xs font-normal">{spec.name}</span>
                </div>
              ))}
            </div>
          </OptionsPopover>
        );
      })}
    </div>
  );
};
