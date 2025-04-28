"use client";
import { useEffect, useState } from "react";

export default function UniversityApplicationsInbox({ universityId }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/university/applications/${universityId}`, {
          credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    if (universityId) fetchApplications();
  }, [universityId]);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Applications Inbox</h2>
      {loading ? (
        <div className="text-center py-8">Loading applications...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : applications.length === 0 ? (
        <div className="text-center text-gray-600">No applications received yet.</div>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Student Name</th>
              <th className="py-2 px-4 text-left">Program</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-2 px-4">{app.studentName}</td>
                <td className="py-2 px-4">{app.programName}</td>
                <td className="py-2 px-4">{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
