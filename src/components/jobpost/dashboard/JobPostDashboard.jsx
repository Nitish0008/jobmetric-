// src/components/jobpost/JobPostDashboard.jsx

import React, { useState } from 'react';

import JobDashboardHeader from ".././header/JobDashboardHeader";
import Sidebar from ".././header/Sidebar";



export default function JobPostDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex bg-black">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1">
        <JobDashboardHeader toggleSidebar={toggleSidebar} />
      
     
      </div>
    </div>
  );
}