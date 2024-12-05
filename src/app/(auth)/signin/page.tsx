import Image from 'next/image';
import React from 'react';
import AuthHeader from '../components/auth-header';
import SigninForm from '../components/signin-form';

export default function page() {
  return (
    <main className="flex flex-col md:max-w-[400px] w-full px-4">
      {' '}
      <AuthHeader text="Welcome back! Please enter your details." />
      <SigninForm />
    </main>
  );
}
