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

type QuestionDialogType = {
  exam: string;
};

export default async function QuestionsDialog({ exam }: QuestionDialogType) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl lg:w-[77px] lg:h-[23px] lg:py-[4px] text-xs ">
          Start
        </Button>
      </DialogTrigger>

      {/* Content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">{exam}</DialogTitle>
          <DialogDescription className="sr-only">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        {/* QuestionsForm */}
        <QuestionsForm />
      </DialogContent>
    </Dialog>
  );
}
