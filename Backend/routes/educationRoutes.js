const express = require('express');
const protect = require('../middleware/authMiddleware');
const { getEducation, createEducation, updateEducation, deleteEducation } = require('../controllers/educationController');

const router = express.Router();

// Public Route - Get All Education Details
router.get('/education', getEducation);

// Protected Routes
router.post('/education', protect, createEducation);
router.put('/education/:id', protect, updateEducation);
router.delete('/education/:id', protect, deleteEducation);

module.exports = router;
