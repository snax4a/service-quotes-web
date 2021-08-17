import React, { useContext, useState } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { ServiceRequest } from "../../types";
import { Avatar } from "../../ui/Avatar";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { StatusBadge } from "../../ui/StatusBadge";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { SearchBar } from "../../ui/SearchBar";
import { SelectBox } from "../../ui/SelectBox";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { formatDateString } from "../../lib/helpers";
import { AuthContext } from "../auth/AuthProvider";
import { BlueCard } from "../../ui/card/BlueCard";
import { Button } from "../../ui/Button";
import Image from "next/image";
import { SolidPlus } from "../../icons";

const dateRangeOptions = [
  {
    label: "Last 30 days",
    value: "30-days",
  },
  {
    label: "Last 7 days",
    value: "7-days",
  },
  {
    label: "Today",
    value: "today",
  },
];

const statusOptions = [
  {
    label: "All Statuses",
    value: "",
  },
  {
    label: "New",
    value: "New",
  },
  {
    label: "Assigned",
    value: "Assigned",
  },
  {
    label: "In Progress",
    value: "InProgress",
  },
  {
    label: "Completed",
    value: "Completed",
  },
  {
    label: "Cancelled",
    value: "Cancelled",
  },
];

interface ServiceRequestsListProps {}

export const ServiceRequestsList: React.FC<ServiceRequestsListProps> = ({}) => {
  const { account } = useContext(AuthContext);
  const { push } = useRouter();
  const screenType = useScreenType();
  const [term, setTerm] = useState("");
  const [searchString, setSearchString] = useState("");
  const [dateRange, setDateRange] = useState(dateRangeOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const setSearchTerm = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => setTerm(value);

  const { data, isLoading } = useQueryData(
    `servicerequests?dateRange=${dateRange.value}&status=${status.value}&searchString=${searchString}`
  );

  if (!account) return null;

  const columnNames = [
    account.role === "Customer" ? "Address" : "Customer",
    "Title",
    "Created At",
    "Planned Execution Date",
    "Status",
  ];

  return (
    <MiddlePanel>
      {["Customer", "Manager"].includes(account.role) && (
        <BlueCard className="overflow-hidden relative flex-col items-start py-5 px-6 mb-6 shadow-md">
          <h1
            className="text-3xl font-semibold md:text-5xl"
            style={{ lineHeight: "50px" }}
          >
            {account.role === "Customer" && "Your business needs help?"}
            {account.role === "Manager" && "Customer needs help?"}
          </h1>
          <p className="mt-1 mb-3 text-sm font-normal font-inter">
            Just fill in the form and our employees will take car of it.
          </p>
          <Button
            color="white"
            size="small"
            onClick={() => push("service-requests/create")}
          >
            {account.role === "Customer" && "Request a service"}
            {account.role === "Manager" && "Create new service request"}
          </Button>

          <div className="hidden absolute right-0 -bottom-2 z-0 lg:block">
            <Image src="/img/purple-ball.png" width={747} height={141} />
          </div>
        </BlueCard>
      )}

      <WhiteCard padding="medium" className="flex-col">
        <div
          className="grid gap-3 mb-4 w-full"
          style={{
            gridTemplateColumns:
              screenType === "fullscreen" ? "1fr" : "1fr 1fr 2fr",
          }}
        >
          <SelectBox
            value={dateRange}
            options={dateRangeOptions}
            onChange={setDateRange}
          />
          <SelectBox
            value={status}
            options={statusOptions}
            onChange={setStatus}
          />
          <SearchBar
            value={term}
            onChange={setSearchTerm}
            onSearch={() => setSearchString(term)}
          />
        </div>

        <DataTable
          columns={columnNames}
          isLoading={isLoading}
          dataCount={data?.length}
        >
          {data?.map((serviceRequest: ServiceRequest) => {
            const { id, customerAddress, customer, plannedExecutionDate } =
              serviceRequest;

            return (
              <TableRow
                key={id}
                className="cursor-pointer"
                onClick={() => push(`service-requests/${id}`)}
              >
                <TableCell className="flex py-5 space-x-3">
                  {account.role !== "Customer" && (
                    <div className="hidden md:block">
                      <Avatar
                        src={customer?.image || ""}
                        username={customer?.companyName}
                        className="rounded-2xl"
                        size="md"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <div>{customer?.companyName}</div>
                    <div className="text-sm2 text-primary-500">
                      {customerAddress?.address?.street},{" "}
                      {customerAddress?.address?.zipCode}{" "}
                      {customerAddress?.address?.city}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-5 text-sm font-normal text-primary-500">
                  {serviceRequest.title}
                </TableCell>
                <TableCell className="py-5 text-sm font-normal">
                  {formatDateString(serviceRequest.created, "intlDate")}
                </TableCell>
                <TableCell className="py-5 text-sm font-normal">
                  {plannedExecutionDate
                    ? formatDateString(
                        serviceRequest.plannedExecutionDate || "",
                        "intlDate"
                      )
                    : null}
                </TableCell>
                <TableCell className="py-5">
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
