// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/registration/Registration';
import HRDashboard from './components/hrdashboard/HRDashboard';
import UserDashboard from './components/userdashboard/UserDashboard';
import "./style.css"; 
import OtpVerify from './components/registration/OtpVerify';

import JobPostDashboard from "./components/jobpost/dashboard/JobPostDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OtpVerify/>} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/job-post" element={<JobPostDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
