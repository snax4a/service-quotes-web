import React from "react";
import { ArrowLeft } from "../icons";

export interface PageHeaderProps {
  title?: string;
  onBackClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  children,
  onBackClick,
}) => {
  return (
    <div>
      <div
        className={`flex items-center text-primary-800 ${
          title ? "py-6" : "pt-6.5 pb-5.5"
        }`}
      >
        {title && (
          <span className="text-2xl font-semibold md:text-5xl">{title}</span>
        )}
        {children}
        {onBackClick && (
          <button
            className="flex items-center p-3 ml-6 h-4 text-sm text-white bg-primary-800 rounded-16"
            onClick={onBackClick}
          >
            <ArrowLeft className="mr-2" />
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};
