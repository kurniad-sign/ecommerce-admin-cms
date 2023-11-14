'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Date',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
