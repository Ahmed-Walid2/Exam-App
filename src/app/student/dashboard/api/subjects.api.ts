import { getToken } from "@/lib/utils/getToken";

export default async function getSubjects() {
  // Get User Token
  const userData = await getToken();
  console.log(userData?.token);

  try {
    const response = await fetch(`${process.env.API}/subjects`, {
      headers: {
        token: userData?.token || "",
      },
      cache: "no-store",
    });
    if (response?.ok) {
      const payload: SubjectsApiType = await response.json();
      console.log(payload);
      return payload;
    } else {
      throw new Error("something went wrong");
    }
  } catch (error) {
    console.log((error as Error)?.message);
  }
}
