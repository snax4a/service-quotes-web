import React, { useContext, useState } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { Specialization } from "../../types";
import { Avatar } from "../../ui/Avatar";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { BlueCard } from "../../ui/card/BlueCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { SearchBar } from "../../ui/SearchBar";
import { SelectBox } from "../../ui/SelectBox";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext } from "../auth/AuthProvider";
import { RoundedButton } from "../../ui/RoundedButton";

interface ManagerDataRowProps {
  specialization: Specialization;
}

export const ManagerDataRow: React.FC<ManagerDataRowProps> = ({ specialization }) => {
  return (
    <>
      <TableCell className="py-5 text-sm text-blue-600 font-normal">
        {specialization.name}
      </TableCell>
      <TableCell className="py-5 text-sm text-blue-600 font-normal">
        Edit
      </TableCell>
      <TableCell className="py-5 text-sm text-primary-500 font-normal">
        Delete
      </TableCell>
    </>
  );
};

interface SpecializationListProps {}

export const SpecializationList: React.FC<SpecializationListProps> = ({}) => {
  const { account } = useContext(AuthContext);
  const { push } = useRouter();
  const screenType = useScreenType();
  const [term, setTerm] = useState("");
  const [searchString, setSearchString] = useState("");
  const setSearchTerm = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => setTerm(value);

  const { data, isLoading } = useQueryData(
    `specializations`
  );

  if (!account) return null;

  const managerColumnNames = [
    "Specialization Name",
    "Edit",
    "Delete",
  ];

  const columnNames = managerColumnNames;

  if (!data) return null;

  return (
    <MiddlePanel>
      {/* <BlueCard className="flex mb-5 items-center justify-center p-6 shadow-md">
        <p
          className="text-4xl font-semibold mr-4">
          Manage employee specializations
        </p>

        <RoundedButton
          onClick={() => push(`/specializations`)}
          className="w-10 bg-primary-100 text-sm font-medium text-center text-black rounded-16 shadow-md">
            Here
        </RoundedButton>
      </BlueCard> */}

      <WhiteCard padding="medium" className="flex-col">
        <div
          className="grid gap-3 w-full mb-4"
          style={{
            gridTemplateColumns:
              screenType === "fullscreen" ? "1fr" : "4fr 1fr",
          }}
        >
          <SearchBar
            value={term}
            onChange={setSearchTerm}
            onSearch={() => setSearchString(term)}
          />
          <BlueCard className="flex mb-5 items-center justify-center p-6 shadow-md">
            PLACEHOLDER
          </BlueCard>
        </div>

        <DataTable
          columns={columnNames}
          isLoading={isLoading}
          dataCount={data.length}
        >
          {data?.map((specialization: Specialization) => {
            return (
              <TableRow
                key={specialization.id}
                onClick={() => push(`specializations/${specialization.id}`)}
              >
              <ManagerDataRow specialization={specialization} />
              </TableRow>
            );
          })}
        </DataTable>
      </WhiteCard>
    </MiddlePanel>
  );
};
