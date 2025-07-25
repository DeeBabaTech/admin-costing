import prisma from "@/lib/prisma";
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
import { currencyFormat, distanceFormat } from "@/components/formats";
import { thirtyDaysAgo, today } from "./date";

export default async function Home() {
  const trips = await prisma.trip.findMany({
    include: { team: true },
    orderBy: { date: "desc" },
    where: {
      date: {
        gte: thirtyDaysAgo,
        lte: today,
      },
    },
  });

  const totalTeams = await prisma.team.count();

  const fuel = await prisma.fuel.aggregate({
    _sum: { totalAmount: true },
    where: {
      date: {
        gte: thirtyDaysAgo,
        lte: today,
      },
    },
  });

  const fuelPurchases = currencyFormat(fuel._sum.totalAmount || 0);

  const mileages = await prisma.trip.aggregate({
    _sum: { mileageEnd: true, mileageStart: true },
    where: {
      date: {
        gte: thirtyDaysAgo,
        lte: today,
      },
    },
  });

  const totalDistance = distanceFormat(mileages);

  return (
    <main className=''>
      <h1 className='text-3xl font-bold mb-4 text-hover-primary'>
        Team Overview
      </h1>
      <ul className='flex flex-wrap gap-4'>
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
      </ul>
      <span className='text-red-500 text-xs'>
        **All information provided is only for the last 30 days. More/Precise
        information can be obtained from the "Cost Analysis" page
      </span>

      <div className='container mt-5'>
        <DataTable columns={columns} data={trips} />
      </div>
    </main>
  );
}
