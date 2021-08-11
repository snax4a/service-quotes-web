import React from "react";
import { WhiteCard } from "./card/WhiteCard";
import { TitleText } from "./TitleText";
import { InfoText } from "./InfoText";
import { ServiceRequest } from "../types";
import { Avatar } from "./Avatar";
import { SolidCheveronRight } from "../icons";

export type ServiceCardProps = {
  className?: string;
  withImage?: boolean;
  service: ServiceRequest;
  onClick?: () => void;
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  withImage = true,
  onClick,
}) => {
  const { customer, customerAddress, title } = service;

  return (
    <WhiteCard
      onClick={onClick}
      className="flex-1 w-full self-start cursor-pointer my-1"
    >
      {withImage && (
        <Avatar
          src={customer?.image || ""}
          username={customer?.companyName}
          className="rounded-2xl"
          size="md"
        />
      )}

      <div className="flex flex-col flex-1 justify-between ml-4">
        <TitleText>{title}</TitleText>
        <InfoText className="text-sm2 font-semibold">
          {customerAddress?.address?.street} {customerAddress?.address?.zipCode}
          , {customerAddress?.address?.city}
        </InfoText>
      </div>

      <SolidCheveronRight width={20} height={20} className="mr-1" />
    </WhiteCard>
  );
};
