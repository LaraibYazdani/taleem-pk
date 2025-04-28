"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TaleemConnect() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [applying, setApplying] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchMatches() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/student/matches`, {
          credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to fetch matches");
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchMatches();
  }, []);

  const handleApply = async (universityId, programId, programName) => {
    setApplying(programId);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/student/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ universityId, programId, programName })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to apply");
      setSuccess("Application sent successfully!");
    } catch (err) {
      setError(err.message);
    }
    setApplying("");
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">Taleem Connect: Matched Universities</h2>
      {loading ? (
        <div className="text-center py-8">Loading matches...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : matches.length === 0 ? (
        <div className="text-center text-gray-600">No matching universities found based on your profile.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {matches.map(match => (
            <div key={match.programId + match.universityId} className="border rounded-lg p-6 flex flex-col items-center bg-gray-50">
              {match.logoUrl && (
                <img src={match.logoUrl} alt="Logo" className="h-16 w-16 object-cover rounded-full mb-2" />
              )}
              <h3 className="text-xl font-semibold mb-1">{match.universityName}</h3>
              <div className="text-gray-700 mb-2">City: {match.universityCity}</div>
              <div className="text-blue-800 font-medium mb-2">Program: {match.programName}</div>
              <div className="text-sm text-gray-500 mb-2">Eligibility: {match.eligibility}%</div>
              <button
                className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-60"
                disabled={applying === match.programId}
                onClick={() => handleApply(match.universityId, match.programId, match.programName)}
              >
                {applying === match.programId ? "Applying..." : "Apply Now"}
              </button>
            </div>
          ))}
        </div>
      )}
      {success && <div className="text-green-600 text-center mt-4">{success}</div>}
    </div>
  );
}
