"use client";
import { useState } from "react";
import Select from 'react-select';

const cities = ["Lahore", "Karachi", "Islamabad", "Peshawar", "Quetta", "Multan", "Faisalabad", "Rawalpindi"];
const qualifications = ["HSSC", "A-Levels", "Bachelor's"];

// Grouped options for react-select
const fieldOfInterestOptions = [
  {
    label: "Natural Sciences",
    options: [
      { value: "Biology", label: "Biology" },
      { value: "Chemistry", label: "Chemistry" },
      { value: "Physics", label: "Physics" },
      { value: "Earth Sciences (Geology, Meteorology, Oceanography)", label: "Earth Sciences (Geology, Meteorology, Oceanography)" },
      { value: "Astronomy", label: "Astronomy" },
      { value: "Environmental Science", label: "Environmental Science" },
      { value: "Marine Biology", label: "Marine Biology" },
      { value: "Biochemistry", label: "Biochemistry" },
      { value: "Zoology", label: "Zoology" },
      { value: "Botany", label: "Botany" },
      { value: "Ecology", label: "Ecology" },
      { value: "Genetics", label: "Genetics" },
      { value: "Microbiology", label: "Microbiology" }
    ]
  },
  {
    label: "Engineering & Technology",
    options: [
      { value: "Mechanical Engineering", label: "Mechanical Engineering" },
      { value: "Electrical Engineering", label: "Electrical Engineering" },
      { value: "Civil Engineering", label: "Civil Engineering" },
      { value: "Computer Engineering", label: "Computer Engineering" },
      { value: "Software Engineering", label: "Software Engineering" },
      { value: "Biomedical Engineering", label: "Biomedical Engineering" },
      { value: "Aerospace Engineering", label: "Aerospace Engineering" },
      { value: "Environmental Engineering", label: "Environmental Engineering" },
      { value: "Mechatronics", label: "Mechatronics" },
      { value: "Robotics", label: "Robotics" },
      { value: "Chemical Engineering", label: "Chemical Engineering" },
      { value: "Industrial Engineering", label: "Industrial Engineering" },
      { value: "Telecommunications Engineering", label: "Telecommunications Engineering" },
      { value: "Petroleum Engineering", label: "Petroleum Engineering" },
      { value: "Nanotechnology", label: "Nanotechnology" },
      { value: "Structural Engineering", label: "Structural Engineering" },
      { value: "Agricultural Engineering", label: "Agricultural Engineering" }
    ]
  },
  {
    label: "Computer Science & Information Technology",
    options: [
      { value: "Computer Science", label: "Computer Science" },
      { value: "Artificial Intelligence", label: "Artificial Intelligence" },
      { value: "Machine Learning", label: "Machine Learning" },
      { value: "Data Science", label: "Data Science" },
      { value: "Cybersecurity", label: "Cybersecurity" },
      { value: "Information Systems", label: "Information Systems" },
      { value: "Game Development", label: "Game Development" },
      { value: "Web Development", label: "Web Development" },
      { value: "Cloud Computing", label: "Cloud Computing" },
      { value: "Blockchain Technology", label: "Blockchain Technology" },
      { value: "Software Development", label: "Software Development" },
      { value: "Computer Networks", label: "Computer Networks" },
      { value: "Mobile App Development", label: "Mobile App Development" },
      { value: "Human-Computer Interaction", label: "Human-Computer Interaction" }
    ]
  },
  {
    label: "Health & Medicine",
    options: [
      { value: "Medicine (MBBS)", label: "Medicine (MBBS)" },
      { value: "Nursing", label: "Nursing" },
      { value: "Dentistry", label: "Dentistry" },
      { value: "Veterinary Medicine", label: "Veterinary Medicine" },
      { value: "Pharmacy", label: "Pharmacy" },
      { value: "Physiotherapy", label: "Physiotherapy" },
      { value: "Radiology", label: "Radiology" },
      { value: "Medical Laboratory Technology", label: "Medical Laboratory Technology" },
      { value: "Nutrition and Dietetics", label: "Nutrition and Dietetics" },
      { value: "Public Health", label: "Public Health" },
      { value: "Occupational Therapy", label: "Occupational Therapy" },
      { value: "Anesthesiology", label: "Anesthesiology" },
      { value: "Paramedicine", label: "Paramedicine" },
      { value: "Biomedical Sciences", label: "Biomedical Sciences" },
      { value: "Psychiatry", label: "Psychiatry" }
    ]
  },
  {
    label: "Law & Legal Studies",
    options: [
      { value: "LLB (Bachelor of Laws)", label: "LLB (Bachelor of Laws)" },
      { value: "Criminal Law", label: "Criminal Law" },
      { value: "Civil Law", label: "Civil Law" },
      { value: "Corporate Law", label: "Corporate Law" },
      { value: "International Law", label: "International Law" },
      { value: "Environmental Law", label: "Environmental Law" },
      { value: "Intellectual Property Law", label: "Intellectual Property Law" },
      { value: "Constitutional Law", label: "Constitutional Law" },
      { value: "Human Rights Law", label: "Human Rights Law" },
      { value: "Family Law", label: "Family Law" },
      { value: "Tax Law", label: "Tax Law" },
      { value: "Cyber Law", label: "Cyber Law" },
      { value: "Labor Law", label: "Labor Law" },
      { value: "Legal Ethics", label: "Legal Ethics" },
      { value: "Legal Research & Writing", label: "Legal Research & Writing" }
    ]
  },
  {
    label: "Business & Economics",
    options: [
      { value: "Business Administration (BBA/MBA)", label: "Business Administration (BBA/MBA)" },
      { value: "Finance", label: "Finance" },
      { value: "Accounting", label: "Accounting" },
      { value: "Marketing", label: "Marketing" },
      { value: "Human Resource Management", label: "Human Resource Management" },
      { value: "Supply Chain Management", label: "Supply Chain Management" },
      { value: "Entrepreneurship", label: "Entrepreneurship" },
      { value: "Economics", label: "Economics" },
      { value: "International Business", label: "International Business" },
      { value: "Business Analytics", label: "Business Analytics" },
      { value: "Organizational Behavior", label: "Organizational Behavior" },
      { value: "Investment & Portfolio Management", label: "Investment & Portfolio Management" },
      { value: "Business Ethics", label: "Business Ethics" },
      { value: "E-Commerce", label: "E-Commerce" }
    ]
  },
  {
    label: "Social Sciences",
    options: [
      { value: "Psychology", label: "Psychology" },
      { value: "Sociology", label: "Sociology" },
      { value: "Anthropology", label: "Anthropology" },
      { value: "Political Science", label: "Political Science" },
      { value: "International Relations", label: "International Relations" },
      { value: "Criminology", label: "Criminology" },
      { value: "Archaeology", label: "Archaeology" },
      { value: "Social Work", label: "Social Work" },
      { value: "Gender Studies", label: "Gender Studies" },
      { value: "Human Geography", label: "Human Geography" },
      { value: "Peace and Conflict Studies", label: "Peace and Conflict Studies" },
      { value: "Public Administration", label: "Public Administration" },
      { value: "Cultural Studies", label: "Cultural Studies" }
    ]
  },
  {
    label: "Arts & Humanities",
    options: [
      { value: "History", label: "History" },
      { value: "Philosophy", label: "Philosophy" },
      { value: "Literature", label: "Literature" },
      { value: "Linguistics", label: "Linguistics" },
      { value: "Languages", label: "Languages (e.g., English, Spanish, Arabic, Chinese, French)" },
      { value: "Religious Studies", label: "Religious Studies" },
      { value: "Islamic Studies", label: "Islamic Studies" },
      { value: "Comparative Literature", label: "Comparative Literature" },
      { value: "Classics", label: "Classics" },
      { value: "Art History", label: "Art History" },
      { value: "Ethics", label: "Ethics" }
    ]
  },
  {
    label: "Education",
    options: [
      { value: "B.Ed / M.Ed", label: "B.Ed / M.Ed" },
      { value: "Educational Psychology", label: "Educational Psychology" },
      { value: "Special Education", label: "Special Education" },
      { value: "Curriculum Development", label: "Curriculum Development" },
      { value: "Educational Leadership", label: "Educational Leadership" },
      { value: "Teaching Methods", label: "Teaching Methods" },
      { value: "Assessment and Evaluation", label: "Assessment and Evaluation" },
      { value: "Early Childhood Education", label: "Early Childhood Education" },
      { value: "Higher Education Administration", label: "Higher Education Administration" }
    ]
  },
  {
    label: "Fine Arts & Design",
    options: [
      { value: "Fine Arts (Painting, Sculpture)", label: "Fine Arts (Painting, Sculpture)" },
      { value: "Graphic Design", label: "Graphic Design" },
      { value: "Fashion Design", label: "Fashion Design" },
      { value: "Interior Design", label: "Interior Design" },
      { value: "Industrial Design", label: "Industrial Design" },
      { value: "Animation", label: "Animation" },
      { value: "Photography", label: "Photography" },
      { value: "Digital Arts", label: "Digital Arts" },
      { value: "Film and TV Production", label: "Film and TV Production" },
      { value: "Music", label: "Music" },
      { value: "Performing Arts (Dance, Theatre)", label: "Performing Arts (Dance, Theatre)" },
      { value: "Visual Communication", label: "Visual Communication" }
    ]
  },
  {
    label: "Agriculture & Forestry",
    options: [
      { value: "Agricultural Science", label: "Agricultural Science" },
      { value: "Horticulture", label: "Horticulture" },
      { value: "Agronomy", label: "Agronomy" },
      { value: "Plant Pathology", label: "Plant Pathology" },
      { value: "Animal Husbandry", label: "Animal Husbandry" },
      { value: "Agricultural Economics", label: "Agricultural Economics" },
      { value: "Food Science & Technology", label: "Food Science & Technology" },
      { value: "Forestry", label: "Forestry" },
      { value: "Soil Science", label: "Soil Science" },
      { value: "Agricultural Engineering", label: "Agricultural Engineering" }
    ]
  },
  {
    label: "Communication & Media Studies",
    options: [
      { value: "Journalism", label: "Journalism" },
      { value: "Mass Communication", label: "Mass Communication" },
      { value: "Public Relations", label: "Public Relations" },
      { value: "Advertising", label: "Advertising" },
      { value: "Media Production", label: "Media Production" },
      { value: "Digital Media", label: "Digital Media" },
      { value: "Film Studies", label: "Film Studies" },
      { value: "Communication Theory", label: "Communication Theory" },
      { value: "Broadcast Journalism", label: "Broadcast Journalism" }
    ]
  },
  {
    label: "Architecture & Urban Planning",
    options: [
      { value: "Architecture (B.Arch/M.Arch)", label: "Architecture (B.Arch/M.Arch)" },
      { value: "Urban Planning", label: "Urban Planning" },
      { value: "Landscape Architecture", label: "Landscape Architecture" },
      { value: "Sustainable Design", label: "Sustainable Design" },
      { value: "Interior Architecture", label: "Interior Architecture" },
      { value: "Architectural Engineering", label: "Architectural Engineering" }
    ]
  },
  {
    label: "Aviation & Maritime Studies",
    options: [
      { value: "Aviation Management", label: "Aviation Management" },
      { value: "Aeronautical Engineering", label: "Aeronautical Engineering" },
      { value: "Flight Training / Pilot Training", label: "Flight Training / Pilot Training" },
      { value: "Maritime Engineering", label: "Maritime Engineering" },
      { value: "Marine Transportation", label: "Marine Transportation" },
      { value: "Nautical Science", label: "Nautical Science" },
      { value: "Shipbuilding Technology", label: "Shipbuilding Technology" }
    ]
  },
  {
    label: "Hospitality & Tourism",
    options: [
      { value: "Hotel Management", label: "Hotel Management" },
      { value: "Culinary Arts", label: "Culinary Arts" },
      { value: "Travel and Tourism Management", label: "Travel and Tourism Management" },
      { value: "Event Management", label: "Event Management" },
      { value: "Resort & Leisure Management", label: "Resort & Leisure Management" }
    ]
  },
  {
    label: "Sports & Physical Education",
    options: [
      { value: "Sports Science", label: "Sports Science" },
      { value: "Kinesiology", label: "Kinesiology" },
      { value: "Physical Education", label: "Physical Education" },
      { value: "Athletic Training", label: "Athletic Training" },
      { value: "Sports Management", label: "Sports Management" },
      { value: "Coaching & Fitness Training", label: "Coaching & Fitness Training" }
    ]
  },
  {
    label: "Military & Strategic Studies",
    options: [
      { value: "Defense Studies", label: "Defense Studies" },
      { value: "Strategic Studies", label: "Strategic Studies" },
      { value: "War Studies", label: "War Studies" },
      { value: "Military Technology", label: "Military Technology" },
      { value: "Naval Science", label: "Naval Science" },
      { value: "Intelligence and Security Studies", label: "Intelligence and Security Studies" }
    ]
  }
];

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
            <Select
              options={fieldOfInterestOptions}
              value={fieldOfInterestOptions.flatMap(group => group.options).find(opt => opt.value === form.fieldOfInterest) || null}
              onChange={option => setForm({ ...form, fieldOfInterest: option ? option.value : "" })}
              placeholder="Select Field of Interest..."
              isSearchable
              required
              classNamePrefix="react-select"
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
