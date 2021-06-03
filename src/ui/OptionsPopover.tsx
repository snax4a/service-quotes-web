import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

export interface OptionsPopoverProps {
  button: React.ReactNode;
  className?: string;
  padding?: string;
  position?: "center" | "left" | "right";
}

export const OptionsPopover: React.FC<OptionsPopoverProps> = ({
  button,
  className = "",
  padding = "p-2",
  position = "center",
  children,
}) => {
  let pos = `-translate-x-1/2`;

  switch (position) {
    case "left":
      pos = `-translate-x-3/4`;
      break;
    case "right":
      pos = "-translate-x-1/4";
      break;
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button>{button}</Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`absolute z-10 px-4 mt-2 left-1/2 sm:px-0 lg:max-w-3xl transform ${pos}`}
            >
              <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-black ring-opacity-5">
                <div
                  className={`relative flex flex-col bg-white ${padding} ${className}`}
                >
                  {children}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
