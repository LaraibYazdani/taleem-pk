"use client";
import { useEffect, useState } from "react";

export default function ApplicationsTable() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      setError("");
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/applications/student`, {
          credentials: "include",
          headers: token ? { "Authorization": `Bearer ${token}` } : undefined
        });
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchApplications();
  }, []);

  return (
    <section className="py-8 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Applications</h2>
      {loading ? (
        <div className="text-center py-8">Loading applications...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : applications.length === 0 ? (
        <div className="text-center text-gray-600">No applications found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">University</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id} className="text-center">
                  <td className="py-2 px-4 border-b font-semibold">{app.universityName}</td>
                  <td className="py-2 px-4 border-b">{new Date(app.applicationDate).toLocaleDateString()}</td>
                  <td className={`py-2 px-4 border-b font-bold ${app.status === "Accepted" ? "text-green-600" : app.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
