"use client";

import { SyntheticEvent, use, useState } from "react";
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
import { toast } from "sonner";

const InputData = () => {
  const [vehicle, setVehicle] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [litreAmount, setLitreAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitData = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        vehicle,
        date,
        litreAmount,
        totalAmount,
      };

      setLoading(true);
      const res = await axios.post("/api/add-fuel-purchase", body);

      if (res.status === 201) {
        toast.success("Fuel Purchase Recorded Successfully");
      }
    } catch (error: any) {
      console.error("Submission failed:", error?.response);
      const errors = error?.response?.data?.error?.properties;
      if (errors) {
        const firstField = Object.keys(errors)[0];
        const firstError = errors[firstField].errors[0];
        toast.error(firstError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='m-4'>
      <h1 className='text-3xl font-bold mb-2 text-hover-primary'>
        Record Fuel Purchases
      </h1>
      <p className='mb-4 text-gray-600'>
        Enter detailed information on the fuel purchased by a vehicle.
      </p>
      <form onSubmit={submitData} className=''>
        <div className='bg-accent/50 p-5 flex flex-wrap gap-[2%] space-y-3'>
          {/* Vehicle */}
          <div className='space-y-2 w-[32%]'>
            <Label htmlFor='team'>Vehicle Name</Label>
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
            <Label htmlFor='date'>Date of purchase</Label>
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

          {/* Amount Per Litre */}
          <div className='space-y-2 w-[32%]'>
            <Label htmlFor='distance'>Amount Per Litre</Label>
            <Input
              type='number'
              id='distance'
              value={litreAmount}
              onChange={(e) => setLitreAmount(Number(e.target.value))}
              placeholder='e.g., 25'
              className='w-full bg-background'
            />
          </div>

          {/* Amount Purchased */}
          <div className='space-y-2 w-[32%]'>
            <Label htmlFor='distance'>Total Amount Purchased</Label>
            <Input
              type='number'
              id='distance'
              value={totalAmount}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
              placeholder='e.g., 25'
              className='w-full bg-background'
            />
          </div>
        </div>
        <Separator className='my-4' />

        <h2 className='text-2xl font-semibold mb-1'>
          Summary of Current Entries
        </h2>
        <div className='text-gray-600 text-sm'>
          Estimated Total Cost: <span className='font-bold'>₦0.00</span>
        </div>

        <div className='flex justify-end'>
          <Button disabled={loading}>
            {loading ? "Submitting" : "Submit"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default InputData;
