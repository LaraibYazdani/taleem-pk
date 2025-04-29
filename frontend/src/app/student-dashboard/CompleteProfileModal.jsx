"use client";
import { useState } from "react";

const cities = ["Lahore", "Karachi", "Islamabad", "Peshawar", "Quetta", "Multan", "Faisalabad", "Rawalpindi"];
const qualifications = ["HSSC", "A-Levels", "Bachelor's"];

export default function CompleteProfileModal({
  open,
  onClose,
  initialProfile,
  onProfileSaved
}) {
  const [form, setForm] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}/image/upload`, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    let profilePicUrl = form.profilePicUrl;
    try {
      if (profilePic) {
        profilePicUrl = await uploadToCloudinary(profilePic);
      }
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/student/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        credentials: "include",
        body: JSON.stringify({ ...form, profilePicUrl })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save profile");
      setSuccess("Profile saved successfully!");
      // Optionally update user info in localStorage if backend returns it
      if (data.user || data.updatedUser) {
        localStorage.setItem("user", JSON.stringify(data.user || data.updatedUser));
      }
      setTimeout(() => {
        setSuccess("");
        onProfileSaved();
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-xl relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          disabled={loading}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Full Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">City<span className="text-red-500">*</span></label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Highest Qualification<span className="text-red-500">*</span></label>
            <select
              name="highestQualification"
              value={form.highestQualification}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">Select Qualification</option>
              {qualifications.map(q => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Final Percentage or CGPA<span className="text-red-500">*</span></label>
            <input
              type="number"
              name="finalPercentageOrCGPA"
              value={form.finalPercentageOrCGPA}
              onChange={handleChange}
              required
              min="0"
              max="100"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Field of Interest<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="fieldOfInterest"
              value={form.fieldOfInterest}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
              placeholder="e.g. Computer Science, Business"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Profile Picture (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {form.profilePicUrl && (
              <img src={form.profilePicUrl} alt="Profile" className="mt-2 w-20 h-20 object-cover rounded-full border" />
            )}
          </div>
          {error && <div className="text-red-600 text-center">{error}</div>}
          {success && <div className="text-green-600 text-center">{success}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
