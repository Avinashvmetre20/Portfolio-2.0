import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../styles/Home.css";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [profileName, setProfileName] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [editingProfile, setEditingProfile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch all profile links
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/home");
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, []);

  // Save or Update Profile Link
  const handleSave = async () => {
    try {
      const profileData = { profileName, profileLink };
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      if (editingProfile) {
        // Update profile link
        await axios.put(`/home/${editingProfile._id}`, profileData, config);
        alert("Profile link updated successfully!");
      } else {
        // Create new profile link
        await axios.post("/home", profileData, config);
        alert("Profile link added successfully!");
      }

      setProfileName("");
      setProfileLink("");
      setEditingProfile(null);
      window.location.reload();
    } catch (error) {
      alert("Error saving profile link: " + error.message);
    }
  };

  // Edit Profile Link
  const handleEdit = (profile) => {
    setProfileName(profile.profileName);
    setProfileLink(profile.profileLink);
    setEditingProfile(profile);
  };

  // Delete Profile Link
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/home/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Profile link deleted successfully!");
      setProfiles(profiles.filter((profile) => profile._id !== id));
    } catch (error) {
      alert("Error deleting profile link: " + error.message);
    }
  };

  return (
    <div className="home-container">
      <h2 className="home-title">My Profiles</h2>

      {/* Add/Edit Profile Form (only when logged in) */}
      {isLoggedIn && (
        <div className="profile-form">
          <h3>{editingProfile ? "Edit Profile" : "Add New Profile"}</h3>
          <input
            type="text"
            placeholder="Profile Name (e.g., LinkedIn)"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Profile Link (URL)"
            value={profileLink}
            onChange={(e) => setProfileLink(e.target.value)}
          />
          <button onClick={handleSave}>
            {editingProfile ? "Update Profile" : "Add Profile"}
          </button>
        </div>
      )}

      {/* Display Profile Links */}
      <div className="profile-list">
        {profiles.map((profile) => (
          <div key={profile._id} className="profile-card">
            <h3>{profile.profileName}</h3>
            <a href={profile.profileLink} target="_blank" rel="noopener noreferrer">
              {profile.profileLink}
            </a>
            {isLoggedIn && (
              <div className="profile-actions">
                <button onClick={() => handleEdit(profile)}>Edit</button>
                <button onClick={() => handleDelete(profile._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
