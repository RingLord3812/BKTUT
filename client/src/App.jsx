// client/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StudentHomePage from './pages/StudentHomePage';
import TutorHomePage from './pages/TutorHomePage'; // <--- 1. Import file mới
import MainLayout from './components/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      
      <Route element={<MainLayout />}>
        <Route path="/student-home" element={<StudentHomePage />} />
        <Route path="/tutor-home" element={<TutorHomePage />} /> {/* <--- 2. Cập nhật dòng này */}
      </Route>
    </Routes>
  );
}

export default App;