const express = require('express');
const protect = require('../middleware/authMiddleware');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');

const router = express.Router();

// Public Routes
router.get('/projects', getProjects);

// Protected Routes
router.post('/projects', protect, createProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

module.exports = router;
