import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { Customer, CustomerAddress } from "../../types";
import { Button } from "../../ui/Button";
import { privateClient } from "../../lib/queryClient";
import { showSuccessToast } from "../../lib/toasts";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { InputField } from "../../form-fields/InputField";
import { OutlineTrash, SolidCheck, SolidPlus } from "../../icons";
import router from "next/router";
import * as Yup from "yup";
import { MiddlePanel } from "../layouts/GridPanels";
import { DataTable, TableRow, TableCell } from "../../ui/DataTable";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext } from "../auth/AuthProvider";
import { RoundedButton } from "../../ui/RoundedButton";

const customerSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  vatNumber: Yup.string().required("Vat number is required"),
});

interface CustomerFormProps {
  data?: Customer;
  edit?: boolean;
  fetch?: any;
}

export const CustomerDetailsForm: React.FC<CustomerFormProps> = ({
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
          <div className="flex-grow p-1 mr-5">
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
                <Form className="flex flex-col w-full focus:outline-none">
                  <div className="flex flex-row gap-5 w-full focus:outline-none">
                    <div className="mt-4 text-sm">
                      <div className="mb-1 text-primary-400">Company Name</div>
                      <InputField padding="lg" name="companyName" />
                    </div>

                    <div className="mt-4 text-sm">
                      <div className="mb-1 text-primary-400">Vat Number</div>
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
  data?: Customer;
  fetch?: any;
}

export const CustomerAddressForm: React.FC<CustomerAddressFormProps> = ({
  data,
  fetch,
}) => {
  const screenType = useScreenType();
  // Extra empty column name for button
  const columnNames = ["Name", "Street", "City", "Zip Code", "Phone Number", ""];
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
          <p className="font-semibold text-black text-lg2">
            Addresses:
          </p>
          <DataTable
            columns={columnNames}
            dataCount={data!.customerAddresses!.length}
          >
            {data!.customerAddresses!.map((customerAddress: CustomerAddress) => {
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
                          .delete(`customers/${data?.id}/address/${address.id}`)
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
              // Initial values are always empty as formik here is only ever used for adding addresses.
              initialValues={
                {
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
                const url = data ? `customers/${data.id}/address` : `customers`;
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
                  <div className="flex-grow mt-4 text-sm">
                    <InputField padding="md" name="name" placeholder="Name" />
                  </div>
                  <div className="flex-grow mt-4 text-sm">
                    <InputField padding="md" name="street" placeholder="Street" />
                  </div>
                  <div className="flex-grow mt-4 text-sm">
                    <InputField padding="md" name="city" placeholder="City" />
                  </div>
                  <div className="flex-grow mt-4 text-sm">
                    <InputField padding="md" name="zipCode" placeholder="Zip Code" />
                  </div>
                  <div className="flex-grow mt-4 text-sm">
                    <InputField padding="md" name="phoneNumber" placeholder="Phone Number" />
                  </div>
                  <div className="self-center mt-4 text-sm">
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

interface CustomerFormProps {
  data?: Customer;
  edit?: boolean;
  fetch?: any;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  data,
  edit,
  fetch,
}) => {
  const { account } = useContext(AuthContext);
  if (!account) return null;

  const screenType = useScreenType();
  if (!data && edit) {
    return (
      <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"} >
        Customer not found.
      </WhiteCard>);
  }

  return (
    <MiddlePanel>
      <div className="flex flex-col pb-6">
        <CustomerDetailsForm edit data={data} fetch={fetch} />
        <CustomerAddressForm data={data} fetch={fetch} />
      </div>
    </MiddlePanel>
  );
};