import React, { ReactNode, useState } from "react";
import { BaseOverlay } from "../ui/BaseOverlay";
import { SettingsIcon } from "../ui/SettingsIcon";
import { SolidUser } from "../icons";
import { useRouter } from "next/router";

export const SettingsDropdown: React.FC<{
  onCloseDropdown: () => void;
  onActionButtonClicked: () => void;
}> = ({ onCloseDropdown, onActionButtonClicked }) => {
  const [currentOverlay, setCurrentOverlay] = useState<ReactNode>(null);
  const { push } = useRouter();

  return (
    <div
      className="flex whitespace-nowrap overflow-ellipsis"
      style={{ width: 200 }}
    >
      <BaseOverlay
        onActionButtonClicked={onActionButtonClicked}
        actionButton="Logout"
        overlay={currentOverlay}
      >
        <div className="flex flex-col">
          <SettingsIcon
            onClick={() => {
              onCloseDropdown();
              push("/account/details");
            }}
            icon={<SolidUser />}
            label="Account details"
            transition
          />
        </div>
      </BaseOverlay>
    </div>
  );
};
