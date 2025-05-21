import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useQuestions() {
  const searchParams = useSearchParams();
  const examId = searchParams.get("exam");

  const { isLoading, error, data } = useQuery({
    queryKey: ["questions", examId],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/questions?exam=${examId}`);
      const payload: ApiResponse<{ questions: Question[] }> = await response.json();

      if ("code" in payload) {
        throw new Error(payload.message);
      }

      if (payload.questions.length === 0) {
        throw new Error("No questions available for this exam.");
      }

      return payload;
    },
    enabled: !!examId,
  });

  return { isLoading, error, payload: data };
}
