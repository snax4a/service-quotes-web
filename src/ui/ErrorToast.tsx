import * as React from "react";
import { SolidPlus } from "../icons";

export type ToastDurations = "default" | "sticky";

export interface ErrorMessageProps {
  message: string;
  button?: React.ReactNode;
  duration?: ToastDurations;
  onClose?: () => void;
}

export const ErrorToast: React.FC<ErrorMessageProps> = ({
  message,
  button,
  duration = "default",
  onClose,
}) => {
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;
  React.useEffect(() => {
    if (duration === "sticky") {
      return;
    }

    const timer = setTimeout(() => {
      onCloseRef.current?.();
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <div
      className={`flex rounded-8 py-3 px-4 relative w-auto items-center justify-center text-white transition-transform duration-300 bg-orange`}
      data-testid="error-message"
    >
      <div className={`flex space-x-4 items-center`}>
        <div className={`bold`}>{message}</div>
        {button}
      </div>
      {onClose ? (
        <div
          className={`flex ml-3 cursor-pointer`}
          style={{
            right: 15,
            width: 15,
            height: 15,
          }}
          onClick={onClose}
          data-testid="close-btn"
        >
          <SolidPlus style={{ transform: "rotate(45deg)" }} />
        </div>
      ) : null}
    </div>
  );
};
