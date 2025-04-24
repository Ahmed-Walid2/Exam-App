import { getToken } from "@/lib/utils/getToken";

export default async function getExams() {
  // Get User Token
  const userData = await getToken();

  try {
    const response = await fetch(`${process.env.API}/exams`, {
      headers: {
        token: userData?.token || "",
      },
      cache: "no-store",
    });
    if (response?.ok) {
      const payload: ExamApiType = await response.json();

      return payload;
    } else {
      throw new Error("something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
}
