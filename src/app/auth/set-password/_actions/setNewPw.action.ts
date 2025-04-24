"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { setNewPwType } from "@/lib/schemes/auth.schema";

export async function setNewPwAction(values: setNewPwType) {
  const response = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: "PUT",
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
