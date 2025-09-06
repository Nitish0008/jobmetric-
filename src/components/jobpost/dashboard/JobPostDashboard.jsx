// src/components/jobpost/dashboard/JobPostDashboard.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // ✅ Import Outlet
import JobDashboardHeader from "../header/JobDashboardHeader";
import Sidebar from "../header/Sidebar";

export default function JobPostDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1">
        <JobDashboardHeader toggleSidebar={toggleSidebar} />

        {/* ✅ Render nested routes here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
