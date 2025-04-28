"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Link from "next/link";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function AdminDashboard() {
  const [pendingUniversities, setPendingUniversities] = useState([]);
  const [approvedUniversities, setApprovedUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    fetchPendingUniversities();
    fetchApprovedUniversities();
  }, []);

  const fetchPendingUniversities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/university/pending`);
      setPendingUniversities(response.data);
    } catch (error) {
      console.error("Error fetching pending universities:", error);
    }
  };

  const fetchApprovedUniversities = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/university/approved`);
      setApprovedUniversities(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching approved universities:", error);
    }
  };


  const handleApprove = async (id) => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/api/university/approve/${id}`);
      setStatusMsg("University approved.");
      fetchPendingUniversities();
      fetchApprovedUniversities();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setStatusMsg("Error approving university.");
      console.error("Error approving university:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/university/reject/${id}`);
      setStatusMsg("University deleted.");
      fetchPendingUniversities();
      fetchApprovedUniversities();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setStatusMsg("Error deleting university.");
      console.error("Error rejecting university:", error);
    }
  };

  const handleBlock = async (id) => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/api/university/block/${id}`);
      setStatusMsg("University blocked.");
      fetchApprovedUniversities();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setStatusMsg("Error blocking university.");
      console.error("Error blocking university:", error);
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
            Manage university approvals, deletions, and blocks below.
          </p>
        </div>
      </section>

      {statusMsg && (
        <div className="text-center my-4 text-blue-700 font-medium">{statusMsg}</div>
      )}

      {/* Pending Universities */}
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold mb-4">Pending Universities</h2>
        {pendingUniversities.length === 0 ? (
          <div className="text-gray-500">No pending universities.</div>
        ) : (
          <table className="w-full border mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingUniversities.map((uni) => (
                <tr key={uni._id} className="border-b">
                  <td className="py-2 px-4">{uni.name}</td>
                  <td className="py-2 px-4">{uni.email}</td>
                  <td className="py-2 px-4">
                    <button className="bg-green-600 text-white px-3 py-1 rounded mr-2" onClick={() => handleApprove(uni._id)} disabled={loading}>Approve</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleReject(uni._id)} disabled={loading}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Approved Universities */}
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold mb-4">Approved Universities</h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : approvedUniversities.length === 0 ? (
          <div className="text-gray-500">No approved universities.</div>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedUniversities.map((uni) => (
                <tr key={uni._id} className="border-b">
                  <td className="py-2 px-4">{uni.name}</td>
                  <td className="py-2 px-4">{uni.email}</td>
                  <td className="py-2 px-4">{uni.blocked ? <span className="text-red-600">Blocked</span> : <span className="text-green-600">Active</span>}</td>
                  <td className="py-2 px-4">
                    <button className="bg-red-600 text-white px-3 py-1 rounded mr-2" onClick={() => handleReject(uni._id)} disabled={loading}>Delete</button>
                    {!uni.blocked && <button className="bg-yellow-600 text-white px-3 py-1 rounded" onClick={() => handleBlock(uni._id)} disabled={loading}>Block</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

