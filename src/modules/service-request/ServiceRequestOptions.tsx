import React, { useContext, useState } from "react";
import { ServiceRequest } from "../../types";
import { RoundedButton } from "../../ui/RoundedButton";
import { OptionsPopover } from "../../ui/OptionsPopover";
import { SettingsIcon } from "../../ui/SettingsIcon";
import { AuthContext } from "../auth/AuthProvider";
import { modalConfirm } from "../../shared-components/ConfirmModal";
import { privateClient } from "../../lib/queryClient";
import {
  DotsHorizontal,
  OutlineCheckCircle,
  OutlineClock,
  OutlinePencilAlt,
  OutlineUserAdd,
  OutlineXCircle,
} from "../../icons";
import { showSuccessToast } from "../../lib/toasts";
import { AssignEmployeeModal } from "./AssignEmployeeModal";
import { SetExecutionDateModal } from "./SetExecutionDateModal";
import { useRouter } from "next/router";

interface ServiceRequestOptionsProps {
  service: ServiceRequest;
  onReFetch: () => void;
}

export const ServiceRequestOptions: React.FC<ServiceRequestOptionsProps> = ({
  service,
  onReFetch,
}) => {
  const { push } = useRouter();
  const { account } = useContext(AuthContext);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showExecutionDateModal, setShowExecutionDateModal] = useState(false);

  if (!account) return null;

  return (
    <>
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
        {account.role === "Manager" &&
          ["New", "Assigned", "InProgress"].includes(service.status) && (
            <SettingsIcon
              onClick={() => {
                setShowAssignModal(true);
              }}
              icon={<OutlineUserAdd height={17} width={17} />}
              label="Assign employee"
              transition
              transparent
            />
          )}
        {account.role === "Employee" &&
          ["Assigned", "InProgress"].includes(service.status) && (
            <SettingsIcon
              onClick={() => {
                setShowExecutionDateModal(true);
              }}
              icon={<OutlineClock height={17} width={17} />}
              label="Set execution date"
              transition
              transparent
            />
          )}
        {account.role === "Employee" && service.status === "Assigned" && (
          <>
            <SettingsIcon
              onClick={() => {
                modalConfirm(
                  "Are you sure you want start working on this service?",
                  () => {
                    privateClient
                      .put(`servicerequests/${service.id}/status`, {
                        json: {
                          status: "InProgress",
                        },
                      })
                      .then((res) => {
                        showSuccessToast("Service is now in progress.");
                        onReFetch();
                      })
                      .catch(() => {});
                  }
                );
              }}
              icon={<OutlineClock height={17} width={17} />}
              label="Start working"
              transition
              transparent
            />
          </>
        )}
        {["Manager", "Employee"].includes(account.role) &&
          service.status === "InProgress" && (
            <SettingsIcon
              onClick={() => {
                modalConfirm(
                  "Are you sure you want to mark this service as completed?",
                  () => {
                    privateClient
                      .put(`servicerequests/${service.id}/status`, {
                        json: {
                          status: "Completed",
                        },
                      })
                      .then(() => {
                        showSuccessToast("Service request has been completed.");
                        onReFetch();
                      })
                      .catch(() => {});
                  }
                );
              }}
              icon={<OutlineCheckCircle height={17} width={17} />}
              label="Mark as completed"
              transition
              transparent
              last
            />
          )}
        {["Customer", "Manager"].includes(account.role) &&
          ["New", "Assigned"].includes(service.status) && (
            <>
              <SettingsIcon
                onClick={() => {
                  push(`${service.id}/edit`);
                }}
                icon={<OutlinePencilAlt height={17} width={17} />}
                label="Edit service"
                transition
                transparent
                last
              />
              <SettingsIcon
                onClick={() => {
                  modalConfirm(
                    "Are you sure you want to cancel this service?",
                    () => {
                      privateClient
                        .put(`servicerequests/${service.id}/status`, {
                          json: {
                            status: "Cancelled",
                          },
                        })
                        .then((res) => {
                          showSuccessToast(
                            "Service request has been cancelled."
                          );
                          onReFetch();
                        })
                        .catch(() => {});
                    }
                  );
                }}
                icon={<OutlineXCircle height={17} width={17} />}
                label="Cancel service"
                transition
                transparent
              />
            </>
          )}
      </OptionsPopover>

      {showAssignModal && (
        <AssignEmployeeModal
          serviceId={service.id}
          onSubmit={onReFetch}
          onRequestClose={() => {
            setShowAssignModal(false);
          }}
        />
      )}

      {showExecutionDateModal && (
        <SetExecutionDateModal
          serviceId={service.id}
          onSubmit={onReFetch}
          onRequestClose={() => {
            setShowExecutionDateModal(false);
          }}
        />
      )}
    </>
  );
};
