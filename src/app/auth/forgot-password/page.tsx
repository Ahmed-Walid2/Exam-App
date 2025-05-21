import AuthContainer from "@/components/layout/auth-layout/AuthContainer";

import AuthNavbar from "@/components/layout/auth-layout/AuthNavbar";
import PlatformsContainer from "@/components/features/auth/PlatformsContainer";
import ForgotPasswordForm from "./_components/forgot-password-form";

export default function Page() {
  return (
    <main className="flex flex-col lg:flex-row items-center lg:items-start">
      {/* Left Side */}
      <AuthContainer />

      {/* Right Side */}
      <div className=" lg:px-[80px] py-[80px] flex flex-col ">
        <AuthNavbar />

        {/* Form */}
        <ForgotPasswordForm />

        {/* Platforms Login Links */}
        <PlatformsContainer />
      </div>
    </main>
  );
}
