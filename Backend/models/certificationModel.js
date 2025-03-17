const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    provider: { type: String, required: true },
    link: { type: String }, // Optional link to certificate or course
    image: { type: String }, // Path to the uploaded image
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Certification', certificationSchema);
