const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    category: { type: String, required: true },  // Example: "Programming Languages"
    skills: { type: [String], required: true },   // Example: ["Java", "JavaScript", "C", "Python"]
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Skill', skillSchema);
