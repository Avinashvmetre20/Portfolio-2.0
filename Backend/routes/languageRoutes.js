const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
    getLanguages,
    createLanguage,
    updateLanguage,
    deleteLanguage
} = require('../controllers/languageController');

const router = express.Router();

// Public Route - Get All Languages
router.get('/languages', getLanguages);

// Protected Routes
router.post('/languages', protect, createLanguage);
router.put('/languages/:id', protect, updateLanguage);
router.delete('/languages/:id', protect, deleteLanguage);

module.exports = router;
