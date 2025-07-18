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
export type Trips = {
  id: string;
  date: Date;
  location: string;
  mileageStart: number;
  mileageEnd: number;
  team: {
    id: string;
    name: string;
  } | null;
};

export const columns: ColumnDef<Trips>[] = [
  {
    accessorKey: "id",
    header: () => <div className='text-center'>S/N</div>,
    cell: ({ row }) => <div className='text-center'>{row.index + 1}</div>,
  },
  {
    accessorKey: "team",
    header: "Team Name",
    cell: ({ row }) => {
      const { team } = row.original;
      return <div>{team?.name}</div>;
    },
    accessorFn: (row) => row.team?.name ?? "",
    filterFn: "includesString",
  },
  {
    accessorKey: "location",
    header: () => <div className='text-center'>Location</div>,
    cell: (info) => (
      <div className='text-center'>{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: "distance",
    header: () => <div className='text-center'>Distance</div>,
    cell: ({ row }) => {
      const { mileageStart, mileageEnd } = row.original;
      return <div className='text-center'>{mileageEnd - mileageStart} KM</div>;
    },
  },
  {
    accessorKey: "cost",
    header: () => <div className='text-center'>Estimated Cost </div>,
    cell: (info) => <div className='text-center'>In Progress</div>,
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
    cell: (info) => {
      const date = new Date(info.getValue() as string);
      return <div className='text-center'>{date.toLocaleDateString()}</div>;
    },
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
