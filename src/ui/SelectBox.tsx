import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SolidCheck, SolidSelector } from "../icons";

interface Value {
  label: string;
  value: string;
}

const paddings = {
  default: "py-3 pl-4.5 pr-10",
  md: "py-2 pl-4.5 pr-10",
};

export interface SelectBoxProps {
  value: Value;
  padding?: keyof typeof paddings;
  disabled?: boolean;
  options: Value[];
  error?: boolean;
  onChange: (value: Value) => void;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
  value,
  error,
  padding = "default",
  disabled = false,
  options,
  onChange,
}) => {
  const ring = error ? `ring-1 ring-red border-0` : "";

  return (
    <div className="relative">
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <Listbox.Button
          className={`relative w-full ${paddings[padding]} text-left ${
            disabled ? "text-primary-400" : "text-primary-600"
          } bg-primary-250 border-1 text-sm border-black border-opacity-20 rounded-2xl cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm ${ring}`}
        >
          <span className="block truncate">{value.label}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <SolidSelector
              className="w-4 h-4 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute z-50 w-full py-1 mt-2 overflow-auto text-base bg-primary-250 border-1 border-black border-opacity-10 rounded-2xl shadow-sm max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                value={option}
                className={({ active }) =>
                  `${active ? "bg-primary-200" : "text-primary-800"}
                            text-left select-none relative py-2 pl-6.2 pr-4 hover: `
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? "font-medium" : "font-normal"
                      } block truncate`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? "text-amber-600" : "text-amber-600"
                        }
                          absolute inset-y-0 left-0 flex items-center pl-3`}
                      >
                        <SolidCheck
                          className="w-4 h-4 text-blue"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};
