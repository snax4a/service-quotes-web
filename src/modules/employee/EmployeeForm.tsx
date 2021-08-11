import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Employee, Specialization } from "../../types";
import { Account } from "../auth/AuthProvider";
import { Button } from "../../ui/Button";
import { privateClient } from "../../lib/queryClient";
import { showSuccessToast } from "../../lib/toasts";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { InputField } from "../../form-fields/InputField";
import { SolidCheck, SolidPlus } from "../../icons";
import { EmployeeSpecializationOptions } from "./EmployeeSpecializationOptions";
import Image from "next/image";
import router from "next/router";
import * as Yup from "yup";
import { SelectBox } from "../../ui/SelectBox";

const employeeSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

interface EmployeeFormProps {
  account: Account;
  data?: Employee;
  edit?: boolean;
  fetch?: any;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  data,
  edit,
  fetch,
}) => {
  const [specializationsOptions, setSpecializationsOptions] = useState([
    {
      label: "Select specialization",
      value: "",
    },
  ]);
  const [specialization, setSpecialization] = useState(
    specializationsOptions[0]
  );

  useEffect(() => {
    privateClient
      .get(`specializations`)
      .json()
      .then((res: any) => {
        setSpecializationsOptions([
          ...specializationsOptions,
          ...res.map((spec: Specialization) => {
            return { label: spec.name, value: spec.id };
          }),
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          validationSchema={employeeSchema}
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
                    `Employee ${edit ? "updated" : "created"} successfully.`
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
            <Form className="flex flex-col focus:outline-none w-full">
              <div className="flex flex-row gap-5 focus:outline-none w-full">
                <div className="mt-4 text-sm">
                  <div className="text-primary-400 mb-1">Firstname</div>
                  <InputField padding="lg" name="firstName" />
                </div>

                <div className="mt-4 text-sm">
                  <div className="text-primary-400 mb-1">Lastname</div>
                  <InputField padding="lg" name="lastName" />
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

        <hr className="my-6"></hr>

        <div className="text-primary-500 w-full md:mt-1">
          <p className="self-center text-md font-bold mb-2">Specializations</p>

          <div className="flex">
            {data!.specializations![0] ? (
              data!.specializations!.map((spec: Specialization) => (
                <EmployeeSpecializationOptions
                  employeeId={data!.id}
                  specialization={spec}
                  fetch={fetch}
                  key={spec.id}
                />
              ))
            ) : (
              <p className="ml-2">None</p>
            )}
          </div>

          <div
            className="grid gap-2 w-full mt-6"
            style={{
              gridTemplateColumns: "7fr 1fr",
            }}
          >
            <div className="flex-grow">
              <SelectBox
                value={specialization}
                options={specializationsOptions}
                onChange={setSpecialization}
              />
            </div>

            <Button
              color="secondary"
              type="submit"
              size="small"
              className={`flex w-full justify-center`}
              icon={<SolidCheck width={18} height={18} />}
              onClick={() => {
                privateClient
                  .post(`employees/${data?.id}/specializations`, {
                    json: {
                      specializationId: specialization.value,
                    },
                  })
                  .then(() => {
                    showSuccessToast("Specialization has been added.");
                    fetch();
                  })
                  .catch(() => {});
              }}
            >
              {"Add"}
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:items-center px-4">
        <Image src="/img/form.png" width={233} height={314} />
      </div>
    </WhiteCard>
  );
};
