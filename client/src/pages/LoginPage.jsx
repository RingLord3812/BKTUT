// client/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { 
  Box, Card, CardActionArea, Typography, 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, Alert, Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

// Component thẻ chọn vai trò mới
const RoleOption = ({ title, description, onClick }) => (
  <Card 
    onClick={onClick}
    sx={{ 
      mb: 2, 
      borderRadius: 2, 
      border: '1px solid',
      borderColor: 'grey.200',
      boxShadow: 'none',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        borderColor: 'primary.main',
        boxShadow: 2,
        cursor: 'pointer',
        transform: 'translateY(-2px)'
      }
    }}
  >
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
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
    if (role === 'student') setUsername('student_test'); 
    else if (role === 'tutor') setUsername('tutor_test');
    else setUsername('');
    setPassword(''); 
  };

  // Khi bấm nút "Đăng nhập" trong Modal
  const handleLoginSubmit = async () => {
    try {
      // Gọi API Backend thật
      const response = await axiosClient.post('/auth/login', {
        username,
        password
      });

      const { token, role } = response.data;

      if (role !== selectedRole) {
        setError(`Tài khoản này là ${role}, vui lòng chọn đúng thẻ!`);
        return;
      }

      localStorage.setItem('access_token', token);
      localStorage.setItem('role', role);

      setOpen(false);
      if (role === 'student') navigate('/student-home');
      else if (role === 'tutor') navigate('/tutor-home');

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Đăng nhập thất bại!');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: '#E6F2FF', // Xanh dương pastel
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 2
      }}
    >
      <Card 
        sx={{ 
          width: '100%',
          maxWidth: 450, 
          p: 5, 
          borderRadius: 4, // rounded-2xl
          boxShadow: 6, // shadow-xl
          bgcolor: 'white'
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
            BK Tutor
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Chọn vai trò của bạn để tiếp tục
          </Typography>
        </Box>

        {/* Danh sách lựa chọn */}
        <Box>
          <RoleOption 
            title="Sinh Viên" 
            description="Học viên tham gia khóa học" 
            onClick={() => handleCardClick('student')} 
          />
          <RoleOption 
            title="Tutor" 
            description="Gia sư hướng dẫn học tập" 
            onClick={() => handleCardClick('tutor')} 
          />
          <RoleOption 
            title="Quản trị viên" 
            description="Phòng giáo vụ và ban giám hiệu nhà trường" 
            onClick={() => alert('Chức năng dành cho Admin chưa được kích hoạt.')} 
          />
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" display="block" color="text.disabled">
            Hệ thống học tập trực tuyến BK Tutor
          </Typography>
          <Typography variant="caption" display="block" color="text.disabled">
            © 2024 BK Tutor. All rights reserved.
          </Typography>
        </Box>
      </Card>

      {/* === MODAL (POPUP) ĐĂNG NHẬP === */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Đăng nhập: {selectedRole === 'student' ? 'Sinh Viên' : 'Tutor'}
        </DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <TextField
            autoFocus
            margin="dense"
            label="Tên đăng nhập"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Mật khẩu"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setOpen(false)} color="inherit">Hủy</Button>
          <Button onClick={handleLoginSubmit} variant="contained" disableElevation>
            Đăng nhập
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginPage;