"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  team: string;
  fuel: number;
  cost: number;
  distance: number;
  average: number;
  date: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: () => <div className='text-center'>S/N</div>,
    cell: (info) => (
      <div className='text-center'>{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: "team",
    header: "Team Name",
  },
  {
    accessorKey: "fuel",
    header: () => <div className='text-center'>Fuel Used (L)</div>,
    cell: (info) => (
      <div className='text-center'>{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: "distance",
    header: () => <div className='text-center'>Distance (KM)</div>,
    cell: (info) => (
      <div className='text-center'>{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: "average",
    header: () => <div className='text-center'>Average (KM/L)</div>,
    cell: (info) => (
      <div className='text-center'>{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: "cost",
    header: () => <div className='text-center'>Trip Cost (NGN)</div>,
    cell: (info) => (
      <div className='text-center'>{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <div className='text-center'>
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Trip Date
          <ArrowUpDown className='h-4 w-4' />
        </Button>
      </div>
    ),
    cell: (info) => (
      <div className='text-center'>{info.getValue() as string}</div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const info = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>View trip details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
