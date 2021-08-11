import React from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { ServiceRequest } from "../../types";
import { useRouter } from "next/router";
import { CenterLoader } from "../../ui/CenterLoader";
import { TitleText } from "../../ui/TitleText";
import { ServiceCard } from "../../ui/ServiceCard";

interface ServicesInProgressListProps {}

export const ServicesInProgressList: React.FC<ServicesInProgressListProps> =
  ({}) => {
    const { push } = useRouter();
    const { data, isLoading } = useQueryData(
      `servicerequests?status=InProgress`
    );

    if (isLoading) return <CenterLoader />;
    if (!data) return null;

    return (
      <div className="flex flex-col flex-1 mt-6 mb-6 xl:ml-6 xl:mt-0">
        <TitleText size="md" className="mb-2 w-full">
          Services In Progress
        </TitleText>

        {data?.map((service: ServiceRequest) => (
          <ServiceCard
            key={service.id}
            service={service}
            onClick={() => {
              push(`/service-requests/[id]`, `/service-requests/${service.id}`);
            }}
          />
        ))}
      </div>
    );
  };
