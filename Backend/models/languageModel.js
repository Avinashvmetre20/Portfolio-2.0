const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    language: { type: String, required: true },
    proficiency: { type: String, required: true }, // Example: "Fluent", "Intermediate"
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Language', languageSchema);
