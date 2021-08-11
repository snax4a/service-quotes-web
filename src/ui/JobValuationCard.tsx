import React from "react";
import { WhiteCard } from "./card/WhiteCard";
import { InfoText } from "./InfoText";
import { ServiceRequestJobValuation } from "../types";
import { formatDateString } from "../lib/helpers";

export type JobValuationCardProps = {
  className?: string;
  srJobValuation: ServiceRequestJobValuation;
  onClick?: () => void;
};

export const JobValuationCard: React.FC<JobValuationCardProps> = ({
  srJobValuation,
  onClick,
}) => {
  const { jobValuation, date } = srJobValuation;

  return (
    <WhiteCard onClick={onClick} className="flex-col w-full cursor-pointer">
      <div className="flex flex-col justify-between text-left text-primary-800 w-full space-y-3 font-medium leading-4">
        <div className="flex justify-between">
          <h3>Date:</h3>
          <InfoText>{formatDateString(date)}</InfoText>
        </div>

        <div className="flex justify-between">
          <h3>Labor Hours:</h3>
          <InfoText>{jobValuation?.laborHours.substr(0, 5)}</InfoText>
        </div>

        <div className="flex justify-between">
          <h3>Hourly Rate:</h3>
          <InfoText>
            {jobValuation?.hourlyRate} <span className="text-tiny">PLN</span>
          </InfoText>
        </div>

        <h3>Work Type:</h3>
        <InfoText className="text-sm">{jobValuation?.workType}</InfoText>
      </div>
    </WhiteCard>
  );
};
