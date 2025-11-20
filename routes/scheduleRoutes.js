// routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const isAuthenticated = require('../middleware/isAuthenticated');
const checkRole = require('../middleware/checkRole');

// 1. Tutor tạo lịch (Chỉ Tutor được phép)
router.post('/slots', 
  isAuthenticated, 
  checkRole('tutor'), 
  scheduleController.createSlot
);

// 2. Ai cũng xem được lịch rảnh (Cần đăng nhập)
router.get('/slots', 
  isAuthenticated, 
  scheduleController.getAvailableSlots
);

// 3. Student đặt lịch (Chỉ Student được phép)
router.post('/bookings', 
  isAuthenticated, 
  checkRole('student'), 
  scheduleController.bookSlot
);

module.exports = router;