'use client';
import Link from 'next/link';
import React from 'react';
import Button from './button';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
  check: boolean;
};

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form
      className="mt-8 flex  flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <label className="label">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className={`input ${
            errors.email ? 'border-[#ff0000]' : 'border-[#D0D5DD]'
          }`}
          {...register('email', { required: true })}
        />
      </div>
      <div className="w-full">
        <label className="label">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className={`input ${
            errors.password ? 'border-[#ff0000]' : 'border-[#D0D5DD]'
          }`}
          {...register('password', { required: true })}
        />
      </div>
      <div className="flex justify-between  items-center">
        <div className="flex flex-row-reverse items-center gap-2">
          <label className="text-sm font-semibold">Remember for 30 days</label>
          <input
            type="checkbox"
            className="size-4 rounded border border-[#D0D5DD] bg-white"
            {...register('check')}
          />
        </div>

        <Link
          href={'/forgotpassword'}
          className="text-sm font-semibold underline"
        >
          Forgot password
        </Link>
      </div>

      <Button>Sign in</Button>
    </form>
  );
}
