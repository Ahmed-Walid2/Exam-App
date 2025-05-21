"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, SigninType } from "@/lib/schemes/auth.schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SigninForm() {
  // States
  const [isPwShown, setIsPwShown] = useState(false);
  const [msg, setMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  // Form
  const form = useForm<SigninType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signinSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<SigninType> = async (values) => {
    const response = await signIn("credentials", {
      callbackUrl: "/",
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (response?.ok) {
      setSuccMsg("You have been logged in successfully!");
      setMsg("");

      window.location.href = "/student/dashboard"; // Should be delayed
    } else {
      setMsg(response?.error || "Something went wrong");
      setSuccMsg("");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-[160px] flex flex-col">
          {/* Title */}
          <h2 className="text-2xl font-bold pb-[32px] text-center lg:text-start">Sign in</h2>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel className="sr-only">Email</FormLabel>

                {/* Input */}
                <FormControl>
                  <Input
                    className={`${form.formState.errors.email?.message ? "focus:border-error-color" : ""} `}
                    {...field}
                    placeholder="Enter Email"
                    type="email"
                  />
                </FormControl>

                {/* Validation Msg */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <div className="flex items-center relative mt-[32px]">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="sr-only">Password</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Password"
                      type={isPwShown ? "text" : "password"}
                      className={`${form.formState.errors.password?.message ? "focus:border-error-color" : ""} `}
                    />
                  </FormControl>

                  {/* Validation Msg */}
                  <FormMessage />
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

          <p className="text-primary-color text-center lg:text-end mb-[40px] block mt-[16px]">
            <Link href="/auth/forgot-password">Recover Password?</Link>
          </p>

          {/* Button */}
          <Button type="submit" className="mb-[30px]" disabled={form.formState.isSubmitted && !form.formState.isValid}>
            Sign in
          </Button>
        </form>
      </Form>
    </>
  );
}
