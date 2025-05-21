import Image from "next/image";
import skillCSS from "@assets/images/CSS-Quiz.png";
import skillHTML from "@assets/images/skill-icons_html.png";
import skillReact from "@assets/images/react-quiz.png";
import skillJS from "@assets/images/js.png";
import { Button } from "@/components/ui/button";
import getExams from "../select-diploma/api/exam.api";
import { Suspense } from "react";
import Spinner from "@/components/custom/Spinner";

export default async function Page() {
  // Fetch Exams
  const payload = await getExams();
  console.log(payload);

  return (
    <section className="flex-col gap[24px]   ml-[72px] w-[1062px]">
      <p className="text-[#0F0F0F] text-lg font-medium mb-[24px]">Front-End Quiz</p>

      <Suspense fallback={<Spinner />}>
        {payload?.exams.map((exam: Exam) => (
          <div key={exam._id} className="quizzes-container gap-[16px] mb-[24px]">
            <div className="quiz py-[16px] px-[24px] gap-[24px] rounded-lg bg[#F9F9F9] shadow-quiz-box flex items-center">
              <Image
                src={
                  (exam.title === "JavaScript Quiz" && skillJS) ||
                  (exam.title === "CSS Quiz" && skillCSS) ||
                  (exam.title === "HTML Quiz" && skillHTML) ||
                  (exam.title === "React Quiz" && skillReact) ||
                  ""
                }
                alt="Exam Icon"
                width={70}
                height={70}
              />

              <div className="quiz-details gap-[16px] flex w-full justify-between items-center ">
                <div className="quiz-name">
                  <p className="pb-[4px]">{exam.title}</p>
                  <p>{`${exam.numberOfQuestions} Questions`}</p>
                  <div className="answered-qs mt-[16px]">
                    <p className="text-sm font-medium text-primary-color">18 corrected answers in 12 min.</p>
                  </div>
                </div>
                <div className="quiz-start">
                  <p className="text-sm pb-[8px] mb-[39px]">{`${exam.duration} Minutes`}</p>
                  <Button className="rounded-xl lg:w-[77px] lg:h-[23px] lg:py-[4px] text-xs ">Answers</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Suspense>
    </section>
  );
}
