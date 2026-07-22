import * as z from "zod";

const Suser = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, "Username is required")
      .min(8, "Username must be at least 8 characters")
      .regex(
        /^[a-z0-9_]+$/,
        "Username can only contain lowercase letters, numbers, and underscores"
      ),

    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z.string().trim().min(1, "Pleaase re-enter your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const Luser=z.object({
    username:z.string({error:"Username is required"}),
    password:z.string({error:"Password is required"})

})
export {Luser, Suser}