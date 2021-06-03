import * as React from "react";
import { SolidPlus } from "../icons";
import { ToastType } from "../modules/toasts/useToastStore";

export type ToastDurations = "default" | "sticky";

export interface ToastProps {
  type: ToastType;
  message: string;
  button?: React.ReactNode;
  duration?: ToastDurations;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type,
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

  const variants = {
    error: `bg-orange text-white`,
    success: `bg-green text-white`,
  };

  return (
    <div
      className={`flex rounded-8 py-3 px-4 relative w-auto items-center justify-center transition-transform duration-300 ${variants[type]}`}
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
