const express = require('express');
const { getMessages, storeMessage, deleteMessage } = require('../controllers/contactController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.get('/contact',protect, getMessages);
router.post('/contact', storeMessage);

// Protected Route
router.delete('/contact/:id', protect, deleteMessage);

module.exports = router;
