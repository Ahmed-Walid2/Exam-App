"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { forgotPwType } from "@/lib/schemes/auth.schema";

export async function forgotPwAction(values: forgotPwType) {
  const response = await fetch(`${process.env.API}/auth/forgotPassword`, {
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
