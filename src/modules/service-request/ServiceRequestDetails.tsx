import React, { useContext, useState } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { InfoText } from "../../ui/InfoText";
import { CenterLoader } from "../../ui/CenterLoader";
import { ServiceRequestJobValuation, Material, UUID } from "../../types";
import { StatusBadge } from "../../ui/StatusBadge";
import { AuthContext } from "../auth/AuthProvider";
import { formatDateString } from "../../lib/helpers";
import { Avatar } from "../../ui/Avatar";
import { OutlinePhone } from "../../icons";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { ServiceRequestOptions } from "./ServiceRequestOptions";
import { AssignedEmployees } from "../../ui/AssignedEmployees";

interface ServiceRequestDetailsProps {}

export const ServiceRequestDetails: React.FC<ServiceRequestDetailsProps> =
  ({}) => {
    const screenType = useScreenType();
    const { account } = useContext(AuthContext);
    const { query } = useRouter();
    const id = typeof query.id === "string" ? query.id : "";
    const { data, isLoading, fetch } = useQueryData(`servicerequests/${id}`);

    if (!account) return null;

    if (isLoading) {
      return <CenterLoader />;
    }

    if (!data) {
      return <InfoText>Could not find service request</InfoText>;
    }

    const { customer, address, assignedEmployees } = data;

    return (
      <MiddlePanel>
        <div className="flex flex-col pb-6">
          <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"}>
            <div
              className="grid w-full font-inter"
              style={{
                gridTemplateColumns:
                  account.role === "Customer" ? "1fr" : `50px 1fr`,
                gridGap: 20,
              }}
            >
              <Avatar
                src={customer?.image || ""}
                username={customer?.companyName}
                size="md"
              />
              <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                  <div className="flex flex-col">
                    <p className="text-blue font-semibold">
                      {customer?.companyName}
                    </p>
                    <div className="flex space-x-4 font-semibold text-sm2 text-primary-500">
                      <p className="">
                        {address?.street}, {address?.zipCode} {address?.city}
                      </p>
                      {account.role !== "Customer" && (
                        <span className="flex text-orange">
                          <OutlinePhone height={20} width={20} />
                          {address?.phoneNumber}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col text-sm2 text-primary-500 mt-4 lg:mt-0 lg:text-right">
                    <p className="text-primary-500 text-sm2">
                      Requested on: {formatDateString(data.created, "intlDate")}
                    </p>
                    {data.plannedExecutionDate && (
                      <p className="">
                        Planned execution date:{" "}
                        {formatDateString(
                          data.plannedExecutionDate,
                          "intlDate"
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <p className="font-semibold">{data.title}</p>
                  <StatusBadge status={data.status} />
                </div>

                <p className="text-sm text-primary-500 mt-3 md:mt-1 max-w-3xl">
                  {data.description}
                </p>

                <div className="flex justify-between items-end mt-4">
                  <AssignedEmployees employees={assignedEmployees} />

                  {!["Completed", "Cancelled"].includes(data.status) &&
                    !(
                      account.role === "Customer" &&
                      !["New", "Assigned"].includes(data.status)
                    ) && (
                      <ServiceRequestOptions service={data} onReFetch={fetch} />
                    )}
                </div>
              </div>
            </div>
          </WhiteCard>
        </div>
      </MiddlePanel>
    );
  };
