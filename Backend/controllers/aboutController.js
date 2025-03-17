const About = require('../models/aboutModel');

// Get About Me data
exports.getAbout = async (req, res) => {
    try {
        const about = await About.findOne();
        res.json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update About Me data
exports.updateAbout = async (req, res) => {
    try {
        const { name, title, description } = req.body;
        const photo = req.file ? req.file.path : '';

        let about = await About.findOne();

        if (about) {
            about.name = name || about.name;
            about.title = title || about.title;
            about.description = description || about.description;
            if (photo) about.photo = photo;
            await about.save();
        } else {
            about = new About({ name, title, description, photo });
            await about.save();
        }

        res.json({ message: 'About data updated successfully', about });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
