import React, { useContext } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { CenterLoader } from "../../ui/CenterLoader";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { Account, AuthContext } from "../auth/AuthProvider";
import { Avatar } from "../../ui/Avatar";
import { Employee, ServiceRequest, Specialization } from "../../types";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { StatusBadge } from "../../ui/StatusBadge";
import { EmployeeOptions } from "./EmployeeOptions";
import { BlueCard } from "../../ui/card/BlueCard";
import Link from "next/link";

interface EmployeeDetailsCardProps {
  account: Account;
  data: Employee;
}

export const EmployeeDetailsCard: React.FC<EmployeeDetailsCardProps> = ({
  account,
  data,
}) => {
  const screenType = useScreenType();
  return (
    <MiddlePanel>
      <div
        className="grid gap-5 pb-6"
        style={{
          gridTemplateColumns: ["3-cols", "2-cols"].includes(screenType)
            ? "1fr"
            : "1fr",
        }}
      >
        <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"}>
          {data ? (
            <div
              className="grid w-full font-inter"
              style={{
                gridTemplateColumns: `50px 1fr`,
                gridGap: 20,
              }}
            >
              <Avatar
                src={data.image || ""}
                username={data.firstName + " " + data.lastName}
                size="md"
              />
              <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                  <div className="flex flex-col">
                    <p className="font-semibold text-black">
                      {data.firstName} {data.lastName}
                    </p>
                    <div className="flex space-x-4 text-sm font-bold text-primary-500">
                      <p className="">
                        Account ID:{" "}
                        {account.role === "Manager" ? (
                          <Link href={`/accounts/${data.accountId}`}>
                            <span className="pl-1 cursor-pointer text-blue">
                              {data.accountId}
                            </span>
                          </Link>
                        ) : (
                          <span className="pl-1 text-primary-800">
                            {data.accountId}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex self-center mt-4">
                    <EmployeeOptions employee={data} />
                  </div>
                </div>
              </div>

              <div className="flex mt-3 w-full md:mt-1 text-primary-500">
                <p className="self-center font-bold text-md">
                  Specializations:
                </p>
                {data!.specializations ? (
                  data!.specializations.map((spec: Specialization) => (
                    <BlueCard
                      className="justify-center py-0.5 px-2 ml-2 w-min text-sm rounded-sm whitespace-nowrap"
                      key={spec.id}
                    >
                      {spec.name}
                    </BlueCard>
                  ))
                ) : (
                  <p className="ml-2">None</p>
                )}
              </div>
            </div>
          ) : (
            <p>Employee not found.</p>
          )}
        </WhiteCard>
      </div>
    </MiddlePanel>
  );
};

interface ServiceRequestsListProps {
  account: Account;
  employeeId: string;
}

export const ServiceRequestsList: React.FC<ServiceRequestsListProps> = ({
  account,
  employeeId,
}) => {
  const { push } = useRouter();
  const { data, isLoading } = useQueryData(
    `servicerequests?employeeId=${employeeId}`
  );
  const columnNames = ["Customer", "Address", "Title", "Status"];
  return (
    <MiddlePanel>
      <WhiteCard padding="medium" className="flex-col mb-6.5">
        <p className="font-semibold text-black text-lg2">
          Assigned to services:
        </p>
        <DataTable
          columns={columnNames}
          isLoading={isLoading}
          dataCount={data?.length}
        >
          {data?.map((serviceRequest: ServiceRequest) => {
            const { id, customerAddress, customer } = serviceRequest;

            return (
              <TableRow
                key={id}
                onClick={() => push(`/service-requests/${id}`)}
              >
                <TableCell className="flex py-1 space-x-3">
                  {account.role !== "Customer" && (
                    <div className="flex">
                      <Avatar
                        src={customer?.image || ""}
                        username={customer?.companyName}
                        className="rounded-full"
                        size="md"
                      />
                    </div>
                  )}
                  <div className="self-center space-y-1">
                    {customer?.companyName}
                  </div>
                </TableCell>
                <TableCell className="py-0 text-sm font-normal text-primary-500">
                  <div className="text-sm2 text-primary-500">
                    {customerAddress?.address.street},{" "}
                    {customerAddress?.address.zipCode}{" "}
                    {customerAddress?.address.city}
                  </div>
                </TableCell>
                <TableCell className="py-0 text-sm font-normal">
                  {serviceRequest.title}
                </TableCell>
                <TableCell className="py-0">
                  <StatusBadge status={serviceRequest.status} />
                </TableCell>
              </TableRow>
            );
          })}
        </DataTable>
      </WhiteCard>
    </MiddlePanel>
  );
};

interface EmployeeDetailsProps {}

export const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({}) => {
  const { account } = useContext(AuthContext);
  const { query } = useRouter();
  const screenType = useScreenType();
  const id = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQueryData(`employees/${id}`);

  if (!account) return null;

  if (isLoading) {
    return <CenterLoader />;
  }

  if (!data) {
    return (
      <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"}>
        Employee not found.
      </WhiteCard>
    );
  }

  return (
    <MiddlePanel>
      <div className="flex flex-col pb-6">
        <EmployeeDetailsCard account={account} data={data} />
        <ServiceRequestsList account={account} employeeId={data.id} />
      </div>
    </MiddlePanel>
  );
};
