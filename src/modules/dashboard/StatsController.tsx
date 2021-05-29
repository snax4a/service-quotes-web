import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Quote } from "../../types";
import { CenterLoader } from "../../ui/CenterLoader";
import { QuoteCard } from "../../ui/QuoteCard";
import { AuthContext } from "../auth/AuthProvider";
import { MiddlePanel } from "../layouts/GridPanels";
import { TitleText } from "../../ui/TitleText";
import useQueryData from "../../shared-hooks/useQueryData";
import { BlueCard } from "../../ui/card/BlueCard";
import { Button } from "../../ui/Button";

interface StatsControllerProps {}

export const StatsController: React.FC<StatsControllerProps> = ({}) => {
  const { push } = useRouter();
  const { account } = useContext(AuthContext);
  const { data, isLoading } = useQueryData("quotes/unpaid");

  if (!account) return null;
  if (isLoading) return <CenterLoader />;
  if (!data) return null;

  return (
    <MiddlePanel>
      <div className={`flex flex-1 flex-col`}>
        <div className="max-w-2xl">
          <BlueCard
            shadowEffect={true}
            className="p-7 space-y-5 md:space-x-6 items-center flex-col md:flex-row"
          >
            {account.role === "Manager" && (
              <>
                <Image src="/img/analytics.png" width={270} height={287} />
                <div className="flex flex-col space-y-5">
                  <h1 className="text-4.5xl font-semibold leading-12">
                    Top 3
                    <br />
                    customers
                    <br />
                    this month
                  </h1>
                  <Button color="white" size="bigRounded" onClick={() => {}}>
                    See Now
                  </Button>
                </div>
              </>
            )}
            {account.role === "Customer" && (
              <>
                <Image src="/img/form.png" width={233} height={314} />
                <div className="flex flex-col space-y-5">
                  <h1 className="text-4.5xl font-semibold leading-11">
                    Fill in the form
                    <br />
                    to request
                    <br />a service!
                  </h1>
                  <Button
                    color="white"
                    size="bigRounded"
                    onClick={() => push("/service-requests/new")}
                  >
                    Request a Service
                  </Button>
                </div>
              </>
            )}
            {account.role === "Employee" && (
              <>
                <Image src="/img/form.png" width={233} height={314} />
                <div className="flex flex-col space-y-5">
                  <h1 className="text-4.5xl font-semibold leading-11">
                    Fill in the form
                    <br />
                    to request
                    <br />a service!
                  </h1>
                  <Button
                    color="white"
                    size="bigRounded"
                    onClick={() => push("/service-requests/new")}
                  >
                    Request a Service
                  </Button>
                </div>
              </>
            )}
          </BlueCard>
        </div>
        <TitleText size="md" className="mt-7.5 mb-4.5">
          Unpaid quotes
        </TitleText>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-2xl">
          {data?.map((quote: Quote) => (
            <QuoteCard
              key={quote.id}
              type={account.role}
              quote={quote}
              onClick={() => {
                push(`/quote/[id]`, `/quote/${quote.id}`);
              }}
            />
          ))}
        </div>
      </div>
    </MiddlePanel>
  );
};
