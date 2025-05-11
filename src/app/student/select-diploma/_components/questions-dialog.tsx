"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import QuestionsForm from "./questions-form";
import { useRouter, useSearchParams } from "next/navigation";

type QuestionDialogType = {
  exam: string;
};

export default function QuestionsDialog({ exam }: QuestionDialogType) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams);

  const handleStart = () => {
    current.set("exam", exam);
    router.push(`?${current.toString()}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={handleStart}
          className="rounded-xl lg:w-[77px] lg:h-[23px] lg:py-[4px] text-xs "
        >
          Start
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">{exam}</DialogTitle>
          <DialogDescription className="sr-only">
            This will start your exam.
          </DialogDescription>
        </DialogHeader>

        {/* QuestionsForm reads from URL params */}
        <QuestionsForm />
      </DialogContent>
    </Dialog>
  );
}
