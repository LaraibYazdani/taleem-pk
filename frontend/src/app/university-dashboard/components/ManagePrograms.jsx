"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function ManagePrograms({ universityId }) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [programs, setPrograms] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState(null);

  const [newProgram, setNewProgram] = useState({
    name: "",
    duration: "",
    eligibilityPercentage: "",
    eligibilityCertificate: "",
  });

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/university/profile/${universityId}`);
      setPrograms(response.data.programs || []);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  useEffect(() => {
    if (universityId) {
      fetchPrograms();
    }
  }, [universityId]);

  const handleInputChange = (e) => {
    setNewProgram({ ...newProgram, [e.target.name]: e.target.value });
  };

  const handleAddProgram = async () => {
    try {
      if (editingProgramId) {
        // If editing, update program
        await axios.put(`${BASE_URL}/api/university/programs/edit/${universityId}/${editingProgramId}`, newProgram);
      } else {
        // Else, add new program
        await axios.post(`${BASE_URL}/api/university/programs/add/${universityId}`, newProgram);
      }

      setShowAddModal(false);
      setEditingProgramId(null);
      setNewProgram({ name: "", duration: "", eligibilityPercentage: "", eligibilityCertificate: "" });
      fetchPrograms();
    } catch (error) {
      console.error("Error saving program:", error);
      alert("Failed to save program");
    }
  };

  const handleEditClick = (program) => {
    setNewProgram({
      name: program.name,
      duration: program.duration,
      eligibilityPercentage: program.eligibilityPercentage,
      eligibilityCertificate: program.eligibilityCertificate,
    });
    setEditingProgramId(program._id);
    setShowAddModal(true);
  };

  const handleDeleteProgram = async (programId) => {
    if (!confirm("Are you sure you want to delete this program?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/university/programs/delete/${universityId}/${programId}`);
      fetchPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
      alert("Failed to delete program");
    }
  };

  return (
    <div className="mt-12 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Programs</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => {
            setShowAddModal(true);
            setNewProgram({ name: "", duration: "", eligibilityPercentage: "", eligibilityCertificate: "" });
            setEditingProgramId(null);
          }}
        >
          + Add Program
        </button>
      </div>

      {/* Programs List */}
      {programs.length === 0 ? (
        <p className="text-gray-600">No programs added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded shadow flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{program.name}</h3>
                <p><strong>Duration:</strong> {program.duration}</p>
                <p><strong>Eligibility:</strong> {program.eligibilityPercentage}% ({program.eligibilityCertificate})</p>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => handleEditClick(program)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProgram(program._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Program Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6">{editingProgramId ? "Edit Program" : "Add New Program"}</h3>

            <input
              type="text"
              name="name"
              placeholder="Program Name"
              value={newProgram.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded mb-4"
            />
            <input
              type="text"
              name="duration"
              placeholder="Program Duration"
              value={newProgram.duration}
              onChange={handleInputChange}
              className="w-full p-3 border rounded mb-4"
            />
            <input
              type="number"
              name="eligibilityPercentage"
              placeholder="Eligibility %"
              value={newProgram.eligibilityPercentage}
              onChange={handleInputChange}
              className="w-full p-3 border rounded mb-4"
            />
            <input
              type="text"
              name="eligibilityCertificate"
              placeholder="Eligibility Certificate (e.g., HSSC, A-Levels)"
              value={newProgram.eligibilityCertificate}
              onChange={handleInputChange}
              className="w-full p-3 border rounded mb-6"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProgramId(null);
                  setNewProgram({ name: "", duration: "", eligibilityPercentage: "", eligibilityCertificate: "" });
                }}
                className="px-4 py-2 border border-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProgram}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {editingProgramId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
