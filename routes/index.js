// routes/index.js
const express = require('express');
const router = express.Router();

// Import các file route con
const userRoutes = require('./userRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const authRoutes = require('./authRoutes'); // <--- 1. Nhập file Auth

// Đăng ký đường dẫn
router.use('/users', userRoutes);       // -> /api/v1/users
router.use('/schedule', scheduleRoutes); // -> /api/v1/schedule
router.use('/auth', authRoutes);         // <--- 2. QUAN TRỌNG: Bật đường dẫn /api/v1/auth

module.exports = router;