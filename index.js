const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectDB } = require('./config/Db');

const timelineRoutes = require('./routes/TimelineRoutes');
const teamRoutes = require('./routes/TeamRoutes');
const reviewRoutes = require('./routes/ClientReviewRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const achievement = require('./routes/AchievementRoutes');
const job = require('./routes/JobRoutes');
const apply = require('./routes/ApplyRoutes')

// Initialize app
const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors()); 
app.use('/uploads', express.static('uploads'));


// Routes
app.use('/api/timelines', timelineRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/achievement', achievement)
app.use('/api/job', job);
app.use('/api/apply', apply);

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
