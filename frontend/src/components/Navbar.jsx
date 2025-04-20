"use client";

import Link from "next/link";

export default function Navbar({ role }) {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center fixed w-full top-0 z-50">
      {/* Left: Logo */}
      <Link href="/" className="text-2xl font-bold text-black">
        Taleem.pk
      </Link>

      {/* Right: Menu */}
      <div className="flex items-center space-x-6">
        {role === "student" && (
          <>
            <Link href="/" className="text-gray-700 hover:text-black">
              Home
            </Link>
            <Link href="/student-dashboard" className="text-gray-700 hover:text-black">
              Universities
            </Link>
          </>
        )}

        {role === "university" && (
          <>
            <Link href="/" className="text-gray-700 hover:text-black">
              Home
            </Link>
            <Link href="/university-dashboard" className="text-gray-700 hover:text-black">
              Manage Programs
            </Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link href="/" className="text-gray-700 hover:text-black">
              Home
            </Link>
            <Link href="/admin-dashboard" className="text-gray-700 hover:text-black">
              Manage Universities
            </Link>
          </>
        )}

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
