import { useToastStore } from "../modules/toasts/useToastStore";

export const showErrorToast = (m: string) => {
  console.log("showErrorToast: ", m);
  useToastStore.getState().showToast({ message: m, type: "error" });
};

export const showSuccessToast = (m: string) => {
  console.log("showSuccessToast: ", m);
  useToastStore.getState().showToast({ message: m, type: "success" });
};
