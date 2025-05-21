"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setNewPwSchema, SetNewPwType } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { setNewPwAction } from "../_actions/setNewPw.action";

export default function SetNewPwForm() {
  // States
  const [isPwShown, setIsPwShown] = useState(false);
  const [msg, setMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const router = useRouter();

  // Form
  const form = useForm<SetNewPwType>({
    defaultValues: {
      email: "", // Not allowed
      newPassword: "",
    },
    resolver: zodResolver(setNewPwSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<SetNewPwType> = async (values) => {
    console.log(values);
    const response = await setNewPwAction(values);
    console.log(response);
    setSuccMsg("");
    setMsg(response.message);
    if (response.message === "success") {
      setSuccMsg(response.message);
      setMsg("");
      router.push("/auth/signin");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-[160px] flex flex-col  lg:flex">
          <h2 className="text-2xl font-bold pb-[32px] text-center lg:text-start">Set a Password</h2>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-[32px]">
                {/*  Label */}
                <FormLabel className="sr-only">Email</FormLabel>

                {/* Input */}
                <FormControl>
                  <Input
                    {...field}
                    className={`${form.formState.errors.email?.message ? "focus:border-error-color border-error-color" : ""} `}
                    placeholder="Email"
                    type="email"
                  />
                </FormControl>

                {/* Validation Msg */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <div className="flex items-center relative">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="mb-[32px]">
                  {/* Label */}
                  <FormLabel className="sr-only">New Password</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="New Password"
                      type={isPwShown ? "text" : "password"}
                      className={`${form.formState.errors.newPassword?.message ? "focus:border-error-color border-error-color" : ""} `}
                    />
                  </FormControl>

                  {/* Validation Msg */}
                  <FormMessage className="w-[300px]  " />
                </FormItem>
              )}
            />

            {/* Show PW Icon */}
            {isPwShown ? (
              <Eye
                onClick={() => setIsPwShown((show) => !show)}
                className="absolute right-[20px] top-[25px] cursor-pointer"
                color="#949BA5"
              />
            ) : (
              <EyeOff
                onClick={() => setIsPwShown((show) => !show)}
                className="absolute right-[20px] top-[25px] cursor-pointer"
                color="#949BA5"
              />
            )}
          </div>

          {/* Submit Msg */}
          {msg && <p className="capitalize text-center font-medium mb-2 text-error-color w-[300px] beak-all self-center">{msg}</p>}

          {succMsg && <p className="capitalize text-center font-medium mb-2 text-green-500 w-[300px] beak-all self-center">{succMsg}</p>}

          <Button type="submit" className="mb-[30px]" disabled={form.formState.isSubmitted && !form.formState.isValid}>
            Sign in
          </Button>
        </form>
      </Form>
    </>
  );
}
