"use server";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { AnswersFields } from "@/lib/schemes/questions.schema";
import { getToken } from "@/lib/utils/getToken";

export async function checkQuestionsAction(fields: AnswersFields) {
  // Get User Token
  const userData = await getToken();

  const response = await fetch(`${process.env.API}/questions/check`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      ...JSON_HEADER,
      token: userData?.token || "",
    },
  });

  const payload: ApiResponse<CheckAnswers> = await response.json();

  return payload;
}
