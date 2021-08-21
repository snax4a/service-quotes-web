import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Account } from "../auth/AuthProvider";
import { Button } from "../../ui/Button";
import { privateClient } from "../../lib/queryClient";
import { showErrorToast, showSuccessToast } from "../../lib/toasts";
import { WhiteCard } from "../../ui/card/WhiteCard";
import { InputField } from "../../form-fields/InputField";
import { SolidCheck, SolidPlus } from "../../icons";
import router from "next/router";
import * as Yup from "yup";
import { UploadField } from "../../form-fields/UploadField";
import { Avatar } from "../../ui/Avatar";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { SelectBox } from "../../ui/SelectBox";
import { SelectOption } from "../../types";
import { InputErrorMsg } from "../../ui/InputErrorMsg";

const ALLOWED_FILE_SIZE = 3 * 1024 * 1024; // ~= 3 MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const roleOptions = [
  {
    label: "CUSTOMER",
    value: "Customer",
  },
  {
    label: "EMPLOYEE",
    value: "Employee",
  },
  {
    label: "MANAGER",
    value: "Manager",
  },
];

const createAccountSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .max(50, "Max 50 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .max(30, "Max 30 characters")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .required("Repeat Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  role: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required("Role is required"),
    })
    .required("Role is required"),
  companyName: Yup.string()
    .min(3, "Min 3 characters")
    .max(30, "Max 30 characters")
    .when("role.value", {
      is: "Customer",
      then: Yup.string().required("Company name is required"),
    }),
  vatNumber: Yup.string()
    .min(10, "Min 10 characters")
    .max(20, "Max 30 characters")
    .when("role.value", {
      is: "Customer",
      then: Yup.string().required("VAT number is required"),
    }),
  firstName: Yup.string()
    .min(3, "Min 3 characters")
    .max(30, "Max 30 characters")
    .when("role.value", {
      is: (val: string) => ["Employee", "Manager"].includes(val),
      then: Yup.string().required("First name is required"),
    }),
  lastName: Yup.string()
    .min(3, "Min 3 characters")
    .max(30, "Max 30 characters")
    .when("role.value", {
      is: (val: string) => ["Employee", "Manager"].includes(val),
      then: Yup.string().required("Last name is required"),
    }),
});

interface CreateAccountFormProps {}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = () => {
  const screenType = useScreenType();
  const [fileName, setFileName] = useState("");

  return (
    <WhiteCard padding={screenType === "fullscreen" ? "medium" : "big"}>
      <Formik<{
        email: string;
        image: string;
        password: string;
        repeatPassword: string;
        companyName: string;
        vatNumber: string;
        firstName: string;
        lastName: string;
        role: SelectOption;
      }>
        initialValues={{
          email: "",
          image: "",
          password: "",
          repeatPassword: "",
          companyName: "",
          vatNumber: "",
          firstName: "",
          lastName: "",
          role: {
            label: "-- Select role --",
            value: "",
          },
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={createAccountSchema}
        onSubmit={(values, actions) => {
          const role: string = values.role.value;
          privateClient
            .post(`accounts`, {
              json: {
                image: values.image,
                email: values.email,
                password: values.password,
                repeatPassword: values.repeatPassword,
                role,
                ...(role === "Customer"
                  ? {
                      companyName: values.companyName,
                      vatNumber: values.vatNumber,
                    }
                  : {
                      firstName: values.firstName,
                      lastName: values.lastName,
                    }),
              },
            })
            .then(async (res: any) => {
              if (res.ok) {
                showSuccessToast(`Account created successfully.`);
                const data: Account = await res.json();
                if (data.id) router.push(`/accounts/${data.id}`);
              }
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => actions.setSubmitting(false));
        }}
      >
        {({ setFieldValue, values, errors, isSubmitting }) => (
          <Form className={`flex space-x-5 focus:outline-none w-full`}>
            <div className="flex flex-col justify-center items-center space-y-3 rounded-xl w-15 h-15 bg-primary-325 border-1 border-shadow-200">
              <Avatar
                size="lg"
                className="rounded-2xl"
                src={values.image || "/img/avatar-placeholder.png"}
                isBase64={!!values.image}
                refresh={fileName}
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
                      if (!SUPPORTED_FORMATS.includes(newFile.type)) {
                        showErrorToast(
                          "Only .jpg, .png, .gif file formats are allowed"
                        );
                      } else if (newFile.size > ALLOWED_FILE_SIZE) {
                        showErrorToast(
                          "Image size is too big. Max allowed size is 3 MB."
                        );
                      } else {
                        reader.readAsDataURL(newFile);
                      }
                    }
                  }
                }}
              />
            </div>

            <div className="flex flex-col flex-grow justify-between">
              <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-5">
                <div className="w-full text-sm">
                  <div className="mb-1 text-primary-400">Email Address</div>
                  <InputField padding="lg" name="email" />
                </div>
                <div className="w-full text-sm">
                  <div className="mb-1 text-primary-400">Password</div>
                  <InputField padding="lg" name="password" type="password" />
                </div>
                <div className="w-full text-sm">
                  <div className="mb-1 text-primary-400">Repeat password</div>
                  <InputField
                    padding="lg"
                    name="repeatPassword"
                    type="password"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-4 space-y-3 lg:flex-row lg:space-y-0 lg:space-x-5">
                <div className="w-full text-sm">
                  <div className="mb-1 text-primary-400">Role</div>
                  <SelectBox
                    padding="md"
                    value={values.role}
                    error={!!errors.role}
                    options={roleOptions}
                    onChange={(value: SelectOption) => {
                      setFieldValue("role", value);
                    }}
                  />
                  <div className={`flex mt-1`}>
                    <InputErrorMsg>{errors?.role?.value}</InputErrorMsg>
                  </div>
                </div>

                {values.role.value === "Customer" && (
                  <>
                    <div className="w-full text-sm">
                      <div className="mb-1 text-primary-400">Company Name</div>
                      <InputField padding="lg" name="companyName" type="text" />
                    </div>
                    <div className="w-full text-sm">
                      <div className="mb-1 text-primary-400">VAT Number</div>
                      <InputField padding="lg" name="vatNumber" type="text" />
                    </div>
                  </>
                )}

                {["Employee", "Manager"].includes(values.role.value) && (
                  <>
                    <div className="w-full text-sm">
                      <div className="mb-1 text-primary-400">First Name</div>
                      <InputField padding="lg" name="firstName" type="text" />
                    </div>
                    <div className="w-full text-sm">
                      <div className="mb-1 text-primary-400">Last Name</div>
                      <InputField padding="lg" name="lastName" type="text" />
                    </div>
                  </>
                )}
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
