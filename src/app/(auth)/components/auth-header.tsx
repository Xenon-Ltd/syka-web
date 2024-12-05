import Image from 'next/image';
import React from 'react';

export default function AuthHeader({ text }: { text: string }) {
  return (
    <article className="flex flex-col items-center">
      <Image
        src="/auth-header.png"
        alt="auth header"
        width={218}
        height={121}
      />

      <h5>{text}</h5>
    </article>
  );
}
