import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const DataGrid = () => {
  const [data] = useState(() => [
    { id: 1, name: 'Mehmet Yılmaz', email: 'mehmet@example.com', role: 'Premium', joinDate: '2024-03-19' },
    { id: 2, name: 'Ayşe Kaya', email: 'ayse@example.com', role: 'Premium', joinDate: '2024-03-19' },
    { id: 3, name: 'Ali Demir', email: 'ali@example.com', role: 'Standart', joinDate: '2024-03-18' },
    { id: 4, name: 'Fatma Şahin', email: 'fatma@example.com', role: 'Premium', joinDate: '2024-03-18' },
    { id: 5, name: 'Ahmet Öz', email: 'ahmet@example.com', role: 'Standart', joinDate: '2024-03-17' }
  ]);

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = [
    {
      accessorKey: 'name',
      header: 'Ad Soyad',
    },
    {
      accessorKey: 'email',
      header: 'E-posta',
    },
    {
      accessorKey: 'role',
      header: 'Üyelik',
    },
    {
      accessorKey: 'joinDate',
      header: 'Kayıt Tarihi',
    }
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Kullanıcı Listesi</h2>
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ara..."
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div
                      className="flex items-center space-x-1 cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                      {header.column.getIsSorted() === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : header.column.getIsSorted() === 'desc' ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize} kayıt
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Önceki
            </button>
            <span className="text-sm text-gray-700">
              Sayfa {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Sonraki
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataGrid;