import { Form, Formik } from "formik";
import React from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { UUID, Employee } from "../../types";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { CenterLoader } from "../../ui/CenterLoader";
import { Modal } from "../../ui/Modal";
import { SelectBox } from "../../ui/SelectBox";
import { validate } from "uuid";
import { privateClient } from "../../lib/queryClient";
import { showSuccessToast } from "../../lib/toasts";

interface AssignEmployeeModalProps {
  onSubmit: () => void;
  onRequestClose: () => void;
  serviceId: UUID;
}

interface SelectedEmployee {
  label: string;
  value: UUID;
}

export const AssignEmployeeModal: React.FC<AssignEmployeeModalProps> = ({
  onSubmit,
  onRequestClose,
  serviceId,
}) => {
  const { data, isLoading } = useQueryData("employees");

  if (!data) return null;

  const employeeOptions = data.map((emp: Employee) => {
    const specializations = emp.specializations
      ? emp.specializations.map((s) => s.name)
      : [];
    return {
      label: `${emp.firstName} ${emp.lastName} (${specializations.join(", ")})`,
      value: emp.id,
    };
  });

  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      {isLoading ? (
        <CenterLoader />
      ) : (
        <Formik<{
          employee: SelectedEmployee;
        }>
          initialValues={{
            employee: {
              label: "Select employee",
              value: "",
            },
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validate={({ employee }) => {
            const errors: Record<string, string> = {};

            if (!employee || !validate(employee.value)) {
              return {
                employee: "Employee must be selected",
              };
            }

            return errors;
          }}
          onSubmit={({ employee }, actions) => {
            privateClient
              .post(`servicerequests/${serviceId}/employees`, {
                json: {
                  employeeId: employee.value,
                },
              })
              .then((res) => {
                if (res.ok) {
                  showSuccessToast(
                    "Employee has been assigned to the service."
                  );
                  onRequestClose();
                  onSubmit();
                }
                actions.setSubmitting(false);
              })
              .catch(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {({ setFieldValue, values, errors, isSubmitting }) => (
            <Form className={`flex flex-col focus:outline-none w-full`}>
              <SelectBox
                value={values.employee}
                error={!!errors.employee}
                options={employeeOptions}
                onChange={(value: SelectedEmployee) => {
                  setFieldValue("employee", value);
                }}
              />
              <div className={`flex mt-5 justfy-between`}>
                <Button loading={isSubmitting} type="submit" className={`mr-3`}>
                  Assign employee
                </Button>
                <ButtonLink type="button" onClick={onRequestClose}>
                  Cancel
                </ButtonLink>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};
