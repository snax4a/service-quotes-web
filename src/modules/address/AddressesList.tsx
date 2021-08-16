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

export const CustomerDataRow: React.FC<CustomerDataRowProps> = ({
  customerAddress,
}) => {
  return (
    <>
      <TableCell className="flex py-5 space-x-3">
        {customerAddress.name}
      </TableCell>
      <TableCell className="py-5 text-sm font-normal text-black">
        {customerAddress.address.street}
      </TableCell>
      <TableCell className="py-5 text-sm font-normal text-black">
        {customerAddress.address.city}
      </TableCell>
      <TableCell className="py-5 text-sm font-normal text-black">
        {customerAddress.address.zipCode}
      </TableCell>
      <TableCell className="py-5 text-sm font-normal text-black">
        {customerAddress.address.phoneNumber}
      </TableCell>
    </>
  );
};

interface CustomerAddressesListProps {}

export const CustomerAddressesList: React.FC<CustomerAddressesListProps> =
  ({}) => {
    const { account } = useContext(AuthContext);
    const { push } = useRouter();
    const screenType = useScreenType();
    const [term, setTerm] = useState("");
    const [searchString, setSearchString] = useState("");
    const [cityOptions, setCityOptions] = useState([
      {
        label: "All Cities",
        value: "",
      },
    ]);
    const [selectedCity, setSelectedCity] = useState(cityOptions[0]);
    const setSearchTerm = ({
      currentTarget: { value },
    }: React.FormEvent<HTMLInputElement>) => setTerm(value);

    const { data, isLoading } = useQueryData(
      `customerAddresses/${account?.customerId}?city=${selectedCity.value}&searchString=${searchString}`
    );

    useEffect(() => {
      privateClient
        .get(`customerAddresses/${account?.customerId}/cities`)
        .json()
        .then((res: any) => {
          setCityOptions([
            {
              label: "All Cities",
              value: "",
            },
            ...res.map((city: string) => {
              return { label: city, value: city };
            }),
          ]);
        })
        .catch((err) => {
          console.error(err);
        });
    }, [account]);

    const customerColumnNames = [
      "Name",
      "Street",
      "City",
      "Zip Code",
      "Phone Number",
    ];

    const columnNames = customerColumnNames;

    if (!data) return null;

    return (
      <MiddlePanel>
        <BlueCard className="relative flex-col items-start py-5 px-6 mb-6 shadow-md">
          <h1
            className="mb-4 text-3xl font-semibold md:text-5xl"
            style={{ lineHeight: "50px" }}
          >
            Your company has new address?
          </h1>
          <Button
            color="white"
            size="small"
            onClick={() => push("addresses/create")}
          >
            Click here to add
          </Button>

          <div className="hidden absolute -bottom-5 right-6 lg:block z-1">
            <Image src="/img/address-icon.png" width={350} height={215} />
          </div>
        </BlueCard>

        <WhiteCard padding="medium" className="flex-col">
          <div
            className="grid gap-3 mb-4 w-full"
            style={{
              gridTemplateColumns:
                screenType === "fullscreen" ? "1fr" : "1fr 4fr",
            }}
          >
            <SelectBox
              value={selectedCity}
              options={cityOptions}
              onChange={setSelectedCity}
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
                  onClick={() =>
                    push(`addresses/${customerAddress.address.id}`)
                  }
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
