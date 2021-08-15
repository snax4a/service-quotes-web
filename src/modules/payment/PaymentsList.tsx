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
    label: "Confirmed",
    value: "Confirmed",
  },
  {
    label: "Rejected",
    value: "Rejected",
  },
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "New",
    value: "New",
  },
  {
    label: "Error",
    value: "Error",
  },
  {
    label: "Expired",
    value: "Expired",
  },
];

const customerColumnNames = [
  "Transaction ID",
  "Provider",
  "Amount",
  "Quote Ref Number",
  "Created",
  "Status",
];

interface CustomerDataRowProps {
  payment: Payment;
}

export const CustomerDataRow: React.FC<CustomerDataRowProps> = ({
  payment,
}) => {
  return (
    <>
      <TableCell className="font-semibold">{payment.transactionId}</TableCell>
      <TableCell>{payment.provider}</TableCell>
      <TableCell className="text-blue-600">{payment.amount} PLN</TableCell>
      <TableCell className="font-semibold">
        #{payment.quote?.referenceNumber}
      </TableCell>
      <TableCell>{formatDateString(payment.created, "intlDate")}</TableCell>
      <TableCell>
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
  "Created",
  "Status",
];

interface ManagerDataRowProps {
  payment: Payment;
}

export const ManagerDataRow: React.FC<ManagerDataRowProps> = ({ payment }) => {
  return (
    <>
      <TableCell className="font-semibold">{payment.transactionId}</TableCell>
      <TableCell>{payment.customer?.companyName}</TableCell>
      <TableCell className="text-blue-600">{payment.amount} PLN</TableCell>
      <TableCell className="font-semibold">
        #{payment.quote?.referenceNumber}
      </TableCell>
      <TableCell>{formatDateString(payment.created, "intlDate")}</TableCell>
      <TableCell>
        <StatusBadge status={payment.status} />
      </TableCell>
    </>
  );
};

interface PaymentsListProps {}

export const PaymentsList: React.FC<PaymentsListProps> = ({}) => {
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
    `payments?dateRange=${dateRange.value}&status=${status.value}&searchString=${searchString}`
  );

  if (!account) return null;

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
                className="text-sm cursor-pointer"
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
