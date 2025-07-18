import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Banknote,
  Fuel,
  Gauge,
  PlusCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Overviews from "@/components/overviews";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { currencyFormat, distanceFormat } from "@/components/formats";

export default async function Home() {
  const totalTeams = await prisma.team.count();

  const trips = await prisma.trip.findMany({
    include: { team: true },
    orderBy: { date: "desc" },
  });

  const fuel = await prisma.fuel.aggregate({
    _sum: { totalAmount: true },
  });
  const fuelPurchases = currencyFormat(fuel._sum.totalAmount || 0);

  const mileages = await prisma.trip.aggregate({
    _sum: { mileageEnd: true, mileageStart: true },
  });
  const totalDistance = distanceFormat(mileages);

  return (
    <main className=''>
      <h1 className='text-3xl font-bold mb-4 text-hover-primary'>
        Team Overview
      </h1>
      <ul className='flex flex-wrap justify- mb-5 gap-4'>
        <Overviews
          title='Total Teams'
          value={totalTeams}
          info='Active teams contributing to fuel data'
          Icon={<Users />}
        />
        <Overviews
          title='Total Distance Covered'
          value={totalDistance}
          info='Combined distance traveled by all teams'
          Icon={<TrendingUp />}
        />
        <Overviews
          title='Total Fuel Purchased'
          value={fuelPurchases}
          info='Total fuel consumed across all teams'
          Icon={<Fuel />}
        />
        {/* <Overviews
          title='Total Cost Incurred'
          value='$105,000'
          info='Cumulative cost for all fuel purchases'
          Icon={<Banknote />}
        /> */}
      </ul>

      <div className='container'>
        <DataTable columns={columns} data={trips} />
      </div>
    </main>
  );
}
