const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    profileName: { type: String, required: true },  // Example: "LinkedIn", "GitHub"
    profileLink: { type: String, required: true },  // URL of the profile
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Home', homeSchema);
