import React from "react";
import { CenterLoader } from "./CenterLoader";

export type TableRowProps = {
  className?: string;
  onClick?: () => void;
};

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <tr
      onClick={onClick}
      className={`border-b-1 border-primary-200 hover:bg-primary-100 ${className}`}
    >
      {children}
    </tr>
  );
};

export type TableCellProps = {
  className?: string;
};

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
}) => {
  return <td className={`py-5 ${className}`}>{children}</td>;
};

export type NoDataRowProps = {
  colSpan: number;
};

export const NoDataRow: React.FC<NoDataRowProps> = ({ colSpan }) => {
  return (
    <TableRow>
      <td colSpan={colSpan} className="py-5 text-center text-primary-500">
        No data found
      </td>
    </TableRow>
  );
};

export type DataTableProps = {
  columns: string[];
  isLoading?: boolean;
  dataCount: number;
};

export const DataTable: React.FC<DataTableProps> = ({
  children,
  columns,
  isLoading = false,
  dataCount,
}) => {
  return (
    <table className="w-full text-left table-auto font-inter">
      <thead className="border-b-1 border-primary-200">
        <tr className="text-primary-400 text-sm2">
          {columns.map((columnName, index) => (
            <th key={`${columnName}-${index}`} className="py-4 font-normal">
              {columnName}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {isLoading && (
          <tr>
            <td colSpan={columns.length} className="py-8">
              <CenterLoader />
            </td>
          </tr>
        )}
        {!isLoading && children}
        {!isLoading && dataCount === 0 && (
          <NoDataRow colSpan={columns.length} />
        )}
      </tbody>
    </table>
  );
};
