import React, { useContext, useEffect, useState } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { CustomerAddress } from "../../types";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { SearchBar } from "../../ui/SearchBar";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext } from "../auth/AuthProvider";
import { SelectBox } from "../../ui/SelectBox";
import { privateClient } from "../../lib/queryClient";
import { BlueCard } from "../../ui/card/BlueCard";
import { Button } from "../../ui/Button";
import Image from "next/image";

interface CustomerDataRowProps {
  customerAddress: CustomerAddress;
}

export const CustomerDataRow: React.FC<CustomerDataRowProps> = ({ customerAddress }) => {
  return (
    <>
      <TableCell className="py-5 flex space-x-3">
        {customerAddress.name}
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

export const CustomerAddressesList: React.FC<CustomerAddressesListProps> = ({ }) => {
  const { account } = useContext(AuthContext);
  if (!account) return null;

  const { query, push } = useRouter();
  const screenType = useScreenType();
  const [term, setTerm] = useState("");
  const [searchString, setSearchString] = useState("");
  const [cityOptions, setCityOptions] = useState([
    {
      label: "All Cities",
      value: "",
    },
  ]);
  const [city, setCity] = useState(
    cityOptions[0]
  );
  const setSearchTerm = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => setTerm(value);

  const { data, isLoading } = useQueryData(
    `customerAddresses/${account.customerId}?city=${city.value}&searchString=${searchString}`
  );

  useEffect(() => {
    privateClient
      .get(`customerAddresses/${account.customerId}/cities`)
      .json()
      .then((res: any) => {
        setCityOptions([
          ...cityOptions,
          ...res.map((city: String) => {
            return { label: city, value: city };
          }),
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customerColumnNames = [
    "Name",
    "Street",
    "City",
    "Zip Code",
    "Phone Number"
  ];

  const columnNames = customerColumnNames;

  if (!data) return null;

  return (
    <MiddlePanel>
      <BlueCard className="mb-6 py-5 px-6 flex-col items-start shadow-md relative overflow-hidden">
          <h1
            className="text-3xl md:text-5xl font-semibold mb-4"
            style={{ lineHeight: "50px" }}
          >
            Your company has new address?
          </h1>
          <Button
            color="white"
            size="small"
            onClick={() => push("customerAddresses/create")}
          >
            Click here to add
          </Button>

          <div className="hidden lg:block absolute right-0 -bottom-2 z-0">
            <Image src="/img/analytics.png" width={150} height={150} />
          </div>
        </BlueCard>

      <WhiteCard padding="medium" className="flex-col">
        <div
          className="grid gap-3 w-full mb-4"
          style={{
            gridTemplateColumns:
              screenType === "fullscreen" ? "1fr" : "1fr 4fr",
          }}
        >
          <SelectBox
            value={city}
            options={cityOptions}
            onChange={setCity}
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
