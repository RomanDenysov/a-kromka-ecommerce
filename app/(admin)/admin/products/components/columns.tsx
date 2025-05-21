'use client';

import type { ColumnDef } from '@tanstack/react-table';

export type TableProduct = {
  id: string;
  image: string;
  name: string;
  price: string;
  status: 'draft' | 'active' | 'sold' | 'archived';
  createdAt: string;
};

export const columns: ColumnDef<TableProduct>[] = [
  {
    header: 'Image',
    accessorKey: 'image',
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Price',
    accessorKey: 'price',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
  },
];
