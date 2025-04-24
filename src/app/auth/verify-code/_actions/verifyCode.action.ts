"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { verifyCodeType } from "@/lib/schemes/auth.schema";

export async function verifyCodeAction(values: verifyCodeType) {
  const response = await fetch(`${process.env.API}/auth/verifyResetCode`, {
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
