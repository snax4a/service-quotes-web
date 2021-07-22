import React, { useContext, useEffect, useState } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { CustomerAddress, Address } from "../../types";
import { Avatar } from "../../ui/Avatar";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { SearchBar } from "../../ui/SearchBar";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext } from "../auth/AuthProvider";

interface CustomerDataRowProps {
  customerAddress: CustomerAddress;
}

export const CustomerDataRow: React.FC<CustomerDataRowProps> = ({ customerAddress }) => {
  return (
    <>
      <TableCell className="py-5 flex space-x-3">
        {customerAddress.address}
      </TableCell>
      <TableCell className="py-5 text-sm text-black font-normal">
        {customerAddress.address.street}
      </TableCell>
      <TableCell className="py-5 text-sm text-black font-normal">
        {customerAddress.address.city}
      </TableCell>
      <TableCell className="py-5 text-sm text-black font-normal">
        {customerAddress.address.zipCode}
      </TableCell>
      <TableCell className="py-5 text-sm text-black font-normal">
        {customerAddress.address.phoneNumber}
      </TableCell>
    </>
  );
};

interface CustomerAddressesListProps {}

export const CustomerAddressesList: React.FC<CustomerAddressesListProps> = ({}) => {
  const { account } = useContext(AuthContext);
  if (!account) return null;

  const { query, push } = useRouter();
  const screenType = useScreenType();
  const [term, setTerm] = useState("");
  const [searchString, setSearchString] = useState("");
  const setSearchTerm = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => setTerm(value);
  // const id = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQueryData(`customers/${account.customerId}`);

  const customerColumnNames = [
    "Name",
    "Street",
    "City",
    "Zip Code",
    "Phone Number"
  ];

  const columnNames = customerColumnNames;

  if (!data) return null;
  
  console.log(data);

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
          {data?.map((customerAddress: CustomerAddress) => {
            return (
              <TableRow
                key={customerAddress.address.id}
                onClick={() => push(`addresses/${customerAddress.address.id}`)}
              >
                <CustomerDataRow customerAddress={customerAddress} />
              </TableRow>
            );
          })}
        </DataTable>
      </WhiteCard>
    </MiddlePanel>
  );
};
