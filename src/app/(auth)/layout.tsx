'use client';

import React from 'react';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <div className="w-full pb-5 min-h-screen flex justify-center items-center md:w-1/2 bg-gradient-to-b text-white from-[#1A72BC] to-[#5052BB]">
        {children}
      </div>
      <article
        className="hidden md:block"
        style={{ height: '100vh', width: '50%', position: 'relative' }}
      >
        <Image
          src="/auth-image.png"
          alt="Auth Image"
          priority
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </article>
    </section>
  );
}
