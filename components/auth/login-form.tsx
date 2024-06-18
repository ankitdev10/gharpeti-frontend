"use client";

import { login } from "@/lib/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { LoadingButton } from "../ui/loading-button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PasswordInput } from "../ui/password-input";
const loginSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, {
      message: "Email is required",
    })
    .max(100),
  password: z.string().min(6, { message: "Password is required" }).max(100),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const { mutate: _login, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login successfulll");
      router.push("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    _login({
      email: values.email,
      password: values.password,
    });
  };

  const rootError = form.formState.errors.root?.message;
  return (
    <div className="flex flex-col max-h-screen justify-center  items-center p-8 md:p-12">
      <Form {...form}>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Welcome Back!
        </h2>
        <form
          className="max-w-md mt-8 space-y-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    type="email"
                    {...field}
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

          {!!rootError && (
            <p className="text-sm font-medium text-destructive">{rootError}</p>
          )}
          <LoadingButton
            disabled={isPending}
            type="submit"
            loading={isPending}
            defaultText="Login"
            loadingText="Logging in.."
          />
          <h4 className="text-sm">
            Don&apos;t have an account?{" "}
            <Link className="text-[blue] underline" href="/register">
              Register
            </Link>
          </h4>

          <Link href="/" className="text-sm text-[blue] underline">
            Go to Home
          </Link>
        </form>
      </Form>
    </div>
  );
};
