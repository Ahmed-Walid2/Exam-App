"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifyCodeSchema, VerifyCodeType } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { verifyCodeAction } from "../_actions/verify-code.action";

export default function VerifyCodeForm() {
  // States
  const [msg, setMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const router = useRouter();

  // Form
  const form = useForm<VerifyCodeType>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(verifyCodeSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<VerifyCodeType> = async (values) => {
    console.log(values);
    const response = await verifyCodeAction(values);
    console.log(response);
    setSuccMsg("");
    setMsg(response.message);
    if (response?.status === "Success") {
      setSuccMsg(response.message);
      setMsg("");
      router.push("/auth/set-password");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-[160px] flex flex-col lg:flex">
        <h2 className="text-2xl font-bold pb-[32px] text-center lg:text-start">Verify code</h2>

        {/* Email */}
        <FormField
          name="resetCode"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-[16px]">
              {/* Label */}
              <FormLabel className="sr-only">Enter Code</FormLabel>

              {/* Input */}
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter Code"
                  type="text"
                  className={`${form.formState.errors.resetCode?.message ? "focus:border-error-color border-error-color" : ""} `}
                />
              </FormControl>

              {/* Validation Msg */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Msg */}
        {msg && <p className="capitalize text-center font-medium mb-2 text-error-color w-[300px] beak-all self-center">{msg}</p>}

        {succMsg && <p className="capitalize text-center font-medium mb-2 text-green-500 w-[300px] beak-all self-center">{succMsg}</p>}
        <p className=" text-center lg:text-end mb-[40px]">
          Didn’t receive a code?
          <button className="text-primary-color">Resend</button>
        </p>

        {/* Button */}
        <Button type="submit" disabled={form.formState.isSubmitted && !form.formState.isValid} className="mb-[30px]">
          Verify
        </Button>
      </form>
    </Form>
  );
}
