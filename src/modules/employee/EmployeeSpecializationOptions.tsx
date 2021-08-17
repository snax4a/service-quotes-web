import React, { useContext } from "react";
import { Specialization, UUID } from "../../types";
import { OptionsPopover } from "../../ui/OptionsPopover";
import { SettingsIcon } from "../../ui/SettingsIcon";
import { AuthContext } from "../auth/AuthProvider";
import { OutlineTrash } from "../../icons";
import { privateClient } from "../../lib/queryClient";
import { BlueCard } from "../../ui/card/BlueCard";
import { showSuccessToast } from "../../lib/toasts";

interface EmployeeSpecializationOptions {
  specialization: Specialization;
  employeeId: UUID;
  fetch: any;
}

export const EmployeeSpecializationOptions: React.FC<EmployeeSpecializationOptions> =
  ({ specialization, employeeId, fetch }) => {
    const { account } = useContext(AuthContext);

    if (!account) return null;

    return (
      <OptionsPopover
        button={
          <BlueCard
            className="justify-center py-0.5 px-2 mr-2 w-min text-sm rounded-sm"
            key={specialization.id}
          >
            {specialization.name}
          </BlueCard>
        }
        className="text-primary-500 w-190"
        position="left"
        padding="p-0"
      >
        <SettingsIcon
          onClick={() => {
            privateClient
              .delete(
                `employees/${employeeId}/specializations/${specialization.id}`
              )
              .then(() => {
                showSuccessToast("Specialization has been removed.");
                fetch();
              })
              .catch(() => {});
          }}
          icon={<OutlineTrash height={17} width={17} />}
          label="Remove"
          transition
          transparent
          last
        />
      </OptionsPopover>
    );
  };
