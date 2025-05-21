import Image from "next/image";
import bro from "@assets/images/bro.jpg";

export default function AuthContainer() {
  return (
    <div className="bg-custom-gray-50 shadow-container-shadow rounded-tr-[100px] rounded-br-[100px] p-[80px] text-center lg:text-start">
      <h1 className="text-black text-5xl font-bold  leading-[75px]">
        Welcome To
        <br />
        <span className="text-sec-color font-bold text-6xl">Exam Online</span>
      </h1>
      <p className=" text-lg leading-[40px] pb-[80px]">A secure and user-friendly online exam platform for efficient assessments.</p>
      <Image className="opacity-[.7] m-auto lg:m-0" src={bro} width={380} height={410} alt="Picture of the author" />
    </div>
  );
}
