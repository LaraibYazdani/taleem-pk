"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function Register() {
  const [formData, setFormData] = useState({
    role: "student",
    name: "",
    email: "",
    password: "",
    description: "",
    city: "",
    websiteUrl: "",
    contactNumber: ""
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let endpoint = "";

      if (formData.role === "university") {
        endpoint = `${BASE_URL}/api/university/register`;
      } else {
        endpoint = `${BASE_URL}/api/auth/register`;
      }
      

      await axios.post(endpoint, formData);
      alert("Registered successfully!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed. Please check console for details.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <span className="text-3xl font-extrabold text-[#101c2c] tracking-wide mb-2">Taleem.pk</span>
        </div>
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full">
          <h1 className="text-3xl font-bold mb-8 text-center text-[#101c2c]">Register</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <select
              name="role"
              onChange={handleChange}
              value={formData.role}
              className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="student">Student</option>
            <option value="university">University</option>
          </select>
          <input
            type="text"
            name="name"
            placeholder={formData.role === 'university' ? "University Name" : "Full Name"}
            onChange={handleChange}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          {/* Extra fields for university registration */}
          {formData.role === "university" && (
            <>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={2}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="websiteUrl"
                placeholder="Website URL"
                value={formData.websiteUrl}
                onChange={handleChange}
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </>
          )}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded"
          >
            Register
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
