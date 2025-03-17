import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../styles/Skills.css";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [editingSkill, setEditingSkill] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch all skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("/skills");
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  // Save or Update Skill
  const handleSave = async () => {
    try {
      const skillData = {
        category: newCategory,
        skills: newSkills.split(",").map((skill) => skill.trim()),
      };
      if (editingSkill) {
        // Update skill
        await axios.put(`/skills/${editingSkill._id}`, skillData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Skill updated successfully!");
      } else {
        // Create new skill
        await axios.post("/skills", skillData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Skill added successfully!");
      }
      setNewCategory("");
      setNewSkills("");
      setEditingSkill(null);
      window.location.reload();
    } catch (error) {
      alert("Error saving skill: " + error.message);
    }
  };

  // Edit Skill
  const handleEdit = (skill) => {
    setNewCategory(skill.category);
    setNewSkills(skill.skills.join(", "));
    setEditingSkill(skill);
  };

  // Delete Skill
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/skills/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Skill deleted successfully!");
      setSkills(skills.filter((skill) => skill._id !== id));
    } catch (error) {
      alert("Error deleting skill: " + error.message);
    }
  };

  return (
    <div className="skills-container">
      <h2 className="skills-title">My Skills</h2>

      {/* Add/Edit Skill Form (only when logged in) */}
      {isLoggedIn && (
        <div className="skill-form">
          <h3>{editingSkill ? "Edit Skill" : "Add New Skill"}</h3>
          <input
            type="text"
            placeholder="Skill Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={newSkills}
            onChange={(e) => setNewSkills(e.target.value)}
          />
          <button onClick={handleSave}>
            {editingSkill ? "Update Skill" : "Add Skill"}
          </button>
        </div>
      )}

      {/* Display Skills */}
      <div className="skills-list">
        {skills.map((skill) => (
          <div key={skill._id} className="skill-card">
            <h3 className="skill-category">{skill.category}</h3>
            <ul className="skill-items">
              {skill.skills.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {/* Edit and Delete Buttons (only when logged in) */}
            {isLoggedIn && (
              <div className="skill-actions">
                <button onClick={() => handleEdit(skill)}>Edit</button>
                <button onClick={() => handleDelete(skill._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
