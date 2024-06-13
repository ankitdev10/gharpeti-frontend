'use client';

import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { LoadingButton } from '../ui/loading-button';

const loginSchema = z.object({
  email: z.string().email().min(5).max(100),
  password: z.string().min(6).max(100),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (values: LoginSchema) => {
    startTransition(() => {
      console.log({ values });
    });
  };

  const rootError = form.formState.errors.root?.message;
  return (
    <div className='flex flex-col max-h-screen justify-center  items-center p-8 md:p-12'>
      <Form {...form}>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-center'>
          Welcome Back!
        </h2>
        <form
          className='max-w-md mt-8 space-y-4 w-full'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='example@email.com'
                    type='email'
                    {...field}
                  />
                </FormControl>

                {form.formState.errors.email?.message && (
                  <p className='text-sm font-medium text-destructive'>
                    {form.formState.errors.email?.message.replace(
                      'String',
                      'Email'
                    )}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='********'
                    type='password'
                    {...field}
                  />
                </FormControl>

                {form.formState.errors.password?.message && (
                  <p className='text-sm font-medium text-destructive'>
                    {form.formState.errors.password?.message.replace(
                      'String',
                      'Password'
                    )}
                  </p>
                )}
              </FormItem>
            )}
          />

          {!!rootError && (
            <p className='text-sm font-medium text-destructive'>{rootError}</p>
          )}
          <LoadingButton
            disabled={isPending || !form.formState.isValid}
            type='submit'
            loading={isPending}
            defaultText='Login'
            loadingText='Logging in..'
          />
          <h4 className='text-sm'>
            Don&apos;t have an account?{' '}
            <Link
              className='text-[blue] underline'
              href='/register'
            >
              Register
            </Link>
          </h4>

          <Link
            href='/'
            className='text-sm text-[blue] underline'
          >
            Go to Home
          </Link>
        </form>
      </Form>
    </div>
  );
};
