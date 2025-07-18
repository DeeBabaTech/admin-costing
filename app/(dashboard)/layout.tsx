import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import useGetUser from "@/components/hooks/get-user";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await useGetUser();
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className='w-full p-4'>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
