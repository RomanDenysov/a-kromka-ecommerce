'use client';

import { Badge, type BadgeVariant } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatPrice } from '@/lib/format-price';
import type { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export type TableProduct = {
  id: string;
  image: string;
  name: string;
  price: number;
  status: 'draft' | 'active' | 'sold' | 'archived';
  createdAt: string;
};

export const columns: ColumnDef<TableProduct>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'image',
    header: '',
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.image}
          alt={row.original.name}
          width={100}
          height={100}
          draggable={false}
          className="rounded-md"
        />
      );
    },
  },
  {
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => {
      return (
        <Link
          className="hover:underline"
          href={`/admin/products/${row.original.id}`}
        >
          {row.original.name}
        </Link>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="group"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </Button>
      );
    },
    accessorKey: 'price',
    cell: ({ row }) => {
      return (
        <span className="font-medium">{formatPrice(row.original.price)}</span>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="group"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </Button>
      );
    },
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.original.status;
      let variant: BadgeVariant = 'default';
      switch (status) {
        case 'sold':
          variant = 'destructive';
          break;
        case 'draft':
          variant = 'secondary';
          break;
        default:
          variant = 'success';
          break;
      }
      return <Badge variant={variant}>{row.original.status}</Badge>;
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="group"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created At
          <ArrowUpDown className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </Button>
      );
    },
    accessorKey: 'createdAt',
  },
  {
    header: 'Actions',
    accessorKey: 'actions',
    cell: ({ row }) => <RowActions product={row.original} />,
  },
];

function RowActions({ product }: { product: TableProduct }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/admin/products/${product.id}/edit`}>
              <PencilIcon className="size-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          {/* TODO: Add delete functionality */}
          <DropdownMenuItem>
            <TrashIcon className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={product.status}
              onValueChange={(value) => {
                // TODO: Update status in the database
                console.log(value);
              }}
            >
              <DropdownMenuRadioItem value="active">
                Active
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="sold">Sold</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="draft">Draft</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="archived">
                Archived
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
