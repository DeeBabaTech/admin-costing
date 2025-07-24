"use client";

import Image from "next/image";
import {
  ChartNoAxesColumnIncreasing,
  FileInput,
  Fuel,
  LayoutDashboard,
  LogOut,
  User2,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { logout } from "@/app/auth/actions";
import { usePathname } from "next/navigation";
import useGetUser from "./hooks/get-user";

// Menu items.
const items = [
  {
    title: "Team Overview",
    url: "/overview",
    icon: Users,
  },
  {
    title: "Input Trip Info",
    url: "/trip-info",
    icon: FileInput,
  },
  {
    title: "Input Fuel Purchases",
    url: "/fuel-purchases",
    icon: Fuel,
  },
  {
    title: "Cost Analysis",
    url: "/analysis",
    icon: ChartNoAxesColumnIncreasing,
  },
];

export function AppSidebar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <>
      <Sidebar collapsible='icon'>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton variant='outline' size='lg'>
                <Image
                  src='/logo.svg'
                  width='500'
                  height='500'
                  alt='First Trust Logo'
                  className='w-40 my-5'
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigations</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.url === pathname}>
                      <a href={item.url}>
                        <div className=''>
                          <item.icon size={24} strokeWidth={1.2} />
                        </div>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton variant='danger' onClick={logout}>
                <User2 /> {user.name}
                <LogOut className='ml-auto' />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
