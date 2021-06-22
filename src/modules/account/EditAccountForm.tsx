import React, { useEffect, useState } from "react";
import { Form, Formik, useField } from "formik";
import { Account } from "../auth/AuthProvider";
import { Button } from "../../ui/Button";
import { privateClient } from "../../lib/queryClient";
import { showSuccessToast } from "../../lib/toasts";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { InputField } from "../../form-fields/InputField";
import { SolidCheck, SolidPlus } from "../../icons";
import router from "next/router";
import * as Yup from "yup";
import { UploadField } from "../../form-fields/UploadField";
import { Avatar } from "../../ui/Avatar";
import { useScreenType } from "../../shared-hooks/useScreenType";

const serviceRequestSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .max(30, "Max 30 characters")
    .required("Password is required"),
  passwordRepeat: Yup.string()
    .required("Repeat Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

interface EditAccountFormProps {
  account: Account;
}

export const EditAccountForm: React.FC<EditAccountFormProps> = ({
  account,
}) => {
  const screenType = useScreenType();
  const { companyName, firstName, lastName } = account;
  const [fileName, setFileName] = useState("");

  return (
    <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"}>
      <Formik<{
        email: string;
        image: string;
        password: string;
        passwordRepeat: string;
      }>
        initialValues={{
          email: account.email,
          image: account.image,
          password: "",
          passwordRepeat: "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={serviceRequestSchema}
        onSubmit={({ email, image, password, passwordRepeat }, actions) => {
          privateClient
            .put(`accounts/${account.id}`, {
              json: {
                email,
                image,
                password,
                passwordRepeat,
              },
            })
            .then((res) => {
              if (res.ok) {
                showSuccessToast(`Account updated successfully.`);
                router.push(`/account/details`);
              }
            })
            .catch((err) => {
              console.error(err);
              actions.setSubmitting(false);
            });
        }}
      >
        {({ setFieldValue, values, errors, isSubmitting }) => (
          <Form className={`flex space-x-5 focus:outline-none w-full`}>
            <div className="flex flex-col justify-center items-center space-y-3 w-15 h-15 bg-primary-325 border-1 border-shadow-200 rounded-xl">
              <Avatar
                src={values.image}
                username={
                  companyName ? companyName : `${firstName} ${lastName}`
                }
                className="rounded-2xl"
                size="lg"
              />
              <UploadField
                name="image"
                label="Upload"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const reader = new FileReader();
                  const newFile = e.target.files ? e.target.files[0] : null;
                  if (newFile) {
                    reader.onloadend = () => {
                      setFileName(newFile.name);

                      if (typeof reader.result === "string") {
                        setFieldValue("image", reader.result?.split(",")[1]);
                      }
                    };
                    if (newFile.name !== fileName) {
                      reader.readAsDataURL(newFile);
                    }
                  }
                }}
              />
            </div>

            <div className="flex flex-col flex-grow justify-between">
              <div className="flex flex-col space-y-3 lg:flex-row lg:space-x-5 lg:space-y-0">
                <div className="text-sm w-full">
                  <div className="text-primary-400 mb-1">Email Address</div>
                  <InputField padding="lg" name="email" />
                </div>
                <div className="text-sm w-full">
                  <div className="text-primary-400 mb-1">Password</div>
                  <InputField padding="lg" name="password" type="password" />
                </div>
                <div className="text-sm w-full">
                  <div className="text-primary-400 mb-1">Repeat password</div>
                  <InputField
                    padding="lg"
                    name="passwordRepeat"
                    type="password"
                  />
                </div>
              </div>

              <div className={`flex mt-5 space-x-4 max-w-xs text-white`}>
                <Button
                  loading={isSubmitting}
                  color="secondary"
                  type="submit"
                  size="medium"
                  className={`flex w-full justify-center`}
                  icon={<SolidCheck width={18} height={18} />}
                >
                  Save
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
            </div>
          </Form>
        )}
      </Formik>
    </WhiteCard>
  );
};
