const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const aboutRoutes = require('./routes/aboutRoutes');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const educationRoutes = require('./routes/educationRoutes');
const certificationRoutes = require('./routes/certificationRoutes');
const languageRoutes = require('./routes/languageRoutes');
const contactRoutes = require('./routes/contactRoutes');
const homeRoutes = require('./routes/homeRoutes');  // Added homepage routes

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', aboutRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes);
app.use('/api', skillRoutes);
app.use('/api', educationRoutes);
app.use('/api', certificationRoutes);
app.use('/api', languageRoutes);
app.use('/api', contactRoutes);
app.use('/api', homeRoutes);  // Homepage routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
