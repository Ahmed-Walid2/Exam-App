import { Progress } from "@/components/ui/progress";
import { CircleCheck, Clock, Flag } from "lucide-react";
import Image from "next/image";
import profilePic from "@assets/images/Profile-Pic.jpg";
import { getToken } from "@/lib/utils/getToken";

export default async function UserDetails() {
  // Get User Token
  const userData = await getToken();

  console.log(userData?.user);

  return (
    <div className="px-[16px] flex  bg-white shadow-dashboard-container py-[32px]  rounded-2xl ml-[72px] w-[1062px] mb-[40px]">
      {/* User Image */}
      <Image className=" size-[216px] " src={profilePic} alt="Picture of the author" width={216} height={216} />

      {/* User Details */}
      <div className="details-box pl-[56px] ">
        <h4 className="text-primary-color text-3xl font-bold">{`${userData?.user.firstName} ${userData?.user.lastName}`}</h4>
        <div className="progress-div w-full py-[24px]">
          <Progress value={70} />
        </div>
        <div className="states-box flex gap-[27px]">
          <div className="quiz-pass gap-[16px] flex items-center">
            <div className="shadow-img-shadow  size-[70px] rounded-lg flex items-center justify-center">
              <Flag className="text-primary-color size-[32px] " />
            </div>
            <div className="number">
              <p className="font-bold text-3xl text-[#696F79]">27</p>
              <p className="text-base text-[#696F79] ">Quizz Passed</p>
            </div>
          </div>
          <div className="time gap-[16px] flex items-center">
            <div className="shadow-img-shadow  size-[70px] rounded-lg flex items-center justify-center">
              <Clock className="text-primary-color size-[32px] " />
            </div>
            <div className="number">
              <p className="font-bold text-3xl text-[#696F79]">13 Min</p>
              <p className="text-base text-[#696F79] ">Fastest Time</p>
            </div>
          </div>
          <div className="correct-answers gap-[16px] flex items-center">
            <div className="shadow-img-shadow  size-[70px] rounded-lg flex items-center justify-center">
              <CircleCheck className="text-primary-color size-[32px] " />
            </div>
            <div className="number">
              <p className="font-bold text-3xl text-[#696F79]">200</p>
              <p className="text-base text-[#696F79] ">Correct Answers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
