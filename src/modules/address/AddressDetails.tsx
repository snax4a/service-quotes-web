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
import { ServiceRequest } from "../../types";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { StatusBadge } from "../../ui/StatusBadge";
import { AddressOptions } from "./AddressOptions";
import Image from "next/image";

interface AddressDetailsProps {}

export const AddressDetails: React.FC<AddressDetailsProps> = ({}) => {
  const screenType = useScreenType();
  const { account } = useContext(AuthContext);
  const { query, push } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQueryData(
    `customers/${account?.customerId}/address/${id}`
  );

  if (!account) return null;

  if (isLoading) {
    return <CenterLoader />;
  }

  if (!data) {
    return (
      <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"}>
        Address not found.
      </WhiteCard>
    );
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
            className="grid grid-flow-col w-full font-inter"
            style={{
              gridTemplateColumns: `350px auto 50px`,
              gridGap: 40,
            }}
          >
            <div
              className="flex justify-center items-center rounded-xl bg-primary-325 border-1 border-shadow-200"
              style={{ height: 265 }}
            >
              <Image
                className="self-center"
                src="/img/address-icon.png"
                width={244}
                height={153}
              />
            </div>

            <div className="grid grid-flow-row h-full">
              <div className="self-center">
                <p className="text-sm font-medium text-primary-400 font-inter">
                  Name
                </p>
                <p className="text-xl font-bold text-primary-800 font-inter">
                  {data.name}
                </p>
              </div>

              <div className="flex flex-row gap-6 self-center">
                <div>
                  <p className="text-sm font-medium text-primary-400 font-inter">
                    Street
                  </p>
                  <p className="text-xl font-bold text-primary-800 font-inter">
                    {data.address.street}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-400 font-inter">
                    City
                  </p>
                  <p className="text-xl font-bold text-primary-800 font-inter">
                    {data.address.city}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-400 font-inter">
                    Zip Code
                  </p>
                  <p className="text-xl font-bold text-primary-800 font-inter">
                    {data.address.zipCode}
                  </p>
                </div>
              </div>

              <div className="self-center">
                <p className="text-sm font-medium text-primary-400 font-inter">
                  Phone Number
                </p>
                <p className="text-xl font-bold text-primary-800 font-inter">
                  {data.address.phoneNumber}
                </p>
              </div>
            </div>

            <div className="justify-self-end">
              <AddressOptions customerAddress={data} />
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
  const { data, isLoading } = useQueryData(
    `servicerequests?employeeId=${empId}`
  );

  if (!account) return null;

  const columnNames = ["Customer", "Address", "Title", "Status"];

  return (
    <MiddlePanel>
      <WhiteCard padding="medium" className="flex-col">
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
