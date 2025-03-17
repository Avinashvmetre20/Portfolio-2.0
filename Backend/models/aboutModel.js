const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true },
});

module.exports = mongoose.model('About', aboutSchema);
