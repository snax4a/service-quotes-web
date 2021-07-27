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
import { AddressOptions } from "./AddressOptions";

interface AddressDetailsProps {}

export const AddressDetails: React.FC<AddressDetailsProps> = ({}) => {
  const screenType = useScreenType();
  const { account } = useContext(AuthContext);
  const { query, push } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQueryData(`customers/${account?.customerId}/address/${id}`);

  if (!account) return null;

  if (isLoading) {
    return <CenterLoader />;
  }

  if (data.status === 404) {
    return <InfoText>Could not find address</InfoText>;
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
              username={data.name}
              size="md"
            />
            <div className="flex flex-col">
              <div className="flex flex-col lg:flex-row lg:justify-between">
                <div className="flex flex-col">
                  <p className="text-black font-semibold">
                    Name
                    {data.name}
                  </p>
                  <div className="flex space-x-4 font-bold text-sm text-primary-500">
                    <p className="">
                      Address:{" "}
                      {data.address.street} {" "} {data.address.city} {" "} {data.address.zipCode}
                    </p>
                    {data.address.phoneNumber}
                  </div>
                </div>
                <div className="flex self-center mt-4">
                  <AddressOptions customerAddress={data} />
                </div>
              </div>
            </div>
          </div>
        </WhiteCard>
      </div>
    </MiddlePanel>
  );
};

interface ServiceRequestsListProps {}

export const ServiceRequestsList: React.FC<ServiceRequestsListProps> = ({}) => {
  const { account } = useContext(AuthContext);
  const { query, push } = useRouter();
  const empId = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQueryData(`servicerequests?employeeId=${empId}`);

  if (!account) return null;

  const columnNames = ["Customer", "Address", "Title", "Status"];

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
            const { id, customerAddress, customer } = serviceRequest;

            return (
              <TableRow
                key={id}
                onClick={() => push(`/service-requests/${id}`)}
              >
                <TableCell className="py-1 flex space-x-3">
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