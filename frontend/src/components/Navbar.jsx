"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md fixed top-0 w-full z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-black">
        <Link href="/">Taleem.pk</Link>
      </div>

      {/* Menu */}
      <div className="flex items-center space-x-8">
        <Link href="/about" className="text-black hover:text-green-600 font-medium">About</Link>
        <Link href="/admissions" className="text-black hover:text-green-600 font-medium">Admissions</Link>
        <Link href="/academics" className="text-black hover:text-green-600 font-medium">Academics</Link>
        <Link href="/student-life" className="text-black hover:text-green-600 font-medium">Student Life</Link>
        <Link href="/universities" className="text-black hover:text-green-600 font-medium">Universities</Link>
<Link href="/taleem-connect">
  <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2">
    Taleem Connect
  </button>
</Link>

        {/* Auth Buttons */}
        <div className="flex space-x-4 ml-6">
          <Link href="/login">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
