import React, { useContext } from "react";
import { CustomerAddress } from "../../types";
import { RoundedButton } from "../../ui/RoundedButton";
import { OptionsPopover } from "../../ui/OptionsPopover";
import { SettingsIcon } from "../../ui/SettingsIcon";
import { AuthContext } from "../auth/AuthProvider";
import { DotsHorizontal, OutlineNotepad, OutlineTrash } from "../../icons";
import { useRouter } from "next/router";
import { privateClient } from "../../lib/queryClient";
import { showSuccessToast } from "../../lib/toasts";

interface AddressOptionsProps {
  customerAddress: CustomerAddress;
}

export const AddressOptions: React.FC<AddressOptionsProps> = ({
  customerAddress,
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
          push(`${customerAddress.address.id}/edit`);
        }}
        icon={<OutlineNotepad height={17} width={17} />}
        label="Edit address"
        transition
        transparent
        last
      />
      <SettingsIcon
        onClick={() => {
          privateClient
            .delete(
              `customers/${account.customerId}/address/${customerAddress.address.id}`
            )
            .then(() => {
              showSuccessToast("Address has been removed.");
              push(`/addresses`);
            })
            .catch(() => {});
        }}
        icon={<OutlineTrash height={17} width={17} />}
        label="Delete address"
        transition
        transparent
        last
      />
    </OptionsPopover>
  );
};
