import React, { useContext, useEffect } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { statusesColors } from "../../ui/StatusBadge";
import { AuthContext } from "../auth/AuthProvider";
import { formatDateString } from "../../lib/helpers";
import { Avatar } from "../../ui/Avatar";
import { Customer } from "../../types";
import { privateClient } from "../../lib/queryClient";

interface PaymentDetailsProps { }

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({ }) => {
  const { account } = useContext(AuthContext);
  const { query, push } = useRouter();
  const screenType = useScreenType();
  const id = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQueryData(`payments/${id}`);
  
  if (!account) return null;
  if (!data) return null;

  var statusTextColorCSSString = "";
  if (data) {
    statusTextColorCSSString = statusesColors[data.status].replace(/(text-).+/g, "").replace("bg", "text");
  }

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
        <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"}>
          <div className="grid font-inter grid-cols-2 w-full gap-x-8 text-center text-primary-350 text-lg">

            <div className={`grid gap-y-6 ${account.role === "Manager" ? 'grid-rows-3' : 'grid-rows-2'}`}>
              {account.role === "Manager" ? (
                <div className="grid"
                  style={{
                    gridTemplateRows: "auto 1fr"
                  }}>
                  Customer
                  <div className="rounded-3xl border-2 border-primary-300 text-black font-bold text-lg2 p-4 flex content-center items-center mt-1">
                    <div className="m-auto">
                      <div className="flex flex-row content-center items-center">
                        AVATAR + COMPANY NAME HERE

                        {/* <div className="flex content-center items-center mr-3">
                          <Avatar
                            src={customer?.image || ""}
                            username={customer?.companyName}
                            className="rounded-full"
                            size="md"
                          />
                        </div>
                        <div className="">
                          {customer?.companyName}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : ""}

              <div className="grid"
                style={{
                  gridTemplateRows: "auto 1fr"
                }}>
                Quote Reference Number
                <div className="rounded-3xl border-2 border-primary-300 text-black font-bold text-lg2 p-4 flex content-center items-center mt-1">
                  <span className="w-full">
                    {data.quoteId}
                  </span>
                </div>
              </div>

              <div className="grid"
                style={{
                  gridTemplateRows: "auto 1fr"
                }}>
                Payment Provider
                <div className="rounded-3xl border-2 border-primary-300 text-black font-bold text-lg2 p-4 flex content-center items-center mt-1">
                  <span className="w-full">
                    {data.provider}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-rows-4 gap-y-6">

              <div>
                <p className="mb-1">
                  Transaction ID
                </p>
                <div className="rounded-3xl border-2 border-primary-300 text-black font-bold text-lg2 p-4">
                  {data.transactionId}
                </div>
              </div>

              <div>
                <p className="mb-1">
                  Amount
                </p>
                <div className="rounded-3xl border-2 border-primary-300 text-black font-bold text-lg2 p-4">
                  {data.amount} PLN
                </div>
              </div>

              <div>
                <p className="mb-1">
                  Status
                </p>
                <div className={`rounded-3xl border-2 border-primary-300 ${statusTextColorCSSString} font-bold text-lg2 p-4`}>
                  {data.status.toUpperCase()}
                </div>
              </div>

              <div>
                <p className="mb-1">
                  Date and Time
                </p>
                <div className="rounded-3xl border-2 border-primary-300 text-black font-bold text-lg2 p-4">
                  {formatDateString(data.date, "intlDate")}
                </div>
              </div>
            </div>
          </div>
        </WhiteCard>
      </div>
    </MiddlePanel>
  );
};