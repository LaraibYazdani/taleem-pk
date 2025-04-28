"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudentProfileGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    async function checkProfile() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/student/profile`, {
          credentials: "include"
        });
        if (!res.ok) {
          // If not found or error, redirect to profile completion
          router.replace("/student-dashboard/profile");
        } else {
          const data = await res.json();
          // If required fields are missing, redirect
          if (!data.fullName || !data.city || !data.highestQualification || !data.finalPercentageOrCGPA || !data.fieldOfInterest) {
            router.replace("/student-dashboard/profile");
          }
        }
      } catch (err) {
        router.replace("/student-dashboard/profile");
      }
    }
    checkProfile();
    // Only run on mount
    // eslint-disable-next-line
  }, []);

  return children;
}
