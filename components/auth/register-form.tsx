"use client";

import { Input } from "@/components/ui/input";
import { register } from "@/lib/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LoadingButton } from "../ui/loading-button";
import { PasswordInput } from "../ui/password-input";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: "Full name must be at least 3 characters" })
      .max(100)
      .refine((value) => value.trim().split(/\s+/).length >= 2, {
        message: "Full name must contain at least two words",
      }),
    email: z
      .string()
      .email()
      .min(1, {
        message: "Email is required",
      })
      .max(100),
    password: z
      .string()
      .min(6, {
        message: "Password is required",
      })
      .max(100),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Password must be atleast 6 charecters",
      })
      .max(32, {
        message: "Password can not exceed 32 charecters",
      }),
    phone: z.string().regex(/^\d{10}$/, {
      message: "Invalid Phone Number",
    }),
    location: z.string().min(1, { message: "Location is required" }),
    type: z.enum(["gharpeti", "customer"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

interface RegisterFormProps extends HTMLAttributes<HTMLFormElement> {
  type: "gharpeti" | "customer";
}
export const RegisterForm = ({ type }: RegisterFormProps) => {
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      location: "",
      type,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (d) => {
      console.log(d);
      toast.success("Registration successfulll");
      router.push("/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (values: RegisterSchema) => {
    mutate(values);
  };
  const rootError = form.formState.errors.root?.message;
  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Ankit Poudel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  {...field}
                  type="email"
                  placeholder="email@example.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  autoComplete="tel-national"
                  placeholder="9840480328"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Kharibot, Kathmandu"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="*******"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="current-password"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  autoCapitalize="none"
                  placeholder="*******"
                  autoCorrect="off"
                  autoComplete="current-password"
                  required
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {!!rootError && (
          <p className="text-sm font-medium text-destructive">{rootError}</p>
        )}
        <LoadingButton
          type="submit"
          loading={isPending}
          defaultText="Register"
          loadingText="Registering.."
          // disabled={isPending || !form.formState.isValid}
        />
        <h4 className="text-sm">
          Already have an account?{" "}
          <Link className="text-[blue] underline" href="/login">
            Login
          </Link>
        </h4>

        <Link href="/" className="text-sm text-[blue] underline">
          Go to Home
        </Link>
      </form>
    </Form>
  );
};
