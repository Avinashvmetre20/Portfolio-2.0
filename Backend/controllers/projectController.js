const Project = require('../models/projectModel');

// Get All Projects (Public)
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a New Project (Protected)
exports.createProject = async (req, res) => {
    const { title, description, technologies, link, github } = req.body;

    try {
        const project = new Project({ title, description, technologies, link, github });
        await project.save();
        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Project (Protected)
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, technologies, link, github } = req.body;

    try {
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        project.title = title || project.title;
        project.description = description || project.description;
        project.technologies = technologies || project.technologies;
        project.link = link || project.link;
        project.github = github || project.github;

        await project.save();
        res.json({ message: "Project updated successfully", project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Project (Protected)
exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);
        console.log(project)
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        await project.deleteOne();
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
