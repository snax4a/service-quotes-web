import React, { useContext, useEffect, useState } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { Customer } from "../../types";
import { Avatar } from "../../ui/Avatar";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { SearchBar } from "../../ui/SearchBar";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext } from "../auth/AuthProvider";

interface ManagerDataRowProps {
  customer: Customer;
}

export const ManagerDataRow: React.FC<ManagerDataRowProps> = ({ customer }) => {
  return (
    <>
      <TableCell className="py-5 flex space-x-3">
        <div className="hidden md:block">
          <Avatar
            src={customer?.image || ""}
            username={`${customer.companyName}`}
            className="rounded-2xl"
            size="md"
          />
        </div>
      </TableCell>
      <TableCell className="py-5 text-sm text-black font-normal">
        {customer.companyName}
      </TableCell>
      <TableCell className="py-5 text-sm text-black font-normal">
        {customer.vatNumber}
      </TableCell>
      <TableCell className="py-5 text-sm text-blue-600 font-normal">
        {"<ICON>"} {customer.id}
      </TableCell>
    </>
  );
};

interface CustomersListProps {}

export const CustomersList: React.FC<CustomersListProps> = ({}) => {
  const { account } = useContext(AuthContext);
  const { push } = useRouter();
  const screenType = useScreenType();
  const [term, setTerm] = useState("");
  const [searchString, setSearchString] = useState("");
  const setSearchTerm = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => setTerm(value);

  const { data, isLoading } = useQueryData(
    `customers?searchString=${searchString}`
  );

  if (!account) return null;

  const managerColumnNames = [
    "Account Image",
    "Company Name",
    "Vat Number",
    "Account ID",
  ];

  const columnNames = managerColumnNames;

  if (!data) return null;
  
  return (
    <MiddlePanel>
      <WhiteCard padding="medium" className="flex-col">
        <div className="grid gap-3 w-full mb-4">
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
          {data?.map((customer: Customer) => {
            return (
              <TableRow
                key={customer.id}
                onClick={() => push(`customers/${customer.id}`)}
              >
                <ManagerDataRow customer={customer} />
              </TableRow>
            );
          })}
        </DataTable>
      </WhiteCard>
    </MiddlePanel>
  );
};
