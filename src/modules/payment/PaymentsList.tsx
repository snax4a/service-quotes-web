import React, { useContext, useState } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { Payment } from "../../types";
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

const customerColumnNames = [
  "Transaction ID",
  "Provider",
  "Amount",
  "Quote Ref Number",
  "Date Time",
  "Satus",
];

interface CustomerDataRowProps {
  payment: Payment;
}

export const CustomerDataRow: React.FC<CustomerDataRowProps> = ({ payment }) => {
  return (
    <>
      <TableCell className="py-5 text-md font-semibold">
        {payment.transactionId}
      </TableCell>
      <TableCell className="py-5 text-md font-normal">
        {payment.provider}
      </TableCell>
      <TableCell className="py-5 text-sm text-blue-600 font-normal">
        {payment.amount} PLN
      </TableCell>
      <TableCell className="py-5 text-md font-semibold">
        {payment.quoteId}
      </TableCell>
      <TableCell className="py-5 text-sm font-normal">
        {formatDateString(payment.date, "intlDate")}
      </TableCell>
      <TableCell className="py-5">
        <StatusBadge status={payment.status} />
      </TableCell>
    </>
  );
};

const managerColumnNames = [
  "Transaction ID",
  "Customer Name",
  "Amount",
  "Quote Ref Number",
  "Date Time",
  "Satus",
];

interface ManagerDataRowProps {
  payment: Payment;
}

export const ManagerDataRow: React.FC<ManagerDataRowProps> = ({ payment }) => {
  return (
    <>
      <TableCell className="py-5 text-md font-semibold">
        {payment.transactionId}
      </TableCell>
      <TableCell className="py-5 text-md font-normal">
        {payment.customerId}
      </TableCell>
      <TableCell className="py-5 text-sm text-blue-600 font-normal">
        {payment.amount} PLN
      </TableCell>
      <TableCell className="py-5 text-md font-semibold">
        {payment.quoteId}
      </TableCell>
      <TableCell className="py-5 text-sm font-normal">
        {formatDateString(payment.date, "intlDate")}
      </TableCell>
      <TableCell className="py-5">
        <StatusBadge status={payment.status} />
      </TableCell>
    </>
  );
};

interface PaymentsListProps { }

export const PaymentsList: React.FC<PaymentsListProps> = ({ }) => {
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

  if (!account) return null;

  const url = account.role === "Customer" ? `payments/customer/${account.customerId}` : `payments`;

  const { data, isLoading } = useQueryData(url);

  const columnNames =
    account.role === "Customer" ? customerColumnNames : managerColumnNames;

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
          {data?.map((payment: Payment) => {
            return (
              <TableRow
                key={payment.id}
                onClick={() => push(`payments/${payment.id}`)}
              >
                {account.role === "Customer" ? (
                  <CustomerDataRow payment={payment} />
                ) : (
                  <ManagerDataRow payment={payment} />
                )}
              </TableRow>
            );
          })}
        </DataTable>
      </WhiteCard>
    </MiddlePanel>
  );
};