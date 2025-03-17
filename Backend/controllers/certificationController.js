const Certification = require('../models/certificationModel');
const fs = require('fs');
const path = require('path');

// Get All Certifications (Public)
exports.getCertifications = async (req, res) => {
    try {
        const certifications = await Certification.find();
        res.json(certifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create New Certification (Protected)
exports.createCertification = async (req, res) => {
    const { title, provider, link } = req.body;
    const image = req.file ? req.file.path : '';

    try {
        const certification = new Certification({ title, provider, link, image });
        await certification.save();
        res.status(201).json({ message: "Certification added successfully", certification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Certification (Protected)
exports.updateCertification = async (req, res) => {
    const { id } = req.params;
    const { title, provider, link } = req.body;
    const image = req.file ? req.file.path : '';

    try {
        const certification = await Certification.findById(id);

        if (!certification) {
            return res.status(404).json({ message: "Certification not found" });
        }

        // Delete the old image if a new one is uploaded
        if (image && certification.image) {
            const oldImagePath = path.join(__dirname, '..', certification.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        certification.title = title || certification.title;
        certification.provider = provider || certification.provider;
        certification.link = link || certification.link;
        if (image) certification.image = image;

        await certification.save();
        res.json({ message: "Certification updated successfully", certification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Certification (Protected)
exports.deleteCertification = async (req, res) => {
    const { id } = req.params;

    try {
        const certification = await Certification.findById(id);

        if (!certification) {
            return res.status(404).json({ message: "Certification not found" });
        }

        // Delete the associated image file
        if (certification.image) {
            const imagePath = path.join(__dirname, '..', certification.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await certification.deleteOne();
        res.json({ message: "Certification deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
