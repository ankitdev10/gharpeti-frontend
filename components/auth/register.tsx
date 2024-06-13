'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { HTMLAttributes, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { LoadingButton } from '../ui/loading-button';
import { PasswordInput } from '../ui/password-input';

export function Register() {
  const [registrationType, setRegistrationType] = useState<
    'gharpeti' | 'customer'
  >();
  return (
    <div className=' flex flex-col max-h-screen justify-center  items-center p-8 md:p-12'>
      <div className='space-y-6 w-full'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-center'>
          Join Us
        </h2>
        {registrationType ? (
          <div className='max-w-md mx-auto'>
            {/* eslint-disable-next-line */}
            <RegisterForm type={registrationType} />
          </div>
        ) : (
          <div className='flex max-w-md mx-auto flex-col space-y-4 w-full'>
            <h1>
              Are you looking to join us as a Gharpeti or a Customer? We will
              allow you to change it later.
            </h1>
            <Button onClick={() => setRegistrationType('gharpeti')}>
              Register as Gharpeti
            </Button>
            <Button
              onClick={() => setRegistrationType('customer')}
              variant='secondary'
            >
              Register as Customer
            </Button>

            <h4 className='text-sm'>
              Already have an account?{' '}
              <Link
                className='text-[blue] underline'
                href='/login'
              >
                Login
              </Link>
            </h4>

            <Link
              href='/'
              className='text-sm text-[blue] underline'
            >
              Go to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const registerSchema = z
  .object({
    fullName: z.string().min(2).max(100),
    email: z.string().email().min(5).max(100),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
    phone: z.string().min(5).max(100),
    location: z.string().min(2),
    type: z.enum(['gharpeti', 'customer']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

interface RegisterFormProps extends HTMLAttributes<HTMLFormElement> {
  type: 'gharpeti' | 'customer';
}
const RegisterForm = ({ type }: RegisterFormProps) => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      location: '',
      type,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: RegisterSchema) => {
    startTransition(() => {
      console.log({ values });
    });
  };
  const rootError = form.formState.errors.root?.message;
  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form
        className='space-y-2'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='text'
                  placeholder='Ankit Poudel'
                />
              </FormControl>
              {form.formState.errors.fullName?.message && (
                <p className='text-sm font-medium text-destructive'>
                  {form.formState.errors.fullName?.message?.replace(
                    'String',
                    'Full Name'
                  )}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete='email'
                  {...field}
                  type='email'
                  placeholder='email@example.com'
                />
              </FormControl>
              {form.formState.errors.email?.message && (
                <p className='text-sm font-medium text-destructive'>
                  {form.formState.errors.email?.message?.replace(
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
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='text'
                  autoComplete='tel-national'
                  placeholder='9840480328'
                />
              </FormControl>
              {form.formState.errors.phone?.message && (
                <p className='text-sm font-medium text-destructive'>
                  {form.formState.errors.phone?.message?.replace(
                    'String',
                    'Phone'
                  )}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='text'
                  placeholder='Kharibot, Kathmandu'
                />
              </FormControl>
              {form.formState.errors.location?.message && (
                <p className='text-sm font-medium text-destructive'>
                  {form.formState.errors.location?.message?.replace(
                    'String',
                    'Location'
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
                <PasswordInput
                  placeholder='*******'
                  autoCapitalize='none'
                  autoCorrect='off'
                  autoComplete='current-password'
                  required
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
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  autoCapitalize='none'
                  placeholder='*******'
                  autoCorrect='off'
                  autoComplete='current-password'
                  required
                  {...field}
                />
              </FormControl>
              {form.formState.errors.confirmPassword?.message && (
                <p className='text-sm font-medium text-destructive'>
                  {form.formState.errors.confirmPassword?.message.replace(
                    'String',
                    'Confirm Password'
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
          type='submit'
          loading={isPending}
          defaultText='Register'
          loadingText='Registering..'
          disabled={isPending || !form.formState.isValid}
        />
        <h4 className='text-sm'>
          Already have an account?{' '}
          <Link
            className='text-[blue] underline'
            href='/login'
          >
            Login
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
  );
};
