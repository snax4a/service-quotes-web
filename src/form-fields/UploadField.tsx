import React, { createRef } from "react";
import { Field } from "formik";
import { OutlineUpload } from "../icons";
import { Button } from "../ui/Button";

interface UploadFieldProps {
  name: string;
  label: string;
  isError?: boolean;
  onChange: (e: any) => void;
}

export const UploadField: React.FC<UploadFieldProps> = ({
  name,
  label,
  isError,
  onChange,
  ...props
}) => {
  const fileInput = createRef<any>();

  return (
    <>
      <Field
        name={name}
        title={label}
        type={"file"}
        style={{
          display: "none",
        }}
        innerRef={fileInput}
        value={undefined}
        onChange={onChange}
        {...props}
      />
      <Button
        type="button"
        color="secondary"
        size="small2"
        onClick={() => fileInput.current?.click()}
        icon={<OutlineUpload width={15} height={15} />}
      >
        {label}
      </Button>
    </>
  );
};
