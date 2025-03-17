import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../styles/Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", technologies: "", link: "", github: "" });
  const [editingProject, setEditingProject] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Create or Update a project
  const handleSave = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      if (editingProject) {
        // Update project
        await axios.put(`/projects/${editingProject._id}`, newProject, config);
        alert("Project updated successfully!");
      } else {
        // Create project
        await axios.post("/projects", newProject, config);
        alert("Project created successfully!");
      }
      setNewProject({ title: "", description: "", technologies: "", link: "", github: "" });
      setEditingProject(null);
      window.location.reload();
    } catch (error) {
      alert("Error saving project: " + error.message);
    }
  };

  // Edit Project
  const handleEdit = (project) => {
    setNewProject({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      link: project.link,
      github: project.github,
    });
    setEditingProject(project);
  };

  // Delete Project
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Project deleted successfully!");
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      alert("Error deleting project: " + error.message);
    }
  };

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>

      {/* Add/Edit Project Form (Visible only when logged in) */}
      {isLoggedIn && (
        <div className="project-form">
          <h3>{editingProject ? "Edit Project" : "Add New Project"}</h3>
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Technologies (comma separated)"
            value={newProject.technologies}
            onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
          />
          <input
            type="text"
            placeholder="Live Link"
            value={newProject.link}
            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
          />
          <input
            type="text"
            placeholder="GitHub Link"
            value={newProject.github}
            onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
          />
          <button onClick={handleSave}>{editingProject ? "Update" : "Add"} Project</button>
        </div>
      )}

      {/* Display Projects */}
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <p className="project-technologies">
              Technologies: {project.technologies.join(", ")}
            </p>
            <div className="project-links">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  GitHub
                </a>
              )}
            </div>

            {/* Edit and Delete Buttons (Visible only when logged in) */}
            {isLoggedIn && (
              <div className="project-actions">
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
