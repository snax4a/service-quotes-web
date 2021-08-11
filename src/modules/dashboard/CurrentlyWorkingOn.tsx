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
      <h2 className="text-center text-2xl font-semibold my-5">
        Currently you are not working on any service
      </h2>
    );
  }

  const { title, customerAddress, plannedExecutionDate } = data;
  const { street, city, zipCode } = customerAddress.address;

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-4xl lg:text-4.5xl font-semibold mb-2">
        Currently working on:
      </h2>

      <div className="flex items-center space-x-3 my-2">
        <OutlinePencil width={33} height={33} />
        <div className="flex flex-col text-lg2">
          <h4 className="font-semibold">Title:</h4>
          <p>{title}</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 my-3">
        <OutlineLocationMarker width={33} height={33} />
        <div className="flex flex-col text-lg2">
          <h4 className="font-semibold">Address:</h4>
          <p>
            {street}, {zipCode} {city}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3 my-3">
        <OutlineCalendar width={33} height={33} />
        <div className="flex flex-col text-lg2">
          <h4 className="font-semibold">Planned execution date:</h4>
          <p>{formatDateString(plannedExecutionDate, "intlDate")}</p>
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
