// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middleware/isAuthenticated');

// Định nghĩa route: GET /api/v1/users/me
router.get('/me', isAuthenticated, userController.getMe);

module.exports = router;