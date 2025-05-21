import { z } from "zod";

// Signin Schema
export const signinSchema = z.object({
  email: z.string({ required_error: "Please Enter Your Email" }).min(1, "Please Enter Your Email").email("Please Enter a Valid Email"),
  password: z.string({ required_error: "Please Enter Your Password" }).min(1, "Please Enter Your Password"),
});

export type SigninType = z.infer<typeof signinSchema>;

// Signup Schema
export const signupSchema = z
  .object({
    username: z.string({ required_error: "Please Enter Your Username" }).min(1, "Please Enter Your Username"),
    firstName: z
      .string({ required_error: "Please Enter Your First Name" })
      .min(1, "Please Enter Your First Name")
      .min(2, "Your First Name Should be at Least 2 Letters"),
    lastName: z
      .string({ required_error: "Please Enter Your Last Name" })
      .min(1, "Please Enter Your Last Name")
      .min(2, "Your Last Name Should be at Least 2 Letters"),
    email: z.string({ required_error: "Please Enter Your Email" }).min(1, "Please Enter Your Email").email("Please Enter a Valid Email"),
    password: z
      .string({ required_error: "Please Enter Your Password" })
      .min(1, "Please Enter Your Password")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters and include at least 1 uppercase, 1 lowercase, one number, and 1 special character"
      ),
    rePassword: z.string({ required_error: "Please Re-enter Your Password" }).min(1, "Please Re-enter Your Password"),
    phone: z
      .string({ required_error: "Please Enter Your Phone Number" })
      .min(1, "Please Enter Your Phone Number")
      .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Please Enter a Valid Phone Number"),
  })
  .refine((values) => values.password === values.rePassword, {
    path: ["rePassword"],
    message: "Your Password do not match",
  });

export type SignupType = z.infer<typeof signupSchema>;

// Forgot PW Schema
export const forgotPwSchema = z.object({
  email: z.string({ required_error: "Please Enter Your Email" }).min(1, "Please Enter Your Email").email("Please Enter a Valid Email"),
});

export type ForgotPwType = z.infer<typeof forgotPwSchema>;

// Verify Code Schema
export const verifyCodeSchema = z.object({
  resetCode: z.string({ required_error: "Please Enter Your Verify Code" }).min(1, "Please Enter Your Verify Code"),
});

export type VerifyCodeType = z.infer<typeof verifyCodeSchema>;

// Set New PW
export const setNewPwSchema = z.object({
  email: z.string({ required_error: "Please Enter Your Email" }).min(1, "Please Enter Your Email").email("Please Enter a Valid Email"),
  newPassword: z
    .string({ required_error: "Please Enter Your Password" })
    .min(1, "Please Enter Your Password")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be at least 8 characters and include at least 1 uppercase, 1 lowercase, one number, and 1 special character"
    ),
});

export type SetNewPwType = z.infer<typeof setNewPwSchema>;
