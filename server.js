// server.js
require('dotenv').config(); // Đảm bảo .env được đọc đầu tiên
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// === 🔴 BẮT ĐẦU ĐOẠN CAMERA GIÁM SÁT (Dán vào đây) ===
app.use((req, res, next) => {
  console.log(`🔍 CÓ KHÁCH GÕ CỬA: ${req.method} ${req.url}`);
  next();
});
// === 🔴 KẾT THÚC ĐOẠN CAMERA GIÁM SÁT ===

// === Middlewares ===
app.use(cors()); // Cho phép frontend gọi API
app.use(express.json()); // Đọc được JSON từ body của request

// === Database Connection ===
connectDB(); // Gọi hàm kiểm tra kết nối CSDL

// === Routes ===
const routes = require('./routes'); // Import file routes/index.js
app.use('/api/v1', routes);         // Tiền tố cho tất cả API

app.get('/', (req, res) => {
  res.send('Chào mừng đến với BKTUT Tutor System API!');
});

// (Chúng ta sẽ thêm routes từ /routes/index.js vào đây sau)

// === Start Server ===
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});