import skillCSS from "@assets/images/CSS-Quiz.png";
import skillHTML from "@assets/images/skill-icons_html.png";
import skillReact from "@assets/images/react-quiz.png";
import skillJS from "@assets/images/js.png";
import Image from "next/image";
import getExams from "../api/exam.api";
import QuestionsDialog from "./questions-dialog";

export default async function ExamList() {
  // Fetch Exam List
  const payload = await getExams();

  return (
    <>
      {payload?.exams.map((exam) => (
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
              </div>
              <div className="quiz-start">
                <p className="text-sm pb-[8px]">{`${exam.duration} Minutes`}</p>

                {/* Question Form With Start Button */}

                <QuestionsDialog exam={exam._id} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
