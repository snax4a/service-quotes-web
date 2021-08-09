import React, { useContext } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext } from "../auth/AuthProvider";
import { formatDateString } from "../../lib/helpers";
import { StatusBadge } from "../../ui/StatusBadge";
import { PaymentProviderLogo } from "../../ui/PaymentProviderLogo";
import { Avatar } from "../../ui/Avatar";

interface PaymentDetailsProps {}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({}) => {
  const { account } = useContext(AuthContext);
  const { query } = useRouter();
  const screenType = useScreenType();
  const id = typeof query.id === "string" ? query.id : "";
  const isPaymentReturn = id === "paynow-return";
  const fetchUrl = !isPaymentReturn
    ? `payments/${id}`
    : `payments/transaction/${query?.paymentId}`;
  const { data, isLoading } = useQueryData(fetchUrl);

  if (!account) return null;

  return (
    <MiddlePanel>
      <div
        className="grid gap-5 pb-6"
        style={{
          gridTemplateColumns: ["3-cols", "2-cols"].includes(screenType)
            ? "1fr"
            : "1fr",
        }}
      >
        <WhiteCard
          showContentLoader={isLoading}
          padding={screenType === "fullscreen" ? "medium" : "big"}
        >
          {data ? (
            <div className="grid font-inter grid-cols-2 w-full gap-x-7 text-center text-primary-350 text-lg">
              <div
                className={`grid gap-y-6 ${
                  account.role === "Manager" ? "grid-rows-3" : "grid-rows-2"
                }`}
              >
                {account.role === "Manager" ? (
                  <div
                    className="grid"
                    style={{
                      gridTemplateRows: "auto 1fr",
                    }}
                  >
                    Customer
                    <div className="rounded-3xl border-2 border-primary-300 text-black font-bold text-lg2 p-4 flex content-center items-center mt-1">
                      <div className="m-auto">
                        <div className="flex flex-row content-center items-center">
                          <div className="flex content-center items-center mr-3">
                            <Avatar
                              src={data?.customer?.image || ""}
                              username={data?.customer?.companyName}
                              className="rounded-full"
                              size="md"
                            />
                          </div>
                          <div className="">{data?.customer?.companyName}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div
                  className="grid"
                  style={{
                    gridTemplateRows: "auto 1fr",
                  }}
                >
                  Quote Reference Number
                  <div className="rounded-3xl border-2 border-primary-300 text-black font-bold text-lg2 p-4 flex content-center items-center mt-1">
                    <span className="w-full">
                      # {data?.quote?.referenceNumber}
                    </span>
                  </div>
                </div>

                <div
                  className="grid"
                  style={{
                    gridTemplateRows: "auto 1fr",
                  }}
                >
                  Payment Provider
                  <div className="rounded-3xl border-2 border-primary-300 text-black font-bold text-lg2 p-4 flex content-center items-center mt-1">
                    <span className="w-full">
                      <PaymentProviderLogo providerName={data?.provider} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-rows-4 gap-y-4">
                <div>
                  <p className="mb-1">Transaction ID</p>
                  <div className="rounded-3xl border-2 border-primary-300 text-black font-bold text-lg2 p-4">
                    {data?.transactionId}
                  </div>
                </div>

                <div>
                  <p className="mb-1">Amount</p>
                  <div className="rounded-3xl border-2 border-primary-300 text-black font-bold text-lg2 p-4">
                    {data?.amount} PLN
                  </div>
                </div>

                <div>
                  <p className="mb-1">Status</p>
                  <div
                    className={`rounded-3xl border-2 border-primary-300 font-bold text-lg2 p-4`}
                  >
                    {<StatusBadge status={data?.status} />}
                  </div>
                </div>

                <div>
                  <p className="mb-1">Created</p>
                  <div className="rounded-3xl border-2 border-primary-300 text-black font-bold text-lg2 p-4">
                    {data?.created &&
                      formatDateString(data.created, "intlDate")}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Payment not found.</p>
          )}
        </WhiteCard>
      </div>
    </MiddlePanel>
  );
};
