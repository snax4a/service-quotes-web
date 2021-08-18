import React, { useContext } from "react";
import router from "next/router";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { Account } from "../auth/AuthProvider";
import { Avatar } from "../../ui/Avatar";
import { RoundedButton } from "../../ui/RoundedButton";
import { DotsHorizontal, OutlinePencilAlt } from "../../icons";
import { SettingsIcon } from "../../ui/SettingsIcon";
import { OptionsPopover } from "../../ui/OptionsPopover";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { formatDateString } from "../../lib/helpers";
import Link from "next/link";
import { Role } from "../../types";

interface AccountDetailsProps {
  account: Account;
  variant: Role;
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({
  account,
  variant,
}) => {
  const screenType = useScreenType();

  const {
    id,
    role,
    email,
    image,
    companyName,
    vatNumber,
    customerId,
    employeeId,
    firstName,
    lastName,
    created,
  } = account;

  return (
    <MiddlePanel>
      <WhiteCard
        padding={screenType === "fullscreen" ? "medium" : "big"}
        className="flex-col items-center space-y-5 md:flex-row md:items-start md:space-y-0"
      >
        <Avatar
          src={image || ""}
          username={companyName ? companyName : `${firstName} ${lastName}`}
          className="rounded-full"
          size="md"
        />

        <div className="flex flex-col flex-grow space-y-1 text-sm font-semibold md:pl-4 text-primary-500 font-inter">
          <p>
            Role:{" "}
            <span className="pl-1 text-primary-800">{role.toUpperCase()}</span>
          </p>
          <p>
            Email: <span className="pl-1 text-primary-800">{email}</span>
          </p>

          {role === "Customer" && (
            <>
              <p>
                Company Name:{" "}
                <span className="pl-1 text-primary-800">{companyName}</span>
              </p>
              <p>
                Vat Number:{" "}
                <span className="pl-1 text-primary-800">{vatNumber}</span>
              </p>
              <p>
                Customer ID:{" "}
                <span className="pl-1 text-blue">{customerId}</span>
              </p>
            </>
          )}

          {["Manager", "Employee"].includes(role) && (
            <>
              <p>
                First Name:{" "}
                <span className="pl-1 text-primary-800">{firstName}</span>
              </p>
              <p>
                Last Name:{" "}
                <span className="pl-1 text-primary-800">{lastName}</span>
              </p>
              <p>
                Employee ID:{" "}
                {variant === "Manager" ? (
                  <Link href={`/employees/${employeeId}`}>
                    <span className="pl-1 cursor-pointer text-blue">
                      {employeeId}
                    </span>
                  </Link>
                ) : (
                  <span className="pl-1 text-primary-800">{employeeId}</span>
                )}
              </p>
            </>
          )}

          <p>
            Account ID: <span className="pl-1 text-primary-800">{id}</span>
          </p>
          <p>
            Created At:{" "}
            <span className="pl-1 text-primary-800">
              {formatDateString(created.toString(), "intlDate")}
            </span>
          </p>
        </div>

        <OptionsPopover
          button={
            <RoundedButton>
              <DotsHorizontal height={17} width={17} />
            </RoundedButton>
          }
          className="text-primary-500 w-190"
          position={screenType === "fullscreen" ? "center" : "left"}
          padding="p-0"
        >
          <SettingsIcon
            onClick={() => {
              router.push(
                variant === "Manager" ? `/accounts/${id}/edit` : "/account/edit"
              );
            }}
            icon={<OutlinePencilAlt height={17} width={17} />}
            label="Edit account"
            transition
            transparent
          />
        </OptionsPopover>
      </WhiteCard>
    </MiddlePanel>
  );
};
