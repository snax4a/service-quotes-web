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
import { CustomerAddress, ServiceRequest } from "../../types";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { StatusBadge } from "../../ui/StatusBadge";
import { CustomerOptions } from "./CustomerOptions";

interface CustomerDetailsProps {}

export const CustomerDetails: React.FC<CustomerDetailsProps> = ({}) => {
  const screenType = useScreenType();
  const { account } = useContext(AuthContext);
  const { query, push } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQueryData(`customers/${id}`);

  if (!account) return null;

  const columnNames = ["Name", "Street", "City", "Zip Code", "Phone Number"];

  if (isLoading) {
    return <CenterLoader />;
  }

  if (data.status === 404) {
    return <InfoText>Could not find customer</InfoText>;
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
              username={data.companyName}
              size="md"
            />
            <div className="flex flex-col">
              <div className="flex flex-col lg:flex-row lg:justify-between">
                <div className="flex flex-col">
                  <p className="text-black font-semibold">{data.companyName}</p>
                  <table className="font-bold text-sm text-primary-500 table-auto">
                    <tbody>
                      <tr>
                        <td>Vat Number: </td>
                        <td className="text-black">{data.vatNumber}</td>
                      </tr>
                      <tr>
                        <td>Account ID: </td>
                        <td className="text-blue">{data.accountId}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex self-center mt-4">
                  <CustomerOptions customer={data} />
                </div>
              </div>
            </div>
          </div>
        </WhiteCard>
      </div>

      <div
        className="grid gap-5 pb-6"
        style={{
          gridTemplateColumns: ["3-cols", "2-cols"].includes(screenType)
            ? "1fr"
            : "1fr",
        }}
      >
        <WhiteCard padding="medium" className="flex-col">
          <p className="text-black font-semibold text-lg2">Addresses:</p>
          <DataTable
            columns={columnNames}
            isLoading={isLoading}
            dataCount={data.length}
          >
            {data?.customerAddresses.map((customerAddress: CustomerAddress) => {
              const { name, address } = customerAddress;

              return (
                <TableRow key={address.id}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{address.street}</TableCell>
                  <TableCell>{address.city}</TableCell>
                  <TableCell>{address.zipCode}</TableCell>
                  <TableCell>{address.phoneNumber}</TableCell>
                </TableRow>
              );
            })}
          </DataTable>
        </WhiteCard>
      </div>
    </MiddlePanel>
  );
};

interface ServiceRequestsListProps {}

export const ServiceRequestsList: React.FC<ServiceRequestsListProps> = ({}) => {
  const { query, push } = useRouter();
  const custId = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQueryData(
    `servicerequests?customerId=${custId}`
  );

  const columnNames = ["Address", "Title", "Status"];

  return (
    <MiddlePanel>
      <WhiteCard padding="medium" className="flex-col mb-6">
        <p className="text-black font-semibold text-lg2">Service requests:</p>
        <DataTable
          columns={columnNames}
          isLoading={isLoading}
          dataCount={data?.length}
        >
          {data?.map((serviceRequest: ServiceRequest) => {
            const { id, customerAddress } = serviceRequest;

            return (
              <TableRow
                key={id}
                onClick={() => push(`/service-requests/${id}`)}
              >
                <TableCell className="py-1 text-sm text-primary-500 font-normal">
                  <div className="text-sm2 text-primary-500">
                    {customerAddress?.address.street},{" "}
                    {customerAddress?.address.zipCode}{" "}
                    {customerAddress?.address.city}
                  </div>
                </TableCell>
                <TableCell className="py-1 text-sm font-normal">
                  {serviceRequest.title}
                </TableCell>
                <TableCell className="py-1">
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
