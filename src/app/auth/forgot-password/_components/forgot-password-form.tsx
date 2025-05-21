"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPwSchema, ForgotPwType } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { forgotPwAction } from "../_actions/forgotPw-action";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  // States
  const [msg, setMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const router = useRouter();

  // Form
  const form = useForm<ForgotPwType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPwSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<ForgotPwType> = async (values) => {
    console.log(values);
    const response = await forgotPwAction(values);
    console.log(response);
    setSuccMsg("");
    setMsg(response.message);
    if (response?.message === "success") {
      setSuccMsg(response.message);
      setMsg("");
      router.push("/auth/verify-code");
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-[160px] flex flex-col  lg:flex">
          <h2 className="text-2xl font-bold pb-[32px] text-center lg:text-start">Forgot your password?</h2>
          {/* Email */}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-[16px]">
                {/* Label */}
                <FormLabel className="sr-only">Email</FormLabel>

                {/* Input */}
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Email"
                    type="email"
                    className={`${form.formState.errors.email?.message ? "focus:border-error-color border-error-color" : ""} `}
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
          <p className="text-primary-color mb-[40px] text-center lg:text-end">Recover Password ?</p>
          {/* Button */}
          <Button type="submit" disabled={form.formState.isSubmitted && !form.formState.isValid} className="mb-[30px]">
            Sign in
          </Button>
        </form>
      </Form>
    </>
  );
}
