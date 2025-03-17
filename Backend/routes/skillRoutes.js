const express = require('express');
const protect = require('../middleware/authMiddleware');
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');

const router = express.Router();

// Public Routes
router.get('/skills', getSkills);

// Protected Routes
router.post('/skills', protect, createSkill);
router.put('/skills/:id', protect, updateSkill);
router.delete('/skills/:id', protect, deleteSkill);

module.exports = router;
