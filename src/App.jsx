// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Register from './registration/Registration';
import HRDashboard from './hrdashboard/HRDashboard';
import UserDashboard from './userdashboard/UserDashboard';
import "./style.css"; 
import OtpVerify from './registration/OtpVerify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OtpVerify/>} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
