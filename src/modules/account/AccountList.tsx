import React, { useContext, useState } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { Avatar } from "../../ui/Avatar";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { SearchBar } from "../../ui/SearchBar";
import { SelectBox } from "../../ui/SelectBox";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext, Account } from "../auth/AuthProvider";
import { CenterLoader } from "../../ui/CenterLoader";
import { Button } from "../../ui/Button";
import { SolidPlus } from "../../icons";

const roleOptions = [
  {
    label: "All Roles",
    value: "",
  },
  {
    label: "Customers",
    value: "customer",
  },
  {
    label: "Employees",
    value: "employee",
  },
  {
    label: "Managers",
    value: "manager",
  },
];

interface AccountListProps {}

export const AccountList: React.FC<AccountListProps> = ({}) => {
  const { account } = useContext(AuthContext);
  const { push } = useRouter();
  const screenType = useScreenType();
  const [term, setTerm] = useState("");
  const [searchString, setSearchString] = useState("");
  const [role, setRole] = useState(roleOptions[0]);
  const setSearchTerm = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => setTerm(value);

  const { data, isLoading } = useQueryData(
    `accounts?role=${role.value}&searchString=${searchString}`
  );

  if (!account) return null;

  const managerColumnNames = ["Image", "Email", "Role", "Account ID"];

  const columnNames = managerColumnNames;

  return (
    <MiddlePanel>
      <WhiteCard padding="medium" className="flex-col">
        <div
          className="grid gap-3 w-full mb-4"
          style={{
            gridTemplateColumns:
              screenType === "fullscreen" ? "1fr" : "1fr 3fr 1fr",
          }}
        >
          <SelectBox value={role} options={roleOptions} onChange={setRole} />
          <SearchBar
            value={term}
            onChange={setSearchTerm}
            onSearch={() => setSearchString(term)}
          />

          <Button
            icon={<SolidPlus />}
            onClick={() => push(`accounts/create`)}
            size="small"
          >
            Add New
          </Button>
        </div>

        <DataTable
          columns={columnNames}
          isLoading={isLoading}
          dataCount={data?.length}
        >
          {!data && <CenterLoader />}
          {data?.map((acc: Account) => {
            return (
              <TableRow key={acc.id} onClick={() => push(`accounts/${acc.id}`)}>
                <TableCell className="py-5 flex space-x-3">
                  <div className="hidden md:block">
                    <Avatar
                      src={acc?.image || "/img/avatar-placeholder.png"}
                      isBase64={!!acc.image}
                      className="rounded-2xl"
                      size="md"
                    />
                  </div>
                </TableCell>
                <TableCell className="py-5 text-sm text-primary-600 font-normal">
                  {acc.email}
                </TableCell>
                <TableCell className="py-5 text-sm font-normal">
                  {acc.role}
                </TableCell>
                <TableCell className="py-5 text-sm font-normal">
                  {acc.id}
                </TableCell>
              </TableRow>
            );
          })}
        </DataTable>
      </WhiteCard>
    </MiddlePanel>
  );
};
