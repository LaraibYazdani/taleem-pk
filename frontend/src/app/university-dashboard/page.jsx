"use client";

import Navbar from "@/components/Navbar"; // Adjust the path if needed
import Link from "next/link";

export default function UniversityDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      
      {/* Navbar */}
      <Navbar role="university" />

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center h-[400px] px-4 bg-cover bg-center mt-16"
        style={{ backgroundImage: "url('/university-hero.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome, To University Dashboard!</h1>
          <p className="text-lg max-w-2xl">
            Browse through programs and university profile on Taleem.pk
          </p>
        </div>
      </section>

      {/* University Info Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">University Profile</h2>

        <div className="max-w-4xl mx-auto bg-gray-100 p-8 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-4">Lahore University</h3>
          <p className="mb-4"><strong>Email:</strong> info@lahoreuniversity.com</p>
          <p className="mb-6"><strong>Description:</strong> Leading private university offering excellence in education and research.</p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-6 bg-white">
        <div className="flex justify-between items-center max-w-6xl mx-auto mb-8">
          <h2 className="text-3xl font-bold">Programs Offered</h2>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded">
            Add Program
          </button>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
          
          {/* Program Card */}
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col">
            <h3 className="text-2xl font-semibold mb-2">Bachelor of Computer Science (BSCS)</h3>
            <p className="text-gray-700">A 4-year program focusing on software development, AI, and data science.</p>
          </div>

          {/* Program Card */}
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col">
            <h3 className="text-2xl font-semibold mb-2">Master of Business Administration (MBA)</h3>
            <p className="text-gray-700">A 2-year MBA program specializing in Marketing, Finance, and HRM.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-6 text-center mt-auto">
        <p>© {new Date().getFullYear()} Taleem.pk. All rights reserved.</p>
      </footer>

    </div>
  );
}
