"use client";
import { signOut } from "next-auth/react";
import { LogOut, History, LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function StudentSidebarLinks() {
  // Menu items.
  const items = [
    {
      title: "Dashboard",
      url: "/student/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Quiz History",
      url: "/student/quiz-history",
      icon: History,
    },
    {
      title: "Log Out",
      url: "#",
      icon: LogOut,
    },
  ];

  const pathname = usePathname();
  console.log(pathname);

  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem className="mb-[32px]" key={item.title}>
          {item.title === "Log Out" ? (
            <SidebarMenuButton asChild>
              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="sm:hover:bg-primary-color student-sidebar-link transition-all flex items-center w-full text-left rounded-md gap-2 p-2"
              >
                <LogOut className="mr-[32px] text-primary-color student-sidebar-icon size-[16px]" />
                <span className="student-sidebar-title text-sm">Log Out</span>
              </button>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton asChild>
              <Link
                className="sm:hover:bg-primary-color student-sidebar-link transition-all"
                href={item.url}
              >
                <item.icon className="mr-[32px] text-primary-color student-sidebar-icon" />
                <span className="student-sidebar-title">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      ))}
    </>
  );
}
