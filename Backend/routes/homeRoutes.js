const express = require('express');
const protect = require('../middleware/authMiddleware');
const { getHomeLinks, createHomeLink, updateHomeLink, deleteHomeLink } = require('../controllers/homeController');

const router = express.Router();

// Public Route - Get All Profile Links
router.get('/home', getHomeLinks);

// Protected Routes
router.post('/home', protect, createHomeLink);
router.put('/home/:id', protect, updateHomeLink);
router.delete('/home/:id', protect, deleteHomeLink);

module.exports = router;
