import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { Customer, CustomerAddress } from "../../types";
import { Account } from "../auth/AuthProvider";
import { Button } from "../../ui/Button";
import { privateClient } from "../../lib/queryClient";
import { showSuccessToast } from "../../lib/toasts";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { InputField } from "../../form-fields/InputField";
import { OutlineTrash, SolidCheck, SolidPlus } from "../../icons";
import router, { useRouter } from "next/router";
import * as Yup from "yup";
import { MiddlePanel } from "../layouts/GridPanels";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext } from "../auth/AuthProvider";
import { InfoText } from "../../ui/InfoText";
import { CenterLoader } from "../../ui/CenterLoader";
import useQueryData from "../../shared-hooks/useQueryData";
import { RoundedButton } from "../../ui/RoundedButton";

const customerSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  vatNumber: Yup.string().required("Vat number is required"),
});

interface CustomerFormProps {
  account: Account;
  data?: Customer;
  edit?: boolean;
  fetch?: any;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  data,
  edit,
  fetch,
}) => {
  const screenType = useScreenType();
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
        <WhiteCard padding="medium" className="flex-col">
          <div className="p-1 mr-5 flex-grow">
            <Formik<{
              companyName: string;
              vatNumber: string;
            }>
              initialValues={
                data
                  ? {
                    companyName: data?.companyName,
                    vatNumber: data?.vatNumber,
                  }
                  : {
                    companyName: "",
                    vatNumber: "",
                  }
              }
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={customerSchema}
              onSubmit={({ companyName, vatNumber }, actions) => {
                const url = data ? `customers/${data.id}` : `customers`;
                privateClient(url, {
                  method: edit ? "put" : "post",
                  json: {
                    companyName,
                    vatNumber,
                  },
                })
                  .then(async (res) => {
                    if (res.ok) {
                      showSuccessToast(
                        `Customer ${edit ? "updated" : "created"} successfully.`
                      );
                      if (edit) {
                        router.push(`/customers/${data?.id}`);
                      } else {
                        const customer = await res.json();
                        router.push(`/customers/${customer.id}`);
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
                <Form className="flex flex-col focus:outline-none w-full">
                  <div className="flex flex-row gap-5 focus:outline-none w-full">
                    <div className="mt-4 text-sm">
                      <div className="text-primary-400 mb-1">Company Name</div>
                      <InputField padding="lg" name="companyName" />
                    </div>

                    <div className="mt-4 text-sm">
                      <div className="text-primary-400 mb-1">Vat Number</div>
                      <InputField padding="lg" name="vatNumber" />
                    </div>
                  </div>

                  <div className={`flex mt-6 space-x-4 max-w-xs text-white h-6`}>
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
        </WhiteCard>
      </div>
    </MiddlePanel>
  );
};

const customerAddressSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string().required("Zip code is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});

interface CustomerAddressFormProps {
  account: Account;
  data?: CustomerAddress;
  fetch?: any;
}

export const CustomerAddressForm: React.FC<CustomerAddressFormProps> = ({
  fetch,
}) => {
  const screenType = useScreenType();
  const { account } = useContext(AuthContext);
  const { query, push } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQueryData(`customers/${id}`);

  if (!account) return null;

  const columnNames = ["Name", "Street", "City", "Zip Code", "Phone Number", ""];

  if (isLoading) {
    return <CenterLoader />;
  }

  if (data.status === 404) {
    return <InfoText>Could not find customer</InfoText>;
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
        <WhiteCard padding="medium" className="flex-col">
          <p className="text-black font-semibold text-lg2">
            Addresses:
          </p>
          <DataTable
            columns={columnNames}
            isLoading={isLoading}
            dataCount={data.length}
          >
            {data?.customerAddresses.map((customerAddress: CustomerAddress) => {
              const { name, address } = customerAddress;
              return (
                <TableRow key={address.id}>
                  <TableCell>
                    {name}
                  </TableCell>
                  <TableCell>
                    {address.street}
                  </TableCell>
                  <TableCell>
                    {address.city}
                  </TableCell>
                  <TableCell>
                    {address.zipCode}
                  </TableCell>
                  <TableCell>
                    {address.phoneNumber}
                  </TableCell>
                  <TableCell>
                    <RoundedButton
                      className="w-min"
                      onClick={() => {
                        privateClient
                          .delete(`customers/${id}/address/${address.id}`)
                          .then(() => {
                            showSuccessToast("Address has been removed.");
                            fetch();
                          })
                          .catch(() => { });
                      }}>
                      <OutlineTrash height={17} width={17} />
                    </RoundedButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </DataTable>

          <div>
            <Formik<{
              name: string;
              street: string;
              city: string;
              zipCode: string;
              phoneNumber: string;
            }>
              initialValues={
                data
                  ? {
                    name: data?.name,
                    street: data?.address?.street,
                    city: data?.address?.city,
                    zipCode: data?.address?.zipCode,
                    phoneNumber: data?.address?.phoneNumber
                  }
                  : {
                    name: "",
                    street: "",
                    city: "",
                    zipCode: "",
                    phoneNumber: "",
                  }
              }
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={customerAddressSchema}
              onSubmit={({ name, street, city, zipCode, phoneNumber }, actions) => {
                const url = data ? `customers/${id}/address` : `customers`;
                privateClient(url, {
                  method: "post",
                  json: {
                    name,
                    street,
                    city,
                    zipCode,
                    phoneNumber
                  },
                })
                  .then(async (res) => {
                    if (res.ok) {
                      showSuccessToast(
                        `Address added successfully.`
                      );
                      fetch();
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                    actions.setSubmitting(false);
                  });
              }}
            >
              {({ setFieldValue, values, errors, isSubmitting }) => (
                <Form className="flex flex-row gap-3 focus:outline-none">
                  <div className="mt-4 text-sm flex-grow">
                    <InputField padding="md" name="name" placeholder="Name" />
                  </div>
                  <div className="mt-4 text-sm flex-grow">
                    <InputField padding="md" name="street" placeholder="Street" />
                  </div>
                  <div className="mt-4 text-sm flex-grow">
                    <InputField padding="md" name="city" placeholder="City" />
                  </div>
                  <div className="mt-4 text-sm flex-grow">
                    <InputField padding="md" name="zipCode" placeholder="Zip Code" />
                  </div>
                  <div className="mt-4 text-sm flex-grow">
                    <InputField padding="md" name="phoneNumber" placeholder="Phone Number" />
                  </div>
                  <div className="mt-4 text-sm self-center">
                    <button type="submit">
                      <RoundedButton className="w-min" >
                        <SolidPlus height={17} width={17} />
                      </RoundedButton>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </WhiteCard>
      </div>
    </MiddlePanel>
  );
};