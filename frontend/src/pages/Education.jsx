import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../styles/Education.css";

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [institution, setInstitution] = useState("");
  const [city, setCity] = useState("");
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [editingEducation, setEditingEducation] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch all education details
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get("/education");
        setEducationList(response.data);
      } catch (error) {
        console.error("Error fetching education details:", error);
      }
    };
    fetchEducation();
  }, []);

  // Save or Update Education Detail
  const handleSave = async () => {
    try {
      const educationData = { institution, city, year, grade };
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      if (editingEducation) {
        // Update education detail
        await axios.put(`/education/${editingEducation._id}`, educationData, config);
        alert("Education detail updated successfully!");
      } else {
        // Create new education detail
        await axios.post("/education", educationData, config);
        alert("Education detail added successfully!");
      }

      setInstitution("");
      setCity("");
      setYear("");
      setGrade("");
      setEditingEducation(null);
      window.location.reload();
    } catch (error) {
      alert("Error saving education detail: " + error.message);
    }
  };

  // Edit Education Detail
  const handleEdit = (education) => {
    setInstitution(education.institution);
    setCity(education.city);
    setYear(education.year);
    setGrade(education.grade);
    setEditingEducation(education);
  };

  // Delete Education Detail
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/education/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Education detail deleted successfully!");
      setEducationList(educationList.filter((edu) => edu._id !== id));
    } catch (error) {
      alert("Error deleting education detail: " + error.message);
    }
  };

  return (
    <div className="education-container">
      <h2 className="education-title">My Education</h2>

      {/* Add/Edit Education Form (only when logged in) */}
      {isLoggedIn && (
        <div className="education-form">
          <h3>{editingEducation ? "Edit Education" : "Add New Education"}</h3>
          <input
            type="text"
            placeholder="Institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            type="text"
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <button onClick={handleSave}>
            {editingEducation ? "Update Education" : "Add Education"}
          </button>
        </div>
      )}

      {/* Display Education Details */}
      <div className="education-list">
        {educationList.map((edu) => (
          <div key={edu._id} className="education-card">
            <h3>{edu.institution}</h3>
            <p>City: {edu.city}</p>
            <p>Year: {edu.year}</p>
            <p>Grade: {edu.grade}</p>
            {isLoggedIn && (
              <div className="education-actions">
                <button onClick={() => handleEdit(edu)}>Edit</button>
                <button onClick={() => handleDelete(edu._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
