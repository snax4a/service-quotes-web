import * as React from "react";
import create from "zustand";
import { combine } from "zustand/middleware";
import { Button } from "../ui/Button";
import { ButtonLink } from "../ui/ButtonLink";
import { Modal } from "../ui/Modal";

interface Props {}

type Fn = () => void;

const useConfirmModalStore = create(
  combine(
    {
      message: "",
      onConfirm: undefined as undefined | Fn,
    },
    (set) => ({
      close: () => set({ onConfirm: undefined, message: "" }),
      set,
    })
  )
);

export const modalConfirm = (message: string, onConfirm: Fn) => {
  useConfirmModalStore.getState().set({ onConfirm, message });
};

export const ConfirmModal: React.FC<Props> = () => {
  const { onConfirm, message, close } = useConfirmModalStore();
  return (
    <Modal isOpen={!!onConfirm} onRequestClose={() => close()}>
      <div className="flex flex-col">
        <div className={`flex text-primary-800`}>{message}</div>
        <div className={`flex mt-6 items-center`}>
          <Button
            onClick={() => {
              close();
              onConfirm?.();
            }}
            type="submit"
          >
            Yes
          </Button>
          <ButtonLink
            type="button"
            onClick={close}
            className={`ml-4 text-white`}
            color="secondary"
          >
            Cancel
          </ButtonLink>
        </div>
      </div>
    </Modal>
  );
};
