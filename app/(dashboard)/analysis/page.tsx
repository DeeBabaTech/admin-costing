"use client";

import { FormEvent, useState } from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Banknote,
  CalendarDays,
  Fuel,
  Gauge,
  TrendingUp,
  Users,
} from "lucide-react";
import Overviews from "@/components/overviews";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BarChart, Charts } from "@/components/charts";
import { set } from "zod";
import { tr } from "zod/v4/locales";
import axios from "axios";
import { toast } from "sonner";

const cards = [
  {
    id: "1",
    title: "Total Fuel Cost",
    value: "20",
    info: "+8.5% Compared to previous month",
  },
  {
    id: "2",
    title: "Average Cost/Trip",
    value: "20",
    info: "+1.2% Compared to previous month",
  },
  {
    id: "3",
    title: "Projected Monthly Savings",
    value: "500",
    info: "Target Achieved Based on current trends",
  },
];

export default function Home() {
  const [team, setTeam] = useState("all");
  const [from, setFrom] = useState<Date | undefined>(undefined);
  const [to, setTo] = useState<Date | undefined>(undefined);
  const [openTo, setOpenTo] = useState(false);
  const [openFrom, setOpenFrom] = useState(false);

  const [trips, setTrips] = useState<any[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!from || !to) {
      return toast.error("Please select both start and end dates.");
    }
    try {
      const res = await axios.get("/api/fetch-trips", {
        params: {
          from,
          to,
          team,
        },
      });

      setTrips(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Trips Data:", trips);

  return (
    <main className=''>
      <h1 className='text-3xl font-bold mb-4 text-hover-primary'>
        Cost Analysis
      </h1>
      <Separator />
      <form onSubmit={handleSubmit} className='flex items-center gap-4 my-2'>
        <CalendarDays className='text-hover-primary' />

        <div className='flex items-center gap-3'>
          <Label htmlFor='from'>Date Range:</Label>
          <Popover open={openFrom} onOpenChange={setOpenFrom}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                id='from'
                className='w-36 justify-between font-normal text-gray-500'>
                {from ? from.toLocaleDateString() : "Start date"}
                <CalendarIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto overflow-hidden p-0'
              align='start'>
              <Calendar
                mode='single'
                selected={from}
                captionLayout='dropdown'
                onSelect={(from) => {
                  setFrom(from);
                  setOpenFrom(false);
                }}
              />
            </PopoverContent>
          </Popover>
          <Popover open={openTo} onOpenChange={setOpenTo}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                id='to'
                className='w-36 justify-between font-normal text-gray-500'>
                {to ? to.toLocaleDateString() : "End date"}
                <CalendarIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto overflow-hidden p-0'
              align='start'>
              <Calendar
                mode='single'
                selected={to}
                captionLayout='dropdown'
                onSelect={(to) => {
                  setTo(to);
                  setOpenTo(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex items-center gap-3'>
          <Users size={32} className='text-hover-primary ml-5' />
          <Select onValueChange={setTeam} value={team}>
            <SelectTrigger className='w-full bg-background'>
              <SelectValue placeholder='All teams' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='all'>All Teams</SelectItem>
                <SelectItem value='admin'>Admin Services</SelectItem>
                <SelectItem value='md'>MD's Office</SelectItem>
                <SelectItem value='Operations'>Banking Operations</SelectItem>
                <SelectItem value='financial'>Financial Control</SelectItem>
                <SelectItem value='legal'>Legal Services</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type='submit'>Apply filters</Button>
      </form>
      <ul className='flex flex-wrap justify-start mb-5 gap-[0.5%]'>
        {cards.map((card) => {
          return (
            <Overviews
              key={card.id}
              title={card.title}
              value={card.value}
              info={card.info}
              Icon={<Users />}
            />
          );
        })}
      </ul>
      <div className='flex justify-between gap-3 items-'>
        <div className='w-2/5 border rounded-md border-hover-primary p-4 mb-6'>
          <h2 className='text-xl font-semibold text-hover-primary mb-4'>
            Fuel Costs by Team
          </h2>
          <Charts />
        </div>
        <div className='w-4/5 border rounded-md border-hover-primary p-4 mb-6'>
          <h2 className='text-xl font-semibold text-hover-primary mb-4'>
            Fuel Costs by Team
          </h2>
          <BarChart />
        </div>
      </div>
    </main>
  );
}
