import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../styles/Certifications.css";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [title, setTitle] = useState("");
  const [provider, setProvider] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [editingCertification, setEditingCertification] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch all certifications
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await axios.get("/certifications");
        setCertifications(response.data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };
    fetchCertifications();
  }, []);

  // Handle form submission
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("provider", provider);
      formData.append("link", link);
      if (image) {
        formData.append("image", image);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingCertification) {
        await axios.put(`/certifications/${editingCertification._id}`, formData, config);
        alert("Certification updated successfully!");
      } else {
        await axios.post("/certifications", formData, config);
        alert("Certification added successfully!");
      }

      setTitle("");
      setProvider("");
      setLink("");
      setImage(null);
      setEditingCertification(null);
      window.location.reload();
    } catch (error) {
      alert("Error saving certification: " + error.message);
    }
  };

  // Edit Certification
  const handleEdit = (cert) => {
    setTitle(cert.title);
    setProvider(cert.provider);
    setLink(cert.link);
    setEditingCertification(cert);
  };

  // Delete Certification
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/certifications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Certification deleted successfully!");
      setCertifications(certifications.filter((cert) => cert._id !== id));
    } catch (error) {
      alert("Error deleting certification: " + error.message);
    }
  };

  return (
    <div className="certifications-container">
      <h2 className="certifications-title">My Certifications</h2>

      {/* Add/Edit Certification Form (only when logged in) */}
      {isLoggedIn && (
        <div className="certification-form">
          <h3>{editingCertification ? "Edit Certification" : "Add New Certification"}</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          />
          <input
            type="text"
            placeholder="Certificate Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
          <button onClick={handleSave}>
            {editingCertification ? "Update Certification" : "Add Certification"}
          </button>
        </div>
      )}

      {/* Display Certifications */}
      <div className="certifications-list">
        {certifications.map((cert) => (
          <div key={cert._id} className="certification-card">
            <h3>{cert.title}</h3>
            <p>Provider: {cert.provider}</p>
            {cert.link && (
              <a href={cert.link} target="_blank" rel="noopener noreferrer">
                View Certificate
              </a>
            )}
            {cert.image && (
              <img
                src={`http://localhost:8080/${cert.image}`}
                alt={cert.title}
                className="certification-image"
              />
            )}
            {isLoggedIn && (
              <div className="certification-actions">
                <button onClick={() => handleEdit(cert)}>Edit</button>
                <button onClick={() => handleDelete(cert._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
