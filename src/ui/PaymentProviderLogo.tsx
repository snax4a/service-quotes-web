import React from "react";
import Image from "next/image";

interface PaymentProviderLogoProps {
  providerName: string;
}

export const PaymentProviderLogo: React.FC<PaymentProviderLogoProps> = ({
  providerName,
}) => {
  const logoSources: any = {
    Paynow: "/img/paynow-logo.svg",
  };
  const hasLogo = !!logoSources[providerName];

  return (
    <>
      {hasLogo ? (
        <Image height={74} width={175} src={logoSources[providerName]} />
      ) : (
        providerName
      )}
    </>
  );
};
