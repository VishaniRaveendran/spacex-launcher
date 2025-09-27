import React from "react";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <h1 className="text-5xl font-bold mb-4">404 - Not Found</h1>
      <p className="mb-8 text-lg text-gray-300">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <span className="px-6 py-2 bg-blue-700 hover:bg-blue-600 rounded shadow text-white font-semibold transition">
          Go Home
        </span>
      </Link>
    </div>
  );
};

export default NotFound;
