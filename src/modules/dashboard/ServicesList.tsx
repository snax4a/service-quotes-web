import React from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { ServiceRequest } from "../../types";
import { useRouter } from "next/router";
import { CenterLoader } from "../../ui/CenterLoader";
import { TitleText } from "../../ui/TitleText";
import { ServiceCard } from "../../ui/ServiceCard";
import { InfoText } from "../../ui/InfoText";

interface ServicesListProps {}

export const ServicesList: React.FC<ServicesListProps> = ({}) => {
  const { push } = useRouter();
  const { data, isLoading } = useQueryData(`servicerequests?dateRange=30-days`);

  if (isLoading) return <CenterLoader />;

  return (
    <div className="flex flex-col flex-1 mt-6 mb-6 xl:mt-0 xl:ml-6">
      <TitleText size="md" className="mb-2 w-full">
        Your outsourced services
      </TitleText>

      {data?.length === 0 && (
        <InfoText>You have not requested any service in past 30 days.</InfoText>
      )}

      {data?.map((service: ServiceRequest) => (
        <ServiceCard
          key={service.id}
          service={service}
          withImage={false}
          onClick={() => {
            push(`/service-requests/[id]`, `/service-requests/${service.id}`);
          }}
        />
      ))}
    </div>
  );
};
