"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getUserRole from "../utils/getUserRole";

function AuthSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      setIsLoggedIn(!!token);
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          setEmail(userObj?.university?.email || userObj?.student?.email || userObj?.email || "");
        } catch {
          setEmail("");
        }
      } else {
        setEmail("");
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("universityId");
      setIsLoggedIn(false);
      setEmail("");
      router.push("/");
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center space-x-4 ml-6">
        <span className="text-gray-700 font-medium">{email}</span>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex space-x-4 ml-6">
        <Link href="/login">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
      </div>
    );
  }
}

function DashboardButton() {
  const [dashboardUrl, setDashboardUrl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Helper to update login/dashboard state
  const updateState = () => {
    const token = localStorage.getItem("token");
    const role = getUserRole();
    setIsLoggedIn(!!token && !!role);
    if (token && role) {
      if (role === "student") setDashboardUrl("/student-dashboard");
      else if (role === "university") setDashboardUrl("/university-dashboard");
      else if (role === "admin") setDashboardUrl("/admin-dashboard");
      else setDashboardUrl(null);
    } else {
      setDashboardUrl(null);
    }
  };

  useEffect(() => {
    updateState();
    // Listen for login/logout or storage changes (tab switching)
    const handleStorage = (e) => {
      if (e.key === "token" || e.key === "user") {
        updateState();
      }
    };
    window.addEventListener("storage", handleStorage);
    // Listen for route changes (in case login/logout changes route)
    const handleRoute = () => updateState();
    router && router.events && router.events.on && router.events.on('routeChangeComplete', handleRoute);
    return () => {
      window.removeEventListener("storage", handleStorage);
      router && router.events && router.events.off && router.events.off('routeChangeComplete', handleRoute);
    };
  }, [router]);

  console.log("DashboardButton debug:", {
    isLoggedIn,
    dashboardUrl,
    role: getUserRole(),
    token: (typeof window !== "undefined") ? localStorage.getItem("token") : null,
    user: (typeof window !== "undefined") ? localStorage.getItem("user") : null
  });

  if (!isLoggedIn || !dashboardUrl) return null;
  return (
    <Link href={dashboardUrl} className="text-black hover:text-blue-600 font-medium">
      <button className="bg-gray-200 hover:bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded">
        Dashboard
      </button>
    </Link>
  );
}


export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md fixed top-0 w-full z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-black">
        <Link href="/">Taleem.pk</Link>
      </div>

      {/* Menu */}
      <div className="flex items-center space-x-8">
        <DashboardButton />
        <Link href="/about" className="text-black hover:text-green-600 font-medium">About</Link>
        <Link href="/universities" className="text-black hover:text-green-600 font-medium">Universities</Link>
        <Link href="/taleem-connect">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2">
            Taleem Connect
          </button>
        </Link>

        {/* Auth/User Section */}
        <AuthSection />
      </div>
    </nav>
  );
}
