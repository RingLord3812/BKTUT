// middleware/isAuthenticated.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuthenticated = (req, res, next) => {
  // 1. Lấy token từ header (Format: "Bearer <token>")
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Không tìm thấy token xác thực!' });
  }

  try {
    // 2. Giải mã token bằng chìa khóa bí mật
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Gắn thông tin user đã giải mã vào request để dùng ở bước sau
    req.user = decoded;
    
    next(); // Cho phép đi tiếp
  } catch (error) {
    return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
  }
};

module.exports = isAuthenticated;