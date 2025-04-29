"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function UniversityRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    city: "",
    websiteUrl: "",
    contactNumber: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/university/register`, formData);
        alert("University registered successfully! Awaiting approval.");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">University Registration</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 bg-white shadow-md rounded-lg p-6">
        <input type="text" name="name" placeholder="University Name" value={formData.name} onChange={handleChange} className="p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="p-2 border rounded" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="p-2 border rounded" rows={3} />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="websiteUrl" placeholder="Website URL" value={formData.websiteUrl} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} className="p-2 border rounded" />
        <button type="submit" className="p-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded">Register</button>
      </form>
    </div>
  );
}
