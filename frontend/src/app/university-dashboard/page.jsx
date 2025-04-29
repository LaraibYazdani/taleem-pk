"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar"; // Adjust if needed
import UniversityProfileUpdate from "@/app/university-dashboard/components/UniversityProfileUpdate";
import UniversityApplicationsTable from "./ApplicationsTable";
import ManagePrograms from "@/app/university-dashboard/components/ManagePrograms";

export default function UniversityDashboard() {
  const [universityId, setUniversityId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUniversityId = localStorage.getItem("universityId");
      setUniversityId(storedUniversityId);
    }
  }, []);

  if (!universityId) {
    return <p className="text-center mt-20 text-white">Loading...</p>;
  }

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
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard!</h1>
          <p className="text-lg max-w-2xl">
            Complete your University Profile and manage programs on Taleem.pk
          </p>
        </div>
      </section>

      {/* University Profile Update Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Manage University Profile</h2>

        <UniversityProfileUpdate universityId={universityId} />
      </section>
      
      {/* Manage Programs Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Manage University Programs</h2>

        <ManagePrograms universityId={universityId} />
      </section>

      {/* Applications Table */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Manage University Applications</h2>

        <UniversityApplicationsTable universityId={universityId} />
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-6 text-center mt-auto">
        <p> {new Date().getFullYear()} Taleem.pk. All rights reserved.</p>
      </footer>

    </div>
  );
}
