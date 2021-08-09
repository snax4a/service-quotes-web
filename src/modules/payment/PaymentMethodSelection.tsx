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
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="flex flex-col w-full">
              <h4 className="text-lg mb-5">Payment details</h4>

              <div className="flex flex-col flex-1 justify-between text-center text-primary-400 text-lg font-semibold border border-primary-200 rounded-16 py-5 px-4">
                <div>
                  <p>Pament for Quote:</p>
                  <p className="text-primary-800 text-2xls">
                    #{data?.referenceNumber}
                  </p>
                </div>

                <div className="text-green">
                  <h3 className="text-4.5xl leading-8">{data?.total}</h3>
                  <h5 className="text-2xls">PLN</h5>
                </div>

                <div>
                  <p>Email:</p>
                  <p className="text-sm font-medium">{account.email}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <h4 className="text-lg mb-5">Choose payment method</h4>

              <div className="flex flex-col space-y-5">
                <div
                  className="grid border-2 border-blue rounded-16 p-5 cursor-pointer"
                  style={{
                    gridTemplateColumns: `40px 1fr`,
                  }}
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded-4 mt-2"
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
                  className="grid border border-primary-200 rounded-16 px-5 py-3 cursor-not-allowed"
                  style={{
                    gridTemplateColumns: `40px 1fr`,
                  }}
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded-4 mt-2"
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
