// src/components/sidebar/Sidebar.jsx
import { FaSuitcase, FaPlus, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-md p-4 flex flex-col justify-between">
      <div>
        <div className="flex-1 pb-4">
        <a className="btn btn-ghost text-xl text-white bg-black font-bold shadow">
          JobMetric
        </a>
      </div>
        <nav className="space-y-4">
          <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaSuitcase /> Manage Job Post
          </button>
          <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FaPlus /> Post a Job
          </button>
        </nav>
      </div>
     
    </div>
  );
}
