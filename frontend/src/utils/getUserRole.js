// Utility to robustly extract the user role from localStorage
export default function getUserRole() {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    const userObj = JSON.parse(userStr);
    // If double-wrapped (userObj.user), unwrap it
    const actualUser = userObj.user ? userObj.user : userObj;
    if (typeof actualUser.role === "string") return actualUser.role;
    if (actualUser.university) return "university";
    if (actualUser.student) return "student";
    return null;
  } catch {
    return null;
  }
}
