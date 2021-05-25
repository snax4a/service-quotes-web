import React from "react";

interface InputErrorMsgProps {}

export const InputErrorMsg: React.FC<InputErrorMsgProps> = ({ children }) => {
  return (
    <div className={`flex text-xs text-red`} data-testid="input-error-msg">
      {children}
    </div>
  );
};
