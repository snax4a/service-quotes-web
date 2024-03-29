import React, { useContext, useEffect, useState } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { Employee, Specialization } from "../../types";
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
import { privateClient } from "../../lib/queryClient";
interface ManagerDataRowProps {
  employee: Employee;
}

export const ManagerDataRow: React.FC<ManagerDataRowProps> = ({ employee }) => {
  return (
    <>
      <TableCell className="flex py-5 space-x-3">
        <div className="hidden md:block">
          <Avatar
            src={employee?.image || ""}
            username={`${employee.firstName} ${employee.lastName}`}
            className="rounded-2xl"
            size="md"
          />
        </div>
      </TableCell>
      <TableCell className="py-5 text-sm font-normal text-blue-600">
        {employee.firstName}
      </TableCell>
      <TableCell className="py-5 text-sm font-normal text-blue-600">
        {employee.lastName}
      </TableCell>
      <TableCell className="py-5 text-sm font-normal text-primary-500">
        {employee.specializations
          ?.map((spec: Specialization) => spec.name)
          .join(", ")}
      </TableCell>
    </>
  );
};

interface EmployeesListProps {}

export const EmployeesList: React.FC<EmployeesListProps> = ({}) => {
  const { account } = useContext(AuthContext);
  const { push } = useRouter();
  const screenType = useScreenType();
  const [term, setTerm] = useState("");
  const [searchString, setSearchString] = useState("");
  const [specializationsOptions, setSpecializationsOptions] = useState([
    {
      label: "All Specializations",
      value: "",
    },
  ]);
  const [specialization, setSpecialization] = useState(
    specializationsOptions[0]
  );
  const setSearchTerm = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => setTerm(value);

  const { data, isLoading } = useQueryData(
    `employees?role=Employee&specializationId=${specialization.value}&searchString=${searchString}`
  );

  useEffect(() => {
    privateClient
      .get(`specializations`)
      .json()
      .then((res: any) => {
        setSpecializationsOptions([
          ...specializationsOptions,
          ...res.map((spec: Specialization) => {
            return { label: spec.name, value: spec.id };
          }),
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!account) return null;

  const managerColumnNames = [
    "Profile Image",
    "First Name",
    "Last Name",
    "Specializations",
  ];

  const columnNames = managerColumnNames;

  return (
    <MiddlePanel>
      <BlueCard className="flex items-center justify-center p-6 mb-5 shadow-md">
        <p className="mr-4 text-4xl font-semibold">
          Manage employee specializations
        </p>

        <RoundedButton
          onClick={() => push(`/employees/specializations`)}
          className="w-10 text-sm font-medium text-center text-black shadow-md bg-primary-100 rounded-16"
        >
          Here
        </RoundedButton>
      </BlueCard>

      <WhiteCard padding="medium" className="flex-col">
        <div
          className="grid w-full gap-3 mb-4"
          style={{
            gridTemplateColumns:
              screenType === "fullscreen" ? "1fr" : "1fr 4fr",
          }}
        >
          <SelectBox
            value={specialization}
            options={specializationsOptions}
            onChange={setSpecialization}
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
          dataCount={data?.length}
        >
          {data?.map((employee: Employee) => {
            return (
              <TableRow
                key={employee.id}
                onClick={() => push(`employees/${employee.id}`)}
              >
                <ManagerDataRow employee={employee} />
              </TableRow>
            );
          })}
        </DataTable>
      </WhiteCard>
    </MiddlePanel>
  );
};
