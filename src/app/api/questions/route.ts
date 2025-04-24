import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = await getToken({ req });
  try {
    const response = await fetch(
      `${process.env.API}/questions?${searchParams.toString()}`,
      {
        headers: {
          token: token?.token || "",
        },
        cache: "no-store",
      }
    );

    if (response?.ok) {
      const payload: { questions: Question[]; message: string } =
        await response.json();
      if ("code" in response) throw new Error(payload.message);
      return NextResponse.json(payload, { status: response.status });
    } else {
      throw new Error("something went wrong");
    }
  } catch (error) {
    console.log((error as Error)?.message);
  }
}
