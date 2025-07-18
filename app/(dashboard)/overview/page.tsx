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

export default async function Home() {
  // const posts = await prisma.post.findMany({
  //   include: { author: true },
  //   orderBy: { id: "desc" },
  // });

  const data = [
    {
      id: "1",
      team: "Admin Services",
      fuel: 20,
      cost: 2500,
      distance: 34,
      average: 56,
      date: "19/01/2001",
    },
    {
      id: "2",
      team: "MD's Office",
      fuel: 30,
      cost: 500,
      distance: 52,
      average: 16,
      date: "09/01/2001",
    },
  ];

  return (
    <main className=''>
      <h1 className='text-3xl font-bold mb-4 text-hover-primary'>
        Team Overview
      </h1>
      <ul className='flex flex-wrap justify-start mb-5 space-y-1.5 gap-[0.5%]'>
        <Overviews
          title='Total Teams'
          value='6'
          info='Active teams contributing to fuel data'
          Icon={<Users />}
        />
        <Overviews
          title='Overall Fuel Used'
          value='71,900 L'
          info='Total fuel consumed across all teams'
          Icon={<Fuel />}
        />
        <Overviews
          title='Total Cost Incurred'
          value='$105,000'
          info='Cumulative cost for all fuel purchases'
          Icon={<Banknote />}
        />
        <Overviews
          title='Total Distance Covered'
          value='405,000 KM'
          info='Combined distance traveled by all teams'
          Icon={<TrendingUp />}
        />
        <Overviews
          title='Avg. Fuel Economy'
          value='11.21 KM/L'
          info='Average efficiency across all teams'
          Icon={<Gauge />}
        />
      </ul>

      <div className='container'>
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
