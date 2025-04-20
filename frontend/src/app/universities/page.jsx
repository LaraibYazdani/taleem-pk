"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    fetchApprovedUniversities();
  }, []);

  const fetchApprovedUniversities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/university/approved");
      setUniversities(response.data);
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">

      {/* Navbar */}
      <Navbar role="guest" /> {/* 'guest' since no login needed here */}

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center h-[300px] px-4 bg-cover bg-center mt-16"
        style={{ backgroundImage: "url('/student-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-bold mb-4">Explore Universities</h1>
          <p className="text-lg">Find the perfect university for you on Taleem.pk</p>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Available Universities</h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">

          {/* Hardcoded Universities */}
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <img src="/uni1.jpg" alt="Lahore University" className="h-40 w-full object-cover rounded mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Lahore University</h3>
            <p className="mb-6">Leading private university in Lahore, offering diverse programs.</p>
            <Link href="#" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Apply Now
            </Link>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <img src="/uni2.jpg" alt="Karachi Institute of Science" className="h-40 w-full object-cover rounded mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Karachi Institute of Science</h3>
            <p className="mb-6">Top-rated technical institute focusing on engineering and sciences.</p>
            <Link href="#" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Apply Now
            </Link>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <img src="/uni3.jpg" alt="Islamabad Arts Academy" className="h-40 w-full object-cover rounded mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Islamabad Arts Academy</h3>
            <p className="mb-6">Renowned for fine arts, design, and architecture studies.</p>
            <Link href="#" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Apply Now
            </Link>
          </div>

          {/* Dynamic Universities from MongoDB */}
          {universities.map((university) => (
            <div key={university._id} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center">
              <img src="/uni1.jpg" alt={university.name} className="h-40 w-full object-cover rounded mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{university.name}</h3>
              <p className="mb-6">{university.description || "No description provided."}</p>
              <Link href="#" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Apply Now
              </Link>
            </div>
          ))}

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-6 text-center mt-auto">
        <p>© {new Date().getFullYear()} Taleem.pk. All rights reserved.</p>
      </footer>

    </div>
  );
}
