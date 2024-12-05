import React from 'react';
import AuthHeader from '../components/auth-header';
import SignupForm from '../components/signup-form';

export default function page() {
  return (
    <main className="flex flex-col md:max-w-[400px] w-full px-4">
      <AuthHeader text="Hey there! Kindly enter your details to sign up" />
      <SignupForm />
    </main>
  );
}
