"use client";

import Image from "next/image";
import {
  ChartNoAxesColumnIncreasing,
  FileInput,
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
import { useParams, usePathname } from "next/navigation";
import path from "path";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Input Data",
    url: "/input-data",
    icon: FileInput,
  },
  {
    title: "Team Overview",
    url: "/overview",
    icon: Users,
  },
  {
    title: "Cost Analysis",
    url: "/analysis",
    icon: ChartNoAxesColumnIncreasing,
  },
];

export function AppSidebar() {
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
              <SidebarMenuButton variant='danger'>
                <User2 /> Oladayo
                <LogOut onClick={logout} className='ml-auto' />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
