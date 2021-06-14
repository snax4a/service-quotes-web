import { Form, Formik } from "formik";
import React from "react";
import { UUID } from "../../types";
import { Button } from "../../ui/Button";
import { ButtonLink } from "../../ui/ButtonLink";
import { Modal } from "../../ui/Modal";
import { privateClient } from "../../lib/queryClient";
import { showSuccessToast } from "../../lib/toasts";
import { InfoText } from "../../ui/InfoText";
import { add } from "date-fns";
import { InputErrorMsg } from "../../ui/InputErrorMsg";
import { CustomDateTimePicker } from "../../ui/CustomDateTimePicker";

interface SetExecutionDateModalProps {
  onSubmit: () => void;
  onRequestClose: () => void;
  serviceId: UUID;
}

export const SetExecutionDateModal: React.FC<SetExecutionDateModalProps> = ({
  onSubmit,
  onRequestClose,
  serviceId,
}) => {
  return (
    <Modal isOpen onRequestClose={onRequestClose}>
      <Formik<{
        plannedExecutionDate: Date;
      }>
        initialValues={{
          plannedExecutionDate: new Date(),
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validate={({ plannedExecutionDate }) => {
          const errors: Record<string, string> = {};

          if (plannedExecutionDate.getTime() < new Date().getTime()) {
            return {
              plannedExecutionDate: "Date needs to be in future",
            };
          }

          return errors;
        }}
        onSubmit={({ plannedExecutionDate }, actions) => {
          privateClient
            .put(`servicerequests/${serviceId}`, {
              json: {
                plannedExecutionDate: plannedExecutionDate.toISOString(),
              },
            })
            .then((res) => {
              if (res.ok) {
                showSuccessToast("Planned execution date has been set.");
                onRequestClose();
                onSubmit();
              }
              actions.setSubmitting(false);
            });
        }}
      >
        {({ setFieldValue, values, errors, isSubmitting }) => {
          return (
            <Form className={`flex flex-col focus:outline-none w-full`}>
              <InfoText className="mb-2">Set planned execution date:</InfoText>
              <CustomDateTimePicker
                value={values.plannedExecutionDate}
                ampm={false}
                minDate={new Date()}
                maxDate={add(new Date(), { months: 1 })}
                format="dd.MM.yyyy, HH:mm"
                error={!!errors.plannedExecutionDate}
                onChange={(x) => {
                  if (x) {
                    setFieldValue("plannedExecutionDate", x);
                  }
                }}
              />
              {errors.plannedExecutionDate ? (
                <div className={`flex mt-1 pl-2`}>
                  <InputErrorMsg>{errors.plannedExecutionDate}</InputErrorMsg>
                </div>
              ) : null}
              <div className={`flex mt-5 justfy-between`}>
                <Button loading={isSubmitting} type="submit" className={`mr-3`}>
                  Save
                </Button>
                <ButtonLink type="button" onClick={onRequestClose}>
                  Cancel
                </ButtonLink>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};
