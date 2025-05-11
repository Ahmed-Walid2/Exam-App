"use client";

import { useState } from "react";
import useQuestions from "../_hooks/useQuestions";
import Spinner from "@/components/Spinner/Spinner";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnswersFields, questionSchema } from "@/lib/schemes/questions.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useCheckQuestions from "../_hooks/useCheckQuestions";
import { useRouter } from "next/navigation";
import ExamDuration from "./exam-duration";

export default function QuestionsForm() {
  // State
  const [step, setStep] = useState(0);
  const [pickedAnswer, setPickedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<{
    correct: number;
    incorrect: number;
  } | null>(null);

  // Router
  const router = useRouter();

  // Form
  const form = useForm<AnswersFields>({
    resolver: zodResolver(questionSchema),
  });

  // Quries
  const { isLoading, error, payload } = useQuestions();
  const { isPending, checkQuestions } = useCheckQuestions();

  // Variables
  const currentQuestion = payload?.questions[step];
  const examTimer = payload?.questions[0].exam.duration;

  // Functions
  const onSubmit: SubmitHandler<AnswersFields> = (values) => {
    console.log(values);
    checkQuestions(values, {
      onSuccess: (data) => {
        data.WrongQuestions.forEach((question) => {
          let questionIndex: number | null = null;

          form.getValues("answers").find((answer, i) => {
            if (answer.questionId === question.QID) {
              questionIndex = i;
              return true;
            } else {
              return false;
            }
          });

          if (questionIndex) {
            form.setError(`answers.${questionIndex}`, {
              message: question.correctAnswer,
            });
          }
        });
        const correctCount = data.correctQuestions.length;
        const incorrectCount = data.WrongQuestions.length;
        setScore({ correct: correctCount, incorrect: incorrectCount });
        setShowResult(true);
      },
    });
  };

  // Skeleton
  if (isLoading) return <Spinner />;
  if (error)
    return <p className="text-red-500 text-center">Something Went Wrong</p>;

  // Show Result Modal
  if (showResult && score) {
    const total = score.correct + score.incorrect;
    const percentage = Math.round((score.correct / total) * 100);

    return (
      <div className="flex flex-col  ">
        <h2 className="text-xl font-semibold  mb-[48px]">Your score</h2>
        <div className="div flex  items-center justify-center gap-20">
          <div className="w-24 h-24 relative text-center">
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 36 36"
            >
              <path
                className="text-gray-300"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3"
              />
              <path
                className="text-blue-500"
                strokeDasharray={`${percentage}, 100`}
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-semibold text-lg">
              {percentage}%
            </span>
          </div>
          <div className="buttons flex flex-col gap-4">
            <div className="correct flex gap-8 items-center justify-center">
              <p className="text-blue-700 text-xl">Correct</p>
              <p className="text-blue-700 rounded-full border border-primary-color size-[30px] content-center text-center">
                {score.correct}
              </p>
            </div>
            <div className="incorrect flex gap-8 items-center justify-center">
              <p className="text-red-600 text-xl">Incorrect</p>
              <p className="text-red-600 rounded-full border border-red-600 size-[30px] content-center text-center">
                {score.incorrect}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center items-center mt-[48px]">
          {/* <Button
            className="w-[150px] lg:w-[150px] h-[56px]"
            onClick={() => setShowResult(false)}
          >
            Back
          </Button> */}
          <Button
            className="w-[150px] lg:w-[150px] h-[56px]"
            onClick={() => router.push("/student/quiz-history")}
          >
            Show results
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <header className="flex items-center justify-between">
        <p className="text-sm text-primary-color">
          Question {step + 1} of {payload?.questions.length}
        </p>
        {/* Timer */}
        <ExamDuration
          examTimer={examTimer}
          onTimerEnd={() => {
            form.handleSubmit(onSubmit)();
          }}
        />
      </header>

      {/* Steps */}
      <ul className="flex justify-between">
        {Array.from(
          { length: payload?.questions.length ?? 0 },
          (_, i) => i
        ).map((i) => (
          <li
            key={i}
            className={cn(
              "size-2 bg-gray-400 rounded-full",
              step >= i && "bg-primary-color"
            )}
          ></li>
        ))}
      </ul>

      {/* Form */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={`answers.${step}`}
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel className="text-lg">
                  {currentQuestion?.question}
                </FormLabel>
                {/* Choices */}
                <FormControl>
                  <RadioGroup
                    value={pickedAnswer}
                    onValueChange={(value) => {
                      setPickedAnswer(value);
                      field.onChange({
                        questionId: currentQuestion?._id,
                        correct: value,
                      });
                    }}
                    name={currentQuestion?._id}
                    className="flex flex-col space-y-1"
                  >
                    {currentQuestion?.answers.map((answer) => (
                      <FormItem
                        key={answer.key}
                        className="flex items-center space-x-3 space-y-0 rounded-md bg-[#EDEFF3] py-[16px] px-[8px] gap-4"
                      >
                        {/* Radio */}
                        <FormControl>
                          <RadioGroupItem
                            value={answer.key}
                            className="text-[#02369C]"
                          />
                        </FormControl>
                        {/* Label */}
                        <FormLabel className="font-normal grow py-2">
                          {answer.answer}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div
            className="grid grid-cols-2 gap-2 mt-8 justify-items-center
"
          >
            <Button
              type="button"
              onClick={() => {
                const prevAnswer = form.getValues(`answers.${step - 1}`);

                if (!prevAnswer?.correct) {
                  setPickedAnswer("");
                } else {
                  setPickedAnswer(prevAnswer.correct);
                }

                setStep((prev) => prev - 1);
              }}
              className="w-[150px] lg:w-[150px] h-[56px]"
              disabled={isPending || step === 0}
            >
              Back
            </Button>
            <Button
              disabled={(() => {
                if (isPending) return true;

                const currentAnswer = form.getValues(`answers.${step}`);

                if (currentAnswer?.correct) return false;

                return true;
              })()}
              type={
                step < (payload?.questions?.length ?? 0) - 1
                  ? "button"
                  : "submit"
              }
              onClick={() => {
                if (step === (payload?.questions?.length ?? 0) - 1) return;

                const nextAnswer = form.getValues(`answers.${step + 1}`);

                if (!nextAnswer?.correct) {
                  setPickedAnswer("");
                } else {
                  setPickedAnswer(nextAnswer.correct);
                }

                setStep((prev) => prev + 1);
              }}
              className="w-[150px] lg:w-[150px] h-[56px]"
            >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
