import { Form, Formik } from "formik";
import React from "react";
import { UUID, Specialization } from "../../types";
import { Account } from "../auth/AuthProvider";
import { Button } from "../../ui/Button";
import { validate } from "uuid";
import { privateClient } from "../../lib/queryClient";
import { showSuccessToast } from "../../lib/toasts";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { InputField } from "../../form-fields/InputField";
import { SolidCheck, SolidPlus } from "../../icons";
import router from "next/router";
import * as Yup from "yup";

const specializationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

interface SpecializationFormProps {
  account: Account;
  data?: Specialization;
  edit?: boolean;
}

export const SpecializationForm: React.FC<SpecializationFormProps> = ({
  account,
  data,
  edit,
}) => {
  return (
    <WhiteCard padding="medium">
      <div className="p-1 mr-5 flex-grow">
        <Formik<{
          name: string;
        }>
          initialValues={
            data
              ? {
                name: data.name,
              }
              : {
                name: "",
              }
          }
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={specializationSchema}
          onSubmit={({ name }, actions) => {
            const url = data ? `specializations/${data.id}` : `specializations`;
            privateClient(url, {
              method: edit ? "put" : "post",
              json: {
                name
              },
            })
              .then(async (res) => {
                if (res.ok) {
                  showSuccessToast(
                    `Specialization ${edit ? "updated" : "created"
                    } successfully.`
                  );
                  if (edit) {
                    router.push(`/specializations`);
                  } else {
                    const specialization = await res.json();
                    router.push(`/specializations/${specialization.id}`);
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
                <div className="mt-4 text-sm flex-grow">
                  <div className="text-primary-400 mb-1">Name</div>
                  <InputField
                    value={data?.name}
                    padding="lg"
                    name="name"
                  />
                </div>

                <>
                  <div className={`flex mt-5 space-x-4 max-w-xs text-white`}>
                    <Button
                      loading={isSubmitting}
                      color="secondary"
                      type="submit"
                      size="small"
                      className={`flex w-full justify-center h-6.5 self-end`}
                      icon={<SolidCheck width={18} height={18} />}
                    >
                      {edit ? "Save" : "Create"}
                    </Button>

                    <Button
                      type="button"
                      color="orange"
                      size="small"
                      className={`flex w-full justify-center h-6.5 self-end`}
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
                </>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </WhiteCard>
  );
};
