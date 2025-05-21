import { Suspense } from "react";
import ExamList from "./_components/exam-list";
import Spinner from "@/components/custom/Spinner";

export default async function Page() {
  return (
    <section className="flex-col gap[24px]   ml-[72px] w-[1062px]">
      {/* Exam Header */}
      <p className="text-[#0F0F0F] text-lg font-medium mb-[24px]">Front-End Quiz</p>

      {/* Exam List */}
      <Suspense fallback={<Spinner />}>
        <ExamList />
      </Suspense>
    </section>
  );
}
