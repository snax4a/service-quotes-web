import React, { useContext, useState } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { Specialization } from "../../types";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { BlueCard } from "../../ui/card/BlueCard";
import { Button } from "../../ui/Button";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { SearchBar } from "../../ui/SearchBar";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext } from "../auth/AuthProvider";
import { RoundedButton } from "../../ui/RoundedButton";
import { OutlinePencilAlt, OutlineTrash } from "../../icons";
import { privateClient } from "../../lib/queryClient";
import { showSuccessToast } from "../../lib/toasts";

interface ManagerDataRowProps {
  specialization: Specialization;
}

export const ManagerDataRow: React.FC<ManagerDataRowProps> = ({ specialization }) => {
  return (
    <>
      <TableCell className="py-5 text-sm font-normal text-blue-600">
        {specialization.name}
      </TableCell>
      <TableCell className="py-5 text-sm font-normal text-blue-600">
        Edit
      </TableCell>
      <TableCell className="py-5 text-sm font-normal text-primary-500">
        Delete
      </TableCell>
    </>
  );
};

interface SpecializationListProps { }

export const SpecializationList: React.FC<SpecializationListProps> = ({ }) => {
  const { account } = useContext(AuthContext);
  const { push } = useRouter();
  const screenType = useScreenType();
  const [term, setTerm] = useState("");
  const [searchString, setSearchString] = useState("");
  const setSearchTerm = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => setTerm(value);

  const { data, isLoading, fetch } = useQueryData(
    `specializations?searchString=${searchString}`
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
      <WhiteCard padding="medium" className="flex-col">
        <div
          className="grid gap-3 mb-4 w-full"
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
          <Button onClick={() => {
            push(`specializations/create`);
          }}>
            <BlueCard
              className="flex justify-center items-center rounded-md">
              + Add New
            </BlueCard>
          </Button>
        </div>

        <DataTable
          columns={columnNames}
          isLoading={isLoading}
          dataCount={data.length}
        >
          {data?.map((specialization: Specialization) => {
            return (
              <TableRow>
                <TableCell>
                  {specialization.name}
                </TableCell>
                <TableCell>
                  <RoundedButton
                    className="w-min"
                    onClick={() => push(`specializations/${specialization.id}`)}>
                    <OutlinePencilAlt height={17} width={17} />
                  </RoundedButton>
                </TableCell>
                <TableCell>
                  <RoundedButton
                    className="w-min"
                    onClick={() => {
                      privateClient
                        .delete(`specializations/${specialization.id}`)
                        .then(() => {
                          showSuccessToast("Specialization has been removed.");
                          fetch();
                        })
                        .catch(() => { });
                    }}>
                    <OutlineTrash height={17} width={17} />
                  </RoundedButton>
                </TableCell>
              </TableRow>
            );
          })}
        </DataTable>
      </WhiteCard>
    </MiddlePanel>
  );
};
