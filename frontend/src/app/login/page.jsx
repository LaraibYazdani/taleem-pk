"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role is student

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let endpoint = "";
      if (role === "university") {
        endpoint = "http://localhost:5000/api/university/login";
      } else {
        endpoint = "http://localhost:5000/api/auth/login";
      }

      const response = await axios.post(endpoint, { email, password });

      // Save token and user in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));

      // Redirect based on role
      if (role === "student") {
        router.push("/student-dashboard");
      } else if (role === "admin") {
        router.push("/admin-dashboard");
      } else if (role === "university") {
        router.push("/university-dashboard");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Role Selector */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="university">University</option>
          </select>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
