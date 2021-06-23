import React, { useContext } from "react";
import { Employee } from "../../types";
import { RoundedButton } from "../../ui/RoundedButton";
import { OptionsPopover } from "../../ui/OptionsPopover";
import { SettingsIcon } from "../../ui/SettingsIcon";
import { AuthContext } from "../auth/AuthProvider";
import { DotsHorizontal, OutlinePencilAlt } from "../../icons";
import { useRouter } from "next/router";

interface EmployeeOptionsProps {
  employee: Employee;
}

export const EmployeeOptions: React.FC<EmployeeOptionsProps> = ({
  employee,
}) => {
  const { push } = useRouter();
  const { account } = useContext(AuthContext);

  if (!account) return null;

  return (
    <OptionsPopover
      button={
        <RoundedButton>
          <DotsHorizontal height={17} width={17} />
        </RoundedButton>
      }
      className="text-primary-500 w-190"
      position="left"
      padding="p-0"
    >
      <SettingsIcon
        onClick={() => {
          push(`${employee.id}/edit`);
        }}
        icon={<OutlinePencilAlt height={17} width={17} />}
        label="Edit employee"
        transition
        transparent
        last
      />
    </OptionsPopover>
  );
};
