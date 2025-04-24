import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useQuestions() {
  // Params
  const searchParams = useSearchParams();

  // Qurires
  const { isLoading, error, data } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/questions?${searchParams.toString()}`
      );
      const payload: { questions: Question[]; message: string } =
        await response.json();
      if ("code" in response) throw new Error(payload.message);

      return payload;
    },
  });

  return { isLoading, error, payload: data };
}
