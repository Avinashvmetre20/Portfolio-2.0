const Language = require('../models/languageModel');

// Get All Languages (Public)
exports.getLanguages = async (req, res) => {
    try {
        const languages = await Language.find();
        res.json(languages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a New Language (Protected)
exports.createLanguage = async (req, res) => {
    const { language, proficiency } = req.body;

    try {
        const newLanguage = new Language({ language, proficiency });
        await newLanguage.save();
        res.status(201).json({ message: "Language added successfully", newLanguage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Language (Protected)
exports.updateLanguage = async (req, res) => {
    const { id } = req.params;
    const { language, proficiency } = req.body;

    try {
        const existingLanguage = await Language.findById(id);

        if (!existingLanguage) {
            return res.status(404).json({ message: "Language not found" });
        }

        existingLanguage.language = language || existingLanguage.language;
        existingLanguage.proficiency = proficiency || existingLanguage.proficiency;

        await existingLanguage.save();
        res.json({ message: "Language updated successfully", existingLanguage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Language (Protected)
exports.deleteLanguage = async (req, res) => {
    const { id } = req.params;

    try {
        const existingLanguage = await Language.findById(id);

        if (!existingLanguage) {
            return res.status(404).json({ message: "Language not found" });
        }

        await existingLanguage.deleteOne();
        res.json({ message: "Language deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
