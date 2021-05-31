import React from "react";
import { CenterLoader } from "./CenterLoader";

export type TableRowProps = {
  onClick?: () => void;
};

export const TableRow: React.FC<TableRowProps> = ({ children, onClick }) => {
  return (
    <tr
      onClick={onClick}
      className="border-b-1 border-primary-200 hover:bg-primary-100"
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
      <td colSpan={colSpan} className="text-primary-500 text-center py-5">
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
    <table className="table-auto font-inter w-full text-left">
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
