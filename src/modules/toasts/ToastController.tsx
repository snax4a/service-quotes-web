import React from "react";
import { MainInnerGrid } from "../../ui/MainGrid";
import { Toast } from "../../ui/Toast";
import { useToastStore } from "./useToastStore";

interface ToastControllerProps {}

export const ToastController: React.FC<ToastControllerProps> = ({}) => {
  const { toasts, hideToast } = useToastStore();
  return (
    <div
      style={{ zIndex: 1001 }}
      className={`flex w-full fixed bottom-0 justify-center`}
    >
      <MainInnerGrid>
        <div />
        <div className={`flex flex-col w-full`}>
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
        <div />
      </MainInnerGrid>
    </div>
  );
};
