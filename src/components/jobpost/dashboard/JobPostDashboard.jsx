
import React, { useState } from 'react';

import JobDashboardHeader from ".././header/JobDashboardHeader";
import Sidebar from ".././header/Sidebar";
import JobListingTable from '../jobposttable/JobListingTable';
// import JobPostForm from '../jobposttable/JobPostForm';



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

        {/* <JobPostForm /> */}

      <JobListingTable />
      </div>
    </div>
  );
}