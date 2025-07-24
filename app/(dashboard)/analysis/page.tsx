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
import { getDoughnut, options } from "@/components/charts";
import axios from "axios";
import { toast } from "sonner";
import { Doughnut } from "react-chartjs-2";
import getAnalysis from "./data";
import { currencyFormat } from "@/components/formats";

export default function Home() {
  const [team, setTeam] = useState("all");
  const [start, setStart] = useState<Date | undefined>(undefined);
  const [end, setEnd] = useState<Date | undefined>(undefined);
  const [openTo, setOpenTo] = useState(false);
  const [openFrom, setOpenFrom] = useState(false);
  const [loading, setLoading] = useState(false);

  const [trips, setTrips] = useState<any[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!start || !end) {
      return toast.info("Please select both start and end dates.");
    }
    try {
      setLoading(true);
      const res = await axios.get("/api/fetch-trips", {
        params: {
          start,
          end,
          team,
        },
      });
      if (res.data) {
        setLoading(false);
        setTrips(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { totalTrips, teamsWithTotals, grandTotal } = getAnalysis(trips);

  const doughnutData = getDoughnut(teamsWithTotals);

  return (
    <main className=''>
      <h1 className='text-3xl font-bold mb-4 text-hover-primary'>
        Cost Analysis
      </h1>
      <Separator />
      <form onSubmit={handleSubmit} className='flex items-center gap-4 my-2'>
        <CalendarDays className='text-hover-primary' />

        <div className='flex items-center gap-3'>
          <Label htmlFor='start'>Date Range:</Label>
          <Popover open={openFrom} onOpenChange={setOpenFrom}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                id='start'
                className='w-36 justify-between font-normal text-gray-500'>
                {start ? start.toLocaleDateString() : "Start date"}
                <CalendarIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto overflow-hidden p-0'
              align='start'>
              <Calendar
                mode='single'
                selected={start}
                captionLayout='dropdown'
                onSelect={(start) => {
                  setStart(start);
                  setOpenFrom(false);
                }}
              />
            </PopoverContent>
          </Popover>
          <Popover open={openTo} onOpenChange={setOpenTo}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                id='end'
                className='w-36 justify-between font-normal text-gray-500'>
                {end ? end.toLocaleDateString() : "End date"}
                <CalendarIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto overflow-hidden p-0'
              align='start'>
              <Calendar
                mode='single'
                selected={end}
                captionLayout='dropdown'
                onSelect={(end) => {
                  setEnd(end);
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
        <Button type='submit' disabled={loading}>
          {loading ? "Applying..." : "Apply filters"}
        </Button>
      </form>
      <ul
        className={`flex ${
          totalTrips !== 0 ? "items-start" : "items-center"
        }  mb-5 gap-5 mt-5`}>
        <div className='flex flex-col gap-3'>
          <Overviews
            title='Total Trips Embarked'
            value={totalTrips}
            info='Trips embarked by all teams'
            Icon={<Users />}
          />
          <Overviews
            title='Estimated Total Cost'
            value={currencyFormat(grandTotal)}
            info='Estimated cost incurred for the total trips'
            Icon={<Users />}
          />
          <Overviews
            title='Average Cost/Trip'
            value={currencyFormat(grandTotal / totalTrips || 0)}
            info='Average cost incurred for the trips'
            Icon={<Users />}
          />
        </div>
        <div
          className={`${
            totalTrips === 0 && "hidden"
          } w-3/5 border rounded-md border-hover-primary p-2 mb-6`}>
          <Doughnut data={doughnutData} options={options} />
        </div>
        <div
          className={`${
            totalTrips !== 0 && "hidden"
          } border rounded-md border-hover-primary p-5 mb-6 font-semibold text-2xl text-hover-primary text-center`}>
          No trip recorded. <br /> Please apply filters to view analysis.
        </div>
      </ul>
    </main>
  );
}
