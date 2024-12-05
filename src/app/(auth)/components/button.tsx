import React, { ReactNode } from 'react';

export default function Button({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="border-2 mt-3 bg-[#51A7DB] rounded-lg py-2.5 flex justify-center items-center w-full"
    >
      {children}
    </button>
  );
}
