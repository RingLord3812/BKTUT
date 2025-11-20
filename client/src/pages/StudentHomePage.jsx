// client/src/pages/StudentHomePage.jsx
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Chip, Box, Alert, Container } from '@mui/material';
import axiosClient from '../api/axiosClient';

const StudentHomePage = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Hàm gọi API lấy danh sách lớp
  const fetchSlots = async () => {
    try {
      // Gọi về Backend: GET /schedule/slots
      const response = await axiosClient.get('/schedule/slots');
      setSlots(response.data.data);
    } catch (err) {
      console.error("Lỗi:", err);
      setError('Không thể tải danh sách lớp học.');
    } finally {
      setLoading(false);
    }
  };

  // Chạy hàm này 1 lần khi trang vừa mở
  useEffect(() => {
    fetchSlots();
  }, []);

  // 2. Hàm xử lý Đặt lịch
  const handleBooking = async (slotId) => {
    if (!window.confirm('Bạn có chắc muốn đăng ký lớp này không?')) return;

    try {
      // Gọi về Backend: POST /schedule/bookings
      await axiosClient.post('/schedule/bookings', {
        tutor_slot_id: slotId
      });
      alert('✅ Đăng ký thành công!');
      fetchSlots(); // Load lại danh sách để ẩn lớp vừa đặt đi
    } catch (err) {
      alert('❌ Đăng ký thất bại: ' + (err.response?.data?.message || 'Lỗi server'));
    }
  };

  if (loading) return <Typography>Đang tải dữ liệu...</Typography>;

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" mb={3} color="primary">
        Các khóa học đang mở
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {slots.length === 0 ? (
        <Alert severity="info">Hiện tại không có lớp nào rảnh. Hãy quay lại sau!</Alert>
      ) : (
        <Grid container spacing={3}>
          {slots.map((slot) => (
            <Grid item xs={12} md={6} key={slot.slot_id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Box>
                  <Chip label={slot.subject.subject_code} color="primary" size="small" sx={{ mb: 1 }} />
                  <Typography variant="h6" fontWeight="bold">{slot.subject.subject_name}</Typography>
                  
                  <Box mt={1}>
                    <Typography variant="body2" color="text.secondary">
                      👨‍🏫 Tutor: <b>{slot.tutor.user.full_name}</b>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🕒 Bắt đầu: {new Date(slot.start_time).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🏁 Kết thúc: {new Date(slot.end_time).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                
                <Box display="flex" alignItems="center">
                  <Button 
                    variant="contained" 
                    color="success"
                    onClick={() => handleBooking(slot.slot_id)}
                    sx={{ borderRadius: 20, textTransform: 'none', px: 3 }}
                  >
                    Đăng ký
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default StudentHomePage;