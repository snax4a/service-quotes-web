import React, { useContext } from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { InfoText } from "../../ui/InfoText";
import { CenterLoader } from "../../ui/CenterLoader";
import {
  Material,
  Role,
  ServiceRequest,
  ServiceRequestJobValuation,
  UUID,
} from "../../types";
import { StatusBadge } from "../../ui/StatusBadge";
import { AuthContext, Account } from "../auth/AuthProvider";
import { formatDateString } from "../../lib/helpers";
import { Avatar } from "../../ui/Avatar";
import { OutlinePhone, OutlineTrash, SolidPlus } from "../../icons";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { ServiceRequestOptions } from "./ServiceRequestOptions";
import { AssignedEmployees } from "../../ui/AssignedEmployees";
import { RoundedButton } from "../../ui/RoundedButton";
import { privateClient } from "../../lib/queryClient";
import { showSuccessToast } from "../../lib/toasts";
import { Form, Formik } from "formik";
import { InputField } from "../../form-fields/InputField";
import { Button } from "../../ui/Button";
import * as Yup from "yup";

const materialSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  quantity: Yup.number()
    .positive("Must be positive")
    .required("Quantity is required"),
  unitPrice: Yup.number()
    .positive("Must be positive")
    .required("Quantity is required"),
});

const jobValuationSchema = Yup.object().shape({
  workType: Yup.string().required("Work type is required"),
  laborHours: Yup.string()
    .matches(/^(2[0-3]|[01]?[0-9]{1}):([0-5]{1}[0-9]{1})$/, "00:01 - 23:59")
    .required("Labor hours is required"),
  hourlyRate: Yup.number()
    .positive("Must be positive")
    .required("Hourly rate is required"),
});

interface ServiceDetailsProps {
  fetch: () => void;
  service: ServiceRequest;
  role: Role;
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  fetch,
  service,
  role,
}) => {
  const screenType = useScreenType();

  const {
    customer,
    address,
    assignedEmployees,
    plannedExecutionDate,
    created,
    title,
    status,
    description,
  } = service;

  return (
    <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"}>
      <div
        className="grid w-full font-inter"
        style={{
          gridTemplateColumns: role === "Customer" ? "1fr" : `50px 1fr`,
          gridGap: 20,
        }}
      >
        <Avatar
          src={customer?.image || ""}
          username={customer?.companyName}
          size="md"
        />
        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <div className="flex flex-col">
              <p className="text-blue font-semibold">{customer?.companyName}</p>
              <div className="flex space-x-4 font-semibold text-sm2 text-primary-500">
                <p className="">
                  {address?.street}, {address?.zipCode} {address?.city}
                </p>
                {role !== "Customer" && (
                  <span className="flex text-orange">
                    <OutlinePhone height={20} width={20} />
                    {address?.phoneNumber}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col text-sm2 text-primary-500 mt-4 lg:mt-0 lg:text-right">
              <p className="text-primary-500 text-sm2">
                Requested on: {formatDateString(created, "intlDate")}
              </p>
              {plannedExecutionDate && (
                <p className="">
                  Planned execution date:{" "}
                  {formatDateString(plannedExecutionDate, "intlDate")}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <p className="font-semibold">{title}</p>
            <StatusBadge status={status} />
          </div>

          <p className="text-sm text-primary-500 mt-3 md:mt-1 max-w-3xl">
            {description}
          </p>

          <div className="flex justify-between items-end mt-4">
            <AssignedEmployees employees={assignedEmployees || []} />

            {!["Completed", "Cancelled"].includes(status) &&
              !(
                role === "Customer" && !["New", "Assigned"].includes(status)
              ) && (
                <ServiceRequestOptions service={service} onReFetch={fetch} />
              )}
          </div>
        </div>
      </div>
    </WhiteCard>
  );
};

interface ServiceMaterialsProps {
  serviceId: UUID;
  role: Role;
}

export const ServiceMaterials: React.FC<ServiceMaterialsProps> = ({
  serviceId,
  role,
}) => {
  const screenType = useScreenType();
  const { data, isLoading, fetch } = useQueryData(
    `servicerequests/${serviceId}/materials`
  );

  return (
    <WhiteCard
      className="mt-6 flex-col"
      padding={screenType === "fullscreen" ? "medium" : "big"}
    >
      <h3 className="text-lg font-medium">Materials used:</h3>

      {isLoading ? (
        <CenterLoader />
      ) : (
        <div className="flex flex-col mt-3 font-inter font-semibold">
          <div
            className="grid gap-3 py-2 text-sm2 text-primary-400 border-b-1 border-primary-350"
            style={{
              gridTemplateColumns:
                screenType === "fullscreen"
                  ? "1fr 90px 90px 30px"
                  : "1fr 120px 120px 30px",
            }}
          >
            <h5>Description</h5>
            <h5>Quantity</h5>
            <h5>Unit Price</h5>
            <h5></h5>
          </div>

          {data.map((material: Material) => (
            <div
              key={material.id}
              className="grid gap-2 py-2 text-sm border-b-1 border-primary-350"
              style={{
                gridTemplateColumns:
                  screenType === "fullscreen"
                    ? "1fr 90px 90px 30px"
                    : "1fr 120px 120px 30px",
              }}
            >
              <div>{material.description}</div>
              <div>{material.quantity}</div>
              <div>{material.unitPrice.toFixed(2)} PLN</div>
              <div className="flex">
                {["Manager", "Employee"].includes(role) && (
                  <RoundedButton
                    onClick={() => {
                      privateClient
                        .delete(
                          `servicerequests/${serviceId}/materials/${material.id}`
                        )
                        .then(() => {
                          showSuccessToast("Material has been removed.");
                          fetch();
                        })
                        .catch(() => {});
                    }}
                  >
                    <OutlineTrash height={17} width={17} />
                  </RoundedButton>
                )}
              </div>
            </div>
          ))}

          {["Manager", "Employee"].includes(role) && (
            <Formik<{
              description: string;
              quantity: number;
              unitPrice: number;
            }>
              initialValues={{
                description: "",
                quantity: 1,
                unitPrice: 0.0,
              }}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={materialSchema}
              onSubmit={({ description, quantity, unitPrice }, actions) => {
                privateClient
                  .post(`servicerequests/${serviceId}/materials`, {
                    json: {
                      description,
                      quantity,
                      unitPrice,
                    },
                  })
                  .then(() => {
                    actions.setSubmitting(false);
                    showSuccessToast("Material has been added.");
                    fetch();
                  })
                  .catch(() => {
                    actions.setSubmitting(false);
                  });
              }}
            >
              {({ isSubmitting }) => (
                <Form
                  className={`grid gap-3 mt-4.5 text-sm w-full items-start`}
                  style={{
                    gridTemplateColumns:
                      screenType === "fullscreen"
                        ? "1fr 90px 90px 30px"
                        : "1fr 120px 120px 30px",
                  }}
                >
                  <InputField name="description" padding="md" />
                  <InputField
                    name="quantity"
                    type="number"
                    step="1"
                    padding="md"
                  />
                  <InputField
                    name="unitPrice"
                    type="number"
                    step="0.01"
                    pattern="[+-]?\d+(?:[.,]\d+)?"
                    padding="md"
                  />
                  <Button
                    loading={isSubmitting}
                    color="transparent"
                    type="submit"
                    size="tiny"
                    className={`mt-1 flex w-full justify-center`}
                  >
                    <RoundedButton>
                      <SolidPlus height={17} width={17} />
                    </RoundedButton>
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      )}
    </WhiteCard>
  );
};

interface ServiceJobValuationsProps {
  serviceId: UUID;
  account: Account;
}

export const ServiceJobValuations: React.FC<ServiceJobValuationsProps> = ({
  serviceId,
  account,
}) => {
  const screenType = useScreenType();
  const { data, isLoading, fetch } = useQueryData(
    `servicerequests/${serviceId}/job-valuations`
  );

  return (
    <WhiteCard
      className="mt-6 flex-col"
      padding={screenType === "fullscreen" ? "medium" : "big"}
    >
      <h3 className="text-lg font-medium">Job valuations:</h3>

      {isLoading ? (
        <CenterLoader />
      ) : (
        <div className="flex flex-col mt-3 font-inter font-semibold">
          <div
            className="grid gap-3 py-2 text-sm2 text-primary-400 border-b-1 border-primary-350"
            style={{
              gridTemplateColumns:
                screenType === "fullscreen"
                  ? "1fr 90px 90px 30px"
                  : "1fr 120px 120px 30px",
            }}
          >
            <h5>Work Type</h5>
            <h5>Labor Hours</h5>
            <h5>Hourly Rate</h5>
            <h5></h5>
          </div>

          {data.map((srjv: ServiceRequestJobValuation) => (
            <div
              key={srjv.jobValuation.id}
              className="grid gap-2 py-2 text-sm border-b-1 border-primary-350"
              style={{
                gridTemplateColumns:
                  screenType === "fullscreen"
                    ? "1fr 90px 90px 30px"
                    : "1fr 120px 120px 30px",
              }}
            >
              <div>{srjv.jobValuation.workType}</div>
              <div>
                {srjv.jobValuation.laborHours.replace(
                  /^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/,
                  "$1$2"
                )}
              </div>
              <div>{srjv.jobValuation.hourlyRate.toFixed(2)} PLN</div>
              <div className="flex">
                {["Manager", "Employee"].includes(account.role) && (
                  <RoundedButton
                    onClick={() => {
                      privateClient
                        .delete(`servicerequests/${serviceId}/job-valuations`, {
                          json: {
                            employeeId: srjv.employee.id,
                            jobValuationId: srjv.jobValuation.id,
                            serviceRequestId: srjv.serviceRequestId,
                          },
                        })
                        .then(() => {
                          showSuccessToast("Job valuation has been removed.");
                          fetch();
                        })
                        .catch(() => {});
                    }}
                  >
                    <OutlineTrash height={17} width={17} />
                  </RoundedButton>
                )}
              </div>
            </div>
          ))}

          {["Manager", "Employee"].includes(account.role) && (
            <Formik<{
              workType: string;
              laborHours: string;
              hourlyRate: number;
            }>
              initialValues={{
                workType: "",
                laborHours: "01:00",
                hourlyRate: 0,
              }}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={jobValuationSchema}
              onSubmit={({ workType, laborHours, hourlyRate }, actions) => {
                privateClient
                  .post(`servicerequests/${serviceId}/job-valuations`, {
                    json: {
                      employeeId: account.employeeId,
                      workType,
                      laborHours,
                      hourlyRate,
                    },
                  })
                  .then(() => {
                    actions.setSubmitting(false);
                    showSuccessToast("Job valuation has been added.");
                    fetch();
                  })
                  .catch(() => {
                    actions.setSubmitting(false);
                  });
              }}
            >
              {({ isSubmitting }) => (
                <Form
                  className={`grid gap-3 mt-4.5 text-sm w-full items-start`}
                  style={{
                    gridTemplateColumns:
                      screenType === "fullscreen"
                        ? "1fr 90px 90px 30px"
                        : "1fr 120px 120px 30px",
                  }}
                >
                  <InputField name="workType" padding="md" />
                  <InputField name="laborHours" type="string" padding="md" />
                  <InputField
                    name="hourlyRate"
                    type="number"
                    step="0.01"
                    pattern="[+-]?\d+(?:[.,]\d+)?"
                    padding="md"
                  />
                  <Button
                    loading={isSubmitting}
                    color="transparent"
                    type="submit"
                    size="tiny"
                    className={`mt-1 flex w-full justify-center`}
                  >
                    <RoundedButton>
                      <SolidPlus height={17} width={17} />
                    </RoundedButton>
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      )}
    </WhiteCard>
  );
};

interface ServiceRequestDetailsProps {}

export const ServiceRequestDetails: React.FC<ServiceRequestDetailsProps> =
  ({}) => {
    const { account } = useContext(AuthContext);
    const { query } = useRouter();
    const id = typeof query.id === "string" ? query.id : "";
    const { data, isLoading, fetch } = useQueryData(`servicerequests/${id}`);

    if (!account) return null;

    if (isLoading) {
      return <CenterLoader />;
    }

    if (!data) {
      return <InfoText>Could not find service request</InfoText>;
    }

    return (
      <MiddlePanel>
        <div className="flex flex-col pb-6">
          <ServiceDetails service={data} role={account.role} fetch={fetch} />
          {["InProgress", "Completed"].includes(data.status) && (
            <>
              <ServiceMaterials serviceId={data.id} role={account.role} />
              <ServiceJobValuations serviceId={data.id} account={account} />
            </>
          )}
        </div>
      </MiddlePanel>
    );
  };
