import React, { useContext } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { InfoText } from "../../ui/InfoText";
import { CenterLoader } from "../../ui/CenterLoader";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { ServiceRequestJobValuation, Material, UUID } from "../../types";
import { StatusBadge } from "../../ui/StatusBadge";
import { AuthContext } from "../auth/AuthProvider";
import { Button } from "../../ui/Button";
import SvgOutlineCreditCard from "../../icons/OutlineCreditCard";
import { formatDateString } from "../../lib/helpers";

interface ServiceMaterialsProps {
  serviceId: UUID;
}

export const ServiceMaterials: React.FC<ServiceMaterialsProps> = ({
  serviceId,
}) => {
  const { data, isLoading } = useQueryData(
    `servicerequests/${serviceId}/materials`
  );

  if (isLoading) {
    return <CenterLoader />;
  }

  return (
    <table className="mt-3 w-full text-sm2">
      <thead>
        <tr className="font-medium text-primary-400 font-inter border-b-1 border-primary-350">
          <td className="py-2">Description</td>
          <td className="py-2">Quantity</td>
          <td className="py-2">Unit Price</td>
        </tr>
      </thead>
      <tbody>
        {data.map((material: Material) => (
          <tr key={material.id} className="border-b-1 border-primary-350">
            <td className="py-2 pl-1">{material.description}</td>
            <td className="py-2 pl-1">{material.quantity}</td>
            <td className="py-2 pl-1 text-orange">{material.unitPrice} PLN</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface ServiceJobValuationsProps {
  serviceId: UUID;
}

export const ServiceJobValuations: React.FC<ServiceJobValuationsProps> = ({
  serviceId,
}) => {
  const { data, isLoading } = useQueryData(
    `servicerequests/${serviceId}/job-valuations`
  );

  if (isLoading) {
    return <CenterLoader />;
  }

  return (
    <table className="mt-3 w-full text-sm2">
      <thead>
        <tr className="font-medium text-primary-400 font-inter border-b-1 border-primary-350">
          <td className="py-2">Work Type</td>
          <td className="py-2">Labor Hours</td>
          <td className="py-2">Hourly Rate</td>
        </tr>
      </thead>
      <tbody>
        {data.map((srjv: ServiceRequestJobValuation) => (
          <tr
            key={srjv.jobValuation.id}
            className="border-b-1 border-primary-350"
          >
            <td className="py-2 pl-1">{srjv.jobValuation.workType}</td>
            <td className="py-2 pl-1">{srjv.jobValuation.laborHours}</td>
            <td className="py-2 pl-1 text-orange">
              {srjv.jobValuation.hourlyRate} PLN
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface QuoteDetailsProps {}

export const QuoteDetails: React.FC<QuoteDetailsProps> = ({}) => {
  const screenType = useScreenType();
  const { account } = useContext(AuthContext);
  const { query, push } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQueryData(`quotes/${id}`);

  if (!account) return null;

  if (isLoading) {
    return <CenterLoader />;
  }

  if (!data) {
    return (
      <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"}>
        Quote not found.
      </WhiteCard>
    );
  }

  const { address } = data.serviceRequest;

  return (
    <MiddlePanel>
      <div
        className="grid gap-5 pb-6"
        style={{
          gridTemplateColumns: ["3-cols", "2-cols"].includes(screenType)
            ? "2fr 1fr"
            : "1fr",
        }}
      >
        <WhiteCard padding="big" className="flex-col">
          <div className="flex justify-between pb-3 border-b-1 border-primary-350">
            <h2 className="font-medium text-2xls">
              Quote #{data.referenceNumber}
            </h2>
            <h3 className="text-primary-500">
              {formatDateString(data.created, "intlDate")}
            </h3>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Materials used:</h3>
            <ServiceMaterials serviceId={data.serviceRequest.id} />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Job valuations:</h3>
            <ServiceJobValuations serviceId={data.serviceRequest.id} />
          </div>

          <div className="flex justify-between mt-7 text-5xl font-semibold">
            <h1>Total:</h1>
            <h1 className="text-orange">{data.total.toFixed(2)} PLN</h1>
          </div>

          {account.role === "Customer" && data.status === "Unpaid" ? (
            <Button
              color="secondary"
              size="bigRounded"
              className="mt-5"
              icon={
                <SvgOutlineCreditCard
                  className="text-white"
                  height={22}
                  width={22}
                />
              }
              onClick={() => {
                push({
                  pathname: "/quotes/[quoteId]/pay",
                  query: { quoteId: id },
                });
              }}
            >
              PAY NOW
            </Button>
          ) : (
            <div className="flex justify-between mt-4 text-2xl font-semibold">
              <h1>Status:</h1>
              <h1 className="text-orange">
                <StatusBadge status={data.status} />
              </h1>
            </div>
          )}
        </WhiteCard>

        <WhiteCard padding="big" className="flex-col">
          <h2 className="font-medium text-2xls">Service Request</h2>
          <h3 className="mt-6 text-lg font-medium">Title:</h3>
          <p className="text-sm text-primary-500">
            {data.serviceRequest.title}
          </p>
          <h3 className="mt-6 text-lg font-medium">Description:</h3>
          <p className="text-sm text-primary-500">
            {data.serviceRequest.description}
          </p>
          <h3 className="mt-6 text-lg font-medium">Address:</h3>
          <p className="text-sm text-primary-500">
            {address.street}, {address.zipCode} {address.city}
          </p>
          <h3 className="mt-6 text-lg font-medium">Status:</h3>
          <p className="text-sm text-primary-500">
            {data.serviceRequest.status}
          </p>
          <h3 className="mt-6 text-lg font-medium">Created At:</h3>
          <p className="text-sm text-primary-500">
            {formatDateString(data.serviceRequest.created, "intlDate")}
          </p>
          <h3 className="mt-6 text-lg font-medium">Completed At:</h3>
          <p className="text-sm text-primary-500">
            {data.serviceRequest.completionDate
              ? formatDateString(data.serviceRequest.completionDate, "intlDate")
              : null}
          </p>
        </WhiteCard>
      </div>
    </MiddlePanel>
  );
};
