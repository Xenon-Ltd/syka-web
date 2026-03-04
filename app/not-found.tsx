import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <header className="mb-4">
        <h1 className="text-6xl font-bold text-xenon-800">404 Error</h1>
      </header>
      <main className="mb-6 text-center px-4">
        <p className="text-xl text-gray-500">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </main>
      <footer>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-xenon-900 px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-xenon-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50"
          href="/"
        >
          Go Home
        </Link>
      </footer>
    </div>
  );
};

export default NotFound;
