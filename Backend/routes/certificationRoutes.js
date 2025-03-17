const express = require('express');
const multer = require('multer');
const protect = require('../middleware/authMiddleware');
const {
    getCertifications,
    createCertification,
    updateCertification,
    deleteCertification
} = require('../controllers/certificationController');

const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/certificates/'); // Store in the 'uploads/certificates' folder
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Public Route - Get All Certifications
router.get('/certifications', getCertifications);

// Protected Routes - Create, Update, and Delete Certifications
router.post('/certifications', protect, upload.single('image'), createCertification);
router.put('/certifications/:id', protect, upload.single('image'), updateCertification);
router.delete('/certifications/:id', protect, deleteCertification);

module.exports = router;
