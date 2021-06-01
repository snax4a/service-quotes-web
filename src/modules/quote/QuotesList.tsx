import React, { useContext, useState } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { Quote } from "../../types";
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
    label: "Paid",
    value: "Paid",
  },
  {
    label: "Unpaid",
    value: "Unpaid",
  },
];

interface CustomerDataRowProps {
  quote: Quote;
}

export const CustomerDataRow: React.FC<CustomerDataRowProps> = ({ quote }) => {
  const { address, title } = quote.serviceRequest;

  return (
    <>
      <TableCell className="py-5 text-md font-normal">
        #{quote.referenceNumber}
      </TableCell>
      <TableCell className="py-5 text-sm text-primary-500 font-normal">
        <div className="space-y-1">
          <div className="font-semibold">{title}</div>
          <div className="text-sm2">
            {address?.street}, {address?.zipCode} {address?.city}
          </div>
        </div>
      </TableCell>
      <TableCell className="py-5 text-sm text-blue-600 font-normal">
        {quote.total} PLN
      </TableCell>
      <TableCell className="py-5 text-sm font-normal">
        {formatDateString(quote.created, "intlDate")}
      </TableCell>
      <TableCell className="py-5">
        <StatusBadge status={quote.status} />
      </TableCell>
    </>
  );
};

interface ManagerDataRowProps {
  quote: Quote;
}

export const ManagerDataRow: React.FC<ManagerDataRowProps> = ({ quote }) => {
  const { address, customer, title } = quote.serviceRequest;

  return (
    <>
      <TableCell className="py-5 flex space-x-3">
        <div className="hidden md:block">
          <Avatar
            src={customer?.image || ""}
            username={customer?.companyName}
            className="rounded-2xl"
            size="md"
          />
        </div>
        <div className="space-y-1">
          <div>{customer?.companyName}</div>
          <div className="text-sm2 text-primary-500">
            {address?.street}, {address?.zipCode} {address?.city}
          </div>
        </div>
      </TableCell>
      <TableCell className="py-5 text-sm text-blue-600 font-normal">
        {quote.total} PLN
      </TableCell>
      <TableCell className="py-5">
        <StatusBadge status={quote.status} />
      </TableCell>
      <TableCell className="py-5 text-sm font-normal">
        {formatDateString(quote.created, "intlDate")}
      </TableCell>
      <TableCell className="py-5 text-sm text-primary-500 font-normal">
        {title}
      </TableCell>
    </>
  );
};

interface QuotesListProps {}

export const QuotesList: React.FC<QuotesListProps> = ({}) => {
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
    `quotes?dateRange=${dateRange.value}&status=${status.value}&searchString=${searchString}`
  );

  if (!account) return null;

  const managerColumnNames = [
    "Customer Name and Address",
    "Total Amount",
    "Status",
    "Quoted At",
    "Service Title",
  ];

  const customerColumnNames = [
    "Reference Number",
    "Service Title and Address",
    "Total Amount",
    "Quoted At",
    "Status",
  ];

  const columnNames =
    account.role === "Customer" ? customerColumnNames : managerColumnNames;

  if (!data) return null;

  return (
    <MiddlePanel>
      <WhiteCard padding="medium">
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
          {data?.map((quote: Quote) => {
            return (
              <TableRow
                key={quote.id}
                onClick={() => push(`quotes/${quote.id}`)}
              >
                {account.role === "Customer" ? (
                  <CustomerDataRow quote={quote} />
                ) : (
                  <ManagerDataRow quote={quote} />
                )}
              </TableRow>
            );
          })}
        </DataTable>
      </WhiteCard>
    </MiddlePanel>
  );
};
