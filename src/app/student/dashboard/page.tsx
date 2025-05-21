import UserDetails from "./_components/user-details";
import Subjects from "./_components/subjects";
// import { getToken } from "@/lib/utils/getToken";
import { Suspense } from "react";
import Spinner from "@/components/custom/Spinner";

export default async function Page() {
  // await getToken();
  return (
    <>
      {/* User Box Details */}

      <UserDetails />

      {/*Subjects  */}
      <Suspense fallback={<Spinner />}>
        <Subjects />
      </Suspense>
    </>
  );
}
