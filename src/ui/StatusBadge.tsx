import React from "react";
import { camelCaseToWords } from "../lib/helpers";

interface StatusBadgeProps {
  className?: string;
  status: keyof typeof statuses;
}

const statuses = {
  Unpaid: "bg-orange-100 text-primary-800",
  Paid: "bg-blue text-white",
  New: "bg-blue text-white",
  Assigned: "bg-primary-400 text-white",
  InProgress: "bg-orange-100 text-primary-800",
  Completed: "bg-green text-white",
  Cancelled: "bg-orange text-white",
  Confirmed: "bg-green text-white",
  Rejected: "bg-orange text-white",
  Errored: "bg-orange text-white",
  Pending: "bg-primary-400 text-white",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
}) => {
  return (
    <span
      className={`py-1 px-3 text-sm2 rounded font-semibold ${statuses[status]} ${className}`}
    >
      {camelCaseToWords(status).toUpperCase()}
    </span>
  );
};
