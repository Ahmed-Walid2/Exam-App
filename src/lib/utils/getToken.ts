import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getToken() {
  const authToken = cookies().get("next-auth.session-token")?.value;

  try {
    const token = await decode({
      secret: process.env.NEXTAUTH_SECRET!,
      token: authToken,
    });

    return token;
  } catch (error) {
    void error;

    return null;
  }
}
