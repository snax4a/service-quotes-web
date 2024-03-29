import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AuthContext } from "../auth/AuthProvider";
import { MiddlePanel } from "../layouts/GridPanels";
import { BlueCard } from "../../ui/card/BlueCard";
import { Button } from "../../ui/Button";
import { UnpaidQuotesList } from "./UnpaidQuotesList";
import { ServicesInProgressList } from "./ServicesInProgressList";
import { ServicesAssignedToList } from "./ServicesAssignedToList";
import { CurrentlyWorkingOn } from "./CurrentlyWorkingOn";
import { LoggedWorkList } from "./LoggedWorkList";
import { ServicesList } from "./ServicesList";

interface StatsControllerProps {}

export const StatsController: React.FC<StatsControllerProps> = ({}) => {
  const { push } = useRouter();
  const { account } = useContext(AuthContext);

  if (!account) return null;

  return (
    <MiddlePanel>
      <div className="flex flex-col w-full xl:flex-row">
        <div className={`flex flex-1 flex-col pb-6`}>
          <div className="max-w-2xl">
            <BlueCard
              shadowEffect={true}
              className="flex-col items-center p-7 space-y-5 md:flex-row md:space-x-6"
            >
              {account.role === "Manager" && (
                <>
                  <Image src="/img/analytics.png" width={270} height={287} />
                  <div className="flex flex-col space-y-5">
                    <h1 className="text-4xl font-semibold leading-12">
                      Start by <br />
                      checking new payments
                    </h1>
                    <Button
                      color="white"
                      size="bigRounded"
                      onClick={() => {
                        push("/payments");
                      }}
                    >
                      Check Now
                    </Button>
                  </div>
                </>
              )}
              {account.role === "Customer" && (
                <>
                  <Image src="/img/form.png" width={233} height={314} />
                  <div className="flex flex-col space-y-5">
                    <h1 className="font-semibold text-4.5xl leading-11">
                      Fill in the form
                      <br />
                      to request
                      <br />a service!
                    </h1>
                    <Button
                      color="white"
                      size="bigRounded"
                      onClick={() => push("/service-requests/create")}
                    >
                      Request a Service
                    </Button>
                  </div>
                </>
              )}
              {account.role === "Employee" && <CurrentlyWorkingOn />}
            </BlueCard>
          </div>
          {["Manager", "Customer"].includes(account.role) && (
            <UnpaidQuotesList role={account.role} />
          )}
          {account.role === "Employee" && <LoggedWorkList />}
        </div>

        <div className="flex flex-1 items-start w-full">
          {account.role === "Manager" && <ServicesInProgressList />}
          {account.role === "Customer" && <ServicesList />}
          {account.role === "Employee" && (
            <ServicesAssignedToList account={account} />
          )}
        </div>
      </div>
    </MiddlePanel>
  );
};
