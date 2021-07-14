import React, { useContext } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { InfoText } from "../../ui/InfoText";
import { CenterLoader } from "../../ui/CenterLoader";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext } from "../auth/AuthProvider";
import { Avatar } from "../../ui/Avatar";
import { ServiceRequest, Specialization } from "../../types";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { StatusBadge } from "../../ui/StatusBadge";
import { EmployeeOptions } from "./EmployeeOptions";
import { BlueCard } from "../../ui/card/BlueCard";

interface EmployeeDetailsProps { }

export const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ }) => {
  const screenType = useScreenType();
  const { account } = useContext(AuthContext);
  const { query, push } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQueryData(
    `employees/${id}`
  );

  if (!account) return null;

  if (isLoading) {
    return <CenterLoader />;
  }

  if (data.status === 404) {
    return <InfoText>Could not find employee</InfoText>;
  }

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
                  <p className="text-black font-semibold">
                    {data.firstName} {data.lastName}
                  </p>
                  <div className="flex space-x-4 font-bold text-sm text-primary-500">
                    <p className="">
                      Account ID: <span className="text-blue">{data.accountId}</span>
                    </p>
                  </div>
                </div>
                <div className="flex self-center mt-4">
                  <EmployeeOptions employee={data} />
                </div>
              </div>
            </div>

            <div className="flex text-primary-500 mt-3 w-full md:mt-1">
              <p className="self-center text-md font-bold">
                Specializations:
              </p>
              {(data.specializations[0]) ?
                data.specializations.map((spec: Specialization) => (
                  <BlueCard
                    className="justify-center w-min rounded-sm py-0.5 px-2 ml-2 text-sm"
                    key={spec.id}
                  >
                    {spec.name}
                  </BlueCard>
                ))
                :
                <p className="ml-2">
                  None
                </p>
              }
            </div>
          </div>
        </WhiteCard>
      </div>
    </MiddlePanel>
  );
};

interface ServiceRequestsListProps { }

export const ServiceRequestsList: React.FC<ServiceRequestsListProps> = ({ }) => {
  const { account } = useContext(AuthContext);
  const { query, push } = useRouter();
  const screenType = useScreenType();
  const id = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQueryData(
    `servicerequests/assigned/${id}`
  );

  if (!account) return null;

  const columnNames = [
    "Customer",
    "Address",
    "Title",
    "Status",
  ];

  if (!data) return null;

  return (
    <MiddlePanel>
      <WhiteCard padding="medium" className="flex-col">
        <p className="text-black font-semibold text-lg2">
          Assigned to services:
        </p>
        <DataTable
          columns={columnNames}
          isLoading={isLoading}
          dataCount={data.length}
        >
          {data?.map((serviceRequest: ServiceRequest) => {
            const { id, customerAddress, customer } =
              serviceRequest;

            return (
              <TableRow key={id} onClick={() => push(`/service-requests/${id}`)}>
                <TableCell className="py-0 flex space-x-3">
                  {account.role !== "Customer" && (
                    <div className="md:block">
                      <Avatar
                        src={customer?.image || ""}
                        username={customer?.companyName}
                        className="rounded-full"
                        size="md"
                      />
                    </div>
                  )}
                  <div className="space-y-1 self-center">
                    {customer?.companyName}
                  </div>
                </TableCell>
                <TableCell className="py-0 text-sm text-primary-500 font-normal">
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