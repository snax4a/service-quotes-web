import React, { useContext } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { InfoText } from "../../ui/InfoText";
import { CenterLoader } from "../../ui/CenterLoader";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { Employee, Specialization, UUID } from "../../types";
import { StatusBadge } from "../../ui/StatusBadge";
import { AuthContext } from "../auth/AuthProvider";
import { Button } from "../../ui/Button";
import SvgOutlineCreditCard from "../../icons/OutlineCreditCard";
import { formatDateString } from "../../lib/helpers";
import { Avatar } from "../../ui/Avatar";

interface EmployeeDetailsProps {
  fetch: () => void;
  employee: Employee;
  specialization: Specialization;
}

export const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  fetch,
  employee,
  specialization,
}) => {
  const screenType = useScreenType();

  // const {
  //   employee,
  //   customerAddress,
  //   assignedEmployees,
  //   plannedExecutionDate,
  //   created,
  //   title,
  //   status,
  //   description,
  // };

  return (
    <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"}>
      <div
        className="grid w-full font-inter"
        style={{
          gridTemplateColumns: `50px 1fr`,
          gridGap: 20,
        }}
      >
        <Avatar
          src={employee?.image || ""}
          username={employee?.firstName + " " + employee?.lastName}
          size="md"
        />
        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <div className="flex flex-col">
              <p className="text-blue font-semibold">
                {employee?.firstName + " " + employee?.lastName}
              </p>
              <div className="flex space-x-4 font-semibold text-sm2 text-primary-500">
                <p className="">
                  {employee?.accountId}
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-primary-500 mt-3 whitespace-pre-line md:mt-1 max-w-3xl">
            Specializations: {employee?.specializations}
          </p>
        </div>
      </div>
    </WhiteCard>
  );
};
