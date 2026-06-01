"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { RouterOutput } from "@/lib/trpcInferTypes";
import Big from "big.js";
import { trpc } from "@/trpc/client";
import Link from "next/link";

export default function ProductsTable() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data } = trpc.product.adminGetProducts.useQuery({
    page: pageIndex,
    limit: pageSize,
  });

  const pageCount = new Big(data?.total ?? 0)
    .div(pageSize)
    .round(0, Big.roundUp)
    .toNumber();

  // Define columns
  type Product =
    RouterOutput["product"]["adminGetProducts"]["products"][number];

  const columnHelper = createColumnHelper<Product>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("name", {
        header: "Product Name",
        cell: (info) => (
          <span className="font-semibold text-gray-900">{info.getValue()}</span>
        ),
      }),

      columnHelper.accessor("price", {
        header: "Price",
        cell: (info) => (
          <span className="font-semibold text-amber-600">
            {info.getValue()} PLN
          </span>
        ),
      }),

      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => (
          <p className="max-w-xs truncate text-gray-600">{info.getValue()}</p>
        ),
      }),

      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => (
          <p className="max-w-xs truncate text-gray-600">
            {info.getValue().name ?? ""}
          </p>
        ),
      }),

      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex gap-2">
            <Link
              href={`/admin/products/${info.row.original.id}`}
              className="rounded bg-blue-500 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
            >
              Edit
            </Link>

            <button className="rounded bg-red-500 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-red-600">
              Delete
            </button>
          </div>
        ),
      }),
    ],
    [],
  );

  // Create table instance
  const table = useReactTable({
    data: data?.products ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {!data?.products.length ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600 text-lg">No products found</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="bg-gray-50 border-b border-gray-200"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-left text-sm font-bold text-gray-900"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 text-sm text-gray-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold">{pageIndex * pageSize + 1}</span>{" "}
              to{" "}
              <span className="font-semibold">
                {Math.min((pageIndex + 1) * pageSize, data.total)}
              </span>{" "}
              of <span className="font-semibold">{data.total}</span> products
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPageIndex(0)}
                disabled={pageIndex === 0}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ⟨⟨
              </button>

              <button
                onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
                disabled={pageIndex === 0}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ⟨ Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPageIndex(index)}
                    className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                      pageIndex === index
                        ? "bg-amber-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setPageIndex((prev) => Math.min(pageCount - 1, prev + 1))
                }
                disabled={pageIndex === pageCount - 1}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next ⟩
              </button>

              <button
                onClick={() => setPageIndex(pageCount - 1)}
                disabled={pageIndex === pageCount - 1}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ⟩⟩
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
