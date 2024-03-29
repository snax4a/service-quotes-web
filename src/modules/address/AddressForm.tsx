import { Form, Formik } from "formik";
import React from "react";
import { CustomerAddress } from "../../types";
import { Account } from "../auth/AuthProvider";
import { Button } from "../../ui/Button";
import { privateClient } from "../../lib/queryClient";
import { showSuccessToast } from "../../lib/toasts";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { InputField } from "../../form-fields/InputField";
import { SolidCheck, SolidPlus } from "../../icons";
import Image from "next/image";
import router from "next/router";
import * as Yup from "yup";

const addressSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Max 50 characters")
    .required("Name is required"),
  phoneNumber: Yup.string()
    .min(9, "Min 9 characters")
    .max(11, "Max 11 characters")
    .required("Phone number is required"),
  street: Yup.string()
    .max(100, "Max 100 characters")
    .required("Street is required"),
  city: Yup.string()
    .max(30, "Max 30 characters")
    .required("City is required"),
  zipCode: Yup.string()
    .max(20, "Max 20 characters")
    .required("Zip Code is required")
});

interface AddressFormProps {
  account: Account;
  data?: CustomerAddress;
  edit?: boolean;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  account,
  data,
  edit,
}) => {
  return (
    <WhiteCard padding="medium">
      <div className="flex-grow p-1 mr-5">
        <Formik<{
          name: string;
          phoneNumber: string;
          street: string;
          city: string;
          zipCode: string;
        }>
          initialValues={
            data
              ? {
                name: data.name,
                phoneNumber: data.address.phoneNumber,
                street: data.address.street,
                city: data.address.city,
                zipCode: data.address.zipCode,
              }
              : {
                name: "",
                phoneNumber: "",
                street: "",
                city: "",
                zipCode: "",
              }
          }
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={addressSchema}
          onSubmit={({ name, phoneNumber, street, city, zipCode }, actions) => {
            const url = data ? `customers/${account.customerId}/address/${data.address.id}` : `customers/${account.customerId}/address`;
            privateClient(url, {
              method: edit ? "put" : "post",
              json: {
                name,
                phoneNumber,
                street,
                city,
                zipCode,
              },
            })
              .then(async (res) => {
                if (res.ok) {
                  showSuccessToast(
                    `Address ${edit ? "updated" : "created"
                    } successfully.`
                  );
                  if (edit) {
                    router.push(`/addresses/${data?.address.id}`);
                  } else {
                    router.push(`/addresses`);
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

              <div
                className="grid w-3/4 font-inter"
                style={{
                  gridTemplateColumns: `auto auto auto`,
                  gridTemplateRows: `auto auto`,
                  gridColumnGap: 40,

                }}
              >

                <div className="mt-4 text-sm">
                  <div className="mb-1 text-primary-400">Address Name</div>
                  <InputField padding="lg" name="name" />
                </div>

                <div className="mt-4 text-sm">
                  <div className="mb-1 text-primary-400">Phone Number</div>
                  <InputField padding="lg" name="phoneNumber" />
                </div>

                <div>
                  {/* EMPTY DIV TO FORCE STREET, CITY, ZIPCODE TOGHETER TO 2ND ROW */}
                </div>

                <div className="mt-4 text-sm">
                  <div className="mb-1 text-primary-400">Street</div>
                  <InputField padding="lg" name="street" />
                </div>

                <div className="mt-4 text-sm">
                  <div className="mb-1 text-primary-400">City</div>
                  <InputField padding="lg" name="city" />
                </div>

                <div className="mt-4 text-sm">
                  <div className="mb-1 text-primary-400">Zip Code</div>
                  <InputField padding="lg" name="zipCode" />
                </div>
              </div>
              <div className={`flex mt-6 space-x-4 max-w-xs text-white`}>
                <Button
                  loading={isSubmitting}
                  color="secondary"
                  type="submit"
                  size="medium"
                  className={`flex w-full justify-center`}
                  icon={<SolidCheck width={18} height={18} />}
                >
                  {edit ? "Save" : "Create"}
                </Button>

                <Button
                  type="button"
                  color="orange"
                  size="medium"
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
  );
};
