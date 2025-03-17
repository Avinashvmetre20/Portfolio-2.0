const Education = require('../models/educationModel');

// Get All Education Details (Public)
exports.getEducation = async (req, res) => {
    try {
        const education = await Education.find();
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create New Education Detail (Protected)
exports.createEducation = async (req, res) => {
    const { institution, city, year, grade } = req.body;

    try {
        const education = new Education({ institution, city, year, grade });
        await education.save();
        res.status(201).json({ message: "Education detail added successfully", education });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Education Detail (Protected)
exports.updateEducation = async (req, res) => {
    const { id } = req.params;
    const { institution, city, year, grade } = req.body;

    try {
        const education = await Education.findById(id);

        if (!education) {
            return res.status(404).json({ message: "Education detail not found" });
        }

        education.institution = institution || education.institution;
        education.city = city || education.city;
        education.year = year || education.year;
        education.grade = grade || education.grade;

        await education.save();
        res.json({ message: "Education detail updated successfully", education });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Education Detail (Protected)
exports.deleteEducation = async (req, res) => {
    const { id } = req.params;

    try {
        const education = await Education.findById(id);

        if (!education) {
            return res.status(404).json({ message: "Education detail not found" });
        }

        await education.deleteOne();
        res.json({ message: "Education detail deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
