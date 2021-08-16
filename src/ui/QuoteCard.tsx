import React from "react";
import { WhiteCard } from "./card/WhiteCard";
import { TitleText } from "./TitleText";
import { InfoText } from "./InfoText";
import { Quote, Role } from "../types";

export type QuoteCardProps = {
  className?: string;
  quote: Quote;
  type: Role;
  onClick?: () => void;
};

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  type,
  onClick,
}) => {
  const {
    referenceNumber,
    total,
    created,
    serviceRequest: { customer, address },
  } = quote;

  return (
    <WhiteCard onClick={onClick} className="flex-col w-full cursor-pointer">
      <div className="flex flex-col justify-between space-y-3 w-full font-semibold text-left">
        {type === "Manager" && <TitleText>{customer?.companyName}</TitleText>}
        {type === "Customer" && <TitleText>#{referenceNumber}</TitleText>}
        <InfoText className="text-xs">
          {address?.street}, <br className="hidden md:block" />
          {address?.zipCode} {address?.city}
        </InfoText>
        <InfoText className="text-xs">
          Quoted on: {new Date(created).toLocaleDateString()}
        </InfoText>
        <TitleText>{total} PLN</TitleText>
      </div>
    </WhiteCard>
  );
};
