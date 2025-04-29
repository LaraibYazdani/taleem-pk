"use client";
import { useEffect, useState } from "react";

export default function UniversityApplicationsTable() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusUpdating, setStatusUpdating] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      setError("");
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/applications/university`;
        const headers = token ? { "Authorization": `Bearer ${token}` } : undefined;
        console.log("[fetchApplications debug]", {
          token,
          endpoint,
          headers
        });
        const res = await fetch(endpoint, {
          credentials: "include",
          headers
        });
        console.log("[fetchApplications debug] response status:", res.status);
        if (!res.ok) {
          let errText = await res.text();
          console.error("[fetchApplications debug] error response:", errText);
          throw new Error("Failed to fetch applications: " + errText);
        }
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error("[fetchApplications debug] exception:", err);
        setError(err.message);
      }
      setLoading(false);
    }
    fetchApplications();
  }, []);

  async function updateStatus(appId, newStatus) {
    setStatusUpdating(appId + newStatus);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/applications/${appId}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error("Failed to update status");
      setApplications(apps => apps.map(app => app._id === appId ? { ...app, status: newStatus } : app));
    } catch (err) {
      alert(err.message);
    }
    setStatusUpdating("");
  }

  return (
    <section className="py-8 px-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Student Applications</h2>
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
                <th className="py-2 px-4 border-b">Student Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id} className="text-center">
                  <td className="py-2 px-4 border-b">{app.studentName}</td>
                  <td className="py-2 px-4 border-b">{app.studentEmail}</td>
                  <td className="py-2 px-4 border-b">{new Date(app.applicationDate).toLocaleDateString()}</td>
                  <td className={`py-2 px-4 border-b font-bold ${app.status === "Accepted" ? "text-green-600" : app.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>{app.status}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      className="border rounded px-2 py-1"
                      value={app.status}
                      disabled={statusUpdating === app._id + app.status}
                      onChange={e => updateStatus(app._id, e.target.value)}
                    >
                      <option value="Ongoing">Ongoing</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
