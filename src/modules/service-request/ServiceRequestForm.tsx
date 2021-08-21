import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { UUID, ServiceRequest, Customer, CustomerAddress } from "../../types";
import { Account } from "../auth/AuthProvider";
import { Button } from "../../ui/Button";
import { SelectBox } from "../../ui/SelectBox";
import { validate } from "uuid";
import { privateClient } from "../../lib/queryClient";
import { showSuccessToast } from "../../lib/toasts";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { InputField } from "../../form-fields/InputField";
import { SolidCheck, SolidPlus } from "../../icons";
import Image from "next/image";
import router from "next/router";
import * as Yup from "yup";
import { useScreenType } from "../../shared-hooks/useScreenType";

const serviceRequestSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  customer: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.string().test((val) => (val ? validate(val) : false)),
    })
    .required("Customer is required"),
  address: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.string().test((val) => (val ? validate(val) : false)),
    })
    .required("Address is required"),
});

interface SelectOption {
  label: string;
  value: string;
}

const getCustomerAddresses = (customerId: UUID) => {
  return privateClient
    .get(`customers/${customerId}`)
    .json()
    .then((data: any) => {
      if (data && data.customerAddresses) {
        return data.customerAddresses.map((ca: CustomerAddress) => {
          const { street, zipCode, city } = ca.address;
          return {
            label: `${ca.name} (${street}, ${zipCode} ${city})`,
            value: `${ca.address.id}`,
          };
        });
      } else {
        return [];
      }
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

interface ServiceRequestFormProps {
  account: Account;
  data?: ServiceRequest;
  edit?: boolean;
}

export const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({
  account,
  data,
  edit,
}) => {
  const screenType = useScreenType();
  const [customerOptions, setCustomerOptions] = useState<SelectOption[]>([]);
  const [addressOptions, setAddressOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    let customerId = undefined;

    if (data) {
      customerId = data.customerId;
    } else if (account.role === "Customer" && account.customerId) {
      customerId = account.customerId;
    }

    if (customerId) {
      getCustomerAddresses(customerId).then((addresses) =>
        setAddressOptions(addresses)
      );
    }

    if (account.role === "Manager") {
      privateClient
        .get("customers")
        .then(async (res) => {
          const customersData = await res.json();
          if (customersData && customersData.length) {
            const customers = customersData.map((customer: Customer) => {
              return {
                label: customer.companyName,
                value: customer.id,
              };
            });
            setCustomerOptions(customers);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [account, data]);

  if (!data && edit) {
    return (
      <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"} >
        Service not found.
      </WhiteCard>);
  }

  return (
    <WhiteCard padding="medium">
      <div className="flex-grow p-1 mr-5">
        <Formik<{
          title: string;
          description: string;
          address: SelectOption;
          customer: SelectOption;
        }>
          initialValues={
            data
              ? {
                  title: data.title,
                  description: data.description,
                  address: {
                    label: `${data.customerAddress?.name} (${data.customerAddress?.address.street}, ${data.customerAddress?.address.zipCode} ${data.customerAddress?.address.city})`,
                    value: data.addressId,
                  },
                  customer: {
                    label: data.customer?.companyName || "",
                    value: data.customerId,
                  },
                }
              : {
                  title: "",
                  description: "",
                  address: {
                    label: "-- Select address --",
                    value: "",
                  },
                  customer:
                    account.role === "Customer" &&
                    account.customerId &&
                    account.companyName
                      ? {
                          label: account.companyName,
                          value: account.customerId,
                        }
                      : {
                          label: "-- Select customer --",
                          value: "",
                        },
                }
          }
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={serviceRequestSchema}
          onSubmit={({ title, description, customer, address }, actions) => {
            const url = data ? `servicerequests/${data.id}` : `servicerequests`;
            privateClient(url, {
              method: edit ? "put" : "post",
              json: {
                title,
                description,
                customerId: customer.value,
                addressId: address.value,
              },
            })
              .then(async (res) => {
                if (res.ok) {
                  showSuccessToast(
                    `Service request ${
                      edit ? "updated" : "created"
                    } successfully.`
                  );
                  if (edit) {
                    router.push(`/service-requests/${data?.id}`);
                  } else {
                    const serviceRequest = await res.json();
                    router.push(`/service-requests/${serviceRequest.id}`);
                  }
                }
              })
              .catch((err) => {
                console.error(err);
                actions.setSubmitting(false);
              });
          }}
        >
          {({ setFieldValue, values, errors, isSubmitting }) => (
            <Form className={`flex flex-col focus:outline-none w-full`}>
              <div className="max-w-xl">
                {account.role === "Manager" && (
                  <>
                    <div className="mb-1 text-sm text-primary-400">
                      Customer
                    </div>
                    <SelectBox
                      padding="md"
                      value={values.customer}
                      error={!!errors.customer}
                      options={customerOptions}
                      onChange={(value: SelectOption) => {
                        setFieldValue("customer", value);
                        setFieldValue("address", {
                          label: "-- Select address --",
                          value: "",
                        });
                        setAddressOptions([]);
                        getCustomerAddresses(value.value).then((addresses) =>
                          setAddressOptions(addresses)
                        );
                      }}
                    />
                  </>
                )}

                <div className="mt-4 mb-1 text-sm text-primary-400">
                  Address
                </div>
                <SelectBox
                  padding="md"
                  value={values.address}
                  error={!!errors.address}
                  disabled={!addressOptions.length}
                  options={addressOptions}
                  onChange={(value: SelectOption) => {
                    setFieldValue("address", value);
                  }}
                />
              </div>

              <div className="mt-4 text-sm">
                <div className="mb-1 text-primary-400">Title</div>
                <InputField padding="md" name="title" />
              </div>

              <div className="mt-4 text-sm">
                <div className="mb-1 text-primary-400">Description</div>
                <InputField padding="md" name="description" textarea rows={5} />
              </div>

              <div className={`flex mt-5 space-x-4 max-w-xs text-white`}>
                <Button
                  loading={isSubmitting}
                  color="secondary"
                  type="submit"
                  size="small"
                  className={`flex w-full justify-center`}
                  icon={<SolidCheck width={18} height={18} />}
                >
                  {edit ? "Save" : "Create"}
                </Button>

                <Button
                  type="button"
                  color="orange"
                  size="small"
                  className={`flex w-full justify-center`}
                  onClick={() => router.back()}
                  icon={
                    <SolidPlus
                      className="transform rotate-45"
                      width={14}
                      height={14}
                    />
                  }
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="hidden px-4 md:flex md:items-center">
        <Image src="/img/form.png" width={233} height={314} />
      </div>
    </WhiteCard>
  );
};
