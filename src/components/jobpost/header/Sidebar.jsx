// src/components/sidebar/Sidebar.jsx
import { FaSuitcase, FaPlus, FaSignOutAlt } from "react-icons/fa";

import { Link } from "react-router-dom"; // ✅ Import this

export default function Sidebar() {
  return (
    <div className="w-64 h-screen sticky top-0 bg-blue-600 shadow-md p-4 flex flex-col justify-between">
      <div>
        <div className="pb-7">
          <a className="btn btn-ghost text-xl text-white bg-black font-bold shadow">
            JobMetric
          </a>
        </div>
        <nav className="space-y-4">
          <button className="flex items-center gap-2 text-white hover:text-black">
            <FaSuitcase /> Manage Job Post
          </button>
          {/* <button className="flex items-center gap-2 text-white hover:text-black">
            <FaPlus /> Post a Job
          </button> */}

          <Link
            to="/job-post-form"
            className="flex items-center gap-2 text-white hover:text-black"
          >
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
