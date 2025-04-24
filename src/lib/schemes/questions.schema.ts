import { z } from "zod";

export const questionSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      correct: z.string(),
    })
  ),
});

export type AnswersFields = z.infer<typeof questionSchema>;
