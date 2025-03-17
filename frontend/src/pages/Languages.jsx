import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../styles/Languages.css";

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch all languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get("/languages");
        setLanguages(response.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguages();
  }, []);

  // Save or Update Language
  const handleSave = async () => {
    try {
      const languageData = { language, proficiency };
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      if (editingLanguage) {
        // Update language
        await axios.put(`/languages/${editingLanguage._id}`, languageData, config);
        alert("Language updated successfully!");
      } else {
        // Create new language
        await axios.post("/languages", languageData, config);
        alert("Language added successfully!");
      }

      setLanguage("");
      setProficiency("");
      setEditingLanguage(null);
      window.location.reload();
    } catch (error) {
      alert("Error saving language: " + error.message);
    }
  };

  // Edit Language
  const handleEdit = (lang) => {
    setLanguage(lang.language);
    setProficiency(lang.proficiency);
    setEditingLanguage(lang);
  };

  // Delete Language
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/languages/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Language deleted successfully!");
      setLanguages(languages.filter((lang) => lang._id !== id));
    } catch (error) {
      alert("Error deleting language: " + error.message);
    }
  };

  return (
    <div className="languages-container">
      <h2 className="languages-title">Languages</h2>

      {/* Add/Edit Language Form (only when logged in) */}
      {isLoggedIn && (
        <div className="language-form">
          <h3>{editingLanguage ? "Edit Language" : "Add New Language"}</h3>
          <input
            type="text"
            placeholder="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Proficiency (e.g., Fluent, Intermediate)"
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
          />
          <button onClick={handleSave}>
            {editingLanguage ? "Update Language" : "Add Language"}
          </button>
        </div>
      )}

      {/* Display Languages */}
      <div className="languages-list">
        {languages.map((lang) => (
          <div key={lang._id} className="language-card">
            <h3>{lang.language}</h3>
            <p>Proficiency: {lang.proficiency}</p>
            {isLoggedIn && (
              <div className="language-actions">
                <button onClick={() => handleEdit(lang)}>Edit</button>
                <button onClick={() => handleDelete(lang._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;
