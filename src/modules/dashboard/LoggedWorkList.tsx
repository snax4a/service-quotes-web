import React from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { ServiceRequestJobValuation } from "../../types";
import { useRouter } from "next/router";
import { CenterLoader } from "../../ui/CenterLoader";
import { TitleText } from "../../ui/TitleText";
import { JobValuationCard } from "../../ui/JobValuationCard";
import { InfoText } from "../../ui/InfoText";

interface LoggedWorkListProps {}

export const LoggedWorkList: React.FC<LoggedWorkListProps> = () => {
  const { push } = useRouter();
  const { data, isLoading } = useQueryData("servicerequests/job-valuations/3");

  if (isLoading) return <CenterLoader />;

  return (
    <>
      <TitleText size="md" className="mt-7.5 mb-4.5">
        Last logged work
      </TitleText>
      {data?.length === 0 && (
        <InfoText>You have not logged any work yet.</InfoText>
      )}
      <div className="grid grid-cols-1 gap-4 max-w-2xl md:grid-cols-3 md:gap-5">
        {data?.map((srjv: ServiceRequestJobValuation) => (
          <JobValuationCard
            key={srjv.jobValuation.id}
            srJobValuation={srjv}
            onClick={() => {
              push(
                `/service-requests/[id]`,
                `/service-requests/${srjv.serviceRequestId}`
              );
            }}
          />
        ))}
      </div>
    </>
  );
};
