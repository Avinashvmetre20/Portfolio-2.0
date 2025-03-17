const Home = require('../models/homeModel');

// Get All Profile Links (Public)
exports.getHomeLinks = async (req, res) => {
    try {
        const homeLinks = await Home.find();
        res.json(homeLinks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a New Profile Link (Protected)
exports.createHomeLink = async (req, res) => {
    const { profileName, profileLink } = req.body;

    try {
        const newLink = new Home({ profileName, profileLink });
        await newLink.save();
        res.status(201).json({ message: "Profile link added successfully", newLink });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Profile Link (Protected)
exports.updateHomeLink = async (req, res) => {
    const { id } = req.params;
    const { profileName, profileLink } = req.body;

    try {
        const link = await Home.findById(id);

        if (!link) {
            return res.status(404).json({ message: "Profile link not found" });
        }

        link.profileName = profileName || link.profileName;
        link.profileLink = profileLink || link.profileLink;

        await link.save();
        res.json({ message: "Profile link updated successfully", link });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Profile Link (Protected)
exports.deleteHomeLink = async (req, res) => {
    const { id } = req.params;

    try {
        const link = await Home.findById(id);

        if (!link) {
            return res.status(404).json({ message: "Profile link not found" });
        }

        await link.deleteOne();
        res.json({ message: "Profile link deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
