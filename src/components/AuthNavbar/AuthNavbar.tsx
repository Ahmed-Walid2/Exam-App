import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

export default function AuthNavbar() {
  return (
    <div className="nav-bar gap-[26px] lg:gap-[49px] flex justify-center lg:justify-end items-center ">
      <div className="flex items-center">
        English <ChevronDown size={16} />
      </div>
      <Link href={"/auth/signin"}>
        <div className="text-primary-color text-xl font-bold">Sign in</div>
      </Link>
      <Link href={"/auth/signup"}>
        <Button className=" bg-white text-primary-color text-xl w-[129px] lg:w-[129px] h-[42px] p-[19px] border border-border-color rounded-2xl">
          Register
        </Button>
      </Link>
    </div>
  );
}
