import AuthContainer from "@/components/AuthContainer/AuthContainer";
import AuthNavbar from "@/components/AuthNavbar/AuthNavbar";
import PlatformsContainer from "@/components/PlatformsContainer/PlatformsContainer";
import VerifyCodeForm from "./_components/verify-code-form";

export default function Page() {
  return (
    <main className="flex flex-col lg:flex-row items-center lg:items-start ">
      {/* Left Side */}
      <AuthContainer />

      {/* Right Side */}
      <div className=" p-[80px] flex flex-col">
        <AuthNavbar />

        {/* Form */}
        <VerifyCodeForm />

        {/* Platforms Login Links */}
        <PlatformsContainer />
      </div>
    </main>
  );
}
