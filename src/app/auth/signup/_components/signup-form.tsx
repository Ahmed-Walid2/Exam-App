"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema, SignupType } from "@/lib/schemes/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signupAction } from "../_actions/signup.action";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export default function SignupForm() {
  // States
  const [isPwShown, setIsPwShown] = useState(false);
  const [isConfirmPwShown, setIsConfirmPwShown] = useState(false);
  const [msg, setMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const router = useRouter();

  // Form
  const form = useForm<SignupType>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(signupSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<SignupType> = async (values) => {
    console.log(values);
    const response = await signupAction(values);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-[31px] flex flex-col lg:flex">
          <h2 className="text-2xl font-bold pb-[32px] text-center lg:text-start">Sign up</h2>

          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mb-[32px]">
                {/*  Label */}
                <FormLabel className="sr-only">Username</FormLabel>

                {/* Input */}
                <FormControl>
                  <Input
                    {...field}
                    className={`${form.formState.errors.username?.message ? "focus:border-error-color border-error-color" : ""} `}
                    placeholder="Username"
                    type="text"
                  />
                </FormControl>

                {/* Validation Msg */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="mb-[32px]">
                {/* Label */}
                <FormLabel className="sr-only">First Name</FormLabel>

                {/* Input */}
                <FormControl>
                  <Input
                    {...field}
                    placeholder="First Name"
                    className={`${form.formState.errors.firstName?.message ? "focus:border-error-color border-error-color" : ""} `}
                    type="text"
                  />
                </FormControl>

                {/* Validation Msg */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mb-[32px]">
                {/* Label */}
                <FormLabel className="sr-only">Last Name</FormLabel>

                {/* Input */}
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Last Name"
                    className={cn(form.formState.errors.lastName?.message && "focus:border-error-color border-error-color")}
                    type="text"
                  />
                </FormControl>

                {/* Validation Msg */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-[32px]">
                {/* Label */}
                <FormLabel className="sr-only">Email</FormLabel>

                {/* Input */}
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email"
                    className={`${form.formState.errors.email?.message ? "focus:border-error-color border-error-color" : ""} `}
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
              name="password"
              render={({ field }) => (
                <FormItem className="mb-[32px]">
                  {/* Label */}
                  <FormLabel className="sr-only">Password</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Password"
                      type={isPwShown ? "text" : "password"}
                      className={`${form.formState.errors.password?.message ? "focus:border-error-color border-error-color" : ""} `}
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

          {/* Re-Password */}
          <div className="flex items-center relative">
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className="mb-[32px]">
                  {/* Label */}
                  <FormLabel className="sr-only">Re-Password</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm Password"
                      type={isConfirmPwShown ? "text" : "password"}
                      className={`${form.formState.errors.rePassword?.message ? "focus:border-error-color border-error-color" : ""} `}
                    />
                  </FormControl>

                  {/* Validation Msg */}

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Show PW Icon */}
            {isConfirmPwShown ? (
              <Eye
                onClick={() => setIsConfirmPwShown((show) => !show)}
                className="absolute right-[20px] top-[25px] cursor-pointer"
                color="#949BA5"
              />
            ) : (
              <EyeOff
                onClick={() => setIsConfirmPwShown((show) => !show)}
                className="absolute right-[20px] top-[25px] cursor-pointer"
                color="#949BA5"
              />
            )}
          </div>

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-[32px]">
                {/* Label */}
                <FormLabel className="sr-only">Phone</FormLabel>

                {/* Input */}
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Phone"
                    className={`${form.formState.errors.phone?.message ? "focus:border-error-color border-error-color" : ""} `}
                    type="tel"
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

          <p className=" text-center mb-[40px] font-medium text-center">
            Already have an account?
            <Link href="/auth/signin" className="text-primary-color ps-1">
              Login
            </Link>
          </p>
          <Button type="submit" className="mb-[30px]" disabled={form.formState.isSubmitted && !form.formState.isValid}>
            Create Account
          </Button>
        </form>
      </Form>
    </>
  );
}
