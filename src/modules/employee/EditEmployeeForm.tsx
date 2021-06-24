import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { UUID, Employee, Customer, CustomerAddress } from "../../types";
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

const serviceRequestSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

interface SelectOption {
  label: string;
  value: string;
}

interface EditEmployeeFormProps {
  account: Account;
  data?: Employee;
  edit?: boolean;
}

export const EditEmployeeForm: React.FC<EditEmployeeFormProps> = ({
  account,
  data,
  edit,
}) => {
  const [specializationOptions, setSpecializationOptions] = useState<SelectOption[]>([]);

  return (
    <WhiteCard padding="medium">
      <div className="p-1 mr-5 flex-grow">
        <Formik<{
          firstName: string;
          lastName: string;
        }>
          initialValues={
            data
              ? {
                firstName: data.firstName,
                lastName: data.lastName,
              }
              : {
                firstName: "",
                lastName: "",
              }
          }
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={serviceRequestSchema}
          onSubmit={({ firstName, lastName }, actions) => {
            const url = data ? `employees/${data.id}` : `employees`;
            privateClient(url, {
              method: edit ? "put" : "post",
              json: {
                firstName,
                lastName,
              },
            })
              .then(async (res) => {
                if (res.ok) {
                  showSuccessToast(
                    `Employee ${edit ? "updated" : "created"
                    } successfully.`
                  );
                  if (edit) {
                    router.push(`/employees/${data?.id}`);
                  } else {
                    const employee = await res.json();
                    router.push(`/employees/${employee.id}`);
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
            <Form className='flex flex-col focus:outline-none w-full'>

              <div className='flex flex-row gap-5 focus:outline-none w-full'>
                <div className="mt-4 text-sm">
                  <div className="text-primary-400 mb-1">Firstname</div>
                  <InputField
                    value={data?.firstName}
                    padding="lg"
                    name="firstname" />
                </div>


                <div className="mt-4 text-sm">
                  <div className="text-primary-400 mb-1">Lastname</div>
                  <InputField
                    value={data?.lastName}
                    padding="lg"
                    name="lastname" />
                </div>
              </div>

              SPECIALIZATION PLACEHOLDER
              
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