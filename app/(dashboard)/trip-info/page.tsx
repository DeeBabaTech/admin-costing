"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
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
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const InputData = () => {
  const [team, setTeam] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeDepart, setTimeDepart] = useState("");
  const [timeReturn, setTimeReturn] = useState("");
  const [location, setLocation] = useState("");
  const [mileageStart, setMileageStart] = useState<number>(0);
  const [mileageEnd, setMileageEnd] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const distance = mileageEnd - mileageStart;

  const router = useRouter();

  const submitData = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        team,
        vehicle,
        date,
        timeDepart,
        timeReturn,
        location,
        distance,
      };
      console.log(body);
      const res = await axios.post("/api/add-trip", body);
      console.log(res);
    } catch (error) {
      console.error("Post submission failed:", error);
    }
  };

  return (
    <main className='m-4'>
      <h1 className='text-3xl font-bold mb-2 text-hover-primary'>
        Record Trip Details
      </h1>
      <p className='mb-4 text-gray-600'>
        Enter detailed information on a trip embarked by your team.
      </p>
      <form onSubmit={submitData} className=''>
        <div className='bg-accent/50 p-5 flex flex-wrap gap-[2%] space-y-3'>
          {/* Team Name */}
          <div className='space-y-2 w-[32%]'>
            <Label htmlFor='team'>Team Name</Label>
            <Select onValueChange={setTeam} value={team}>
              <SelectTrigger className='w-full bg-background'>
                <SelectValue placeholder='Select a team' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Departments</SelectLabel>
                  <SelectItem value='1'>Admin Services</SelectItem>
                  <SelectItem value='2'>MD's Office</SelectItem>
                  <SelectItem value='3'>Banking Operations</SelectItem>
                  <SelectItem value='4'>Financial Control</SelectItem>
                  <SelectItem value='5'>Legal Services</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Vehicle */}
          <div className='space-y-2 w-[32%]'>
            <Label htmlFor='team'>Vehicle Used</Label>
            <Select onValueChange={setVehicle} value={vehicle}>
              <SelectTrigger className='w-full bg-background'>
                <SelectValue placeholder='Select a vehicle' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Vehicles</SelectLabel>
                  <SelectItem value='1'>GAC GA4 (AAA-640JB) </SelectItem>
                  <SelectItem value='2'>GAC GA4 (AAA-643JB) </SelectItem>
                  <SelectItem value='3'>GAC GA4 (AAA-69JA)</SelectItem>
                  <SelectItem value='4'>GAC GA4 (BDG-747BP)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className='space-y-2 w-[32%]'>
            <Label htmlFor='date'>Trip Date</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  id='date'
                  className='w-full justify-between font-normal text-gray-500'>
                  {date ? date.toLocaleDateString() : "Select date"}
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className='w-auto overflow-hidden p-0'
                align='start'>
                <Calendar
                  mode='single'
                  selected={date}
                  captionLayout='dropdown'
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Departure Time */}
          <div className='space-y-2 w-[32%]'>
            <Label htmlFor='depart-time'>Departure Time</Label>
            <Input
              type='time'
              id='depart-time'
              onChange={(e) => setTimeDepart(e.target.value)}
              value={timeDepart}
              className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
            />
          </div>

          {/* Return Time */}
          <div className='space-y-2 w-[32%]'>
            <Label htmlFor='return-time'>Return Time</Label>
            <Input
              type='time'
              id='return-time'
              onChange={(e) => setTimeReturn(e.target.value)}
              value={timeReturn}
              className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
            />
          </div>

          {/* Mileage Start */}
          <div className='space-y-2 w-[32%]'>
            <Label htmlFor='mileageStart'>Mileage Start</Label>
            <Input
              type='number'
              id='mileageStart'
              value={mileageStart}
              onChange={(e) => setMileageStart(Number(e.target.value))}
              placeholder='e.g., 25'
              className='w-full bg-background'
            />
          </div>

          {/* Mileage End */}
          <div className='space-y-2 w-[32%]'>
            <Label htmlFor='mileageEnd'>Mileage End</Label>
            <Input
              type='number'
              id='mileageEnd'
              value={mileageEnd}
              onChange={(e) => setMileageEnd(Number(e.target.value))}
              placeholder='e.g., 25'
              className='w-full bg-background'
            />
          </div>

          {/* Location */}
          <div className='space-y-2 w-[32%]'>
            <Label htmlFor='locations'>Trip Location(s)</Label>
            <Input
              type='text'
              id='locations'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder='e.g., Ikeja, Surulere'
              className='w-full bg-background'
            />
          </div>
        </div>
        <Separator className='my-4' />

        <h2 className='text-2xl font-semibold mb-1'>
          Summary of Current Entries
        </h2>
        <div className='text-gray-600 text-sm'>
          Estimated Total Cost:{" "}
          <span className='font-bold'>₦{distance > 0 && distance * 100}</span>
        </div>

        <div className='flex justify-end'>
          <Button>Submit</Button>
        </div>
      </form>
    </main>
  );
};

export default InputData;
