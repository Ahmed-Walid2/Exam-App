import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

import Image from "next/image";

import Logo from "../../../public/assets/images/Elevate Logo.png";
import StudentSidebarLinks from "../StudentSidebarLinks/StudentSidebarLinks";

export default function StudentSidebar() {
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader />

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="mb-[56px] mt[40px]">
              <Image src={Logo} width={151} height={26} alt="Logo" />
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {/* Sidebar Links Component */}
                <StudentSidebarLinks />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
}
