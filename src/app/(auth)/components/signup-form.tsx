'use client';

import Link from 'next/link';

import React from 'react';
import Button from './button';
import 'react-phone-number-input/style.css';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  check: string;
  phoneInputWithCountrySelect: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      className="mt-8 flex  flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <label className="label">First Name</label>
        <input
          type="text"
          placeholder="Enter your first name"
          className={`input ${
            errors.firstName ? 'border-[#ff0000]' : 'border-[#D0D5DD]'
          }`}
          {...register('firstName', { required: true })}
        />
      </div>
      <div className="w-full">
        <label className="label">Last Name</label>
        <input
          type="text"
          placeholder="Enter your last name"
          className={`input ${
            errors.lastName ? 'border-[#ff0000]' : 'border-[#D0D5DD]'
          }`}
          {...register('lastName', { required: true })}
        />
      </div>
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

      {/* phone-number */}
      <PhoneInputWithCountry
        name="phoneInputWithCountrySelect"
        control={control}
        placeholder="Enter phone number"
        defaultCountry="GH"
        className="flex items-center h-11 input bg-white px-2"
      />

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
      <div className="w-full">
        <label className="label">Confirm Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className={`input ${
            errors.confirmPassword ? 'border-[#ff0000]' : 'border-[#D0D5DD]'
          }`}
          {...register('confirmPassword', { required: true })}
        />
      </div>

      <div className="flex justify-between  items-center">
        <div className="flex flex-row-reverse items-center gap-2">
          <label className="text-sm font-semibold">Remember for 30 days</label>
          <input
            type="checkbox"
            className="size-4 rounded border border-[#D0D5DD] bg-white"
            {...register('check', { required: false })}
          />
        </div>

        <Link
          href={'/forgotpassword'}
          className="text-sm font-semibold underline"
        >
          Forgot password
        </Link>
      </div>

      <Button>Next</Button>
    </form>
  );
}
