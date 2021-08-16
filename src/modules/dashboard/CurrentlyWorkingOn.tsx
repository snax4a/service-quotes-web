import React from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { useRouter } from "next/router";
import { CenterLoader } from "../../ui/CenterLoader";
import { Button } from "../../ui/Button";
import {
  OutlineCalendar,
  OutlineLocationMarker,
  OutlinePencil,
} from "../../icons";
import { formatDateString } from "../../lib/helpers";

interface CurrentlyWorkingOnProps {}

export const CurrentlyWorkingOn: React.FC<CurrentlyWorkingOnProps> = ({}) => {
  const { push } = useRouter();
  const { data, isLoading } = useQueryData(
    `servicerequests/currently-working-on`
  );

  if (isLoading) return <CenterLoader />;

  if (!data) {
    return (
      <h2 className="my-5 text-2xl font-semibold text-center">
        Currently you are not working on any service
      </h2>
    );
  }

  const { title, customerAddress, plannedExecutionDate } = data;
  const { street, city, zipCode } = customerAddress.address;

  return (
    <div className="flex flex-col flex-1">
      <h2 className="mb-2 text-4xl font-semibold lg:text-4.5xl">
        Currently working on:
      </h2>

      <div className="flex items-center my-2 space-x-3">
        <OutlinePencil width={33} height={33} />
        <div className="flex flex-col text-lg2">
          <h4 className="font-semibold">Title:</h4>
          <p>{title}</p>
        </div>
      </div>

      <div className="flex items-center my-3 space-x-3">
        <OutlineLocationMarker width={33} height={33} />
        <div className="flex flex-col text-lg2">
          <h4 className="font-semibold">Address:</h4>
          <p>
            {street}, {zipCode} {city}
          </p>
        </div>
      </div>

      <div className="flex items-center my-3 space-x-3">
        <OutlineCalendar width={33} height={33} />
        <div className="flex flex-col text-lg2">
          <h4 className="font-semibold">Planned execution date:</h4>
          <p>
            {plannedExecutionDate
              ? formatDateString(plannedExecutionDate, "intlDate")
              : "not set"}
          </p>
        </div>
      </div>

      <Button
        color="white"
        size="medium"
        className="mt-3"
        onClick={() => push(`/service-requests/${data?.id}`)}
      >
        More details
      </Button>
    </div>
  );
};
