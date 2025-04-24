"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { signupType } from "@/lib/schemes/auth.schema";

export async function signupAction(values: signupType) {
  const response = await fetch(`${process.env.API}/auth/signup`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
    },
    body: JSON.stringify(values),
  });
  const payload = await response.json();
  console.log(payload);
  console.log(values);
  return payload;
}
