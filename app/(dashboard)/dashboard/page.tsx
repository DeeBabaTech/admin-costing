import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Home() {
  // const posts = await prisma.post.findMany({
  //   include: { author: true },
  //   orderBy: { id: "desc" },
  // });

  const dashboards = [
    {
      title: "Total Fuel Cost (YTD)",
      value: "$45,000",
      info: "Compared to previous year",
    },
    {
      title: "Monthly Avg. Cost",
      value: "$45,000",
      info: "Compared to previous year",
    },
    {
      title: "Total Distance Covered",
      value: "$45,000",
      info: "Compared to previous year",
    },
    {
      title: "Avg. Cost Per KM",
      value: "$45,000",
      info: "Compared to ",
    },
  ];

  return (
    <main className=''>
      <h1 className='text-3xl font-bold mb-4 text-hover-primary'>
        Dashboard Overview
      </h1>
      <ul className='flex flex-wrap justify-between mb-5 space-y-2'>
        {dashboards.map((dashboard) => (
          <li key={dashboard.title} className='border p-4 rounded w-[24%]'>
            <p className='text-sm text-gray-600'>{dashboard.title}</p>
            <p className='text-xl font-semibold my-2'>{dashboard.value}</p>
            <p className=''>{dashboard.info}</p>
          </li>
        ))}
        <li className='border p-4 rounded w-1/4'>
          <p className='text-lg font-semibold'>Quick Actions</p>
          <p className='text-sm text-gray-600 my-2'>Streamline your workflow</p>
          <div className='font-semibold flex items-center gap-1 bg-sidebar-accent text-sm p-2'>
            <PlusCircle size={16} />
            <p>Input New Fuel Data</p>
          </div>
          <div className='font-semibold flex items-center gap-1 bg-sidebar-accent text-sm p-2 mt-2'>
            <PlusCircle size={16} />
            <p>Generate Custom Report</p>
          </div>
        </li>
      </ul>

      <Link href='/input-data'>
        <Button> Add Post </Button>
      </Link>
    </main>
  );
}
