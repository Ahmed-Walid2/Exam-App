import { useMutation } from "@tanstack/react-query";
import { AnswersFields } from "@/lib/schemes/questions.schema";
import { checkQuestionsAction } from "../_actions/check-answers.action";

export default function useCheckQuestions() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: AnswersFields) => {
      const payload = await checkQuestionsAction(fields);

      if ("code" in payload) throw new Error(payload.message);

      return payload;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { isPending, error, checkQuestions: mutate };
}
