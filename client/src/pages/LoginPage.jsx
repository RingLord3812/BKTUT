// client/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { 
  Box, Card, CardActionArea, Typography, 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, Alert 
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient'; // Import API client

// Component thẻ chọn vai trò (Giữ nguyên)
const RoleCard = ({ icon, title, subtitle, onClick }) => (
  <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
    <CardActionArea onClick={onClick} sx={{ p: 2 }}>
      <Box display="flex" alignItems="center">
        <Box sx={{ mr: 2, color: 'primary.main' }}>{icon}</Box>
        <Box>
          <Typography variant="h6" fontWeight="bold">{title}</Typography>
          <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
        </Box>
      </Box>
    </CardActionArea>
  </Card>
);

const LoginPage = () => {
  const navigate = useNavigate();
  
  // State quản lý Modal Login
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(''); // 'student' hoặc 'tutor'
  
  // State quản lý Form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Khi bấm vào thẻ vai trò -> Mở Modal
  const handleCardClick = (role) => {
    setSelectedRole(role);
    setOpen(true);
    setError('');
    // Reset form form
    if (role === 'student') setUsername('student_demo'); // Gợi ý sẵn cho dễ test
    else if (role === 'tutor') setUsername('tutor_demo');
    setPassword(''); 
  };

  // Khi bấm nút "Đăng nhập" trong Modal
  const handleLoginSubmit = async () => {
    console.log("🟢 Nút đã được bấm! Đang chuẩn bị gọi API...");
    try {
      // Gọi API Backend thật
      const response = await axiosClient.post('/auth/login', {
        username,
        password
      });

      const { token, role } = response.data;

      // Kiểm tra xem user có đăng nhập đúng vai trò mình chọn không
      // (Ví dụ: Acc Tutor mà lại bấm vào thẻ Student thì nên chặn hoặc cảnh báo)
      if (role !== selectedRole) {
        setError(`Tài khoản này là ${role}, vui lòng chọn đúng thẻ!`);
        return;
      }

      // Lưu Token vào LocalStorage
      localStorage.setItem('access_token', token);
      localStorage.setItem('role', role);

      // Chuyển hướng
      alert('Đăng nhập thành công!');
      setOpen(false);
      if (role === 'student') navigate('/student-home');
      else if (role === 'tutor') navigate('/tutor-home');

    } catch (err) {
      console.error(err);
      // Hiển thị lỗi từ Backend trả về
      setError(err.response?.data?.message || 'Đăng nhập thất bại!');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ p: 4, width: 400, textAlign: 'center', borderRadius: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>BK Tutor</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Chọn vai trò để đăng nhập</Typography>

        <RoleCard 
          icon={<PersonIcon fontSize="large"/>} 
          title="Sinh Viên" subtitle="Học viên" 
          onClick={() => handleCardClick('student')} 
        />
        <RoleCard 
          icon={<SchoolIcon fontSize="large"/>} 
          title="Tutor" subtitle="Gia sư" 
          onClick={() => handleCardClick('tutor')} 
        />
         <RoleCard 
          icon={<AdminPanelSettingsIcon fontSize="large"/>} 
          title="Admin" subtitle="Quản trị" 
          onClick={() => alert('Chưa làm!')} 
        />
      </Card>

      {/* === MODAL (POPUP) ĐĂNG NHẬP === */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Đăng nhập: {selectedRole === 'student' ? 'Sinh Viên' : 'Tutor'}</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button onClick={handleLoginSubmit} variant="contained">Đăng nhập</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginPage;