"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

interface AdminDataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  sorting?: SortingState;
  onSortingChange?: (updater: SortingState) => void;
  getRowId?: (row: TData) => string;
  emptyState?: React.ReactNode;
  caption?: string;
}

/**
 * Reusable TanStack Table wrapper with calm admin styling, sortable headers
 * and a semantic <table> for accessibility.
 */
export function AdminDataTable<TData>({
  columns,
  data,
  sorting,
  onSortingChange,
  getRowId,
  emptyState,
  caption,
}: AdminDataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    state: sorting ? { sorting } : undefined,
    onSortingChange: onSortingChange
      ? (updater) => {
          const next = typeof updater === "function" ? updater(sorting ?? []) : updater;
          onSortingChange(next);
        }
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: getRowId ? (row) => getRowId(row) : undefined,
    manualSorting: false,
  });

  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className="border-border bg-canvas shadow-card overflow-x-auto rounded-[16px] border">
      <table className="w-full min-w-[760px] border-collapse text-left">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-border bg-surface border-b">
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    scope="col"
                    className="text-text-secondary px-4 py-3 text-xs font-semibold tracking-wide whitespace-nowrap uppercase"
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="hover:text-text-primary focus-visible:outline-primary inline-flex items-center gap-1.5 rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <Icon
                          name={
                            sorted === "asc"
                              ? "ArrowUp"
                              : sorted === "desc"
                                ? "ArrowDown"
                                : "ChevronsUpDown"
                          }
                          className={cn("size-3.5", sorted ? "text-primary" : "text-text-tertiary")}
                          aria-hidden
                        />
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-border hover:bg-surface/60 border-b last:border-0">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-small text-text-primary px-4 py-3 align-middle">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
