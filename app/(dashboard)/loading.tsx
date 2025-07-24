import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex flex-col space-y-3'>
      <div className='flex gap-3'>
        <Skeleton className='h-[125px] w-[250px] rounded-xl' />
        <Skeleton className='h-[125px] w-[250px] rounded-xl' />
        <Skeleton className='h-[125px] w-[250px] rounded-xl' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-10 w-1/5' />
        <Skeleton className='h-10 w-2/5' />
        <Skeleton className='h-10 w-3/5' />
        <Skeleton className='h-10 w-4/5' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
      </div>
    </div>
  );
}
