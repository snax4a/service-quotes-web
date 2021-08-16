import React, { useContext, useState } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext } from "../auth/AuthProvider";
import Image from "next/image";
import { Button } from "../../ui/Button";
import { privateClient } from "../../lib/queryClient";
import { showErrorToast } from "../../lib/toasts";

interface PaymentMethodSelectionProps {}

export const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> =
  ({}) => {
    const { account } = useContext(AuthContext);
    const { query } = useRouter();
    const screenType = useScreenType();
    const id = typeof query.id === "string" ? query.id : "";
    const { data, isLoading } = useQueryData(`quotes/${id}`);
    const [selectedMethod, setSelectedMethod] = useState("Paynow");
    const [isSendingRequest, setIsSendingRequest] = useState(false);

    if (!account) return null;

    return (
      <MiddlePanel>
        <WhiteCard
          showContentLoader={isLoading}
          padding={screenType === "fullscreen" ? "medium" : "big"}
          className="flex-row"
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="flex flex-col w-full">
              <h4 className="mb-5 text-lg">Payment details</h4>

              <div className="flex flex-col flex-1 justify-between py-5 px-4 text-lg font-semibold text-center border text-primary-400 border-primary-200 rounded-16">
                <div>
                  <p>Pament for Quote:</p>
                  <p className="text-primary-800 text-2xls">
                    #{data?.referenceNumber}
                  </p>
                </div>

                <div className="text-green">
                  <h3 className="leading-8 text-4.5xl">{data?.total}</h3>
                  <h5 className="text-2xls">PLN</h5>
                </div>

                <div>
                  <p>Email:</p>
                  <p className="text-sm font-medium">{account.email}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <h4 className="mb-5 text-lg">Choose payment method</h4>

              <div className="flex flex-col space-y-5">
                <div
                  className="grid p-5 border-2 cursor-pointer border-blue rounded-16"
                  style={{
                    gridTemplateColumns: `40px 1fr`,
                  }}
                >
                  <input
                    type="checkbox"
                    className="mt-2 w-3.5 h-3.5 rounded-4"
                    checked={selectedMethod === "Paynow"}
                    onChange={() => setSelectedMethod("Paynow")}
                  />

                  <div className="space-y-3 text-xs text-primary-400">
                    <img src="/img/paynow-logo-big.svg" />

                    <p>
                      Paynow gateway provides easy and instant payments by wire
                      transfer, BLIK or credit card.
                    </p>
                  </div>
                </div>

                <div
                  className="grid py-3 px-5 border cursor-not-allowed border-primary-200 rounded-16"
                  style={{
                    gridTemplateColumns: `40px 1fr`,
                  }}
                >
                  <input
                    type="checkbox"
                    className="mt-2 w-3.5 h-3.5 rounded-4"
                    checked={selectedMethod === "Paypal"}
                    onChange={() => {}}
                  />

                  <div className="space-y-3 text-xs text-primary-400">
                    <img src="/img/paypal-logo.svg" />

                    <p>Currently unavailable...</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="self-center">
              <Button
                color="secondary"
                size="bigRounded"
                className="mt-5 w-full"
                loading={isSendingRequest}
                onClick={() => {
                  setIsSendingRequest(true);
                  privateClient
                    .post(`payments`, {
                      json: {
                        quoteId: data.id,
                        provider: selectedMethod,
                      },
                    })
                    .json()
                    .then((res: any) => {
                      if (res.redirectUrl) {
                        location.href = res.redirectUrl;
                      } else {
                        showErrorToast(`Creating payment was not successfull.`);
                      }
                    })
                    .catch((err) => {
                      console.error(err);
                      showErrorToast(`Creating payment was not successfull.`);
                    })
                    .finally(() => setIsSendingRequest(false));
                }}
              >
                PAY
              </Button>
            </div>
          </div>
        </WhiteCard>
      </MiddlePanel>
    );
  };
