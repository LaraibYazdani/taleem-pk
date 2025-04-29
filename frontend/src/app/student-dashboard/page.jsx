"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Link from "next/link";

import CompleteProfileModal from "./CompleteProfileModal";
import ApplicationsTable from "./ApplicationsTable";

export default function StudentDashboard() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Fetch student profile on mount
  useEffect(() => {
    async function fetchProfile() {
      setProfileLoading(true);
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/student/profile`, {
          credentials: "include",
          headers: token ? { "Authorization": `Bearer ${token}` } : undefined
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
          // If any required field is missing, show modal
          if (!data.fullName || !data.city || !data.highestQualification || !data.finalPercentageOrCGPA || !data.fieldOfInterest) {
            setShowProfileModal(true);
          } else {
            setShowProfileModal(false);
          }
        } else {
          // If error, treat as incomplete
          setShowProfileModal(true);
        }
      } catch {
        setShowProfileModal(true);
      }
      setProfileLoading(false);
    }
    fetchProfile();
  }, []);

  const handleProfileSaved = () => {
    setShowProfileModal(false);
    // Refetch profile to update dashboard state
    setProfileLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/student/profile`, {
      credentials: "include",
      headers: typeof window !== "undefined" && localStorage.getItem("token") ? { "Authorization": `Bearer ${localStorage.getItem("token")}` } : undefined
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setProfile(data);
        setProfileLoading(false);
      });
  };


  useEffect(() => {
    fetchApprovedUniversities();
  }, []);

  const fetchApprovedUniversities = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/university/approved`);
      setUniversities(response.data);
    } catch (err) {
      setError("Error fetching universities. Please try again later.");
      console.error("Error fetching universities:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Navbar */}
      <Navbar role="student" />

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center h-[400px] px-4 bg-cover bg-center mt-16"
        style={{ backgroundImage: "url('/student-hero.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-lg max-w-2xl">
            Explore top universities and apply with ease!
          </p>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Available Universities</h2>

        {loading ? (
          <div className="text-center py-8">Loading universities...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : universities.length === 0 ? (
          <div className="text-center text-gray-600">No universities available at the moment.</div>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
            {universities.map((university) => (
  <Link key={university._id} href={`/university/${university._id}`} className="block group">
    <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center group-hover:ring-2 group-hover:ring-green-600 cursor-pointer">
      {university.bannerImage ? (
        <img src={university.bannerImage} alt={university.name} className="h-40 w-full object-cover rounded mb-4" />
      ) : (
        <div className="h-40 w-full bg-gray-300 rounded mb-4 flex items-center justify-center text-gray-500">
          No Banner Uploaded
        </div>
      )}
      <h3 className="text-2xl font-semibold mb-2">{university.name}</h3>
      <p className="mb-6">{university.description || "No description provided."}</p>
      {university.admissionLink && university.admissionLink.startsWith("http") ? (
        <span className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block mt-2">Apply Now</span>
      ) : (
        <span className="text-gray-500 text-sm">No Application Link</span>
      )}
    </div>
  </Link>
))}
          </div>
        )}
      </section>

      {/* Applications Table */}
      <ApplicationsTable />

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-6 text-center mt-auto">
        <p> {new Date().getFullYear()} Taleem.pk. All rights reserved.</p>
      </footer>

      {/* Profile Completion Modal */}
      <CompleteProfileModal
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        initialProfile={profile || { fullName: "", city: "", highestQualification: "", finalPercentageOrCGPA: "", fieldOfInterest: "", profilePicUrl: "" }}
        onProfileSaved={handleProfileSaved}
      />
    </div>
  );
}
