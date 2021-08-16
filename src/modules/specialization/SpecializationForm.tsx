import { Form, Formik } from "formik";
import React from "react";
import { Specialization } from "../../types";
import { Account } from "../auth/AuthProvider";
import { Button } from "../../ui/Button";
import { privateClient } from "../../lib/queryClient";
import { showSuccessToast } from "../../lib/toasts";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { InputField } from "../../form-fields/InputField";
import { SolidCheck, SolidPlus } from "../../icons";
import router from "next/router";
import * as Yup from "yup";
import { useScreenType } from "../../shared-hooks/useScreenType";

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
  const screenType = useScreenType();

  if (!account) return null;

  if (!data && edit) {
    return (
      <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"}>
        Specialization not found.
      </WhiteCard>
    );
  }

  return (
    <WhiteCard padding="medium">
      <div className="flex-grow p-1 mr-5">
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
                name,
              },
            })
              .then((res) => {
                if (res.ok) {
                  showSuccessToast(
                    `Specialization ${
                      edit ? "updated" : "created"
                    } successfully.`
                  );
                  router.push(`/employees/specializations`);
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
                <div className="flex-grow mt-4 text-sm">
                  <div className="mb-1 text-primary-400">Name</div>
                  <InputField padding="lg" name="name" />
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
