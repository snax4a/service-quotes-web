import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/Button";
import { useTokenStore } from "../auth/useTokenStore";
import { HeaderController } from "../display/HeaderController";
import { InputField } from "../../form-fields/InputField";
import * as Yup from "yup";
import { publicClient } from "../../lib/queryClient";
import { Account } from "./AuthProvider";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minumum 6 characters")
    .max(30, "Maximum 30 characters")
    .required("Password is required"),
});

export const LoginPage: React.FC = () => {
  const hasToken = useTokenStore((s) => !!s.accessToken);
  const { push } = useRouter();
  const [tokensChecked, setTokensChecked] = useState(false);

  useEffect(() => {
    if (hasToken) {
      push("/dashboard");
    } else {
      setTokensChecked(true);
    }
  }, [hasToken, push]);

  if (!tokensChecked) return null;

  return (
    <>
      <HeaderController embed={{}} title="Login" />
      <div className="flex m-auto flex-col p-7 gap-5 bg-white shadow-md sm:rounded-30 z-10 sm:w-400 w-full">
        <div className="flex gap-2 flex-col">
          <span className="text-2xl text-primary-900 font-bold tracking-wider">
            Login
          </span>
        </div>
        <Formik<{
          email: string;
          password: string;
        }>
          initialValues={{
            email: "",
            password: "",
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={loginSchema}
          onSubmit={async ({ email, password }) => {
            const data: Account = await publicClient
              .post("accounts/authenticate", {
                json: {
                  email,
                  password,
                },
              })
              .json();

            useTokenStore.getState().setTokens({ accessToken: data.jwtToken });
          }}
        >
          {({ isSubmitting }) => (
            <Form className={`flex flex-col gap-4 w-full`}>
              <InputField placeholder="Email" name="email" autoFocus />
              <InputField
                className={`w-full`}
                placeholder="Password"
                autoComplete="off"
                name="password"
                type="password"
              />

              <div className={`flex pt-2 items-center`}>
                <Button
                  loading={isSubmitting}
                  color="primary"
                  type="submit"
                  className={`flex w-full justify-center py-3.5`}
                >
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
