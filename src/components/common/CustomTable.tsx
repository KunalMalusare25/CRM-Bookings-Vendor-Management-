import { useEffect, useState, type ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  title: ReactNode;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
}

interface CustomTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyText?: string;
  itemsPerPage?: number;
}

const CustomTable = <T,>({
  columns,
  data,
  onRowClick,
  emptyText = "No records found.",
  itemsPerPage = 5,
}: CustomTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Keep current page valid when
  // filters/search reduce the data.
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [data.length, totalPages, currentPage]);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const startIndex =
    data.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const endIndex = Math.min(currentPage * itemsPerPage, data.length);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-237.5">
          {/* Header */}
          <thead>
            <tr className="border-b border-slate-200 bg-[#b9d1fd] ">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-900 ${
                    column.className || ""
                  }`}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}

          <tbody className="divide-y divide-slate-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => onRowClick?.(item)}
                  className={`transition ${
                    onRowClick ? "cursor-pointer hover:bg-indigo-50/40" : ""
                  }`}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-5 py-4">
                      {column.render
                        ? column.render(item, index)
                        : String(item[column.key as keyof T] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-5 py-16 text-center">
                  <p className="font-semibold text-slate-700">{emptyText}</p>

                  <p className="mt-1 text-sm text-slate-400">
                    Try changing your search or filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination  */}
      {data.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">{startIndex}</span>{" "}
            to <span className="font-semibold text-slate-700">{endIndex}</span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">{data.length}</span>{" "}
            records
          </p>

          <div className="flex items-center gap-2">
            {/* Previous */}

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="text-lg">‹</span>
            </button>

            {/* Page Numbers */}

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
                    currentPage === page
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "border border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            {/* Next */}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="text-lg">›</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
