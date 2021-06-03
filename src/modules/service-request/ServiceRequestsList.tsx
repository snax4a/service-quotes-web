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

  if (!data) return null;

  return (
    <MiddlePanel>
      <WhiteCard padding="medium" className="flex-col">
        <div
          className="grid gap-3 w-full mb-4"
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
          dataCount={data.length}
        >
          {data?.map((serviceRequest: ServiceRequest) => {
            const { id, address, customer, plannedExecutionDate } =
              serviceRequest;

            return (
              <TableRow key={id} onClick={() => push(`service-requests/${id}`)}>
                <TableCell className="py-5 flex space-x-3">
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
                      {address?.street}, {address?.zipCode} {address?.city}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-5 text-sm text-primary-500 font-normal">
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
