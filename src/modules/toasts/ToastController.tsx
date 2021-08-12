import React from "react";
import { Toast } from "../../ui/Toast";
import { useToastStore } from "./useToastStore";
import { useScreenType } from "../../shared-hooks/useScreenType";

interface ToastControllerProps {}

export const ToastController: React.FC<ToastControllerProps> = ({}) => {
  const { toasts, hideToast } = useToastStore();
  const screenType = useScreenType();
  return (
    <div
      className={`flex flex-col w-full fixed ${
        screenType === "fullscreen" ? "bottom-7" : "bottom-0"
      }`}
    >
      {toasts.map((t) => (
        <div key={t.id} className={`flex justify-center mb-4`}>
          <Toast
            type={t.type}
            message={t.message}
            duration={t.duration}
            onClose={() => hideToast(t.id)}
          />
        </div>
      ))}
    </div>
  );
};
