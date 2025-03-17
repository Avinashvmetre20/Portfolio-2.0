const Skill = require('../models/skillModel');

// Get All Skills (Public)
exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a New Skill (Protected)
exports.createSkill = async (req, res) => {
    const { category, skills } = req.body;

    try {
        const skill = new Skill({ category, skills });
        await skill.save();
        res.status(201).json({ message: "Skill created successfully", skill });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Skill (Protected)
exports.updateSkill = async (req, res) => {
    const { id } = req.params;
    const { category, skills } = req.body;

    try {
        const skill = await Skill.findById(id);

        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        skill.category = category || skill.category;
        skill.skills = skills || skill.skills;

        await skill.save();
        res.json({ message: "Skill updated successfully", skill });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Skill (Protected)
exports.deleteSkill = async (req, res) => {
    const { id } = req.params;

    try {
        const skill = await Skill.findById(id);

        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        await skill.deleteOne();
        res.json({ message: "Skill deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
