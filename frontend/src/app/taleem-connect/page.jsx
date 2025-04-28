"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TaleemConnectPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchMatches() {
      setLoading(true);
      setError("");
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/student/matches`, {
          headers: token ? { "Authorization": `Bearer ${token}` } : undefined,
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

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-700">Taleem Connect</h1>
        <p className="text-center text-lg mb-10 text-gray-700">Discover your best university matches instantly, powered by our proprietary smart matching engine.</p>
        {loading ? (
          <div className="text-center py-10">Loading your matches...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : matches.length === 0 ? (
          <div className="text-center text-gray-600">No matches found. Please complete your profile for better results.</div>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {matches.map((match, idx) => (
              <div key={idx} className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 shadow hover:shadow-lg transition">
                <div className="flex items-center mb-4">
                  {match.logoUrl ? (
                    <img src={match.logoUrl} alt={match.universityName} className="h-16 w-16 rounded mr-4 object-cover" />
                  ) : (
                    <div className="h-16 w-16 bg-gray-300 rounded mr-4 flex items-center justify-center text-gray-500">No Logo</div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-purple-800 mb-1">{match.universityName}</h2>
                    <p className="text-gray-600 text-sm">{match.universityCity}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Program:</span> {match.programName}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Eligibility:</span> {match.eligibility}%
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Match Score:</span> <span className="text-purple-700 font-bold">{match.matchScore}</span>
                </div>
                {match.websiteUrl && (
                  <a href={match.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Visit University</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
