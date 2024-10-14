"use client";

import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define columns configuration for the transaction table
export const columns = [
  {
    accessorKey: "financeType",
    header: "Finance Type",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: () => <div>Amount</div>,
    cell: ({ row }) => {
      // Parse amount value to display as currency
      const amount = parseFloat(row.getValue("amount"));
      const financeType = row.getValue("financeType"); // Access financeType to determine income or expense
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      // Define CSS class based on the financeType (income or expense)
      const amountClass =
        financeType === "income" ? "text-green-500" : "text-red-500"; // Green for income, red for expense

      return <div className={amountClass}>{formatted}</div>;
    },
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      // Format date value
      const date = new Date(row.getValue("date"));
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      }).format(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "invoiceUrl",
    header: "Invoice URL",
    cell: ({ row }) => {
      // Render link if invoiceUrl exists
      const invoiceUrl = row.getValue("invoiceUrl");
      return invoiceUrl ? (
        <a
          href={invoiceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-800"
        >
          Link
        </a>
      ) : null;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      // Render dropdown menu for actions
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* Add actions like edit, delete, view details */}
            <DropdownMenuItem onClick={() => console.log(transaction.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log(transaction.id)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log(transaction.id)}>
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// TransactionTable component to display transactions
export function TransactionTable({ transactions }) {
  // Initialize React table hook
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="rounded-sm border">
      <Table>
        {/* Render table headers */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="!p-5">
                  {/* Render header content */}
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        {/* Render table body */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="!p-5">
                    {/* Render cell content */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            // Render no results message
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
