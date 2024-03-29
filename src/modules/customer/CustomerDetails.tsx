import React, { useContext } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { CenterLoader } from "../../ui/CenterLoader";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext } from "../auth/AuthProvider";
import { Avatar } from "../../ui/Avatar";
import { Customer, CustomerAddress, ServiceRequest } from "../../types";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { StatusBadge } from "../../ui/StatusBadge";
import { CustomerOptions } from "./CustomerOptions";

interface CustomerDetailsCardProps {
  data: Customer;
}

export const CustomerDetailsCard: React.FC<CustomerDetailsCardProps> = ({
  data
}) => {
  const screenType = useScreenType();
  const columnNames = ["Name", "Street", "City", "Zip Code", "Phone Number"];
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
                  <p className="font-semibold text-black">{data.companyName}</p>
                  <table className="text-sm font-bold table-auto text-primary-500">
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
          <p className="font-semibold text-black text-lg2">Addresses:</p>
          <DataTable
            columns={columnNames}
            dataCount={data.customerAddresses!.length}
          >
            {data.customerAddresses!.map((customerAddress: CustomerAddress) => {
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

interface ServiceRequestsListProps {
  customerId: String
}

export const ServiceRequestsList: React.FC<ServiceRequestsListProps> = ({
  customerId
}) => {
  const { query, push } = useRouter();
  const { data, isLoading } = useQueryData(
    `servicerequests?customerId=${customerId}`
  );

  const columnNames = ["Address", "Title", "Status"];

  return (
    <MiddlePanel>
      <WhiteCard padding="medium" className="flex-col mb-6">
        <p className="font-semibold text-black text-lg2">Service requests:</p>
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
                <TableCell className="py-1 text-sm font-normal text-primary-500">
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

interface CustomerDetailsProps { }

export const CustomerDetails: React.FC<CustomerDetailsProps> = ({ }) => {
  const { account } = useContext(AuthContext);
  if (!account) return null;

  const screenType = useScreenType();
  const { query } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQueryData(`customers/${id}`);

  if (isLoading) {
    return <CenterLoader />;
  }

  if (!data) {
    return (
      <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"}>
        Customer not found.
      </WhiteCard>
    );
  }

  return (
    <MiddlePanel>
      <div className="flex flex-col pb-6">
        <CustomerDetailsCard data={data} />
        <ServiceRequestsList customerId={data.id} />
      </div>
    </MiddlePanel>
  );
};