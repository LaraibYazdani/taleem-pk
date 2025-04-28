"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function UniversityDetailsPage({ params }) {
  const { id } = params;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/university/profile/${id}`);
        setUniversity(response.data);
      } catch (error) {
        console.error("Error fetching university:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUniversity();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20">Loading University Details...</p>;
  }

  if (!university) {
    return <p className="text-center mt-20 text-red-500">University not found!</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">

      {/* University Banner */}
      {university.bannerImage && (
        <div
          className="h-[400px] w-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${university.bannerImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">{university.name}</h1>
          </div>
        </div>
      )}

      {/* University Details */}
      <section className="py-10 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">{university.name}</h2>
        <p className="text-center text-gray-700 mb-10">{university.description || "No description provided."}</p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 mb-12">
          {university.city && <InfoItem label="City" value={university.city} />}
          {university.websiteUrl && <InfoItem label="Website" value={<a href={university.websiteUrl} target="_blank" className="text-blue-600 underline">Visit Website</a>} />}
          {university.admissionLink && <InfoItem label="Admission Portal" value={<a href={university.admissionLink} target="_blank" className="text-green-600 underline">Apply Now</a>} />}
          {university.feeStructure && <InfoItem label="Fee Structure" value={university.feeStructure} />}
          {university.scholarshipsInfo && <InfoItem label="Scholarships" value={university.scholarshipsInfo} />}
          {university.hostelInfo && <InfoItem label="Hostel Info" value={university.hostelInfo} />}
        </div>

        {/* Photo Gallery */}
        {university.gallery && university.gallery.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold mb-6 text-center">Photo Gallery</h3>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-12">
              {university.gallery.map((imgUrl, idx) => (
                <img key={idx} src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-60 object-cover rounded-lg shadow" />
              ))}
            </div>
          </>
        )}

        {/* Programs */}
        {university.programs && university.programs.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold mb-6 text-center">Programs Offered</h3>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {university.programs.map((program, idx) => (
                <div key={idx} className="border p-6 rounded-lg shadow">
                  <h4 className="text-xl font-bold mb-2">{program.name}</h4>
                  <p><strong>Duration:</strong> {program.duration}</p>
                  <p><strong>Eligibility:</strong> {program.eligibilityPercentage}% ({program.eligibilityCertificate})</p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

    </div>
  );
}

// Helper component for uniform info layout
function InfoItem({ label, value }) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
