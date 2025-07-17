import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className='flex flex-col items-center justify-center mt-10'>
        <Image src='/logo.svg' alt='FirstTrust Logo' width='200' height='200' />
        <div className='text-center font-semibold my-2'>
          Admin & Protocol Services
        </div>
      </div>
      <div className='flex justify-center'>{children}</div>
    </main>
  );
}
