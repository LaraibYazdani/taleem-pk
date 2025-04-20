"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AdminDashboard() {
  const [pendingUniversities, setPendingUniversities] = useState([]);

  useEffect(() => {
    fetchPendingUniversities();
  }, []);

  const fetchPendingUniversities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/university/pending");
      setPendingUniversities(response.data);
    } catch (error) {
      console.error("Error fetching pending universities:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/university/approve/${id}`);
      fetchPendingUniversities(); // Refresh after approval
    } catch (error) {
      console.error("Error approving university:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/university/reject/${id}`);
      fetchPendingUniversities(); // Refresh after rejection
    } catch (error) {
      console.error("Error rejecting university:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">

      {/* Navbar */}
      <Navbar role="admin" />

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center h-[400px] px-4 bg-cover bg-center mt-16"
        style={{ backgroundImage: "url('/admin-hero.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome, Admin</h1>
          <p className="text-lg max-w-2xl">
            Manage university approvals and keep Taleem.pk running smoothly!
          </p>
        </div>
      </section>

      {/* Pending Universities Section */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Pending Universities for Approval</h2>

        {pendingUniversities.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
            {pendingUniversities.map((university) => (
              <div key={university._id} className="bg-gray-100 p-8 rounded-lg shadow hover:shadow-lg transition flex flex-col">
                <h3 className="text-2xl font-semibold mb-4">{university.name}</h3>
                <p className="mb-6">{university.description || "No description provided."}</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleApprove(university._id)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(university._id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">No pending universities at the moment.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-6 text-center mt-auto">
        <p>© {new Date().getFullYear()} Taleem.pk. All rights reserved.</p>
      </footer>

    </div>
  );
}
