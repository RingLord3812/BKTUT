// controllers/authController.js
const { User, Role } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Đang đăng nhập:", username); // Log để debug

    // --- HARDCODED TEST USERS (Bypass DB) ---
    if (username === 'student_test' && password === '123456') {
        const token = jwt.sign(
            { userId: 'student_test_id', role: 'student' }, 
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );
        return res.json({ success: true, message: 'Login (Test Mode)', token, role: 'student' });
    }
    if (username === 'tutor_test' && password === '123456') {
        const token = jwt.sign(
            { userId: 'tutor_test_id', role: 'tutor' }, 
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );
        return res.json({ success: true, message: 'Login (Test Mode)', token, role: 'tutor' });
    }
    // ----------------------------------------

    // 1. Tìm user
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Username không tồn tại!' });

    // 2. So sánh pass (Dùng hash thật trong DB)
    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) return res.status(401).json({ message: 'Mật khẩu sai!' });

    // 3. Tạo token (Hardcode role để demo nếu DB chưa chuẩn role)
    const userRole = username.includes('student') ? 'student' : 'tutor';
    
    const token = jwt.sign(
        { userId: user.user_id, role: userRole }, 
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.json({ 
        success: true,
        message: 'Đăng nhập thành công',
        token, 
        role: userRole 
    });

  } catch (error) {
    console.error("Lỗi Login:", error);
    res.status(500).json({ message: 'Lỗi Server: ' + error.message });
  }
};

module.exports = { login };