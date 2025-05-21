import { getToken } from "@/lib/utils/getToken";

export default async function getQuestions(searchParams: string) {
  // Get User Token
  const userData = await getToken();

  try {
    const response = await fetch(`${process.env.API}/questions?${searchParams}`, {
      headers: {
        token: userData?.token || "",
      },
      cache: "no-store",
    });

    const payload: ApiResponse<Question[]> = await response.json();

    if ("code" in payload) {
      throw new Error(payload.message);
    }

    return payload;
  } catch (error) {
    console.log((error as Error)?.message);
  }
}
