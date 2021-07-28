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
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string().required("Zip Code is required")
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
      <div className="p-1 mr-5 flex-grow">
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
                    `Address ${
                      edit ? "updated" : "created"
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
              <div className="mt-4 text-sm">
                <div className="text-primary-400 mb-1">Name</div>
                <InputField padding="md" name="name" />
              </div>

              <div className="mt-4 text-sm">
                <div className="text-primary-400 mb-1">Phone Number</div>
                <InputField padding="md" name="phoneNumber" />
              </div>

              <div className="mt-4 text-sm">
                <div className="text-primary-400 mb-1">Street</div>
                <InputField padding="md" name="street" />
              </div>

              <div className="mt-4 text-sm">
                <div className="text-primary-400 mb-1">City</div>
                <InputField padding="md" name="city" />
              </div>

              <div className="mt-4 text-sm">
                <div className="text-primary-400 mb-1">Zip Code</div>
                <InputField padding="md" name="zipCode" />
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

      <div className="hidden md:flex md:items-center px-4">
        <Image src="/img/form.png" width={233} height={314} />
      </div>
    </WhiteCard>
  );
};
