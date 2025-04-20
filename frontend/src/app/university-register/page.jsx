"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UniversityRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("https://taleem-pk.onrender.com/api/university/register", formData);
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input type="text" name="name" placeholder="University Name" onChange={handleChange} className="p-2 border" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="p-2 border" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="p-2 border" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="p-2 border" />
        <button type="submit" className="p-2 bg-blue-500 text-white">Register</button>
      </form>
    </div>
  );
}
