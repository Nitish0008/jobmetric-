// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/registration/Registration';
import HRDashboard from './components/hrdashboard/HRDashboard';
import UserDashboard from './components/userdashboard/UserDashboard';
import "./style.css"; 
import OtpVerify from './components/registration/OtpVerify';

import JobPostDashboard from "./components/jobpost/dashboard/JobPostDashboard";
import JobPostForm from './components/jobpost/jobposttable/JobPostForm';
import JobListingTable from './components/jobpost/jobposttable/JobListingTable';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* Nested job post routes */}
        <Route path="/job-post" element={<JobPostDashboard />}>
          <Route index element={<Navigate to="list" />} />
          <Route path="form" element={<JobPostForm />} />
          <Route path="list" element={<JobListingTable />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
