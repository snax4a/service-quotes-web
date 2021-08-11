import React from "react";
import create from "zustand";
import { combine } from "zustand/middleware";
import { v4 } from "uuid";
import { ToastDurations } from "../../ui/Toast";

export type ToastType = "error" | "success";

export type Toast = {
  id: string;
  button?: React.ReactNode;
  duration?: ToastDurations;
  message: string;
  type: ToastType;
};

export const useToastStore = create(
  combine(
    {
      toasts: [] as Toast[],
    },
    (set) => ({
      hideToast: (id: string) =>
        set((x) => ({ toasts: x.toasts.filter((y) => y.id !== id) })),
      showToast: (t: Omit<Toast, "id">) =>
        set((x) => {
          const currentRemovedToasts: Toast[] = x.toasts.filter(
            (y) => y.message !== t.message
          );
          return {
            toasts: [...currentRemovedToasts, { ...t, id: v4() }],
          };
        }),
    })
  )
);
