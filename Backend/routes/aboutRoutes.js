const express = require('express');
const multer = require('multer');
const protect = require('../middleware/authMiddleware');
const { getAbout, updateAbout } = require('../controllers/aboutController');
const router = express.Router();

// File upload settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

// Public Route - Get About Me Data
router.get('/about', getAbout);

// Protected Route - Update About Me Data (requires login)
router.put('/about', protect, upload.single('photo'), updateAbout);

module.exports = router;
