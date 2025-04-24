import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import StudentSidebar from "@/components/ui/student-sidebar";
import Image from "next/image";
import profilePic from "../../../public/assets/images/Profile Pic.jpg";
import { Search } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-[#FBF9F9]  ">
      <StudentSidebar />
      <main>
        <SidebarTrigger />
        {/* Search Container Layout */}
        <div>
          <div className="px-[72px] py-[40px] flex  gap-[24px] ">
            <div className="search-parent relative">
              <Input
                placeholder="Search Quiz"
                className="lg:w-[762px] pl-12 rounded-2xl "
              />
              <Search className="text-primary-color absolute top-4 left-2 pl-2" />
            </div>
            <Button className=" lg:w-[190px] lg:h-[60px] ">Start Quiz</Button>

            <Image
              className="rounded-full size-[61px] shadow-img-shadow"
              src={profilePic}
              alt="Picture of the author"
              width={61}
              height={61}
            />
          </div>
        </div>

        {children}
      </main>
    </SidebarProvider>
  );
}
