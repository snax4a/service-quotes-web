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
      <div className="flex items-center py-6 text-primary-800">
        {title && (
          <span className="text-2xl md:text-5xl font-semibold">{title}</span>
        )}
        {children}
        {onBackClick && (
          <button
            className="flex items-center p-3 ml-6 h-4 bg-primary-800 text-sm text-white rounded-16"
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
