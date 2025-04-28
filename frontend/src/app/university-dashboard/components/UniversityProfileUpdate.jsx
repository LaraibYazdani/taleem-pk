"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function UniversityProfileUpdate({ universityId }) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    description: "",
    websiteUrl: "",
    admissionLink: "",
    feeStructure: "",
    scholarshipsInfo: "",
    hostelInfo: "",
    programs: [],
    newsUpdates: [],
  });

  const [loading, setLoading] = useState(true); // ⏳ Loader
  const [bannerImage, setBannerImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [programInput, setProgramInput] = useState({ name: "", duration: "", eligibilityPercentage: "", eligibilityCertificate: "" });
  const [newsInput, setNewsInput] = useState({ title: "", description: "" });

  // 📥 Fetch University Data
  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/university/profile/${universityId}`);
        const data = response.data;

        setFormData({
          name: data.name || "",
          city: data.city || "",
          description: data.description || "",
          websiteUrl: data.websiteUrl || "",
          admissionLink: data.admissionLink || "",
          feeStructure: data.feeStructure || "",
          scholarshipsInfo: data.scholarshipsInfo || "",
          hostelInfo: data.hostelInfo || "",
          programs: data.programs || [],
          newsUpdates: data.newsUpdates || [],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching university profile:", error);
        setLoading(false);
      }
    };

    if (universityId) {
      fetchUniversityData();
    }
  }, [universityId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProgramAdd = () => {
    setFormData({
      ...formData,
      programs: [...formData.programs, programInput],
    });
    setProgramInput({ name: "", duration: "", eligibilityPercentage: "", eligibilityCertificate: "" });
  };

  const handleNewsAdd = () => {
    setFormData({
      ...formData,
      newsUpdates: [...formData.newsUpdates, newsInput],
    });
    setNewsInput({ title: "", description: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, typeof value === "object" ? JSON.stringify(value) : value);
      });

      if (bannerImage) {
        formDataToSend.append("bannerImage", bannerImage);
      }

      galleryImages.forEach((file) => {
        formDataToSend.append("galleryImages", file);
      });

      await axios.put(`${BASE_URL}/api/university/profile/update/${universityId}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("Profile updated successfully!");
      // Re-fetch university data to reflect new banner immediately
      if (universityId) {
        const response = await axios.get(`${BASE_URL}/api/university/profile/${universityId}`);
        const data = response.data;
        setFormData({
          name: data.name || "",
          city: data.city || "",
          description: data.description || "",
          websiteUrl: data.websiteUrl || "",
          admissionLink: data.admissionLink || "",
          feeStructure: data.feeStructure || "",
          scholarshipsInfo: data.scholarshipsInfo || "",
          hostelInfo: data.hostelInfo || "",
          programs: data.programs || [],
          newsUpdates: data.newsUpdates || [],
        });
      }
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  if (loading) {
    return <p className="text-center mt-20 text-lg font-semibold">Loading University Profile...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">Update University Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Basic Info */}
        <input type="text" name="name" placeholder="University Name" value={formData.name} onChange={handleChange} className="p-3 border" required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="p-3 border" required />
        <textarea name="description" placeholder="University Description" value={formData.description} onChange={handleChange} className="p-3 border" required />

        {/* Website and Admission Link */}
        <input type="text" name="websiteUrl" placeholder="Website URL" value={formData.websiteUrl} onChange={handleChange} className="p-3 border" />
        <input type="text" name="admissionLink" placeholder="Admission Link URL" value={formData.admissionLink} onChange={handleChange} className="p-3 border" required />

        {/* Scholarships, Hostel, Fee */}
        <textarea name="feeStructure" placeholder="Fee Structure" value={formData.feeStructure} onChange={handleChange} className="p-3 border" />
        <textarea name="scholarshipsInfo" placeholder="Scholarships Info" value={formData.scholarshipsInfo} onChange={handleChange} className="p-3 border" />
        <textarea name="hostelInfo" placeholder="Hostel Information" value={formData.hostelInfo} onChange={handleChange} className="p-3 border" />

        {/* Banner Upload */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Upload University Banner</label>
          <input type="file" accept="image/*" onChange={(e) => setBannerImage(e.target.files[0])} className="border p-2" />
          {/* Preview banner image if selected */}
          {bannerImage && (
            <img
              src={URL.createObjectURL(bannerImage)}
              alt="Banner Preview"
              className="mt-2 w-full max-h-56 object-cover rounded shadow"
            />
          )}
          {/* Show current banner if no new image selected */}
          {!bannerImage && formData.bannerImage && (
            <img
              src={formData.bannerImage}
              alt="Current Banner"
              className="mt-2 w-full max-h-56 object-cover rounded shadow"
            />
          )}
        </div>

        {/* Gallery Upload */}
        <div className="flex flex-col mt-6">
          <label className="font-semibold mb-2">Upload Gallery Images</label>
          <input type="file" accept="image/*" multiple onChange={(e) => setGalleryImages([...e.target.files])} className="border p-2" />
        </div>

        {/* Programs Section */}
        <div className="border p-4 rounded mt-8">
          <h2 className="text-lg font-semibold mb-2">Add Program</h2>
          <input type="text" placeholder="Program Name" value={programInput.name} onChange={(e) => setProgramInput({ ...programInput, name: e.target.value })} className="p-2 border mb-2 w-full" />
          <input type="text" placeholder="Duration" value={programInput.duration} onChange={(e) => setProgramInput({ ...programInput, duration: e.target.value })} className="p-2 border mb-2 w-full" />
          <input type="number" placeholder="Eligibility %" value={programInput.eligibilityPercentage} onChange={(e) => setProgramInput({ ...programInput, eligibilityPercentage: e.target.value })} className="p-2 border mb-2 w-full" />
          <input type="text" placeholder="Eligibility Certificate (HSSC, A-Levels, etc.)" value={programInput.eligibilityCertificate} onChange={(e) => setProgramInput({ ...programInput, eligibilityCertificate: e.target.value })} className="p-2 border mb-4 w-full" />
          <button type="button" onClick={handleProgramAdd} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Add Program</button>
        </div>

        {/* News Section */}
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Add News Update</h2>
          <input type="text" placeholder="News Title" value={newsInput.title} onChange={(e) => setNewsInput({ ...newsInput, title: e.target.value })} className="p-2 border mb-2 w-full" />
          <textarea placeholder="News Description" value={newsInput.description} onChange={(e) => setNewsInput({ ...newsInput, description: e.target.value })} className="p-2 border mb-2 w-full" />
          <button type="button" onClick={handleNewsAdd} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Add News</button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded mt-4 font-bold">
          Update Profile
        </button>

      </form>

      {successMessage && <p className="text-green-600 mt-4 text-center">{successMessage}</p>}
    </div>
  );
}
