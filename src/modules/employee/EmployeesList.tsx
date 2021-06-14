import React, { useContext, useState } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { Employee } from "../../types";
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

const statusOptions = [
  {
    label: "TBD",
    value: "",
  },
];

interface ManagerDataRowProps {
  employee: Employee;
}

export const ManagerDataRow: React.FC<ManagerDataRowProps> = ({ employee }) => {
  const { specializations } = employee.specializations;

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
    "Profile Image",
    "First Name",
    "Last Name",
    "Specializations",
  ];

  const columnNames = managerColumnNames;

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
