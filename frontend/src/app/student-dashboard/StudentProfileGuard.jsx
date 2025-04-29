"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentProfileGuard({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkProfile() {
      try {
        // Add cache-busting param to ensure fresh fetch
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/student/profile?t=${Date.now()}`, {
          credentials: "include"
        });
        if (!res.ok) {
          router.replace("/student-dashboard/profile");
        } else {
          const data = await res.json();
          if (!data.fullName || !data.city || !data.highestQualification || !data.finalPercentageOrCGPA || !data.fieldOfInterest) {
            router.replace("/student-dashboard/profile");
          } else {
            setChecking(false);
          }
        }
      } catch (err) {
        router.replace("/student-dashboard/profile");
      }
    }
    checkProfile();
  }, []);

  if (checking) {
    return <div>Loading...</div>;
  }

  return children;
}
