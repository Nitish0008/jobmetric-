// src/components/sidebar/Sidebar.jsx
import { FaSuitcase, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen sticky top-0 bg-blue-600 shadow-md p-4 flex flex-col justify-between">
      <div>
        <div className="pb-7">
          <Link to="/hr-dashboard" className="btn btn-ghost text-xl text-white bg-black font-bold shadow">
            JobMetric
          </Link>
        </div>
        <nav className="space-y-4">
          {/* ✅ Updated this to go to JobListingTable inside JobPostDashboard */}
          <Link to="/job-post/list" className="flex items-center gap-2 text-white hover:text-black">
            <FaSuitcase /> Manage Job Post
          </Link>

          {/* ✅ This now loads the nested JobPostForm inside JobPostDashboard */}
          <Link to="/job-post/form" className="flex items-center gap-2 text-white hover:text-black">
            <FaPlus /> Post a Job
          </Link>
        </nav>
      </div>

      <button className="flex items-center gap-2 text-white hover:text-red-200">
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
